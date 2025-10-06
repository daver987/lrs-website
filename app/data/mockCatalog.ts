import type {
  LineItem,
  SalesTax,
  Service,
  Vehicle,
} from '~~/shared/schemas'

export const mockVehicles: Vehicle[] = [
  {
    vehicle_number: 1,
    label: 'Executive Sedan',
    vehicle_image: '/images/standard_sedan-4.jpg',
    max_passengers: 3,
    max_luggage: 3,
    per_km: 1.7,
    per_hour: 85,
    min_hours: 2,
    min_distance: 25,
    min_rate: 170,
  },
  {
    vehicle_number: 2,
    label: 'Premium SUV',
    vehicle_image: '/images/premium_suv-1.jpg',
    max_passengers: 5,
    max_luggage: 5,
    per_km: 2.1,
    per_hour: 110,
    min_hours: 2,
    min_distance: 25,
    min_rate: 220,
  },
  {
    vehicle_number: 3,
    label: 'Sprinter Van',
    vehicle_image: '/images/sprinter-3.png',
    max_passengers: 10,
    max_luggage: 10,
    per_km: 2.6,
    per_hour: 145,
    min_hours: 3,
    min_distance: 30,
    min_rate: 435,
  },
  {
    vehicle_number: 4,
    label: 'Luxury Coach',
    vehicle_image: '/images/premium_suv-12.jpg',
    max_passengers: 14,
    max_luggage: 12,
    per_km: 3.1,
    per_hour: 185,
    min_hours: 3,
    min_distance: 30,
    min_rate: 555,
  },
]

export const mockServices: Service[] = [
  { label: 'Airport Transfer', is_hourly: false },
  { label: 'Corporate Travel', is_hourly: false },
  { label: 'Special Events', is_hourly: false },
  { label: 'Hourly As-Directed', is_hourly: true },
]

export const mockLineItems: LineItem[] = [
  {
    label: 'Gratuity',
    is_percentage: true,
    amount: 20,
    is_taxable: false,
  },
  {
    label: 'Fuel Surcharge',
    is_percentage: true,
    amount: 8,
    is_taxable: true,
  },
]

export const mockSalesTaxes: SalesTax[] = [
  {
    tax_name: 'HST',
    amount: 13,
    is_active: true,
  },
]
