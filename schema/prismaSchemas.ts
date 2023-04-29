import { z } from 'zod'
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
  | Prisma.JsonValue
  | null
  | 'JsonNull'
  | 'DbNull'
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull
  if (v === 'JsonNull') return Prisma.JsonNull
  return v
}

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
])

export type JsonValueType = z.infer<typeof JsonValue>

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v))

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
])

export type InputJsonValueType = z.infer<typeof InputJsonValue>

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum([
  'id',
  'number',
  'created_at',
  'updated_at',
  'company_name',
  'company_address',
  'company_phone',
  'company_email',
  'company_account_number',
])

export const AffiliateScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'name',
  'email_address',
  'phone_number',
  'address',
  'notes',
  'is_driver',
])

export const AirlineScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'iata',
  'icao',
  'callsign',
  'country',
])

export const AirportScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'city',
  'country',
  'lat',
  'lng',
  'timezone',
  'type',
  'iata',
  'icao',
])

export const ConversionScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'utm_term',
  'utm_medium',
  'utm_source',
  'utm_campaign',
  'gclid',
  'source',
  'conversion_name',
  'user_id',
])

export const DriverScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'first_name',
  'last_name',
  'email_address',
  'phone_number',
  'drivers_licence',
  'notes',
])

export const FlightScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'airline_code',
  'airline_name',
  'flight_number',
  'is_active',
  'is_landed',
  'is_arrived',
  'departure_time_actual',
  'arrival_time_actual',
  'trip_id',
  'airline_id',
  'airport_id',
  'departure_time',
  'arrival_time',
])

export const JsonNullValueFilterSchema = z.enum([
  'DbNull',
  'JsonNull',
  'AnyNull',
])

export const JsonNullValueInputSchema = z.enum(['JsonNull'])

export const LAOrdersScalarFieldEnumSchema = z.enum([
  'created_at',
  'conf_num',
  'type',
  'pu_date',
  'pu_time',
  'do_time',
  'duration',
  'account_num',
  'agent_first_name',
  'agent_last_name',
  'alias',
  'o_res_alias',
  'affiliate_first_name',
  'affiliate_last_name',
  'billing_contact',
  'booking_contact',
  'passenger_first_name',
  'passenger_last_name',
  'passenger_email',
  'ref_num',
  'company',
  'routing_details',
  'pax_num',
  'driver',
  'car',
  'vehicle_type',
  'service_type',
  'res_by',
  'date_time_created',
  'status',
  'pmt_method',
  'pmt_status',
  'payments_deposits_excluding_auth_only',
  'pre_authorizations_auth_only',
  'flat_rate',
  'misc_fee',
  'wait_time',
  'per_hour',
  'per_unit',
  'base_rate',
  'cleaning_fee',
  'extra_hrs',
  'extra_stops',
  'reimbursement_for_supplies',
  'fuel_surcharge',
  'meet_and_greet',
  'parking',
  'gratuity',
  'admin_fee',
  'ETR',
  'airport_tol',
  'toll_charge',
  'discount',
  'per_pass',
  'tax',
  'flat',
  'trip_total',
  'payment_date',
  'pu_date_and_time',
  'payment_method',
  'transaction_type',
  'other',
  'payment_id',
  'notes',
  'amount',
])

export const LineItemScalarFieldEnumSchema = z.enum([
  'id',
  'item_number',
  'created_at',
  'updated_at',
  'label',
  'description',
  'is_percentage',
  'is_taxable',
  'is_active',
  'amount',
  'applies_to',
])

export const LineItemToQuoteScalarFieldEnumSchema = z.enum(['A', 'B'])

export const LocationScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'lat',
  'lng',
  'name',
  'formatted_address',
  'full_name',
  'place_id',
  'types',
  'is_origin',
  'is_destination',
  'is_waypoint',
  'trip_id',
  'route_order',
])

export const MessageScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'message',
  'subject',
  'user_id',
  'is_read',
])

export const NullableJsonNullValueInputSchema = z
  .enum(['DbNull', 'JsonNull'])
  .transform((v) => transformJsonNull(v))

export const PaymentScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'is_preauthorized',
  'is_paid',
  'setup_intent',
  'payment_intent',
  'payment_type',
  'notes',
  'trip_id',
  'quote_number',
])

export const PriceScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'line_items_list',
  'line_items_subtotal',
  'line_items_tax',
  'line_items_total',
  'quote_number',
  'trip_id',
])

