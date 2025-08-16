import type { Prisma } from '@prisma/client'

export const defaultServices: Prisma.ServiceCreateManyInput[] = [
  { label: 'Point-to-Point', is_active: true, is_hourly: false },
  { label: 'To Airport', is_active: true, is_hourly: false },
  { label: 'From Airport', is_active: true, is_hourly: false },
  { label: 'Hourly / As Directed', is_active: true, is_hourly: true },
]

export const defaultVehicles: Prisma.VehicleCreateManyInput[] = [
  {
    label: 'Luxury Sedan',
    max_passengers: 3,
    max_luggage: 3,
    per_km: 1.7,
    per_hour: 80,
    min_hours: 2,
    min_distance: 25,
    min_rate: 0,
    is_active: true,
    vehicle_image: '/images/standard_sedan-4.jpg',
  },
  {
    label: 'Luxury SUV',
    max_passengers: 6,
    max_luggage: 6,
    per_km: 2.1,
    per_hour: 105,
    min_hours: 2,
    min_distance: 25,
    min_rate: 0,
    is_active: true,
    vehicle_image: '/images/premium_suv-1.jpg',
  },
]

export const defaultLineItems: Prisma.LineItemCreateManyInput[] = [
  {
    item_number: 2001,
    label: 'Gratuity',
    description: 'Suggested gratuity (20%)',
    is_percentage: true,
    is_taxable: false,
    is_active: true,
    amount: 20,
    applies_to: 'base',
  },
  {
    item_number: 2002,
    label: 'Fuel Surcharge',
    description: 'Fuel surcharge (8%)',
    is_percentage: true,
    is_taxable: true,
    is_active: true,
    amount: 8,
    applies_to: 'base',
  },
]

export const defaultTaxes: Prisma.SalesTaxCreateManyInput[] = [
  { tax_name: 'HST', amount: 13, region: 'ON', is_active: true },
]
