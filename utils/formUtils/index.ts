import { Place } from '~/schema/placeSchema'
import { LineItem, SalesTax, Service, Vehicle } from '.prisma/client'
import { LocationQueryValue } from 'vue-router'
import { ComputedRef } from 'vue'

export interface FormValue {
  id: string
  origin: Place | null
  destination: Place | null
  last_name: string
  first_name: string
  email_address: string
  phone_number: string
  selected_passengers: null | number
  pickup_date: string | null
  pickup_time: string | null
  return_date: string | null
  return_time: string | null
  selected_hours: null | number
  vehicle_number: null | number
  service_number: null | number
  is_round_trip: boolean
  is_hourly: boolean
  conversion: { [p: string]: string | null | LocationQueryValue[] }
  sales_tax: SalesTax[]
  line_items: LineItem[]
  vehicle: Vehicle | null | ComputedRef<Vehicle | null>
  service: Service | null | ComputedRef<Service | null>
}

// index.ts
export * from './serviceTypes'
export * from './computeUtils'
export * from './computeOptions'
export * from './isAirport'