export const QuoteScalarFieldEnumSchema = z.enum([
  'quote_number',
  'created_at',
  'updated_at',
  'id',
  'selected_hours',
  'selected_passengers',
  'is_round_trip',
  'is_booked',
  'user_id',
  'quote_total',
  'service_number',
  'vehicle_number',
  'reference_value',
  'sales_tax_number',
  'quote_subtotal',
  'quote_tax_total',
  'short_link',
  'combined_line_items',
])

export const SalesTaxScalarFieldEnumSchema = z.enum([
  'id',
  'tax_number',
  'created_at',
  'updated_at',
  'tax_name',
  'amount',
  'region',
  'is_active',
])

export const ServiceScalarFieldEnumSchema = z.enum([
  'id',
  'service_number',
  'created_at',
  'updated_at',
  'label',
  'is_active',
  'is_hourly',
  'limo_anywhere_id',
])

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'session_token',
  'user_id',
  'expires',
])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
])

export const TripScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'pickup_date',
  'pickup_time',
  'distance_text',
  'duration_text',
  'duration_value',
  'distance_value',
  'calculated_distance',
  'quote_number',
  'service_label',
  'vehicle_label',
  'affiliate_payout',
  'is_farmed_out',
  'is_return',
  'notes',
  'trip_order',
  'price_id',
  'carry_on_luggage',
  'large_luggage',
  'meta_data',
])

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'created_at',
  'updated_at',
  'first_name',
  'last_name',
  'email_address',
  'phone_number',
  'phone_number_country',
  'stripe_customer_id',
  'is_customer',
  'account_id',
  'notes',
  'payment_method',
  'meta_data',
  'full_name',
  'email_verified',
  'image',
])

export const VehicleScalarFieldEnumSchema = z.enum([
  'id',
  'vehicle_number',
  'created_at',
  'updated_at',
  'max_passengers',
  'max_luggage',
  'per_km',
  'per_hour',
  'min_hours',
  'min_distance',
  'min_rate',
  'is_active',
  'label',
  'limo_anywhere_id',
  'fasttrak_id',
  'vehicle_image',
])

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  'identifier',
  'token',
  'expires',
  'id',
])
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().uuid(),
  number: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  session_token: z.string(),
  user_id: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SessionPartialSchema = SessionSchema.partial()

export type SessionPartial = z.infer<typeof SessionPartialSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().nullable(),
  stripe_customer_id: z.string().nullable(),
  is_customer: z.boolean(),
  account_id: z.string().nullable(),
  notes: z.string().nullable(),
  payment_method: z.string().nullable(),
  meta_data: NullableJsonValue.optional(),
  full_name: z.string().nullable(),
  email_verified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  message: z.string(),
  subject: z.string(),
  user_id: z.string(),
  is_read: z.boolean(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// MESSAGE PARTIAL SCHEMA
/////////////////////////////////////////

export const MessagePartialSchema = MessageSchema.partial()

export type MessagePartial = z.infer<typeof MessagePartialSchema>

/////////////////////////////////////////
// AFFILIATE SCHEMA
/////////////////////////////////////////

export const AffiliateSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  address: z.string().nullable(),
  notes: z.string().nullable(),
  is_driver: z.boolean(),
})

export type Affiliate = z.infer<typeof AffiliateSchema>

/////////////////////////////////////////
// AFFILIATE PARTIAL SCHEMA
/////////////////////////////////////////

export const AffiliatePartialSchema = AffiliateSchema.partial()

export type AffiliatePartial = z.infer<typeof AffiliatePartialSchema>

/////////////////////////////////////////
// DRIVER SCHEMA
/////////////////////////////////////////

export const DriverSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  first_name: z.string(),
  last_name: z.string().nullable(),
  email_address: z.string().nullable(),
  phone_number: z.string(),
  drivers_licence: z.string().nullable(),
  notes: z.string().nullable(),
})

export type Driver = z.infer<typeof DriverSchema>

/////////////////////////////////////////
// DRIVER PARTIAL SCHEMA
/////////////////////////////////////////

export const DriverPartialSchema = DriverSchema.partial()

export type DriverPartial = z.infer<typeof DriverPartialSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
  id: z.string().cuid(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN PARTIAL SCHEMA
/////////////////////////////////////////

export const VerificationTokenPartialSchema = VerificationTokenSchema.partial()

export type VerificationTokenPartial = z.infer<
  typeof VerificationTokenPartialSchema
>

/////////////////////////////////////////
// CONVERSION SCHEMA
/////////////////////////////////////////

export const ConversionSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date().nullable(),
  utm_term: z.string().nullable(),
  utm_medium: z.string().nullable(),
  utm_source: z.string().nullable(),
  utm_campaign: z.string().nullable(),
  gclid: z.string().nullable(),
  source: z.string().nullable(),
  conversion_name: z.string().nullable(),
  user_id: z.string(),
})

