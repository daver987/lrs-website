import type { LineItem, SalesTax, Service, Vehicle } from '@prisma/client'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { z } from 'zod'
import {
  DirectionsApiResponse,
  DirectionsSchema,
} from '~/schema/directionsSchema'
import { LineItemSchema } from '~/schema/prismaSchemas'

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
type LineItemExtended = z.infer<typeof LineItemExtendedSchema>

const config = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY

export async function calculateDistance(
  origin: string,
  destination: string
): Promise<{ distance: number; data: DirectionsApiResponse }> {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${config}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch directions: ${response.status} - ${response.statusText}`
    )
  }
  const data = await response.json()
  const validatedData = DirectionsSchema.parse(data)
  const {
    distance: { value: distanceValue },
  } = validatedData.routes[0].legs[0]
  return {
    data: validatedData,
    distance: distanceValue / 1000,
  }
}

export function usePricingEngine(
  vehicle: Vehicle,
  service: Service,
  lineItems: LineItemExtended[],
  salesTaxes: SalesTax[]
) {
  const origin = ref('')
  const destination = ref('')
  const routeData = ref<DirectionsApiResponse>()
  const vehicleTypeId = ref(-1)
  const serviceTypeId = ref(-1)
  const selectedHours = ref(0)
  const distance = ref(0)
  const baseRate = ref(0)
  const taxTotal = ref(0)
  const subTotal = ref(0)
  const totalAmount = ref(0)
  const detailedLineItems: Ref<LineItemsPartial[] | null> = ref(null)
  const detailedLineItemsWithTotals: Ref<LineItemsPartial[] | null> = ref(null)
  const selectedVehicle = ref<Vehicle>()
  const selectedService = ref<Service>()
  const selectedTaxesList = ref<SalesTax[]>()
  const selectedLineItemsList = ref<LineItem[]>()

  // methods
  async function updateDistance() {
    const { data: route, distance: dist } = await calculateDistance(
      origin.value,
      destination.value
    )
    distance.value = dist
    routeData.value = route
  }

  function updateBaseRate() {
    selectedVehicle.value = vehicle
    selectedService.value = service
    if (!selectedVehicle.value || !selectedService.value) {
      baseRate.value = 0
      return
    }
    if (selectedService.value.is_hourly) {
      baseRate.value = +(
        selectedHours.value * selectedVehicle.value.per_hour
      ).toFixed(2)
    } else {
      const distanceOverMin = Math.max(
        0,
        distance.value - selectedVehicle.value.min_distance
      )
      const calculatedBaseRate =
        selectedVehicle.value.min_rate +
        distanceOverMin * selectedVehicle.value.per_km
      baseRate.value = parseFloat(calculatedBaseRate.toFixed(2))
    }
  }

  function updateLineItemsTotal(originRef: string) {
    selectedLineItemsList.value = lineItems
    selectedTaxesList.value = salesTaxes
    const filteredLineItems: LineItemExtended[] = selectedLineItemsList.value
      .filter((item) => {
        return item.applies_to === null || item.applies_to === originRef
      })
      .filter((item) => item.is_active)
    const matchingTaxes = selectedTaxesList.value.filter((tax) => tax.is_active)
    const taxRate = matchingTaxes.length > 0 ? matchingTaxes[0].amount : 0
    const baseRateAmount = parseFloat(baseRate.value.toFixed(2))
    const baseRateTax = parseFloat(
      ((baseRateAmount * taxRate) / 100).toFixed(2)
    )
    const lineItemDetails = [
      { label: 'Base Rate', tax: baseRateTax, total: baseRateAmount },
      ...filteredLineItems.map((item) => {
        const amount = item.is_percentage
          ? parseFloat((baseRate.value * (item.amount / 100)).toFixed(2))
          : parseFloat(item.amount.toFixed(2))
        const tax = item.is_taxable
          ? parseFloat(((amount * taxRate) / 100).toFixed(2))
          : 0
        item.label = item.label || ''
        item.tax = tax
        item.total = amount
        return { label: item.label, tax: tax, total: amount }
      }),
    ]
    detailedLineItems.value = lineItemDetails
    subTotal.value = lineItemDetails.reduce((acc, item) => acc + item.total, 0)
    taxTotal.value = lineItemDetails.reduce((acc, item) => acc + item.tax, 0)
    totalAmount.value = subTotal.value + taxTotal.value
    detailedLineItemsWithTotals.value = [
      ...Object.values(lineItemDetails),
      {
        label: matchingTaxes[0].tax_name,
        tax: parseFloat(taxTotal.value.toFixed(2)),
        total: parseFloat(taxTotal.value.toFixed(2)),
      },
      {
        label: 'Total',
        tax: parseFloat(taxTotal.value.toFixed(2)),
        total: parseFloat(totalAmount.value.toFixed(2)),
      },
    ]
  }

  function reset() {
    origin.value = ''
    destination.value = ''
    vehicleTypeId.value = -1
    serviceTypeId.value = -1
    selectedHours.value = 0
    distance.value = 0
    baseRate.value = 0
    selectedLineItemsList.value = []
    selectedTaxesList.value = []
  }

  return {
    vehicle,
    service,
    lineItems,
    salesTaxes,
    origin,
    destination,
    routeData,
    vehicleTypeId,
    serviceTypeId,
    selectedHours,
    selectedVehicle,
    selectedService,
    selectedLineItemsList,
    selectedTaxesList,
    distance,
    baseRate,
    subTotal,
    taxTotal,
    totalAmount,
    detailedLineItems,
    detailedLineItemsWithTotals,
    updateDistance,
    updateBaseRate,
    updateLineItemsTotal,
    reset,
  }
}
