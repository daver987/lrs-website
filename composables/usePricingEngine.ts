import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { LineItem, SalesTax, Service, Vehicle } from '@prisma/client'
import { z } from 'zod'
import {
  DirectionsSchema,
  type DirectionsApiResponse,
  LineItemSchema,
} from '~/shared/schemas'

/**
 * ----------------------------------------------------------------------------
 * Refactored Pricing Engine (waypoint + extensibility ready)
 * ----------------------------------------------------------------------------
 *
 * Goals of this refactor:
 *  - Stronger typing (no silent mutation of input arrays; derived shapes are explicit)
 *  - Clear separation of concerns (distance fetching, base rate strategy, line item assembly, tax aggregation)
 *  - Extensibility for new pricing strategies and multi‑leg (waypoint) routes
 *  - Backwards compatibility with earlier public API surface (keeping key refs & method names)
 *
 * Key Concepts
 * ------------
 *  - Distance is derived from Google Directions API (sum of all legs). Waypoints supported.
 *  - Base Rate Strategy:
 *      * Hourly: hours * vehicle.per_hour
 *      * Distance: vehicle.min_rate + max(0, (distance - vehicle.min_distance)) * vehicle.per_km
 *    (You can add more strategies by extending `BaseRateStrategy` map.)
 *  - Line Items:
 *      * Always prepend a synthetic "Base Rate" line
 *      * Each additional line item can be flat or percentage and optionally taxable
 *      * Filtered by (is_active && (applies_to == null || applies_to == contextRef))
 *  - Taxes:
 *      * All active taxes applied independently (if an item is taxable)
 *      * We still expose a flattened tax total for compatibility
 *      * `detailedLineItemsWithTotals` retains legacy-like structure while now supporting multiple taxes
 *
 * Usage (Simplified)
 * ------------------
 *  const engine = usePricingEngine({ vehicle, service, lineItems, salesTaxes })
 *  await engine.setPlaces({ origin: 'placeIdA', destination: 'placeIdB', waypoints: ['placeIdC'] })
 *  await engine.updateDistance()
 *  engine.setSelectedHours(3)
 *  engine.updateLineItemsTotal('booking') // contextRef for filtering
 *
 *  console.log(engine.totalAmount.value)
 *
 * Backwards Compatible Fields:
 *  - origin, destination, distance, baseRate, subTotal, taxTotal, totalAmount
 *  - updateDistance, updateBaseRate (now a no-op returning current), updateLineItemsTotal
 *
 * ----------------------------------------------------------------------------
 */

/* --------------------------------------------------
 * Schemas / Extended Types
 * -------------------------------------------------- */
const LineItemExtendedSchema = LineItemSchema.extend({
  tax: z.number().optional(),
  total: z.number().optional(),
})

const LineItemsPartialSchema = LineItemExtendedSchema.pick({
  label: true,
  tax: true,
  total: true,
})

type LineItemsPartial = z.infer<typeof LineItemsPartialSchema>

/* --------------------------------------------------
 * Utility helpers
 * -------------------------------------------------- */
const round = (value: number, digits = 2) =>
  Number.isFinite(value) ? Number.parseFloat(value.toFixed(digits)) : 0

function buildDirectionsUrl(opts: {
  origin: string
  destination: string
  waypoints: string[]
  apiKey: string
}) {
  const { origin, destination, waypoints, apiKey } = opts
  const parts: string[] = [
    'https://maps.googleapis.com/maps/api/directions/json',
    `?origin=place_id:${origin}`,
    `&destination=place_id:${destination}`,
  ]
  if (waypoints.length) {
    const wp = waypoints.map((p) => `place_id:${p}`).join('|')
    parts.push(`&waypoints=${encodeURIComponent(wp)}`)
  }
  parts.push(`&key=${apiKey}`)
  return parts.join('')
}