export type Conversion = z.infer<typeof ConversionSchema>

/////////////////////////////////////////
// CONVERSION PARTIAL SCHEMA
/////////////////////////////////////////

export const ConversionPartialSchema = ConversionSchema.partial()

export type ConversionPartial = z.infer<typeof ConversionPartialSchema>

/////////////////////////////////////////
// QUOTE SCHEMA
/////////////////////////////////////////

export const QuoteSchema = z.object({
  quote_number: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  id: z.string().uuid(),
  selected_hours: z.number().int().nullable(),
  selected_passengers: z.number().int(),
  is_round_trip: z.boolean(),
  is_booked: z.boolean(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number().int(),
  vehicle_number: z.number().int(),
  reference_value: z.string().nullable(),
  sales_tax_number: z.number().int(),
  quote_subtotal: z.number().nullable(),
  quote_tax_total: z.number().nullable(),
  short_link: z.string().nullable(),
  combined_line_items: NullableJsonValue.optional(),
})

export type Quote = z.infer<typeof QuoteSchema>

/////////////////////////////////////////
// QUOTE PARTIAL SCHEMA
/////////////////////////////////////////

export const QuotePartialSchema = QuoteSchema.partial()

export type QuotePartial = z.infer<typeof QuotePartialSchema>

/////////////////////////////////////////
// TRIP SCHEMA
/////////////////////////////////////////

export const TripSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  pickup_date: z.string().nullable(),
  pickup_time: z.string().nullable(),
  distance_text: z.string().nullable(),
  duration_text: z.string().nullable(),
  duration_value: z.number().int().nullable(),
  distance_value: z.number().int().nullable(),
  calculated_distance: z.number().nullable(),
  quote_number: z.number().int(),
  service_label: z.string().nullable(),
  vehicle_label: z.string().nullable(),
  affiliate_payout: z.number().nullable(),
  is_farmed_out: z.boolean(),
  is_return: z.boolean(),
  notes: z.string().nullable(),
  trip_order: z.number().int().nullable(),
  price_id: z.string().nullable(),
  carry_on_luggage: z.number().int().nullable(),
  large_luggage: z.number().int().nullable(),
  meta_data: NullableJsonValue.optional(),
})

export type Trip = z.infer<typeof TripSchema>

/////////////////////////////////////////
// TRIP PARTIAL SCHEMA
/////////////////////////////////////////

export const TripPartialSchema = TripSchema.partial()

export type TripPartial = z.infer<typeof TripPartialSchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  formatted_address: z.string(),
  full_name: z.string().nullable(),
  place_id: z.string(),
  types: InputJsonValue,
  is_origin: z.boolean(),
  is_destination: z.boolean(),
  is_waypoint: z.boolean(),
  trip_id: z.string(),
  route_order: z.number().int(),
})

export type Location = z.infer<typeof LocationSchema>

/////////////////////////////////////////
// LOCATION PARTIAL SCHEMA
/////////////////////////////////////////

export const LocationPartialSchema = LocationSchema.partial()

export type LocationPartial = z.infer<typeof LocationPartialSchema>

/////////////////////////////////////////
// PRICE SCHEMA
/////////////////////////////////////////

export const PriceSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  line_items_list: NullableJsonValue.optional(),
  line_items_subtotal: z.number().nullable(),
  line_items_tax: z.number().nullable(),
  line_items_total: z.number().nullable(),
  quote_number: z.number().int().nullable(),
  trip_id: z.string(),
})

export type Price = z.infer<typeof PriceSchema>

/////////////////////////////////////////
// PRICE PARTIAL SCHEMA
/////////////////////////////////////////

export const PricePartialSchema = PriceSchema.partial()

export type PricePartial = z.infer<typeof PricePartialSchema>

/////////////////////////////////////////
// PAYMENT SCHEMA
/////////////////////////////////////////

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  is_preauthorized: z.boolean(),
  is_paid: z.boolean(),
  setup_intent: NullableJsonValue.optional(),
  payment_intent: NullableJsonValue.optional(),
  payment_type: z.string().nullable(),
  notes: z.string().nullable(),
  trip_id: z.string(),
  quote_number: z.number().int().nullable(),
})

