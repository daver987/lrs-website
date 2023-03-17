import { Place } from '~/schema/placeSchema'
import { LineItem, SalesTax, Service, Vehicle } from '~/prisma/generated/zod'

export type FormValue = {
  user_id: string
  first_name: string | null
  last_name: string | null
  email_address: string | null
  phone_number: string | null
  conversion: any
  origin: Place
  destination: Place
  pickup_date: number | null
  pickup_time: number | null
  return_date: number | null
  return_time: number | null
  selected_hours: number | null
  selected_passengers: number | null
  is_hourly: boolean
  vehicle_id: number | null
  service_id: number | null
  is_round_trip: boolean
  vehicle: Vehicle[]
  service: Service[]
  line_items: LineItem[]
  sales_tax: SalesTax[]
}
