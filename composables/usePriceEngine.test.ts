import { usePricingEngine } from '@/composables/usePricingEngine'
import {
  ServicePartial,
  LineItemPartial,
  SalesTax,
  SalesTaxPartial,
  VehiclePartial,
} from '~/prisma/generated/zod'
import { ref } from 'vue'
import { Vehicle, Service } from '~/prisma/generated/zod'
import { test, expect } from 'vitest'

// Mock data

const lineItems: LineItemPartial[] = [
  {
    amount: 20,
    id: '1',
    is_active: true,
    is_percentage: true,
    is_taxable: false,
    label: 'Gratuity',
    applies_to: '',
  },
  {
    amount: 8,
    id: '2',
    is_active: true,
    is_percentage: true,
    is_taxable: true,
    label: 'Fuel Surcharge',
    applies_to: '',
  },
  {
    amount: 13.27,
    id: '3',
    is_active: true,
    is_percentage: false,
    is_taxable: true,
    label: 'Pearson Toll Charge',
    applies_to: 'ChIJkdQtwEo5K4gRxQ4DxOldHbQ',
  },
]

const salesTaxes: SalesTaxPartial[] = [
  {
    amount: 13,
    id: 1,
    is_active: true,
    region: 'Ontario',
    tax_name: 'HST',
  },
  {
    amount: 14.975,
    id: 2,
    is_active: false,
    region: 'Quebec',
    tax_name: 'QST',
  },
]

function findObjectByValue<T extends { value: number }>(
  array: T[],
  value: number
): T | undefined {
  return array.find((item) => item.value === value)
}

export function calculateBaseFare(
  distanceInKm: number,
  selectedVehicleType: Vehicle,
  selectedServiceType: Service,
  selectedHours: number
): number {
  if (!selectedVehicleType || !selectedServiceType) {
    return 0
  }

  if (selectedServiceType.is_hourly) {
    return +(selectedHours * selectedVehicleType.per_hour).toFixed(2)
  } else {
    const distanceOverMin = Math.max(
      0,
      distanceInKm - selectedVehicleType.min_distance
    )
    const calculatedBaseRate =
      selectedVehicleType.min_rate +
      distanceOverMin * selectedVehicleType.per_km
    return parseFloat(calculatedBaseRate.toFixed(2))
  }
}

test('Check that we pick the correct vehicle and service object', () => {
  const vehicleTypeId = 1
  const serviceTypeId = 1
  const distanceInKm = 25
  const distanceInKmTwo = 50
  const selectedHours = 2
  const selectedHoursTwo = 4

  const vehicles: VehiclePartial[] = [
    { value: 1, per_hour: 80, min_distance: 25, min_rate: 80, per_km: 1.7 },
    { value: 2, per_hour: 105, min_distance: 25, min_rate: 105, per_km: 2 },
  ]

  const services: ServicePartial[] = [
    { value: 1, label: 'Distance Service', is_hourly: false },
    { value: 4, label: 'Hourly Service', is_hourly: true },
  ]
  //@ts-ignore
  const vehicleType = findObjectByValue(vehicles, vehicleTypeId)
  //@ts-ignore
  const vehicleTypeTwo = findObjectByValue(vehicles, 2)
  //@ts-ignore
  const serviceType = findObjectByValue(services, serviceTypeId)
  //@ts-ignore
  const serviceTypeHourly = findObjectByValue(services, 4)

  expect(vehicleType).toStrictEqual({
    value: 1,
    per_hour: 80,
    min_distance: 25,
    min_rate: 80,
    per_km: 1.7,
  })
  expect(vehicleTypeTwo).toStrictEqual({
    value: 2,
    per_hour: 105,
    min_distance: 25,
    min_rate: 105,
    per_km: 2,
  })
  expect(serviceType).toStrictEqual({
    value: 1,
    label: 'Distance Service',
    is_hourly: false,
  })
  expect(serviceTypeHourly).toStrictEqual({
    value: 4,
    label: 'Hourly Service',
    is_hourly: true,
  })

  const result = calculateBaseFare(
    distanceInKm,
    //@ts-ignore
    vehicleType,
    serviceType,
    selectedHours
  )
  const result1 = calculateBaseFare(
    distanceInKm,
    //@ts-ignore
    vehicleTypeTwo,
    serviceTypeHourly,
    selectedHours
  )
  const result2 = calculateBaseFare(
    distanceInKmTwo,
    //@ts-ignore
    vehicleTypeTwo,
    serviceType,
    selectedHours
  )
  const result3 = calculateBaseFare(
    distanceInKm,
    //@ts-ignore
    vehicleType,
    serviceTypeHourly,
    selectedHoursTwo
  )

  expect(result).toBe(80)
  expect(result1).toBe(210)
  expect(result2).toBe(155)
  expect(result3).toBe(320)
})