export type Payment = z.infer<typeof PaymentSchema>

/////////////////////////////////////////
// PAYMENT PARTIAL SCHEMA
/////////////////////////////////////////

export const PaymentPartialSchema = PaymentSchema.partial()

export type PaymentPartial = z.infer<typeof PaymentPartialSchema>

/////////////////////////////////////////
// FLIGHT SCHEMA
/////////////////////////////////////////

export const FlightSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  airline_code: z.string().nullable(),
  airline_name: z.string().nullable(),
  flight_number: z.string().nullable(),
  is_active: z.boolean(),
  is_landed: z.boolean(),
  is_arrived: z.boolean(),
  departure_time_actual: z.string().nullable(),
  arrival_time_actual: z.string().nullable(),
  trip_id: z.string().nullable(),
  airline_id: z.number().int().nullable(),
  airport_id: z.number().int().nullable(),
  departure_time: z.string().nullable(),
  arrival_time: z.string().nullable(),
})

export type Flight = z.infer<typeof FlightSchema>

/////////////////////////////////////////
// FLIGHT PARTIAL SCHEMA
/////////////////////////////////////////

export const FlightPartialSchema = FlightSchema.partial()

export type FlightPartial = z.infer<typeof FlightPartialSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  id: z.string().uuid(),
  service_number: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  label: z.string(),
  is_active: z.boolean(),
  is_hourly: z.boolean(),
  limo_anywhere_id: z.number().int().nullable(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// SERVICE PARTIAL SCHEMA
/////////////////////////////////////////

export const ServicePartialSchema = ServiceSchema.partial()

export type ServicePartial = z.infer<typeof ServicePartialSchema>

/////////////////////////////////////////
// LINE ITEM SCHEMA
/////////////////////////////////////////

export const LineItemSchema = z.object({
  id: z.string().uuid(),
  item_number: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  label: z.string(),
  description: z.string().nullable(),
  is_percentage: z.boolean(),
  is_taxable: z.boolean(),
  is_active: z.boolean(),
  amount: z.number(),
  applies_to: z.string().nullable(),
})

export type LineItem = z.infer<typeof LineItemSchema>

/////////////////////////////////////////
// LINE ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const LineItemPartialSchema = LineItemSchema.partial()

export type LineItemPartial = z.infer<typeof LineItemPartialSchema>

/////////////////////////////////////////
// SALES TAX SCHEMA
/////////////////////////////////////////

export const SalesTaxSchema = z.object({
  id: z.string().uuid(),
  tax_number: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean(),
})

export type SalesTax = z.infer<typeof SalesTaxSchema>

/////////////////////////////////////////
// SALES TAX PARTIAL SCHEMA
/////////////////////////////////////////

export const SalesTaxPartialSchema = SalesTaxSchema.partial()

export type SalesTaxPartial = z.infer<typeof SalesTaxPartialSchema>

/////////////////////////////////////////
// VEHICLE SCHEMA
/////////////////////////////////////////

export const VehicleSchema = z.object({
  id: z.string().uuid(),
  vehicle_number: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  max_passengers: z.number().int(),
  max_luggage: z.number().int(),
  per_km: z.number(),
  per_hour: z.number(),
  min_hours: z.number().int(),
  min_distance: z.number().int(),
  min_rate: z.number(),
  is_active: z.boolean(),
  label: z.string(),
  limo_anywhere_id: z.number().int().nullable(),
  fasttrak_id: z.number().int().nullable(),
  vehicle_image: z.string().nullable(),
})

export type Vehicle = z.infer<typeof VehicleSchema>

/////////////////////////////////////////
// VEHICLE PARTIAL SCHEMA
/////////////////////////////////////////

export const VehiclePartialSchema = VehicleSchema.partial()

export type VehiclePartial = z.infer<typeof VehiclePartialSchema>

/////////////////////////////////////////
// LINE ITEM TO QUOTE SCHEMA
/////////////////////////////////////////

export const LineItemToQuoteSchema = z.object({
  A: z.string(),
  B: z.number().int(),
})

export type LineItemToQuote = z.infer<typeof LineItemToQuoteSchema>

/////////////////////////////////////////
// LINE ITEM TO QUOTE PARTIAL SCHEMA
/////////////////////////////////////////

export const LineItemToQuotePartialSchema = LineItemToQuoteSchema.partial()

export type LineItemToQuotePartial = z.infer<
  typeof LineItemToQuotePartialSchema
>

/////////////////////////////////////////
// AIRLINE SCHEMA
/////////////////////////////////////////

export const AirlineSchema = z.object({
  id: z.number().int(),
  name: z.string().nullable(),
  iata: z.string().nullable(),
  icao: z.string().nullable(),
  callsign: z.string().nullable(),
  country: z.string().nullable(),
})

export type Airline = z.infer<typeof AirlineSchema>

/////////////////////////////////////////
// AIRLINE PARTIAL SCHEMA
/////////////////////////////////////////

export const AirlinePartialSchema = AirlineSchema.partial()

export type AirlinePartial = z.infer<typeof AirlinePartialSchema>

/////////////////////////////////////////
// AIRPORT SCHEMA
/////////////////////////////////////////

export const AirportSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  lat: z.number(),
  lng: z.number(),
  timezone: z.string(),
  type: z.string(),
  iata: z.string().nullable(),
  icao: z.string().nullable(),
})

