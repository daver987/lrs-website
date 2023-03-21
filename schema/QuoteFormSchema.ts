import { z } from 'zod'
import {
  LineItemSchema,
  SalesTaxSchema,
  ServiceSchema,
  VehicleSchema,
  QuoteSchema,
  TripSchema,
  LocationSchema,
  UserSchema,
  ConversionSchema,
} from '~/prisma/generated/zod'
import { Prisma, PrismaClient } from '@prisma/client'

const QuoteSchemaPicked = QuoteSchema.pick({
  selected_hours: true,
  selected_passengers: true,
  is_round_trip: true,
  quote_total: true,
  quote_subtotal: true,
  quote_tax_total: true,
  combined_line_items: true,
})
type Quote = z.infer<typeof QuoteSchemaPicked>

const TripSchemaPicked = TripSchema.pick({
  pickup_date: true,
  pickup_time: true,
  formatted_pickup_date: true,
  formatted_pickup_time: true,
  distance_text: true,
  duration_text: true,
  duration_value: true,
  distance_value: true,
  service_label: true,
  vehicle_label: true,
  line_items_list: true,
  line_items_subtotal: true,
  line_items_tax: true,
  line_items_total: true,
  is_return: true,
  trip_order: true,
})

type Trip = z.infer<typeof TripSchemaPicked>

const LocationSchemaPicked = LocationSchema.pick({
  lat: true,
  lng: true,
  name: true,
  formatted_address: true,
  full_name: true,
  place_id: true,
  types: true,
  is_origin: true,
  route_order: true,
})

type Location = z.infer<typeof LocationSchemaPicked>

const TripSchemaPickedExtended = TripSchemaPicked.extend({
  location: LocationSchemaPicked.array(),
})

const UserSchemaPicked = UserSchema.pick({
  id: true,
  first_name: true,
  last_name: true,
  full_name: true,
  phone_number: true,
  email_address: true,
})

type User = z.infer<typeof UserSchemaPicked>

const ConversionSchemaPicked = ConversionSchema.pick({
  utm_term: true,
  utm_medium: true,
  utm_source: true,
  utm_campaign: true,
  gclid: true,
})

type Conversion = z.infer<typeof ConversionSchemaPicked>

const UserSchemaPickedExtended = UserSchemaPicked.extend({
  conversion: ConversionSchemaPicked,
})

const QuoteExtendedSchema = QuoteSchemaPicked.extend({
  trips: TripSchemaPickedExtended,
  user: UserSchemaPickedExtended,
})

type QuoteExtended = z.infer<typeof QuoteExtendedSchema>

export const QuoteFormSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z
    .string()
    .email({ message: 'Please enter a valid email' })
    .toLowerCase(),
  phone_number: z.string(),
  conversion: z.object({
    utm_medium: z.string().optional(),
    utm_source: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    gclid: z.string().optional(),
  }),
  origin: z.object({
    formatted_address: z.string(),
    name: z.string(),
    place_id: z.string(),
    types: z.array(z.string()),
  }),
  destination: z.object({
    formatted_address: z.string(),
    name: z.string(),
    place_id: z.string(),
    types: z.array(z.string()),
  }),
  pickup_date: z.number().nullable(),
  pickup_time: z.number().nullable(),
  return_date: z.number().nullable(),
  return_time: z.number().nullable(),
  selected_hours: z.number().nullable(),
  selected_passengers: z.number().nullable(),
  is_hourly: z.boolean(),
  vehicle_id: z.number().nullable(),
  service_id: z.number().nullable(),
  return_service_id: z.number().nullable(),
  is_round_trip: z.boolean(),
  vehicle: VehicleSchema.array(),
  service: ServiceSchema.array(),
  line_items: LineItemSchema.array(),
  sales_tax: SalesTaxSchema.array(),
})

export type QuoteForm = z.infer<typeof QuoteFormSchema>

const createQuote = (
  selected_hours: number,
  selected_passengers: number,
  is_round_trip: boolean,
  quote_total: number,
  quote_subtotal: number,
  quote_tax_total: number,
  combined_line_items: any,
  pickup_date: number,
  pickup_time: number,
  formatted_pickup_date: string,
  formatted_pickup_time: string,
  distance_text: string,
  duration_text: string,
  duration_value: number,
  distance_value: number,
  service_label: string,
  vehicle_label: string,
  line_items_list: any,
  line_items_subtotal: number,
  line_items_tax: number,
  line_items_total: number,
  is_return: boolean,
  trip_order: number,
  originLat: number,
  originLng: number,
  originName: string,
  originFormattedAddress: string,
  originFullName: string,
  originPlaceId: string,
  originTypes: any,
  destinationLat: number,
  destinationLng: number,
  destinationName: string,
  destinationFormattedAddress: string,
  destinationFullName: string,
  destinationPlaceId: string,
  destinationTypes: any,
  userId: string,
  firstName: string,
  lastName: string,
  fullName: string,
  phoneNumber: string,
  emailAddress: string,
  utm_term: string,
  utm_medium: string,
  utm_source: string,
  utm_campaign: string,
  gclid: string,
  salesTaxId: number,
  vehicleId: number,
  serviceId: number,
  lineItemsIdOne: string,
  lineItemsIdTwo: string,
  lineItemsIdThree: string
) => {
  return Prisma.validator<Prisma.QuoteCreateInput>()({
    selected_hours,
    selected_passengers,
    is_round_trip,
    quote_total,
    quote_subtotal,
    quote_tax_total,
    combined_line_items,
    trips: {
      create: [
        {
          pickup_date,
          pickup_time,
          formatted_pickup_date,
          formatted_pickup_time,
          distance_text,
          duration_text,
          duration_value,
          distance_value,
          service_label,
          vehicle_label,
          line_items_list,
          line_items_subtotal,
          line_items_tax,
          line_items_total,
          is_return,
          trip_order,
          locations: {
            create: [
              {
                lat: originLat,
                lng: originLng,
                name: originName,
                formatted_address: originFormattedAddress,
                full_name: originFullName,
                place_id: originPlaceId,
                types: originTypes,
                is_origin: true,
                route_order: 0,
              },
              {
                lat: destinationLat,
                lng: destinationLng,
                name: destinationName,
                formatted_address: destinationFormattedAddress,
                full_name: destinationFullName,
                place_id: destinationPlaceId,
                types: destinationTypes,
                is_destination: true,
                route_order: 1,
              },
            ],
          },
        },
      ],
    },
    user: {
      connectOrCreate: {
        where: {
          email_address: emailAddress,
        },
        create: {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          phone_number: phoneNumber,
          email_address: emailAddress,
          conversion: {
            create: {
              utm_term,
              utm_medium,
              utm_source,
              utm_campaign,
              gclid,
            },
          },
        },
      },
    },
    sales_tax: {
      connect: {
        id: salesTaxId,
      },
    },
    vehicle: {
      connect: {
        value: vehicleId,
      },
    },
    service: {
      connect: {
        value: serviceId,
      },
    },
    line_items: {
      connect: [
        { id: lineItemsIdOne },
        { id: lineItemsIdTwo },
        { id: lineItemsIdThree },
      ],
    },
  })
}
