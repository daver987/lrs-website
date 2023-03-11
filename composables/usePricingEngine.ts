import { computed, ref } from 'vue'
import { z } from 'zod'
import { Service, LineItem, Vehicle, SalesTax } from '~/prisma/generated/zod'

const directionsSchema = z.object({
  routes: z.array(
    z
      .object({
        legs: z.array(
          z.object({
            distance: z.object({ value: z.number(), text: z.string() }),
            duration: z.object({ value: z.number(), text: z.string() }),
            end_address: z.string(),
            start_address: z.string(),
            start_location: z.object({ lat: z.number(), lng: z.number() }),
            end_location: z.object({ lat: z.number(), lng: z.number() }),
          })
        ),
      })
      .strip()
  ),
})

type DirectionsApiResponse = z.infer<typeof directionsSchema>

const config = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY

// Distance Calculation function
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
  console.log(data)
  const validatedData = directionsSchema.parse(data)
  const {
    distance: { value: distanceValue },
  } = validatedData.routes[0].legs[0]

  return {
    data: validatedData,
    distance: distanceValue / 1000,
  }
}

// Pricing Engine function
export function usePricingEngine(
  vehicles: Vehicle[],
  services: Service[],
  lineItems: LineItem[],
  salesTaxes: SalesTax[]
) {
  // state variables
  const origin = ref('')
  const destination = ref('')
  const routeData = ref<DirectionsApiResponse>()
  const vehicleTypeId = ref(-1)
  const serviceTypeId = ref(-1)
  const selectedHours = ref(0)
  const distance = ref(0)
  const baseRate = ref(0)
  const lineItemsTotal = ref(0)
  const taxableLineItemsTotal = ref(0)
  const taxTotal = ref(0)
  const subTotal = ref(0)
  const totalAmount = ref(0)
  const taxAmount = ref(0)
  const totalPrice = computed(
    () => baseRate.value + lineItemsTotal.value + taxAmount.value
  )
  const taxesList = ref(salesTaxes)
  const lineItemsList = ref(lineItems)
  const detailedLineItems = ref()
  const selectedServiceLabel = ref<string | undefined>('')
  const selectedService = ref<Service>()
  const selectedVehicle = ref<Vehicle>()

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
    const selectedVehicleType = vehicles.find(
      (v) => v.value === vehicleTypeId.value
    )
    const selectedServiceType = services.find(
      (s) => s.value === serviceTypeId.value
    )
    selectedVehicle.value = selectedVehicleType as any
    console.log('Selected vehicle type:', selectedVehicleType)
    selectedService.value = selectedServiceType as any
    console.log('Selected service type:', selectedServiceType)

    selectedServiceLabel.value = selectedServiceType?.label

    if (!selectedVehicleType || !selectedServiceType) {
      baseRate.value = 0
      return
    }

    if (selectedServiceType.value === 4) {
      baseRate.value = +(
        selectedHours.value * selectedVehicleType.per_hour
      ).toFixed(2)
    } else {
      const distanceOverMin = Math.max(
        0,
        distance.value - selectedVehicleType.min_distance
      )
      const calculatedBaseRate =
        selectedVehicleType.min_rate +
        distanceOverMin * selectedVehicleType.per_km
      baseRate.value = +calculatedBaseRate.toFixed(2)
    }
  }

  function updateLineItemsTotal(originRef: string) {
    const filteredLineItems = lineItemsList.value
      .filter((item) => {
        return item.applies_to === null || item.applies_to === originRef
      })
      .filter((item) => item.is_active)

    const matchingTaxes = taxesList.value.filter((tax) => tax.is_active)
    const taxRate = matchingTaxes.length > 0 ? matchingTaxes[0].amount : 0
    const baseRateAmount = +baseRate.value.toFixed(2)
    const baseRateTax = +((baseRateAmount * taxRate) / 100).toFixed(2)

    const lineItemDetails = [
      { label: 'Base Rate', total: baseRateAmount, tax: baseRateTax },
      ...filteredLineItems.map((item) => {
        const amount = item.is_percentage
          ? +(baseRate.value * (item.amount / 100)).toFixed(2)
          : +item.amount.toFixed(2)

        const tax = item.is_taxable ? +((amount * taxRate) / 100).toFixed(2) : 0

        // @ts-ignore
        item.total = amount
        item.label = item.label || ''
        // @ts-ignore
        item.tax = tax

        return { label: item.label, total: amount, tax: tax }
      }),
    ]

    taxTotal.value = lineItemDetails.reduce((acc, item) => acc + item.tax, 0)
    subTotal.value = lineItemDetails.reduce((acc, item) => acc + item.total, 0)
    totalAmount.value = +(taxTotal.value + subTotal.value).toFixed(2)

    detailedLineItems.value = lineItemDetails

    return { lineItemDetails, taxTotal, subTotal, totalAmount }
  }

  function reset() {
    origin.value = ''
    destination.value = ''
    vehicleTypeId.value = -1
    serviceTypeId.value = -1
    selectedHours.value = 0
    distance.value = 0
    baseRate.value = 0
    lineItemsTotal.value = 0
    taxableLineItemsTotal.value = 0
    taxAmount.value = 0
    lineItemsList.value = []
  }

  return {
    origin,
    destination,
    routeData,
    vehicles,
    services,
    lineItems,
    lineItemsList,
    salesTaxes,
    vehicleTypeId,
    serviceTypeId,
    selectedServiceLabel,
    selectedHours,
    selectedVehicle,
    selectedService,
    distance,
    baseRate,
    detailedLineItems,
    lineItemsTotal,
    taxableLineItemsTotal,
    taxAmount,
    totalPrice,
    updateDistance,
    updateBaseRate,
    updateLineItemsTotal,
    reset,
  }
}