export type Airport = z.infer<typeof AirportSchema>

/////////////////////////////////////////
// AIRPORT PARTIAL SCHEMA
/////////////////////////////////////////

export const AirportPartialSchema = AirportSchema.partial()

export type AirportPartial = z.infer<typeof AirportPartialSchema>

/////////////////////////////////////////
// LA ORDERS SCHEMA
/////////////////////////////////////////

export const LAOrdersSchema = z.object({
  created_at: z.coerce.date(),
  conf_num: z.number().int(),
  type: z.string().nullable(),
  pu_date: z.string().nullable(),
  pu_time: z.string().nullable(),
  do_time: z.string().nullable(),
  duration: z.string().nullable(),
  account_num: z.number().int().nullable(),
  agent_first_name: z.string().nullable(),
  agent_last_name: z.string().nullable(),
  alias: z.string().nullable(),
  o_res_alias: z.string().nullable(),
  affiliate_first_name: z.string().nullable(),
  affiliate_last_name: z.string().nullable(),
  billing_contact: z.string().nullable(),
  booking_contact: z.string().nullable(),
  passenger_first_name: z.string().nullable(),
  passenger_last_name: z.string().nullable(),
  passenger_email: z.string().nullable(),
  ref_num: z.string().nullable(),
  company: z.string().nullable(),
  routing_details: z.string().nullable(),
  pax_num: z.number().nullable(),
  driver: z.string().nullable(),
  car: z.string().nullable(),
  vehicle_type: z.string().nullable(),
  service_type: z.string().nullable(),
  res_by: z.string().nullable(),
  date_time_created: z.string().nullable(),
  status: z.string().nullable(),
  pmt_method: z.string().nullable(),
  pmt_status: z.string().nullable(),
  payments_deposits_excluding_auth_only: z.number().nullable(),
  pre_authorizations_auth_only: z.number().nullable(),
  flat_rate: z.number().nullable(),
  misc_fee: z.number().nullable(),
  wait_time: z.number().nullable(),
  per_hour: z.number().nullable(),
  per_unit: z.number().nullable(),
  base_rate: z.number().nullable(),
  cleaning_fee: z.number().nullable(),
  extra_hrs: z.number().int().nullable(),
  extra_stops: z.number().int().nullable(),
  reimbursement_for_supplies: z.number().nullable(),
  fuel_surcharge: z.number().nullable(),
  meet_and_greet: z.number().nullable(),
  parking: z.number().nullable(),
  gratuity: z.number().nullable(),
  admin_fee: z.number().nullable(),
  ETR: z.number().nullable(),
  airport_tol: z.number().nullable(),
  toll_charge: z.number().nullable(),
  discount: z.number().nullable(),
  per_pass: z.number().nullable(),
  tax: z.number().nullable(),
  flat: z.number().nullable(),
  trip_total: z.number().nullable(),
  payment_date: z.string().nullable(),
  pu_date_and_time: z.string().nullable(),
  payment_method: z.string().nullable(),
  transaction_type: z.string().nullable(),
  other: z.string().nullable(),
  payment_id: z.string().nullable(),
  notes: z.string().nullable(),
  amount: z.string().nullable(),
})

export type LAOrders = z.infer<typeof LAOrdersSchema>

/////////////////////////////////////////
// LA ORDERS PARTIAL SCHEMA
/////////////////////////////////////////

export const LAOrdersPartialSchema = LAOrdersSchema.partial()

export type LAOrdersPartial = z.infer<typeof LAOrdersPartialSchema>
