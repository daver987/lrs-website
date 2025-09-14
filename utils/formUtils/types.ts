import type { Place } from '~/shared/schemas'

import type { LineItem, SalesTax, Service, Vehicle } from '~/shared/schemas'

export interface FormValue {
  id: string
  origin: Place
  destination: Place
  stops?: Place[]
  last_name: string
  first_name: string
  email_address: string
  phone_number: string
  selected_passengers: number | null
  pickup_date: string | null
  pickup_time: string | null
  return_date: string | null
  return_time: string | null
  selected_hours: number | null
  vehicle_number: number | null
  service_number: number | null
  is_round_trip: boolean
  is_hourly: boolean
  conversion: {
    utm_medium?: string
    utm_source?: string
    utm_campaign?: string
    utm_term?: string
    gclid?: string
  }
  sales_tax: SalesTax[]
  line_items: LineItem[]
  vehicle: Vehicle | null
  service: Service | null
}