async function fetchDirections(
  origin: string,
  destination: string,
  waypoints: string[],
  apiKey: string
): Promise<{ distanceKm: number; data: DirectionsApiResponse }> {
  if (!origin || !destination) {
    // Return a zero-distance placeholder without attempting schema parse (avoids schema warning)
    return {
      distanceKm: 0,
      // Cast minimal shape to satisfy return type when inputs incomplete
      data: { routes: [] } as unknown as DirectionsApiResponse,
    }
  }

  const url = buildDirectionsUrl({ origin, destination, waypoints, apiKey })
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch directions: ${response.status} - ${response.statusText}`
    )
  }
  const json = await response.json()
  const validated = DirectionsSchema.parse(json)

  // Safely derive legs (avoid direct index access warnings)
  const firstRoute = Array.isArray(validated.routes)
    ? validated.routes[0]
    : undefined
  const legs = firstRoute?.legs ?? []
  if (!legs.length) {
    return { distanceKm: 0, data: validated }
  }

  // Sum all legs (supporting multi-leg via waypoints) with defensive distance extraction
  const totalMeters = legs.reduce(
    (acc, leg) => acc + (leg?.distance?.value ?? 0),
    0
  )
  return { distanceKm: totalMeters / 1000, data: validated }
}

/* --------------------------------------------------
 * Strategy Interfaces
 * -------------------------------------------------- */
interface BaseRateParams {
  distanceKm: number
  hours: number
  vehicle: Vehicle
  service: Service
}

type BaseRateStrategyFn = (p: BaseRateParams) => number

const baseRateStrategies: Record<'HOURLY' | 'DISTANCE', BaseRateStrategyFn> = {
  HOURLY: ({ hours, vehicle }) => {
    const minHours = Math.max(2, vehicle.min_hours || 0)
    const billableHours = Math.max(hours || 0, minHours)
    return round(billableHours * (vehicle.per_hour || 0))
  },
  DISTANCE: ({ distanceKm, vehicle }) => {
    // Distance-based base: 1 hour or 25km minimum (whichever is greater)
    const baseKm = Math.max(25, vehicle.min_distance || 0)
    const baseByKm = (vehicle.per_km || 0) * baseKm
    const baseByHour = (vehicle.per_hour || 0) * 1
    const base = Math.max(baseByKm, baseByHour)
    const overKm = Math.max(0, (distanceKm || 0) - baseKm)
    const variable = overKm * (vehicle.per_km || 0)
    return round(base + variable)
  },
}

/* --------------------------------------------------
 * Public composable
 * -------------------------------------------------- */
interface PricingEngineInput {
  vehicle: Vehicle
  service: Service
  lineItems: LineItem[]
  salesTaxes: SalesTax[]
}

interface SetPlacesArgs {
  origin: string
  destination: string
  waypoints?: string[]
}

export function usePricingEngine(input: PricingEngineInput) {
  // Immutable inputs (do not mutate)
  const originalVehicle = input.vehicle
  const originalService = input.service
  const originalLineItems = input.lineItems
  const originalSalesTaxes = input.salesTaxes

  // Reactive selection state
  const selectedVehicle = ref<Vehicle>(originalVehicle)
  const selectedService = ref<Service>(originalService)
  const selectedLineItemsList = ref<LineItem[]>([...originalLineItems])
  const selectedTaxesList = ref<SalesTax[]>([...originalSalesTaxes])

  const selectedHours = ref<number>(0)

  // Route related
  const origin = ref<string>('') // backwards compatibility
  const destination = ref<string>('') // backwards compatibility
  const waypoints = ref<string[]>([])
  const routeData = ref<DirectionsApiResponse | undefined>()
  const distance = ref<number>(0)

  // Context ref for filtering line items (replaces originRef param semantics)
  const contextRef = ref<string>('')
  // Dynamic extras
  const airportPickupFee = ref<number>(0)

  // Manual "type id" placeholders kept for compatibility (unused internally)
  const vehicleTypeId = ref<number>(-1)
  const serviceTypeId = ref<number>(-1)

  // API key (scoped late to allow SSR-safe usage)
  const apiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY

  /* ----------------------------------------------
   * Base Rate (Computed via strategy)
   * ---------------------------------------------- */
  const pricingMode = computed<'HOURLY' | 'DISTANCE'>(() =>
    selectedService.value?.is_hourly ? 'HOURLY' : 'DISTANCE'
  )

  const baseRate = computed<number>(() => {
    if (!selectedVehicle.value || !selectedService.value) return 0
    const strategy = baseRateStrategies[pricingMode.value]
    return strategy({
      distanceKm: distance.value,
      hours: selectedHours.value,
      vehicle: selectedVehicle.value,
      service: selectedService.value,
    })
  })

  /* ----------------------------------------------
   * Active taxes (all, not just first)
   * ---------------------------------------------- */
  const activeTaxes = computed(() =>
    (selectedTaxesList.value || []).filter((t) => t.is_active)
  )

  const combinedTaxRate = computed<number>(() =>
    activeTaxes.value.reduce((acc, t) => acc + t.amount, 0)
  )

  /* ----------------------------------------------
   * Filter & prepare line items
   * ---------------------------------------------- */
  const filteredAdditionalLineItems = computed<LineItem[]>(() =>
    (selectedLineItemsList.value || [])
      .filter((li) => li.is_active)
      .filter(
        (li) =>
          li.applies_to === null ||
          li.applies_to === '' ||
          li.applies_to === contextRef.value
      )
  )

  interface ComputedLineItemRow {
    label: string
    preTaxAmount: number
    taxAmount: number
    isTaxable: boolean
    source?: LineItem
  }

  const computedLineItemRows = computed<ComputedLineItemRow[]>(() => {
    const rows: ComputedLineItemRow[] = []

    // Base Rate synthetic row
    const baseTax = baseRate.value * (combinedTaxRate.value / 100)
    rows.push({
      label: 'Base Rate',
      preTaxAmount: baseRate.value,
      taxAmount: round(baseTax),
      isTaxable: true,
    })

    // Additional rows
    filteredAdditionalLineItems.value.forEach((item) => {
      const amount = item.is_percentage
        ? baseRate.value * (item.amount / 100)
        : item.amount
      const preTax = round(amount)
      const tax = item.is_taxable
        ? round(preTax * (combinedTaxRate.value / 100))
        : 0
      rows.push({
        label: item.label || '',
        preTaxAmount: preTax,
        taxAmount: tax,
        isTaxable: item.is_taxable,
        source: item,
      })
    })

    // Ensure Fuel Surcharge (8%) exists (taxable)
    const hasFuel = rows.some((r) => /fuel/i.test(r.label))
    if (!hasFuel) {
      const preTax = round(baseRate.value * 0.08)
      const tax = round(preTax * (combinedTaxRate.value / 100))
      rows.push({
        label: 'Fuel Surcharge',
        preTaxAmount: preTax,
        taxAmount: tax,
        isTaxable: true,
      })
    }

    // Ensure Gratuity (20%) exists (NOT taxable)
    const hasGratuity = rows.some((r) => /gratuity/i.test(r.label))
    if (!hasGratuity) {
      const preTax = round(baseRate.value * 0.2)
      rows.push({
        label: 'Gratuity',
        preTaxAmount: preTax,
        taxAmount: 0,
        isTaxable: false,
      })
    }

    // GTAA fee on airport pickup (taxable)
    if (airportPickupFee.value > 0) {
      const preTax = round(airportPickupFee.value)
      const tax = round(preTax * (combinedTaxRate.value / 100))
      rows.push({
        label: 'GTAA Fee',
        preTaxAmount: preTax,
        taxAmount: tax,
        isTaxable: true,
      })
    }

    return rows
  })

  /* ----------------------------------------------
   * Aggregations
   * ---------------------------------------------- */
  const subTotal = computed<number>(() =>
    computedLineItemRows.value.reduce((acc, r) => acc + r.preTaxAmount, 0)
  )

  const taxTotal = computed<number>(() =>
    computedLineItemRows.value.reduce((acc, r) => acc + r.taxAmount, 0)
  )

  const totalAmount = computed<number>(() => subTotal.value + taxTotal.value)

  /* ----------------------------------------------
   * Legacy-like detailedLineItems outputs
   * (label, tax, total) keeping parity with prior
   * meaning: total == preTaxAmount, tax == taxAmount
   * ---------------------------------------------- */
  const detailedLineItems: Ref<LineItemsPartial[] | null> = computed(() => {
    if (!computedLineItemRows.value.length) return null
    return computedLineItemRows.value.map((r) => ({
      label: r.label,
      tax: round(r.taxAmount),
      total: round(r.preTaxAmount),
    }))
  })

  /**
   * Extended with tax rows and grand total.
   * For backward compatibility we retain:
   *  - One row per line item (above)
   *  - A tax row (for each active tax) if multiple
   *  - A consolidated tax total row (if >1 taxes)
   *  - A final 'Total' row
   */
  const detailedLineItemsWithTotals: Ref<LineItemsPartial[] | null> = computed(
    () => {
      if (!detailedLineItems.value) return null
      const rows: LineItemsPartial[] = [...detailedLineItems.value]

      // Individual tax entries
      const taxAmountsPerTax = activeTaxes.value.map((t) => {
        const ratePortion = t.amount / combinedTaxRate.value || 0
        const amount = round(taxTotal.value * ratePortion)
        return { tax: t, amount }
      })

      taxAmountsPerTax.forEach(({ tax, amount }) => {
        rows.push({
          label: tax.tax_name,
          // legacy shape: put amount in both tax & total for display uniformity
          tax: amount,
          total: amount,
        })
      })

      if (activeTaxes.value.length > 1) {
        rows.push({
          label: 'Total Tax',
          tax: round(taxTotal.value),
          total: round(taxTotal.value),
        })
      }

      rows.push({
        label: 'Total',
        tax: round(taxTotal.value),
        total: round(totalAmount.value),
      })

      return rows
    }
  )

  /* ----------------------------------------------
   * Public (imperative) methods
   * ---------------------------------------------- */

  /**
   * Set origin/destination/waypoints in one call
   */
  async function setPlaces(args: SetPlacesArgs) {
    origin.value = args.origin
    destination.value = args.destination
    waypoints.value = [...(args.waypoints || [])]
  }

  function setSelectedHours(h: number) {
    selectedHours.value = Math.max(0, h)
  }

  function setVehicle(v: Vehicle) {
    selectedVehicle.value = v
  }

  function setService(s: Service) {
    selectedService.value = s
  }

  function setLineItems(items: LineItem[]) {
    selectedLineItemsList.value = [...items]
  }

  function setTaxes(taxes: SalesTax[]) {
    selectedTaxesList.value = [...taxes]
  }

  function setContextRef(refKey: string) {
    contextRef.value = refKey
  }
  function setAirportPickupFee(amount: number) {
    airportPickupFee.value = Math.max(0, amount)
  }

  /**
   * Fetch directions & update distance (in KM).
   * Supports waypoints automatically.
   */
  async function updateDistance() {
    if (!origin.value || !destination.value) {
      distance.value = 0
      routeData.value = undefined
      return
    }
    const { distanceKm, data } = await fetchDirections(
      origin.value,
      destination.value,
      waypoints.value,
      apiKey
    )
    distance.value = round(distanceKm, 3) // keep more precision pre-strategy rounding
    routeData.value = data
  }

  /**
   * Backwards-compatible stub (baseRate is now reactive)
   */
  function updateBaseRate() {
    return baseRate.value
  }

  /**
   * Backwards-compatible entry point to refresh
   * "detailedLineItems" context based on a discriminator key.
   */
  function updateLineItemsTotal(originRef: string) {
    setContextRef(originRef)
    // All computed; nothing else required.
    return {
      subTotal: subTotal.value,
      taxTotal: taxTotal.value,
      total: totalAmount.value,
    }
  }

  function reset() {
    origin.value = ''
    destination.value = ''
    waypoints.value = []
    vehicleTypeId.value = -1
    serviceTypeId.value = -1
    selectedHours.value = 0
    distance.value = 0
    setLineItems(originalLineItems)
    setTaxes(originalSalesTaxes)
    contextRef.value = ''
  }

  /* ----------------------------------------------
   * Snapshots / debug helpers
   * ---------------------------------------------- */
  function snapshot() {
    return {
      mode: pricingMode.value,
      distanceKm: distance.value,
      hours: selectedHours.value,
      baseRate: baseRate.value,
      subTotal: subTotal.value,
      taxTotal: taxTotal.value,
      total: totalAmount.value,
      contextRef: contextRef.value,
      lineItems: detailedLineItems.value,
      lineItemsWithTotals: detailedLineItemsWithTotals.value,
      activeTaxRates: activeTaxes.value.map((t) => ({
        name: t.tax_name,
        rate: t.amount,
      })),
    }
  }

  /* ----------------------------------------------
   * Public API surface
   * ---------------------------------------------- */
  return {
    // Raw inputs (immutable originals for reference)
    vehicle: originalVehicle,
    service: originalService,
    lineItems: originalLineItems,
    salesTaxes: originalSalesTaxes,

    // Selections / state
    origin,
    destination,
    waypoints,
    routeData,
    distance,
    selectedVehicle,
    selectedService,
    selectedLineItemsList,
    selectedTaxesList,
    selectedHours,
    vehicleTypeId,
    serviceTypeId,
    contextRef,

    // Computed financials (refs)
    baseRate,
    subTotal,
    taxTotal,
    totalAmount,

    // Detailed rows
    detailedLineItems,
    detailedLineItemsWithTotals,

    // Methods
    setPlaces,
    setSelectedHours,
    setVehicle,
    setService,
    setLineItems,
    setTaxes,
    setContextRef,
    setAirportPickupFee,
    updateDistance,
    updateBaseRate, // legacy
    updateLineItemsTotal, // legacy trigger
    reset,
    snapshot,
  }
}

/* --------------------------------------------------
 * (Optional) Direct distance helper export
 * Mirrors legacy calculateDistance but enhanced
 * with waypoint support if needed outside composable.
 * -------------------------------------------------- */
export async function calculateDistance(
  origin: string,
  destination: string,
  waypoints: string[] = []
): Promise<{ distance: number; data: DirectionsApiResponse }> {
  const apiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
  const { distanceKm, data } = await fetchDirections(
    origin,
    destination,
    waypoints,
    apiKey
  )
  return { distance: distanceKm, data }
}
