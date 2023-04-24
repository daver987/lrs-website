import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','number','created_at','updated_at','company_name','company_address','company_phone','company_email','company_account_number']);

export const AffiliateScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','name','email_address','phone_number','address','notes','is_driver']);

export const AirlineScalarFieldEnumSchema = z.enum(['id','name','iata','icao','callsign','country']);

export const AirportScalarFieldEnumSchema = z.enum(['id','name','city','country','lat','lng','timezone','type','iata','icao']);

export const ConversionScalarFieldEnumSchema = z.enum(['id','created_at','utm_term','utm_medium','utm_source','utm_campaign','gclid','source','conversion_name','user_id']);

export const DriverScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','first_name','last_name','email_address','phone_number','drivers_licence','notes']);

export const FlightScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','airline_code','airline_name','flight_number','is_active','is_landed','is_arrived','departure_time_actual','arrival_time_actual','trip_id','airline_id','airport_id','departure_time','arrival_time']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const LineItemScalarFieldEnumSchema = z.enum(['id','item_number','created_at','updated_at','label','description','is_percentage','is_taxable','is_active','amount','applies_to']);

export const LineItemToQuoteScalarFieldEnumSchema = z.enum(['A','B']);

export const LocationScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','lat','lng','name','formatted_address','full_name','place_id','types','is_origin','is_destination','is_waypoint','trip_id','route_order']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const PaymentScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','is_preauthorized','is_paid','setup_intent','payment_intent','payment_type','notes','trip_id','quote_number']);

export const PriceScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','line_items_list','line_items_subtotal','line_items_tax','line_items_total','quote_number','trip_id']);

export const QuoteScalarFieldEnumSchema = z.enum(['quote_number','created_at','updated_at','id','selected_hours','selected_passengers','is_round_trip','is_booked','user_id','quote_total','service_number','vehicle_number','reference_value','sales_tax_number','quote_subtotal','quote_tax_total','short_link','combined_line_items']);

export const SalesTaxScalarFieldEnumSchema = z.enum(['id','tax_number','created_at','updated_at','tax_name','amount','region','is_active']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','service_number','created_at','updated_at','label','is_active','is_hourly','limo_anywhere_id']);

export const SessionScalarFieldEnumSchema = z.enum(['id','session_token','user_id','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TripScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','pickup_date','pickup_time','distance_text','duration_text','duration_value','distance_value','calculated_distance','quote_number','service_label','vehicle_label','affiliate_payout','is_farmed_out','is_return','notes','trip_order','price_id','carry_on_luggage','large_luggage','meta_data']);

export const UserScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','first_name','last_name','email_address','phone_number','phone_number_country','stripe_customer_id','is_customer','account_id','notes','payment_method','meta_data','full_name','email_verified','image']);

export const VehicleScalarFieldEnumSchema = z.enum(['id','vehicle_number','created_at','updated_at','max_passengers','max_luggage','per_km','per_hour','min_hours','min_distance','min_rate','is_active','label','limo_anywhere_id','fasttrak_id','vehicle_image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires','id']);
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

export type VerificationTokenPartial = z.infer<typeof VerificationTokenPartialSchema>

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

export type LineItemToQuotePartial = z.infer<typeof LineItemToQuotePartialSchema>

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
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountCountOutputTypeArgsSchema: z.ZodType<Prisma.AccountCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AccountCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AccountCountOutputTypeSelectSchema: z.ZodType<Prisma.AccountCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  number: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  company_name: z.boolean().optional(),
  company_address: z.boolean().optional(),
  company_phone: z.boolean().optional(),
  company_email: z.boolean().optional(),
  company_account_number: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  session_token: z.boolean().optional(),
  user_id: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  conversion: z.union([z.boolean(),z.lazy(() => ConversionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
  quotes: z.boolean().optional(),
  conversion: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email_address: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  phone_number_country: z.boolean().optional(),
  stripe_customer_id: z.boolean().optional(),
  is_customer: z.boolean().optional(),
  account_id: z.boolean().optional(),
  notes: z.boolean().optional(),
  payment_method: z.boolean().optional(),
  meta_data: z.boolean().optional(),
  full_name: z.boolean().optional(),
  email_verified: z.boolean().optional(),
  image: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  conversion: z.union([z.boolean(),z.lazy(() => ConversionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AFFILIATE
//------------------------------------------------------

export const AffiliateSelectSchema: z.ZodType<Prisma.AffiliateSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  name: z.boolean().optional(),
  email_address: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  address: z.boolean().optional(),
  notes: z.boolean().optional(),
  is_driver: z.boolean().optional(),
}).strict()

// DRIVER
//------------------------------------------------------

export const DriverSelectSchema: z.ZodType<Prisma.DriverSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email_address: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  drivers_licence: z.boolean().optional(),
  notes: z.boolean().optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
  id: z.boolean().optional(),
}).strict()

// CONVERSION
//------------------------------------------------------

export const ConversionIncludeSchema: z.ZodType<Prisma.ConversionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ConversionArgsSchema: z.ZodType<Prisma.ConversionArgs> = z.object({
  select: z.lazy(() => ConversionSelectSchema).optional(),
  include: z.lazy(() => ConversionIncludeSchema).optional(),
}).strict();

export const ConversionSelectSchema: z.ZodType<Prisma.ConversionSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  utm_term: z.boolean().optional(),
  utm_medium: z.boolean().optional(),
  utm_source: z.boolean().optional(),
  utm_campaign: z.boolean().optional(),
  gclid: z.boolean().optional(),
  source: z.boolean().optional(),
  conversion_name: z.boolean().optional(),
  user_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// QUOTE
//------------------------------------------------------

export const QuoteIncludeSchema: z.ZodType<Prisma.QuoteInclude> = z.object({
  pricing: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sales_tax: z.union([z.boolean(),z.lazy(() => SalesTaxArgsSchema)]).optional(),
  line_items: z.union([z.boolean(),z.lazy(() => LineItemFindManyArgsSchema)]).optional(),
  trips: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuoteCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const QuoteArgsSchema: z.ZodType<Prisma.QuoteArgs> = z.object({
  select: z.lazy(() => QuoteSelectSchema).optional(),
  include: z.lazy(() => QuoteIncludeSchema).optional(),
}).strict();

export const QuoteCountOutputTypeArgsSchema: z.ZodType<Prisma.QuoteCountOutputTypeArgs> = z.object({
  select: z.lazy(() => QuoteCountOutputTypeSelectSchema).nullish(),
}).strict();

export const QuoteCountOutputTypeSelectSchema: z.ZodType<Prisma.QuoteCountOutputTypeSelect> = z.object({
  pricing: z.boolean().optional(),
  line_items: z.boolean().optional(),
  trips: z.boolean().optional(),
  payment: z.boolean().optional(),
}).strict();

export const QuoteSelectSchema: z.ZodType<Prisma.QuoteSelect> = z.object({
  quote_number: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  id: z.boolean().optional(),
  selected_hours: z.boolean().optional(),
  selected_passengers: z.boolean().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.boolean().optional(),
  quote_total: z.boolean().optional(),
  service_number: z.boolean().optional(),
  vehicle_number: z.boolean().optional(),
  reference_value: z.boolean().optional(),
  sales_tax_number: z.boolean().optional(),
  quote_subtotal: z.boolean().optional(),
  quote_tax_total: z.boolean().optional(),
  short_link: z.boolean().optional(),
  combined_line_items: z.boolean().optional(),
  pricing: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sales_tax: z.union([z.boolean(),z.lazy(() => SalesTaxArgsSchema)]).optional(),
  line_items: z.union([z.boolean(),z.lazy(() => LineItemFindManyArgsSchema)]).optional(),
  trips: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuoteCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRIP
//------------------------------------------------------

export const TripIncludeSchema: z.ZodType<Prisma.TripInclude> = z.object({
  price: z.union([z.boolean(),z.lazy(() => PriceArgsSchema)]).optional(),
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
  locations: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  flight: z.union([z.boolean(),z.lazy(() => FlightArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TripArgsSchema: z.ZodType<Prisma.TripArgs> = z.object({
  select: z.lazy(() => TripSelectSchema).optional(),
  include: z.lazy(() => TripIncludeSchema).optional(),
}).strict();

export const TripCountOutputTypeArgsSchema: z.ZodType<Prisma.TripCountOutputTypeArgs> = z.object({
  select: z.lazy(() => TripCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TripCountOutputTypeSelectSchema: z.ZodType<Prisma.TripCountOutputTypeSelect> = z.object({
  locations: z.boolean().optional(),
}).strict();

export const TripSelectSchema: z.ZodType<Prisma.TripSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  pickup_date: z.boolean().optional(),
  pickup_time: z.boolean().optional(),
  distance_text: z.boolean().optional(),
  duration_text: z.boolean().optional(),
  duration_value: z.boolean().optional(),
  distance_value: z.boolean().optional(),
  calculated_distance: z.boolean().optional(),
  quote_number: z.boolean().optional(),
  service_label: z.boolean().optional(),
  vehicle_label: z.boolean().optional(),
  affiliate_payout: z.boolean().optional(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.boolean().optional(),
  trip_order: z.boolean().optional(),
  price_id: z.boolean().optional(),
  carry_on_luggage: z.boolean().optional(),
  large_luggage: z.boolean().optional(),
  meta_data: z.boolean().optional(),
  price: z.union([z.boolean(),z.lazy(() => PriceArgsSchema)]).optional(),
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
  locations: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  flight: z.union([z.boolean(),z.lazy(() => FlightArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOCATION
//------------------------------------------------------

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const LocationArgsSchema: z.ZodType<Prisma.LocationArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  lat: z.boolean().optional(),
  lng: z.boolean().optional(),
  name: z.boolean().optional(),
  formatted_address: z.boolean().optional(),
  full_name: z.boolean().optional(),
  place_id: z.boolean().optional(),
  types: z.boolean().optional(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  trip_id: z.boolean().optional(),
  route_order: z.boolean().optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// PRICE
//------------------------------------------------------

export const PriceIncludeSchema: z.ZodType<Prisma.PriceInclude> = z.object({
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const PriceArgsSchema: z.ZodType<Prisma.PriceArgs> = z.object({
  select: z.lazy(() => PriceSelectSchema).optional(),
  include: z.lazy(() => PriceIncludeSchema).optional(),
}).strict();

export const PriceSelectSchema: z.ZodType<Prisma.PriceSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  line_items_list: z.boolean().optional(),
  line_items_subtotal: z.boolean().optional(),
  line_items_tax: z.boolean().optional(),
  line_items_total: z.boolean().optional(),
  quote_number: z.boolean().optional(),
  trip_id: z.boolean().optional(),
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// PAYMENT
//------------------------------------------------------

export const PaymentIncludeSchema: z.ZodType<Prisma.PaymentInclude> = z.object({
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
}).strict()

export const PaymentArgsSchema: z.ZodType<Prisma.PaymentArgs> = z.object({
  select: z.lazy(() => PaymentSelectSchema).optional(),
  include: z.lazy(() => PaymentIncludeSchema).optional(),
}).strict();

export const PaymentSelectSchema: z.ZodType<Prisma.PaymentSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.boolean().optional(),
  payment_intent: z.boolean().optional(),
  payment_type: z.boolean().optional(),
  notes: z.boolean().optional(),
  trip_id: z.boolean().optional(),
  quote_number: z.boolean().optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
}).strict()

// FLIGHT
//------------------------------------------------------

export const FlightIncludeSchema: z.ZodType<Prisma.FlightInclude> = z.object({
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
  airline: z.union([z.boolean(),z.lazy(() => AirlineArgsSchema)]).optional(),
  airport: z.union([z.boolean(),z.lazy(() => AirportArgsSchema)]).optional(),
}).strict()

export const FlightArgsSchema: z.ZodType<Prisma.FlightArgs> = z.object({
  select: z.lazy(() => FlightSelectSchema).optional(),
  include: z.lazy(() => FlightIncludeSchema).optional(),
}).strict();

export const FlightSelectSchema: z.ZodType<Prisma.FlightSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  airline_code: z.boolean().optional(),
  airline_name: z.boolean().optional(),
  flight_number: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.boolean().optional(),
  arrival_time_actual: z.boolean().optional(),
  trip_id: z.boolean().optional(),
  airline_id: z.boolean().optional(),
  airport_id: z.boolean().optional(),
  departure_time: z.boolean().optional(),
  arrival_time: z.boolean().optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
  airline: z.union([z.boolean(),z.lazy(() => AirlineArgsSchema)]).optional(),
  airport: z.union([z.boolean(),z.lazy(() => AirportArgsSchema)]).optional(),
}).strict()

// SERVICE
//------------------------------------------------------

export const ServiceIncludeSchema: z.ZodType<Prisma.ServiceInclude> = z.object({
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ServiceArgsSchema: z.ZodType<Prisma.ServiceArgs> = z.object({
  select: z.lazy(() => ServiceSelectSchema).optional(),
  include: z.lazy(() => ServiceIncludeSchema).optional(),
}).strict();

export const ServiceCountOutputTypeArgsSchema: z.ZodType<Prisma.ServiceCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ServiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ServiceCountOutputTypeSelectSchema: z.ZodType<Prisma.ServiceCountOutputTypeSelect> = z.object({
  quotes: z.boolean().optional(),
}).strict();

export const ServiceSelectSchema: z.ZodType<Prisma.ServiceSelect> = z.object({
  id: z.boolean().optional(),
  service_number: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  label: z.boolean().optional(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.boolean().optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LINE ITEM
//------------------------------------------------------

export const LineItemIncludeSchema: z.ZodType<Prisma.LineItemInclude> = z.object({
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LineItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LineItemArgsSchema: z.ZodType<Prisma.LineItemArgs> = z.object({
  select: z.lazy(() => LineItemSelectSchema).optional(),
  include: z.lazy(() => LineItemIncludeSchema).optional(),
}).strict();

export const LineItemCountOutputTypeArgsSchema: z.ZodType<Prisma.LineItemCountOutputTypeArgs> = z.object({
  select: z.lazy(() => LineItemCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LineItemCountOutputTypeSelectSchema: z.ZodType<Prisma.LineItemCountOutputTypeSelect> = z.object({
  quotes: z.boolean().optional(),
}).strict();

export const LineItemSelectSchema: z.ZodType<Prisma.LineItemSelect> = z.object({
  id: z.boolean().optional(),
  item_number: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  label: z.boolean().optional(),
  description: z.boolean().optional(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.boolean().optional(),
  applies_to: z.boolean().optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LineItemCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SALES TAX
//------------------------------------------------------

export const SalesTaxIncludeSchema: z.ZodType<Prisma.SalesTaxInclude> = z.object({
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SalesTaxCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SalesTaxArgsSchema: z.ZodType<Prisma.SalesTaxArgs> = z.object({
  select: z.lazy(() => SalesTaxSelectSchema).optional(),
  include: z.lazy(() => SalesTaxIncludeSchema).optional(),
}).strict();

export const SalesTaxCountOutputTypeArgsSchema: z.ZodType<Prisma.SalesTaxCountOutputTypeArgs> = z.object({
  select: z.lazy(() => SalesTaxCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SalesTaxCountOutputTypeSelectSchema: z.ZodType<Prisma.SalesTaxCountOutputTypeSelect> = z.object({
  quotes: z.boolean().optional(),
}).strict();

export const SalesTaxSelectSchema: z.ZodType<Prisma.SalesTaxSelect> = z.object({
  id: z.boolean().optional(),
  tax_number: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  tax_name: z.boolean().optional(),
  amount: z.boolean().optional(),
  region: z.boolean().optional(),
  is_active: z.boolean().optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SalesTaxCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VEHICLE
//------------------------------------------------------

export const VehicleIncludeSchema: z.ZodType<Prisma.VehicleInclude> = z.object({
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VehicleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const VehicleArgsSchema: z.ZodType<Prisma.VehicleArgs> = z.object({
  select: z.lazy(() => VehicleSelectSchema).optional(),
  include: z.lazy(() => VehicleIncludeSchema).optional(),
}).strict();

export const VehicleCountOutputTypeArgsSchema: z.ZodType<Prisma.VehicleCountOutputTypeArgs> = z.object({
  select: z.lazy(() => VehicleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VehicleCountOutputTypeSelectSchema: z.ZodType<Prisma.VehicleCountOutputTypeSelect> = z.object({
  quotes: z.boolean().optional(),
}).strict();

export const VehicleSelectSchema: z.ZodType<Prisma.VehicleSelect> = z.object({
  id: z.boolean().optional(),
  vehicle_number: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  max_passengers: z.boolean().optional(),
  max_luggage: z.boolean().optional(),
  per_km: z.boolean().optional(),
  per_hour: z.boolean().optional(),
  min_hours: z.boolean().optional(),
  min_distance: z.boolean().optional(),
  min_rate: z.boolean().optional(),
  is_active: z.boolean().optional(),
  label: z.boolean().optional(),
  limo_anywhere_id: z.boolean().optional(),
  fasttrak_id: z.boolean().optional(),
  vehicle_image: z.boolean().optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VehicleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LINE ITEM TO QUOTE
//------------------------------------------------------

export const LineItemToQuoteSelectSchema: z.ZodType<Prisma.LineItemToQuoteSelect> = z.object({
  A: z.boolean().optional(),
  B: z.boolean().optional(),
}).strict()

// AIRLINE
//------------------------------------------------------

export const AirlineIncludeSchema: z.ZodType<Prisma.AirlineInclude> = z.object({
  flight: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AirlineCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AirlineArgsSchema: z.ZodType<Prisma.AirlineArgs> = z.object({
  select: z.lazy(() => AirlineSelectSchema).optional(),
  include: z.lazy(() => AirlineIncludeSchema).optional(),
}).strict();

export const AirlineCountOutputTypeArgsSchema: z.ZodType<Prisma.AirlineCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AirlineCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AirlineCountOutputTypeSelectSchema: z.ZodType<Prisma.AirlineCountOutputTypeSelect> = z.object({
  flight: z.boolean().optional(),
}).strict();

export const AirlineSelectSchema: z.ZodType<Prisma.AirlineSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  iata: z.boolean().optional(),
  icao: z.boolean().optional(),
  callsign: z.boolean().optional(),
  country: z.boolean().optional(),
  flight: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AirlineCountOutputTypeArgsSchema)]).optional(),
}).strict()

// AIRPORT
//------------------------------------------------------

export const AirportIncludeSchema: z.ZodType<Prisma.AirportInclude> = z.object({
  flight: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AirportCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AirportArgsSchema: z.ZodType<Prisma.AirportArgs> = z.object({
  select: z.lazy(() => AirportSelectSchema).optional(),
  include: z.lazy(() => AirportIncludeSchema).optional(),
}).strict();

export const AirportCountOutputTypeArgsSchema: z.ZodType<Prisma.AirportCountOutputTypeArgs> = z.object({
  select: z.lazy(() => AirportCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AirportCountOutputTypeSelectSchema: z.ZodType<Prisma.AirportCountOutputTypeSelect> = z.object({
  flight: z.boolean().optional(),
}).strict();

export const AirportSelectSchema: z.ZodType<Prisma.AirportSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  city: z.boolean().optional(),
  country: z.boolean().optional(),
  lat: z.boolean().optional(),
  lng: z.boolean().optional(),
  timezone: z.boolean().optional(),
  type: z.boolean().optional(),
  iata: z.boolean().optional(),
  icao: z.boolean().optional(),
  flight: z.union([z.boolean(),z.lazy(() => FlightFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AirportCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  company_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  company_email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_account_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  number: z.number().int().optional()
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  company_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company_phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  company_email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company_account_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string().optional()
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  session_token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number_country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_customer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  account_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  payment_method: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableFilterSchema).optional(),
  full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email_verified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional(),
  account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  conversion: z.lazy(() => ConversionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  phone_number_country: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  payment_method: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  email_verified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional(),
  account: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  conversion: z.lazy(() => ConversionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  email_address: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  phone_number_country: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  payment_method: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  email_verified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number_country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_customer: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  account_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  payment_method: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  full_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email_verified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AffiliateWhereInputSchema: z.ZodType<Prisma.AffiliateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AffiliateWhereInputSchema),z.lazy(() => AffiliateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AffiliateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AffiliateWhereInputSchema),z.lazy(() => AffiliateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_driver: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const AffiliateOrderByWithRelationInputSchema: z.ZodType<Prisma.AffiliateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  is_driver: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AffiliateWhereUniqueInputSchema: z.ZodType<Prisma.AffiliateWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const AffiliateOrderByWithAggregationInputSchema: z.ZodType<Prisma.AffiliateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  is_driver: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AffiliateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AffiliateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AffiliateMinOrderByAggregateInputSchema).optional()
}).strict();

export const AffiliateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AffiliateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AffiliateScalarWhereWithAggregatesInputSchema),z.lazy(() => AffiliateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AffiliateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AffiliateScalarWhereWithAggregatesInputSchema),z.lazy(() => AffiliateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_driver: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const DriverWhereInputSchema: z.ZodType<Prisma.DriverWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DriverWhereInputSchema),z.lazy(() => DriverWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DriverWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DriverWhereInputSchema),z.lazy(() => DriverWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email_address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  drivers_licence: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const DriverOrderByWithRelationInputSchema: z.ZodType<Prisma.DriverOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  drivers_licence: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DriverWhereUniqueInputSchema: z.ZodType<Prisma.DriverWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const DriverOrderByWithAggregationInputSchema: z.ZodType<Prisma.DriverOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  drivers_licence: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DriverCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DriverMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DriverMinOrderByAggregateInputSchema).optional()
}).strict();

export const DriverScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DriverScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DriverScalarWhereWithAggregatesInputSchema),z.lazy(() => DriverScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DriverScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DriverScalarWhereWithAggregatesInputSchema),z.lazy(() => DriverScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email_address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  drivers_licence: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  id: z.string().cuid().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional()
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ConversionWhereInputSchema: z.ZodType<Prisma.ConversionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversionWhereInputSchema),z.lazy(() => ConversionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversionWhereInputSchema),z.lazy(() => ConversionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  utm_medium: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  utm_source: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  utm_campaign: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gclid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  source: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  conversion_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ConversionOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ConversionWhereUniqueInputSchema: z.ZodType<Prisma.ConversionWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const ConversionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConversionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConversionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConversionMinOrderByAggregateInputSchema).optional()
}).strict();

export const ConversionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  utm_medium: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  utm_source: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  utm_campaign: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  gclid: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  source: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  conversion_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const QuoteWhereInputSchema: z.ZodType<Prisma.QuoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuoteWhereInputSchema),z.lazy(() => QuoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuoteWhereInputSchema),z.lazy(() => QuoteWhereInputSchema).array() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  selected_hours: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  selected_passengers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  is_round_trip: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_booked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quote_total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  service_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  vehicle_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reference_value: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sales_tax_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quote_subtotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quote_tax_total: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  short_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  combined_line_items: z.lazy(() => JsonNullableFilterSchema).optional(),
  pricing: z.lazy(() => PriceListRelationFilterSchema).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
  vehicle: z.union([ z.lazy(() => VehicleRelationFilterSchema),z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  sales_tax: z.union([ z.lazy(() => SalesTaxRelationFilterSchema),z.lazy(() => SalesTaxWhereInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemListRelationFilterSchema).optional(),
  trips: z.lazy(() => TripListRelationFilterSchema).optional(),
  payment: z.lazy(() => PaymentListRelationFilterSchema).optional()
}).strict();

export const QuoteOrderByWithRelationInputSchema: z.ZodType<Prisma.QuoteOrderByWithRelationInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  quote_total: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  reference_value: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_number: z.lazy(() => SortOrderSchema).optional(),
  quote_subtotal: z.lazy(() => SortOrderSchema).optional(),
  quote_tax_total: z.lazy(() => SortOrderSchema).optional(),
  short_link: z.lazy(() => SortOrderSchema).optional(),
  combined_line_items: z.lazy(() => SortOrderSchema).optional(),
  pricing: z.lazy(() => PriceOrderByRelationAggregateInputSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional(),
  vehicle: z.lazy(() => VehicleOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxOrderByWithRelationInputSchema).optional(),
  line_items: z.lazy(() => LineItemOrderByRelationAggregateInputSchema).optional(),
  trips: z.lazy(() => TripOrderByRelationAggregateInputSchema).optional(),
  payment: z.lazy(() => PaymentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const QuoteWhereUniqueInputSchema: z.ZodType<Prisma.QuoteWhereUniqueInput> = z.object({
  quote_number: z.number().int().optional(),
  id: z.string().uuid().optional()
}).strict();

export const QuoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.QuoteOrderByWithAggregationInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  quote_total: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  reference_value: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_number: z.lazy(() => SortOrderSchema).optional(),
  quote_subtotal: z.lazy(() => SortOrderSchema).optional(),
  quote_tax_total: z.lazy(() => SortOrderSchema).optional(),
  short_link: z.lazy(() => SortOrderSchema).optional(),
  combined_line_items: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QuoteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => QuoteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QuoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QuoteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => QuoteSumOrderByAggregateInputSchema).optional()
}).strict();

export const QuoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QuoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema),z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema),z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  selected_hours: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  selected_passengers: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  is_round_trip: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_booked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quote_total: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  service_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  vehicle_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reference_value: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sales_tax_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  quote_subtotal: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  quote_tax_total: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  short_link: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  combined_line_items: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const TripWhereInputSchema: z.ZodType<Prisma.TripWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pickup_date: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pickup_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  distance_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration_value: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  distance_value: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  calculated_distance: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  service_label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  vehicle_label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  affiliate_payout: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  is_farmed_out: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_return: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip_order: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  price_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  carry_on_luggage: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  large_luggage: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableFilterSchema).optional(),
  price: z.union([ z.lazy(() => PriceRelationFilterSchema),z.lazy(() => PriceWhereInputSchema) ]).optional().nullable(),
  quote: z.union([ z.lazy(() => QuoteRelationFilterSchema),z.lazy(() => QuoteWhereInputSchema) ]).optional(),
  payment: z.union([ z.lazy(() => PaymentRelationFilterSchema),z.lazy(() => PaymentWhereInputSchema) ]).optional().nullable(),
  locations: z.lazy(() => LocationListRelationFilterSchema).optional(),
  flight: z.union([ z.lazy(() => FlightRelationFilterSchema),z.lazy(() => FlightWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TripOrderByWithRelationInputSchema: z.ZodType<Prisma.TripOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  distance_text: z.lazy(() => SortOrderSchema).optional(),
  duration_text: z.lazy(() => SortOrderSchema).optional(),
  duration_value: z.lazy(() => SortOrderSchema).optional(),
  distance_value: z.lazy(() => SortOrderSchema).optional(),
  calculated_distance: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  service_label: z.lazy(() => SortOrderSchema).optional(),
  vehicle_label: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_order: z.lazy(() => SortOrderSchema).optional(),
  price_id: z.lazy(() => SortOrderSchema).optional(),
  carry_on_luggage: z.lazy(() => SortOrderSchema).optional(),
  large_luggage: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => PriceOrderByWithRelationInputSchema).optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputSchema).optional(),
  payment: z.lazy(() => PaymentOrderByWithRelationInputSchema).optional(),
  locations: z.lazy(() => LocationOrderByRelationAggregateInputSchema).optional(),
  flight: z.lazy(() => FlightOrderByWithRelationInputSchema).optional()
}).strict();

export const TripWhereUniqueInputSchema: z.ZodType<Prisma.TripWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const TripOrderByWithAggregationInputSchema: z.ZodType<Prisma.TripOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  distance_text: z.lazy(() => SortOrderSchema).optional(),
  duration_text: z.lazy(() => SortOrderSchema).optional(),
  duration_value: z.lazy(() => SortOrderSchema).optional(),
  distance_value: z.lazy(() => SortOrderSchema).optional(),
  calculated_distance: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  service_label: z.lazy(() => SortOrderSchema).optional(),
  vehicle_label: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_order: z.lazy(() => SortOrderSchema).optional(),
  price_id: z.lazy(() => SortOrderSchema).optional(),
  carry_on_luggage: z.lazy(() => SortOrderSchema).optional(),
  large_luggage: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TripCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TripAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TripMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TripMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TripSumOrderByAggregateInputSchema).optional()
}).strict();

export const TripScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TripScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pickup_date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  pickup_time: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  distance_text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  duration_text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  duration_value: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  distance_value: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  calculated_distance: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  service_label: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  vehicle_label: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  affiliate_payout: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  is_farmed_out: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_return: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  trip_order: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  price_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  carry_on_luggage: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  large_luggage: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  formatted_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  types: z.lazy(() => JsonFilterSchema).optional(),
  is_origin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_destination: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_waypoint: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  trip_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  route_order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  trip: z.union([ z.lazy(() => TripRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  formatted_address: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  types: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  route_order: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional()
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  formatted_address: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  types: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  route_order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  formatted_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  full_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  types: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  is_origin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_destination: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_waypoint: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  trip_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  route_order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PriceWhereInputSchema: z.ZodType<Prisma.PriceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  line_items_list: z.lazy(() => JsonNullableFilterSchema).optional(),
  line_items_subtotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_tax: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_total: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quote: z.union([ z.lazy(() => QuoteRelationFilterSchema),z.lazy(() => QuoteWhereInputSchema) ]).optional().nullable(),
  trip: z.union([ z.lazy(() => TripRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict();

export const PriceOrderByWithRelationInputSchema: z.ZodType<Prisma.PriceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  line_items_list: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional()
}).strict();

export const PriceWhereUniqueInputSchema: z.ZodType<Prisma.PriceWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  trip_id: z.string().optional()
}).strict();

export const PriceOrderByWithAggregationInputSchema: z.ZodType<Prisma.PriceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  line_items_list: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PriceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PriceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PriceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PriceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PriceSumOrderByAggregateInputSchema).optional()
}).strict();

export const PriceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PriceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema),z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema),z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  line_items_list: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  line_items_subtotal: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  line_items_tax: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  line_items_total: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PaymentWhereInputSchema: z.ZodType<Prisma.PaymentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  is_preauthorized: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_paid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  setup_intent: z.lazy(() => JsonNullableFilterSchema).optional(),
  payment_intent: z.lazy(() => JsonNullableFilterSchema).optional(),
  payment_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  trip: z.union([ z.lazy(() => TripRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
  quote: z.union([ z.lazy(() => QuoteRelationFilterSchema),z.lazy(() => QuoteWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PaymentOrderByWithRelationInputSchema: z.ZodType<Prisma.PaymentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_preauthorized: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  setup_intent: z.lazy(() => SortOrderSchema).optional(),
  payment_intent: z.lazy(() => SortOrderSchema).optional(),
  payment_type: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputSchema).optional()
}).strict();

export const PaymentWhereUniqueInputSchema: z.ZodType<Prisma.PaymentWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  trip_id: z.string().optional()
}).strict();

export const PaymentOrderByWithAggregationInputSchema: z.ZodType<Prisma.PaymentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_preauthorized: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  setup_intent: z.lazy(() => SortOrderSchema).optional(),
  payment_intent: z.lazy(() => SortOrderSchema).optional(),
  payment_type: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PaymentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PaymentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PaymentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PaymentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PaymentSumOrderByAggregateInputSchema).optional()
}).strict();

export const PaymentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PaymentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  is_preauthorized: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_paid: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  setup_intent: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  payment_intent: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  payment_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const FlightWhereInputSchema: z.ZodType<Prisma.FlightWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  airline_code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  airline_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flight_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_landed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_arrived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  departure_time_actual: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  arrival_time_actual: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  airline_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  airport_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  departure_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  arrival_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip: z.union([ z.lazy(() => TripRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional().nullable(),
  airline: z.union([ z.lazy(() => AirlineRelationFilterSchema),z.lazy(() => AirlineWhereInputSchema) ]).optional().nullable(),
  airport: z.union([ z.lazy(() => AirportRelationFilterSchema),z.lazy(() => AirportWhereInputSchema) ]).optional().nullable(),
}).strict();

export const FlightOrderByWithRelationInputSchema: z.ZodType<Prisma.FlightOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  airline_code: z.lazy(() => SortOrderSchema).optional(),
  airline_name: z.lazy(() => SortOrderSchema).optional(),
  flight_number: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_landed: z.lazy(() => SortOrderSchema).optional(),
  is_arrived: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  airline_id: z.lazy(() => SortOrderSchema).optional(),
  airport_id: z.lazy(() => SortOrderSchema).optional(),
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
  airline: z.lazy(() => AirlineOrderByWithRelationInputSchema).optional(),
  airport: z.lazy(() => AirportOrderByWithRelationInputSchema).optional()
}).strict();

export const FlightWhereUniqueInputSchema: z.ZodType<Prisma.FlightWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  trip_id: z.string().optional()
}).strict();

export const FlightOrderByWithAggregationInputSchema: z.ZodType<Prisma.FlightOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  airline_code: z.lazy(() => SortOrderSchema).optional(),
  airline_name: z.lazy(() => SortOrderSchema).optional(),
  flight_number: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_landed: z.lazy(() => SortOrderSchema).optional(),
  is_arrived: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  airline_id: z.lazy(() => SortOrderSchema).optional(),
  airport_id: z.lazy(() => SortOrderSchema).optional(),
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FlightCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FlightAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FlightMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FlightMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FlightSumOrderByAggregateInputSchema).optional()
}).strict();

export const FlightScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FlightScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FlightScalarWhereWithAggregatesInputSchema),z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightScalarWhereWithAggregatesInputSchema),z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  airline_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  airline_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flight_number: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_landed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_arrived: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  departure_time_actual: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  arrival_time_actual: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  airline_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  airport_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  departure_time: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  arrival_time: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  service_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_hourly: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  limo_anywhere_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional()
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  service_number: z.number().int().optional()
}).strict();

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  service_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_hourly: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  limo_anywhere_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const LineItemWhereInputSchema: z.ZodType<Prisma.LineItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LineItemWhereInputSchema),z.lazy(() => LineItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LineItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LineItemWhereInputSchema),z.lazy(() => LineItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  item_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_percentage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_taxable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  applies_to: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional()
}).strict();

export const LineItemOrderByWithRelationInputSchema: z.ZodType<Prisma.LineItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  item_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LineItemWhereUniqueInputSchema: z.ZodType<Prisma.LineItemWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  item_number: z.number().int().optional()
}).strict();

export const LineItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.LineItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  item_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LineItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LineItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LineItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LineItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LineItemSumOrderByAggregateInputSchema).optional()
}).strict();

export const LineItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LineItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema),z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema),z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  item_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_percentage: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_taxable: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  applies_to: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SalesTaxWhereInputSchema: z.ZodType<Prisma.SalesTaxWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SalesTaxWhereInputSchema),z.lazy(() => SalesTaxWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesTaxWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesTaxWhereInputSchema),z.lazy(() => SalesTaxWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tax_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tax_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  region: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional()
}).strict();

export const SalesTaxOrderByWithRelationInputSchema: z.ZodType<Prisma.SalesTaxOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tax_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SalesTaxWhereUniqueInputSchema: z.ZodType<Prisma.SalesTaxWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  tax_number: z.number().int().optional()
}).strict();

export const SalesTaxOrderByWithAggregationInputSchema: z.ZodType<Prisma.SalesTaxOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tax_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SalesTaxCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SalesTaxAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SalesTaxMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SalesTaxMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SalesTaxSumOrderByAggregateInputSchema).optional()
}).strict();

export const SalesTaxScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SalesTaxScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tax_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  tax_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  region: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const VehicleWhereInputSchema: z.ZodType<Prisma.VehicleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VehicleWhereInputSchema),z.lazy(() => VehicleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleWhereInputSchema),z.lazy(() => VehicleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vehicle_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  max_passengers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  max_luggage: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  per_km: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  per_hour: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  min_hours: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  min_distance: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  min_rate: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  limo_anywhere_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  fasttrak_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  vehicle_image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional()
}).strict();

export const VehicleOrderByWithRelationInputSchema: z.ZodType<Prisma.VehicleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  fasttrak_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_image: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional()
}).strict();

export const VehicleWhereUniqueInputSchema: z.ZodType<Prisma.VehicleWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  vehicle_number: z.number().int().optional()
}).strict();

export const VehicleOrderByWithAggregationInputSchema: z.ZodType<Prisma.VehicleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  fasttrak_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VehicleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VehicleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VehicleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VehicleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VehicleSumOrderByAggregateInputSchema).optional()
}).strict();

export const VehicleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VehicleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  vehicle_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  max_passengers: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  max_luggage: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  per_km: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  per_hour: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  min_hours: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  min_distance: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  min_rate: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  limo_anywhere_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  fasttrak_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  vehicle_image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const LineItemToQuoteWhereInputSchema: z.ZodType<Prisma.LineItemToQuoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LineItemToQuoteWhereInputSchema),z.lazy(() => LineItemToQuoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LineItemToQuoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LineItemToQuoteWhereInputSchema),z.lazy(() => LineItemToQuoteWhereInputSchema).array() ]).optional(),
  A: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  B: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const LineItemToQuoteOrderByWithRelationInputSchema: z.ZodType<Prisma.LineItemToQuoteOrderByWithRelationInput> = z.object({
  A: z.lazy(() => SortOrderSchema).optional(),
  B: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemToQuoteWhereUniqueInputSchema: z.ZodType<Prisma.LineItemToQuoteWhereUniqueInput> = z.object({
  A_B: z.lazy(() => LineItemToQuoteABCompoundUniqueInputSchema).optional()
}).strict();

export const LineItemToQuoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.LineItemToQuoteOrderByWithAggregationInput> = z.object({
  A: z.lazy(() => SortOrderSchema).optional(),
  B: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LineItemToQuoteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LineItemToQuoteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LineItemToQuoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LineItemToQuoteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LineItemToQuoteSumOrderByAggregateInputSchema).optional()
}).strict();

export const LineItemToQuoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LineItemToQuoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LineItemToQuoteScalarWhereWithAggregatesInputSchema),z.lazy(() => LineItemToQuoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LineItemToQuoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LineItemToQuoteScalarWhereWithAggregatesInputSchema),z.lazy(() => LineItemToQuoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  A: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  B: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AirlineWhereInputSchema: z.ZodType<Prisma.AirlineWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AirlineWhereInputSchema),z.lazy(() => AirlineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AirlineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AirlineWhereInputSchema),z.lazy(() => AirlineWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  iata: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  icao: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  callsign: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flight: z.lazy(() => FlightListRelationFilterSchema).optional()
}).strict();

export const AirlineOrderByWithRelationInputSchema: z.ZodType<Prisma.AirlineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional(),
  callsign: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  flight: z.lazy(() => FlightOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AirlineWhereUniqueInputSchema: z.ZodType<Prisma.AirlineWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const AirlineOrderByWithAggregationInputSchema: z.ZodType<Prisma.AirlineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional(),
  callsign: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AirlineCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AirlineAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AirlineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AirlineMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AirlineSumOrderByAggregateInputSchema).optional()
}).strict();

export const AirlineScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AirlineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AirlineScalarWhereWithAggregatesInputSchema),z.lazy(() => AirlineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AirlineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AirlineScalarWhereWithAggregatesInputSchema),z.lazy(() => AirlineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  iata: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  icao: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  callsign: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AirportWhereInputSchema: z.ZodType<Prisma.AirportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AirportWhereInputSchema),z.lazy(() => AirportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AirportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AirportWhereInputSchema),z.lazy(() => AirportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  timezone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  iata: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  icao: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flight: z.lazy(() => FlightListRelationFilterSchema).optional()
}).strict();

export const AirportOrderByWithRelationInputSchema: z.ZodType<Prisma.AirportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional(),
  flight: z.lazy(() => FlightOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AirportWhereUniqueInputSchema: z.ZodType<Prisma.AirportWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const AirportOrderByWithAggregationInputSchema: z.ZodType<Prisma.AirportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AirportCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AirportAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AirportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AirportMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AirportSumOrderByAggregateInputSchema).optional()
}).strict();

export const AirportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AirportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AirportScalarWhereWithAggregatesInputSchema),z.lazy(() => AirportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AirportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AirportScalarWhereWithAggregatesInputSchema),z.lazy(() => AirportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  timezone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  iata: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  icao: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().uuid().optional(),
  number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int(),
  users: z.lazy(() => UserCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutAccountInputSchema).optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string(),
  user_id: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string(),
  user_id: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputSchema).optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUsersInputSchema).optional(),
  conversion: z.lazy(() => ConversionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutUserNestedInputSchema).optional(),
  account: z.lazy(() => AccountUpdateOneWithoutUsersNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AffiliateCreateInputSchema: z.ZodType<Prisma.AffiliateCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  address: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  is_driver: z.boolean().optional()
}).strict();

export const AffiliateUncheckedCreateInputSchema: z.ZodType<Prisma.AffiliateUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  address: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  is_driver: z.boolean().optional()
}).strict();

export const AffiliateUpdateInputSchema: z.ZodType<Prisma.AffiliateUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_driver: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AffiliateUncheckedUpdateInputSchema: z.ZodType<Prisma.AffiliateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_driver: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AffiliateCreateManyInputSchema: z.ZodType<Prisma.AffiliateCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  address: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  is_driver: z.boolean().optional()
}).strict();

export const AffiliateUpdateManyMutationInputSchema: z.ZodType<Prisma.AffiliateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_driver: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AffiliateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AffiliateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_driver: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DriverCreateInputSchema: z.ZodType<Prisma.DriverCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string(),
  drivers_licence: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
}).strict();

export const DriverUncheckedCreateInputSchema: z.ZodType<Prisma.DriverUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string(),
  drivers_licence: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
}).strict();

export const DriverUpdateInputSchema: z.ZodType<Prisma.DriverUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  drivers_licence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DriverUncheckedUpdateInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  drivers_licence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DriverCreateManyInputSchema: z.ZodType<Prisma.DriverCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string(),
  drivers_licence: z.string().optional().nullable(),
  notes: z.string().optional().nullable()
}).strict();

export const DriverUpdateManyMutationInputSchema: z.ZodType<Prisma.DriverUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  drivers_licence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DriverUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DriverUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  drivers_licence: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
  id: z.string().cuid().optional()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
  id: z.string().cuid().optional()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
  id: z.string().cuid().optional()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversionCreateInputSchema: z.ZodType<Prisma.ConversionCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversionInputSchema)
}).strict();

export const ConversionUncheckedCreateInputSchema: z.ZodType<Prisma.ConversionUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
  user_id: z.string()
}).strict();

export const ConversionUpdateInputSchema: z.ZodType<Prisma.ConversionUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConversionNestedInputSchema).optional()
}).strict();

export const ConversionUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversionCreateManyInputSchema: z.ZodType<Prisma.ConversionCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
  user_id: z.string()
}).strict();

export const ConversionUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ConversionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuoteCreateInputSchema: z.ZodType<Prisma.QuoteCreateInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number().int(),
  vehicle_number: z.number().int(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().int().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUpdateInputSchema: z.ZodType<Prisma.QuoteUpdateInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateInput> = z.object({
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteCreateManyInputSchema: z.ZodType<Prisma.QuoteCreateManyInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number().int(),
  vehicle_number: z.number().int(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().int().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const QuoteUpdateManyMutationInputSchema: z.ZodType<Prisma.QuoteUpdateManyMutationInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const QuoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyInput> = z.object({
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const TripCreateInputSchema: z.ZodType<Prisma.TripCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().int().optional().nullable(),
  distance_value: z.number().int().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().int().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().int().optional().nullable(),
  large_luggage: z.number().int().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceCreateNestedOneWithoutTripInputSchema).optional(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateInputSchema: z.ZodType<Prisma.TripUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().int().optional().nullable(),
  distance_value: z.number().int().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  quote_number: z.number().int(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().int().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().int().optional().nullable(),
  large_luggage: z.number().int().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripUpdateInputSchema: z.ZodType<Prisma.TripUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUpdateOneWithoutTripNestedInputSchema).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateInputSchema: z.ZodType<Prisma.TripUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripCreateManyInputSchema: z.ZodType<Prisma.TripCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().int().optional().nullable(),
  distance_value: z.number().int().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  quote_number: z.number().int(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().int().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().int().optional().nullable(),
  large_luggage: z.number().int().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const TripUpdateManyMutationInputSchema: z.ZodType<Prisma.TripUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const TripUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  formatted_address: z.string(),
  full_name: z.string().optional().nullable(),
  place_id: z.string(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  route_order: z.number().int().optional(),
  trip: z.lazy(() => TripCreateNestedOneWithoutLocationsInputSchema)
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  formatted_address: z.string(),
  full_name: z.string().optional().nullable(),
  place_id: z.string(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  trip_id: z.string(),
  route_order: z.number().int().optional()
}).strict();

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  route_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutLocationsNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  formatted_address: z.string(),
  full_name: z.string().optional().nullable(),
  place_id: z.string(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  trip_id: z.string(),
  route_order: z.number().int().optional()
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  route_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  route_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceCreateInputSchema: z.ZodType<Prisma.PriceCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutPricingInputSchema).optional(),
  trip: z.lazy(() => TripCreateNestedOneWithoutPriceInputSchema)
}).strict();

export const PriceUncheckedCreateInputSchema: z.ZodType<Prisma.PriceUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  quote_number: z.number().int().optional().nullable(),
  trip_id: z.string()
}).strict();

export const PriceUpdateInputSchema: z.ZodType<Prisma.PriceUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote: z.lazy(() => QuoteUpdateOneWithoutPricingNestedInputSchema).optional(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutPriceNestedInputSchema).optional()
}).strict();

export const PriceUncheckedUpdateInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceCreateManyInputSchema: z.ZodType<Prisma.PriceCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  quote_number: z.number().int().optional().nullable(),
  trip_id: z.string()
}).strict();

export const PriceUpdateManyMutationInputSchema: z.ZodType<Prisma.PriceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PriceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentCreateInputSchema: z.ZodType<Prisma.PaymentCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  trip: z.lazy(() => TripCreateNestedOneWithoutPaymentInputSchema),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutPaymentInputSchema).optional()
}).strict();

export const PaymentUncheckedCreateInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  trip_id: z.string(),
  quote_number: z.number().int().optional().nullable()
}).strict();

export const PaymentUpdateInputSchema: z.ZodType<Prisma.PaymentUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutPaymentNestedInputSchema).optional(),
  quote: z.lazy(() => QuoteUpdateOneWithoutPaymentNestedInputSchema).optional()
}).strict();

export const PaymentUncheckedUpdateInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_number: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PaymentCreateManyInputSchema: z.ZodType<Prisma.PaymentCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  trip_id: z.string(),
  quote_number: z.number().int().optional().nullable()
}).strict();

export const PaymentUpdateManyMutationInputSchema: z.ZodType<Prisma.PaymentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PaymentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_number: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightCreateInputSchema: z.ZodType<Prisma.FlightCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable(),
  trip: z.lazy(() => TripCreateNestedOneWithoutFlightInputSchema).optional(),
  airline: z.lazy(() => AirlineCreateNestedOneWithoutFlightInputSchema).optional(),
  airport: z.lazy(() => AirportCreateNestedOneWithoutFlightInputSchema).optional()
}).strict();

export const FlightUncheckedCreateInputSchema: z.ZodType<Prisma.FlightUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  trip_id: z.string().optional().nullable(),
  airline_id: z.number().int().optional().nullable(),
  airport_id: z.number().int().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable()
}).strict();

export const FlightUpdateInputSchema: z.ZodType<Prisma.FlightUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => TripUpdateOneWithoutFlightNestedInputSchema).optional(),
  airline: z.lazy(() => AirlineUpdateOneWithoutFlightNestedInputSchema).optional(),
  airport: z.lazy(() => AirportUpdateOneWithoutFlightNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airport_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightCreateManyInputSchema: z.ZodType<Prisma.FlightCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  trip_id: z.string().optional().nullable(),
  airline_id: z.number().int().optional().nullable(),
  airport_id: z.number().int().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable()
}).strict();

export const FlightUpdateManyMutationInputSchema: z.ZodType<Prisma.FlightUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airport_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  id: z.string().uuid().optional(),
  service_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().int().optional().nullable(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  service_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().int().optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  service_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().int().optional().nullable()
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LineItemCreateInputSchema: z.ZodType<Prisma.LineItemCreateInput> = z.object({
  id: z.string().uuid().optional(),
  item_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutLine_itemsInputSchema).optional()
}).strict();

export const LineItemUncheckedCreateInputSchema: z.ZodType<Prisma.LineItemUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  item_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutLine_itemsInputSchema).optional()
}).strict();

export const LineItemUpdateInputSchema: z.ZodType<Prisma.LineItemUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_percentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  applies_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutLine_itemsNestedInputSchema).optional()
}).strict();

export const LineItemUncheckedUpdateInputSchema: z.ZodType<Prisma.LineItemUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  item_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_percentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  applies_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutLine_itemsNestedInputSchema).optional()
}).strict();

export const LineItemCreateManyInputSchema: z.ZodType<Prisma.LineItemCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  item_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable()
}).strict();

export const LineItemUpdateManyMutationInputSchema: z.ZodType<Prisma.LineItemUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_percentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  applies_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LineItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LineItemUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  item_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_percentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  applies_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SalesTaxCreateInputSchema: z.ZodType<Prisma.SalesTaxCreateInput> = z.object({
  id: z.string().uuid().optional(),
  tax_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutSales_taxInputSchema).optional()
}).strict();

export const SalesTaxUncheckedCreateInputSchema: z.ZodType<Prisma.SalesTaxUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  tax_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutSales_taxInputSchema).optional()
}).strict();

export const SalesTaxUpdateInputSchema: z.ZodType<Prisma.SalesTaxUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutSales_taxNestedInputSchema).optional()
}).strict();

export const SalesTaxUncheckedUpdateInputSchema: z.ZodType<Prisma.SalesTaxUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutSales_taxNestedInputSchema).optional()
}).strict();

export const SalesTaxCreateManyInputSchema: z.ZodType<Prisma.SalesTaxCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  tax_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional()
}).strict();

export const SalesTaxUpdateManyMutationInputSchema: z.ZodType<Prisma.SalesTaxUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesTaxUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SalesTaxUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VehicleCreateInputSchema: z.ZodType<Prisma.VehicleCreateInput> = z.object({
  id: z.string().uuid().optional(),
  vehicle_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  max_passengers: z.number().int().optional(),
  max_luggage: z.number().int().optional(),
  per_km: z.number().optional(),
  per_hour: z.number().optional(),
  min_hours: z.number().int().optional(),
  min_distance: z.number().int().optional(),
  min_rate: z.number().optional(),
  is_active: z.boolean().optional(),
  label: z.string(),
  limo_anywhere_id: z.number().int().optional().nullable(),
  fasttrak_id: z.number().int().optional().nullable(),
  vehicle_image: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutVehicleInputSchema).optional()
}).strict();

export const VehicleUncheckedCreateInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  vehicle_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  max_passengers: z.number().int().optional(),
  max_luggage: z.number().int().optional(),
  per_km: z.number().optional(),
  per_hour: z.number().optional(),
  min_hours: z.number().int().optional(),
  min_distance: z.number().int().optional(),
  min_rate: z.number().optional(),
  is_active: z.boolean().optional(),
  label: z.string(),
  limo_anywhere_id: z.number().int().optional().nullable(),
  fasttrak_id: z.number().int().optional().nullable(),
  vehicle_image: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutVehicleInputSchema).optional()
}).strict();

export const VehicleUpdateInputSchema: z.ZodType<Prisma.VehicleUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  max_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  max_luggage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  per_km: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  per_hour: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  min_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_distance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_rate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fasttrak_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutVehicleNestedInputSchema).optional()
}).strict();

export const VehicleUncheckedUpdateInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  max_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  max_luggage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  per_km: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  per_hour: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  min_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_distance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_rate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fasttrak_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutVehicleNestedInputSchema).optional()
}).strict();

export const VehicleCreateManyInputSchema: z.ZodType<Prisma.VehicleCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  vehicle_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  max_passengers: z.number().int().optional(),
  max_luggage: z.number().int().optional(),
  per_km: z.number().optional(),
  per_hour: z.number().optional(),
  min_hours: z.number().int().optional(),
  min_distance: z.number().int().optional(),
  min_rate: z.number().optional(),
  is_active: z.boolean().optional(),
  label: z.string(),
  limo_anywhere_id: z.number().int().optional().nullable(),
  fasttrak_id: z.number().int().optional().nullable(),
  vehicle_image: z.string().optional().nullable()
}).strict();

export const VehicleUpdateManyMutationInputSchema: z.ZodType<Prisma.VehicleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  max_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  max_luggage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  per_km: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  per_hour: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  min_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_distance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_rate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fasttrak_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VehicleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  max_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  max_luggage: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  per_km: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  per_hour: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  min_hours: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_distance: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_rate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fasttrak_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LineItemToQuoteCreateInputSchema: z.ZodType<Prisma.LineItemToQuoteCreateInput> = z.object({
  A: z.string(),
  B: z.number().int()
}).strict();

export const LineItemToQuoteUncheckedCreateInputSchema: z.ZodType<Prisma.LineItemToQuoteUncheckedCreateInput> = z.object({
  A: z.string(),
  B: z.number().int()
}).strict();

export const LineItemToQuoteUpdateInputSchema: z.ZodType<Prisma.LineItemToQuoteUpdateInput> = z.object({
  A: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  B: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LineItemToQuoteUncheckedUpdateInputSchema: z.ZodType<Prisma.LineItemToQuoteUncheckedUpdateInput> = z.object({
  A: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  B: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LineItemToQuoteCreateManyInputSchema: z.ZodType<Prisma.LineItemToQuoteCreateManyInput> = z.object({
  A: z.string(),
  B: z.number().int()
}).strict();

export const LineItemToQuoteUpdateManyMutationInputSchema: z.ZodType<Prisma.LineItemToQuoteUpdateManyMutationInput> = z.object({
  A: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  B: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LineItemToQuoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LineItemToQuoteUncheckedUpdateManyInput> = z.object({
  A: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  B: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AirlineCreateInputSchema: z.ZodType<Prisma.AirlineCreateInput> = z.object({
  name: z.string().optional().nullable(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable(),
  callsign: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  flight: z.lazy(() => FlightCreateNestedManyWithoutAirlineInputSchema).optional()
}).strict();

export const AirlineUncheckedCreateInputSchema: z.ZodType<Prisma.AirlineUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable(),
  callsign: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  flight: z.lazy(() => FlightUncheckedCreateNestedManyWithoutAirlineInputSchema).optional()
}).strict();

export const AirlineUpdateInputSchema: z.ZodType<Prisma.AirlineUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  callsign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight: z.lazy(() => FlightUpdateManyWithoutAirlineNestedInputSchema).optional()
}).strict();

export const AirlineUncheckedUpdateInputSchema: z.ZodType<Prisma.AirlineUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  callsign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight: z.lazy(() => FlightUncheckedUpdateManyWithoutAirlineNestedInputSchema).optional()
}).strict();

export const AirlineCreateManyInputSchema: z.ZodType<Prisma.AirlineCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string().optional().nullable(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable(),
  callsign: z.string().optional().nullable(),
  country: z.string().optional().nullable()
}).strict();

export const AirlineUpdateManyMutationInputSchema: z.ZodType<Prisma.AirlineUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  callsign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AirlineUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AirlineUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  callsign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AirportCreateInputSchema: z.ZodType<Prisma.AirportCreateInput> = z.object({
  name: z.string(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  lat: z.number(),
  lng: z.number(),
  timezone: z.string(),
  type: z.string(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable(),
  flight: z.lazy(() => FlightCreateNestedManyWithoutAirportInputSchema).optional()
}).strict();

export const AirportUncheckedCreateInputSchema: z.ZodType<Prisma.AirportUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  lat: z.number(),
  lng: z.number(),
  timezone: z.string(),
  type: z.string(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable(),
  flight: z.lazy(() => FlightUncheckedCreateNestedManyWithoutAirportInputSchema).optional()
}).strict();

export const AirportUpdateInputSchema: z.ZodType<Prisma.AirportUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timezone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight: z.lazy(() => FlightUpdateManyWithoutAirportNestedInputSchema).optional()
}).strict();

export const AirportUncheckedUpdateInputSchema: z.ZodType<Prisma.AirportUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timezone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight: z.lazy(() => FlightUncheckedUpdateManyWithoutAirportNestedInputSchema).optional()
}).strict();

export const AirportCreateManyInputSchema: z.ZodType<Prisma.AirportCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  lat: z.number(),
  lng: z.number(),
  timezone: z.string(),
  type: z.string(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable()
}).strict();

export const AirportUpdateManyMutationInputSchema: z.ZodType<Prisma.AirportUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timezone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AirportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AirportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timezone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  session_token: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.union([ z.boolean(),z.lazy(() => BooleanFieldRefInputSchema) ]).optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_starts_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_ends_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  array_contains: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_starts_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_ends_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const QuoteListRelationFilterSchema: z.ZodType<Prisma.QuoteListRelationFilter> = z.object({
  every: z.lazy(() => QuoteWhereInputSchema).optional(),
  some: z.lazy(() => QuoteWhereInputSchema).optional(),
  none: z.lazy(() => QuoteWhereInputSchema).optional()
}).strict();

export const AccountRelationFilterSchema: z.ZodType<Prisma.AccountRelationFilter> = z.object({
  is: z.lazy(() => AccountWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AccountWhereInputSchema).optional().nullable()
}).strict();

export const ConversionListRelationFilterSchema: z.ZodType<Prisma.ConversionListRelationFilter> = z.object({
  every: z.lazy(() => ConversionWhereInputSchema).optional(),
  some: z.lazy(() => ConversionWhereInputSchema).optional(),
  none: z.lazy(() => ConversionWhereInputSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.QuoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConversionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  phone_number_country: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  payment_method: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  email_verified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  phone_number_country: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  payment_method: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  email_verified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  phone_number_country: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  payment_method: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  email_verified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.union([ z.boolean(),z.lazy(() => BooleanFieldRefInputSchema) ]).optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_starts_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_ends_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  array_contains: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_starts_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_ends_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const AffiliateCountOrderByAggregateInputSchema: z.ZodType<Prisma.AffiliateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  is_driver: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AffiliateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AffiliateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  is_driver: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AffiliateMinOrderByAggregateInputSchema: z.ZodType<Prisma.AffiliateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  is_driver: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DriverCountOrderByAggregateInputSchema: z.ZodType<Prisma.DriverCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  drivers_licence: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DriverMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DriverMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  drivers_licence: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DriverMinOrderByAggregateInputSchema: z.ZodType<Prisma.DriverMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  drivers_licence: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PriceListRelationFilterSchema: z.ZodType<Prisma.PriceListRelationFilter> = z.object({
  every: z.lazy(() => PriceWhereInputSchema).optional(),
  some: z.lazy(() => PriceWhereInputSchema).optional(),
  none: z.lazy(() => PriceWhereInputSchema).optional()
}).strict();

export const ServiceRelationFilterSchema: z.ZodType<Prisma.ServiceRelationFilter> = z.object({
  is: z.lazy(() => ServiceWhereInputSchema).optional(),
  isNot: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const VehicleRelationFilterSchema: z.ZodType<Prisma.VehicleRelationFilter> = z.object({
  is: z.lazy(() => VehicleWhereInputSchema).optional(),
  isNot: z.lazy(() => VehicleWhereInputSchema).optional()
}).strict();

export const SalesTaxRelationFilterSchema: z.ZodType<Prisma.SalesTaxRelationFilter> = z.object({
  is: z.lazy(() => SalesTaxWhereInputSchema).optional(),
  isNot: z.lazy(() => SalesTaxWhereInputSchema).optional()
}).strict();

export const LineItemListRelationFilterSchema: z.ZodType<Prisma.LineItemListRelationFilter> = z.object({
  every: z.lazy(() => LineItemWhereInputSchema).optional(),
  some: z.lazy(() => LineItemWhereInputSchema).optional(),
  none: z.lazy(() => LineItemWhereInputSchema).optional()
}).strict();

export const TripListRelationFilterSchema: z.ZodType<Prisma.TripListRelationFilter> = z.object({
  every: z.lazy(() => TripWhereInputSchema).optional(),
  some: z.lazy(() => TripWhereInputSchema).optional(),
  none: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const PaymentListRelationFilterSchema: z.ZodType<Prisma.PaymentListRelationFilter> = z.object({
  every: z.lazy(() => PaymentWhereInputSchema).optional(),
  some: z.lazy(() => PaymentWhereInputSchema).optional(),
  none: z.lazy(() => PaymentWhereInputSchema).optional()
}).strict();

export const PriceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PriceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LineItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TripOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PaymentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteCountOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  quote_total: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  reference_value: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_number: z.lazy(() => SortOrderSchema).optional(),
  quote_subtotal: z.lazy(() => SortOrderSchema).optional(),
  quote_tax_total: z.lazy(() => SortOrderSchema).optional(),
  short_link: z.lazy(() => SortOrderSchema).optional(),
  combined_line_items: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteAvgOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  quote_total: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_number: z.lazy(() => SortOrderSchema).optional(),
  quote_subtotal: z.lazy(() => SortOrderSchema).optional(),
  quote_tax_total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteMaxOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  quote_total: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  reference_value: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_number: z.lazy(() => SortOrderSchema).optional(),
  quote_subtotal: z.lazy(() => SortOrderSchema).optional(),
  quote_tax_total: z.lazy(() => SortOrderSchema).optional(),
  short_link: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteMinOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  id: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  quote_total: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  reference_value: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_number: z.lazy(() => SortOrderSchema).optional(),
  quote_subtotal: z.lazy(() => SortOrderSchema).optional(),
  quote_tax_total: z.lazy(() => SortOrderSchema).optional(),
  short_link: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const QuoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteSumOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  quote_total: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_number: z.lazy(() => SortOrderSchema).optional(),
  quote_subtotal: z.lazy(() => SortOrderSchema).optional(),
  quote_tax_total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const PriceRelationFilterSchema: z.ZodType<Prisma.PriceRelationFilter> = z.object({
  is: z.lazy(() => PriceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PriceWhereInputSchema).optional().nullable()
}).strict();

export const QuoteRelationFilterSchema: z.ZodType<Prisma.QuoteRelationFilter> = z.object({
  is: z.lazy(() => QuoteWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => QuoteWhereInputSchema).optional().nullable()
}).strict();

export const PaymentRelationFilterSchema: z.ZodType<Prisma.PaymentRelationFilter> = z.object({
  is: z.lazy(() => PaymentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PaymentWhereInputSchema).optional().nullable()
}).strict();

export const LocationListRelationFilterSchema: z.ZodType<Prisma.LocationListRelationFilter> = z.object({
  every: z.lazy(() => LocationWhereInputSchema).optional(),
  some: z.lazy(() => LocationWhereInputSchema).optional(),
  none: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const FlightRelationFilterSchema: z.ZodType<Prisma.FlightRelationFilter> = z.object({
  is: z.lazy(() => FlightWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FlightWhereInputSchema).optional().nullable()
}).strict();

export const LocationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LocationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripCountOrderByAggregateInputSchema: z.ZodType<Prisma.TripCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  distance_text: z.lazy(() => SortOrderSchema).optional(),
  duration_text: z.lazy(() => SortOrderSchema).optional(),
  duration_value: z.lazy(() => SortOrderSchema).optional(),
  distance_value: z.lazy(() => SortOrderSchema).optional(),
  calculated_distance: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  service_label: z.lazy(() => SortOrderSchema).optional(),
  vehicle_label: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_order: z.lazy(() => SortOrderSchema).optional(),
  price_id: z.lazy(() => SortOrderSchema).optional(),
  carry_on_luggage: z.lazy(() => SortOrderSchema).optional(),
  large_luggage: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TripAvgOrderByAggregateInput> = z.object({
  duration_value: z.lazy(() => SortOrderSchema).optional(),
  distance_value: z.lazy(() => SortOrderSchema).optional(),
  calculated_distance: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  trip_order: z.lazy(() => SortOrderSchema).optional(),
  carry_on_luggage: z.lazy(() => SortOrderSchema).optional(),
  large_luggage: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TripMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  distance_text: z.lazy(() => SortOrderSchema).optional(),
  duration_text: z.lazy(() => SortOrderSchema).optional(),
  duration_value: z.lazy(() => SortOrderSchema).optional(),
  distance_value: z.lazy(() => SortOrderSchema).optional(),
  calculated_distance: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  service_label: z.lazy(() => SortOrderSchema).optional(),
  vehicle_label: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_order: z.lazy(() => SortOrderSchema).optional(),
  price_id: z.lazy(() => SortOrderSchema).optional(),
  carry_on_luggage: z.lazy(() => SortOrderSchema).optional(),
  large_luggage: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripMinOrderByAggregateInputSchema: z.ZodType<Prisma.TripMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  distance_text: z.lazy(() => SortOrderSchema).optional(),
  duration_text: z.lazy(() => SortOrderSchema).optional(),
  duration_value: z.lazy(() => SortOrderSchema).optional(),
  distance_value: z.lazy(() => SortOrderSchema).optional(),
  calculated_distance: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  service_label: z.lazy(() => SortOrderSchema).optional(),
  vehicle_label: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_order: z.lazy(() => SortOrderSchema).optional(),
  price_id: z.lazy(() => SortOrderSchema).optional(),
  carry_on_luggage: z.lazy(() => SortOrderSchema).optional(),
  large_luggage: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripSumOrderByAggregateInputSchema: z.ZodType<Prisma.TripSumOrderByAggregateInput> = z.object({
  duration_value: z.lazy(() => SortOrderSchema).optional(),
  distance_value: z.lazy(() => SortOrderSchema).optional(),
  calculated_distance: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  trip_order: z.lazy(() => SortOrderSchema).optional(),
  carry_on_luggage: z.lazy(() => SortOrderSchema).optional(),
  large_luggage: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_starts_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_ends_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  array_contains: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_starts_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_ends_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const TripRelationFilterSchema: z.ZodType<Prisma.TripRelationFilter> = z.object({
  is: z.lazy(() => TripWhereInputSchema).optional(),
  isNot: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  formatted_address: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  types: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  route_order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  route_order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  formatted_address: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  route_order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  formatted_address: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  route_order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  route_order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_starts_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_ends_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  array_contains: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_starts_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_ends_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const PriceCountOrderByAggregateInputSchema: z.ZodType<Prisma.PriceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  line_items_list: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PriceAvgOrderByAggregateInput> = z.object({
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceMinOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceSumOrderByAggregateInputSchema: z.ZodType<Prisma.PriceSumOrderByAggregateInput> = z.object({
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentCountOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_preauthorized: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  setup_intent: z.lazy(() => SortOrderSchema).optional(),
  payment_intent: z.lazy(() => SortOrderSchema).optional(),
  payment_type: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentAvgOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_preauthorized: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  payment_type: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMinOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  is_preauthorized: z.lazy(() => SortOrderSchema).optional(),
  is_paid: z.lazy(() => SortOrderSchema).optional(),
  payment_type: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentSumOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentSumOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirlineRelationFilterSchema: z.ZodType<Prisma.AirlineRelationFilter> = z.object({
  is: z.lazy(() => AirlineWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AirlineWhereInputSchema).optional().nullable()
}).strict();

export const AirportRelationFilterSchema: z.ZodType<Prisma.AirportRelationFilter> = z.object({
  is: z.lazy(() => AirportWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AirportWhereInputSchema).optional().nullable()
}).strict();

export const FlightCountOrderByAggregateInputSchema: z.ZodType<Prisma.FlightCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  airline_code: z.lazy(() => SortOrderSchema).optional(),
  airline_name: z.lazy(() => SortOrderSchema).optional(),
  flight_number: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_landed: z.lazy(() => SortOrderSchema).optional(),
  is_arrived: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  airline_id: z.lazy(() => SortOrderSchema).optional(),
  airport_id: z.lazy(() => SortOrderSchema).optional(),
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FlightAvgOrderByAggregateInput> = z.object({
  airline_id: z.lazy(() => SortOrderSchema).optional(),
  airport_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FlightMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  airline_code: z.lazy(() => SortOrderSchema).optional(),
  airline_name: z.lazy(() => SortOrderSchema).optional(),
  flight_number: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_landed: z.lazy(() => SortOrderSchema).optional(),
  is_arrived: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  airline_id: z.lazy(() => SortOrderSchema).optional(),
  airport_id: z.lazy(() => SortOrderSchema).optional(),
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightMinOrderByAggregateInputSchema: z.ZodType<Prisma.FlightMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  airline_code: z.lazy(() => SortOrderSchema).optional(),
  airline_name: z.lazy(() => SortOrderSchema).optional(),
  flight_number: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_landed: z.lazy(() => SortOrderSchema).optional(),
  is_arrived: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  airline_id: z.lazy(() => SortOrderSchema).optional(),
  airport_id: z.lazy(() => SortOrderSchema).optional(),
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightSumOrderByAggregateInputSchema: z.ZodType<Prisma.FlightSumOrderByAggregateInput> = z.object({
  airline_id: z.lazy(() => SortOrderSchema).optional(),
  airport_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvgOrderByAggregateInput> = z.object({
  service_number: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  service_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceSumOrderByAggregateInput> = z.object({
  service_number: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  item_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemAvgOrderByAggregateInput> = z.object({
  item_number: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  item_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  item_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemSumOrderByAggregateInput> = z.object({
  item_number: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesTaxCountOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tax_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesTaxAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxAvgOrderByAggregateInput> = z.object({
  tax_number: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesTaxMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tax_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesTaxMinOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tax_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesTaxSumOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxSumOrderByAggregateInput> = z.object({
  tax_number: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VehicleCountOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  fasttrak_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VehicleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleAvgOrderByAggregateInput> = z.object({
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  fasttrak_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VehicleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  fasttrak_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VehicleMinOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  fasttrak_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VehicleSumOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleSumOrderByAggregateInput> = z.object({
  vehicle_number: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  fasttrak_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemToQuoteABCompoundUniqueInputSchema: z.ZodType<Prisma.LineItemToQuoteABCompoundUniqueInput> = z.object({
  A: z.string(),
  B: z.number()
}).strict();

export const LineItemToQuoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemToQuoteCountOrderByAggregateInput> = z.object({
  A: z.lazy(() => SortOrderSchema).optional(),
  B: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemToQuoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemToQuoteAvgOrderByAggregateInput> = z.object({
  B: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemToQuoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemToQuoteMaxOrderByAggregateInput> = z.object({
  A: z.lazy(() => SortOrderSchema).optional(),
  B: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemToQuoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemToQuoteMinOrderByAggregateInput> = z.object({
  A: z.lazy(() => SortOrderSchema).optional(),
  B: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LineItemToQuoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemToQuoteSumOrderByAggregateInput> = z.object({
  B: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FlightListRelationFilterSchema: z.ZodType<Prisma.FlightListRelationFilter> = z.object({
  every: z.lazy(() => FlightWhereInputSchema).optional(),
  some: z.lazy(() => FlightWhereInputSchema).optional(),
  none: z.lazy(() => FlightWhereInputSchema).optional()
}).strict();

export const FlightOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FlightOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirlineCountOrderByAggregateInputSchema: z.ZodType<Prisma.AirlineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional(),
  callsign: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirlineAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AirlineAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirlineMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AirlineMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional(),
  callsign: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirlineMinOrderByAggregateInputSchema: z.ZodType<Prisma.AirlineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional(),
  callsign: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirlineSumOrderByAggregateInputSchema: z.ZodType<Prisma.AirlineSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirportCountOrderByAggregateInputSchema: z.ZodType<Prisma.AirportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirportAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AirportAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AirportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirportMinOrderByAggregateInputSchema: z.ZodType<Prisma.AirportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  timezone: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  iata: z.lazy(() => SortOrderSchema).optional(),
  icao: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AirportSumOrderByAggregateInputSchema: z.ZodType<Prisma.AirportSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserCreateWithoutAccountInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema),z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserCreateWithoutAccountInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema),z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAccountInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserCreateWithoutAccountInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema),z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutAccountNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserCreateWithoutAccountInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema),z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyAccountInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutAccountInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutAccountInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutAccountInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutAccountInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteCreateWithoutUserInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const ConversionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConversionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionCreateWithoutUserInputSchema).array(),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteCreateWithoutUserInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ConversionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionCreateWithoutUserInputSchema).array(),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteCreateWithoutUserInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const ConversionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionCreateWithoutUserInputSchema).array(),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConversionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversionScalarWhereInputSchema),z.lazy(() => ConversionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteCreateWithoutUserInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionCreateWithoutUserInputSchema).array(),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema),z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversionWhereUniqueInputSchema),z.lazy(() => ConversionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ConversionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ConversionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversionScalarWhereInputSchema),z.lazy(() => ConversionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutConversionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConversionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversionInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutConversionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConversionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversionInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutConversionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutConversionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversionInputSchema) ]).optional(),
}).strict();

export const PriceCreateNestedManyWithoutQuoteInputSchema: z.ZodType<Prisma.PriceCreateNestedManyWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutQuoteInputSchema),z.lazy(() => PriceCreateWithoutQuoteInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyQuoteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional()
}).strict();

export const VehicleCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => VehicleCreateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const SalesTaxCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesTaxCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => SalesTaxWhereUniqueInputSchema).optional()
}).strict();

export const LineItemCreateNestedManyWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemCreateNestedManyWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => LineItemCreateWithoutQuotesInputSchema),z.lazy(() => LineItemCreateWithoutQuotesInputSchema).array(),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema),z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripCreateNestedManyWithoutQuoteInputSchema: z.ZodType<Prisma.TripCreateNestedManyWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutQuoteInputSchema),z.lazy(() => TripCreateWithoutQuoteInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyQuoteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PaymentCreateNestedManyWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentCreateNestedManyWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentCreateWithoutQuoteInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyQuoteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PriceUncheckedCreateNestedManyWithoutQuoteInputSchema: z.ZodType<Prisma.PriceUncheckedCreateNestedManyWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutQuoteInputSchema),z.lazy(() => PriceCreateWithoutQuoteInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyQuoteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUncheckedCreateNestedManyWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => LineItemCreateWithoutQuotesInputSchema),z.lazy(() => LineItemCreateWithoutQuotesInputSchema).array(),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema),z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripUncheckedCreateNestedManyWithoutQuoteInputSchema: z.ZodType<Prisma.TripUncheckedCreateNestedManyWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutQuoteInputSchema),z.lazy(() => TripCreateWithoutQuoteInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyQuoteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateNestedManyWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentCreateWithoutQuoteInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyQuoteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PriceUpdateManyWithoutQuoteNestedInputSchema: z.ZodType<Prisma.PriceUpdateManyWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutQuoteInputSchema),z.lazy(() => PriceCreateWithoutQuoteInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PriceUpsertWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyQuoteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PriceUpdateWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutQuoteInputSchema),z.lazy(() => PriceUpdateManyWithWhereWithoutQuoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema: z.ZodType<Prisma.ServiceUpdateOneRequiredWithoutQuotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutQuotesInputSchema).optional(),
  upsert: z.lazy(() => ServiceUpsertWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutQuotesInputSchema) ]).optional(),
}).strict();

export const VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema: z.ZodType<Prisma.VehicleUpdateOneRequiredWithoutQuotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => VehicleCreateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutQuotesInputSchema).optional(),
  upsert: z.lazy(() => VehicleUpsertWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VehicleUpdateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedUpdateWithoutQuotesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutQuotesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutQuotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutQuotesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutQuotesInputSchema) ]).optional(),
}).strict();

export const SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema: z.ZodType<Prisma.SalesTaxUpdateOneRequiredWithoutQuotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesTaxCreateOrConnectWithoutQuotesInputSchema).optional(),
  upsert: z.lazy(() => SalesTaxUpsertWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => SalesTaxWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesTaxUpdateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedUpdateWithoutQuotesInputSchema) ]).optional(),
}).strict();

export const LineItemUpdateManyWithoutQuotesNestedInputSchema: z.ZodType<Prisma.LineItemUpdateManyWithoutQuotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LineItemCreateWithoutQuotesInputSchema),z.lazy(() => LineItemCreateWithoutQuotesInputSchema).array(),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema),z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LineItemUpsertWithWhereUniqueWithoutQuotesInputSchema),z.lazy(() => LineItemUpsertWithWhereUniqueWithoutQuotesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LineItemUpdateWithWhereUniqueWithoutQuotesInputSchema),z.lazy(() => LineItemUpdateWithWhereUniqueWithoutQuotesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LineItemUpdateManyWithWhereWithoutQuotesInputSchema),z.lazy(() => LineItemUpdateManyWithWhereWithoutQuotesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LineItemScalarWhereInputSchema),z.lazy(() => LineItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripUpdateManyWithoutQuoteNestedInputSchema: z.ZodType<Prisma.TripUpdateManyWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutQuoteInputSchema),z.lazy(() => TripCreateWithoutQuoteInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripUpsertWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => TripUpsertWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyQuoteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => TripUpdateWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripUpdateManyWithWhereWithoutQuoteInputSchema),z.lazy(() => TripUpdateManyWithWhereWithoutQuoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PaymentUpdateManyWithoutQuoteNestedInputSchema: z.ZodType<Prisma.PaymentUpdateManyWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentCreateWithoutQuoteInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PaymentUpsertWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PaymentUpsertWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyQuoteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PaymentUpdateWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PaymentUpdateManyWithWhereWithoutQuoteInputSchema),z.lazy(() => PaymentUpdateManyWithWhereWithoutQuoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutQuoteInputSchema),z.lazy(() => PriceCreateWithoutQuoteInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PriceCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PriceUpsertWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyQuoteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PriceUpdateWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutQuoteInputSchema),z.lazy(() => PriceUpdateManyWithWhereWithoutQuoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema: z.ZodType<Prisma.LineItemUncheckedUpdateManyWithoutQuotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => LineItemCreateWithoutQuotesInputSchema),z.lazy(() => LineItemCreateWithoutQuotesInputSchema).array(),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema),z.lazy(() => LineItemCreateOrConnectWithoutQuotesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LineItemUpsertWithWhereUniqueWithoutQuotesInputSchema),z.lazy(() => LineItemUpsertWithWhereUniqueWithoutQuotesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LineItemWhereUniqueInputSchema),z.lazy(() => LineItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LineItemUpdateWithWhereUniqueWithoutQuotesInputSchema),z.lazy(() => LineItemUpdateWithWhereUniqueWithoutQuotesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LineItemUpdateManyWithWhereWithoutQuotesInputSchema),z.lazy(() => LineItemUpdateManyWithWhereWithoutQuotesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LineItemScalarWhereInputSchema),z.lazy(() => LineItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripUncheckedUpdateManyWithoutQuoteNestedInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutQuoteInputSchema),z.lazy(() => TripCreateWithoutQuoteInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => TripCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripUpsertWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => TripUpsertWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyQuoteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => TripUpdateWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripUpdateManyWithWhereWithoutQuoteInputSchema),z.lazy(() => TripUpdateManyWithWhereWithoutQuoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentCreateWithoutQuoteInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PaymentUpsertWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PaymentUpsertWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyQuoteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithWhereUniqueWithoutQuoteInputSchema),z.lazy(() => PaymentUpdateWithWhereUniqueWithoutQuoteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PaymentUpdateManyWithWhereWithoutQuoteInputSchema),z.lazy(() => PaymentUpdateManyWithWhereWithoutQuoteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PriceCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.PriceCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutTripInputSchema),z.lazy(() => PriceUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PriceCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => PriceWhereUniqueInputSchema).optional()
}).strict();

export const QuoteCreateNestedOneWithoutTripsInputSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutTripsInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutTripsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutTripsInputSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional()
}).strict();

export const PaymentCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.PaymentCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional()
}).strict();

export const LocationCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.LocationCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutTripInputSchema),z.lazy(() => LocationCreateWithoutTripInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema),z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.FlightCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FlightCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => FlightWhereUniqueInputSchema).optional()
}).strict();

export const PriceUncheckedCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.PriceUncheckedCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutTripInputSchema),z.lazy(() => PriceUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PriceCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => PriceWhereUniqueInputSchema).optional()
}).strict();

export const PaymentUncheckedCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional()
}).strict();

export const LocationUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.LocationUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutTripInputSchema),z.lazy(() => LocationCreateWithoutTripInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema),z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FlightCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => FlightWhereUniqueInputSchema).optional()
}).strict();

export const PriceUpdateOneWithoutTripNestedInputSchema: z.ZodType<Prisma.PriceUpdateOneWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutTripInputSchema),z.lazy(() => PriceUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PriceCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => PriceUpsertWithoutTripInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PriceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithoutTripInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const QuoteUpdateOneRequiredWithoutTripsNestedInputSchema: z.ZodType<Prisma.QuoteUpdateOneRequiredWithoutTripsNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutTripsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutTripsInputSchema).optional(),
  upsert: z.lazy(() => QuoteUpsertWithoutTripsInputSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutTripsInputSchema) ]).optional(),
}).strict();

export const PaymentUpdateOneWithoutTripNestedInputSchema: z.ZodType<Prisma.PaymentUpdateOneWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => PaymentUpsertWithoutTripInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const LocationUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.LocationUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutTripInputSchema),z.lazy(() => LocationCreateWithoutTripInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema),z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUpdateOneWithoutTripNestedInputSchema: z.ZodType<Prisma.FlightUpdateOneWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FlightCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => FlightUpsertWithoutTripInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FlightWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithoutTripInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateOneWithoutTripNestedInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateOneWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutTripInputSchema),z.lazy(() => PriceUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PriceCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => PriceUpsertWithoutTripInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PriceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithoutTripInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const PaymentUncheckedUpdateOneWithoutTripNestedInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateOneWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => PaymentUpsertWithoutTripInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutTripInputSchema),z.lazy(() => LocationCreateWithoutTripInputSchema).array(),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema),z.lazy(() => LocationCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => LocationUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationWhereUniqueInputSchema),z.lazy(() => LocationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => LocationUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => LocationUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateOneWithoutTripNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateOneWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FlightCreateOrConnectWithoutTripInputSchema).optional(),
  upsert: z.lazy(() => FlightUpsertWithoutTripInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => FlightWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithoutTripInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutTripInputSchema) ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutLocationsInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutLocationsInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutLocationsInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const TripUpdateOneRequiredWithoutLocationsNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutLocationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutLocationsInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutLocationsInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedUpdateWithoutLocationsInputSchema) ]).optional(),
}).strict();

export const QuoteCreateNestedOneWithoutPricingInputSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutPricingInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutPricingInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPricingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPricingInputSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional()
}).strict();

export const TripCreateNestedOneWithoutPriceInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutPriceInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutPriceInputSchema),z.lazy(() => TripUncheckedCreateWithoutPriceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutPriceInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const QuoteUpdateOneWithoutPricingNestedInputSchema: z.ZodType<Prisma.QuoteUpdateOneWithoutPricingNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutPricingInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPricingInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPricingInputSchema).optional(),
  upsert: z.lazy(() => QuoteUpsertWithoutPricingInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutPricingInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutPricingInputSchema) ]).optional(),
}).strict();

export const TripUpdateOneRequiredWithoutPriceNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutPriceNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutPriceInputSchema),z.lazy(() => TripUncheckedCreateWithoutPriceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutPriceInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutPriceInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithoutPriceInputSchema),z.lazy(() => TripUncheckedUpdateWithoutPriceInputSchema) ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutPaymentInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const QuoteCreateNestedOneWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional()
}).strict();

export const TripUpdateOneRequiredWithoutPaymentNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutPaymentInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedUpdateWithoutPaymentInputSchema) ]).optional(),
}).strict();

export const QuoteUpdateOneWithoutPaymentNestedInputSchema: z.ZodType<Prisma.QuoteUpdateOneWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPaymentInputSchema).optional(),
  upsert: z.lazy(() => QuoteUpsertWithoutPaymentInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutPaymentInputSchema) ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutFlightInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutFlightInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutFlightInputSchema),z.lazy(() => TripUncheckedCreateWithoutFlightInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutFlightInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const AirlineCreateNestedOneWithoutFlightInputSchema: z.ZodType<Prisma.AirlineCreateNestedOneWithoutFlightInput> = z.object({
  create: z.union([ z.lazy(() => AirlineCreateWithoutFlightInputSchema),z.lazy(() => AirlineUncheckedCreateWithoutFlightInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AirlineCreateOrConnectWithoutFlightInputSchema).optional(),
  connect: z.lazy(() => AirlineWhereUniqueInputSchema).optional()
}).strict();

export const AirportCreateNestedOneWithoutFlightInputSchema: z.ZodType<Prisma.AirportCreateNestedOneWithoutFlightInput> = z.object({
  create: z.union([ z.lazy(() => AirportCreateWithoutFlightInputSchema),z.lazy(() => AirportUncheckedCreateWithoutFlightInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AirportCreateOrConnectWithoutFlightInputSchema).optional(),
  connect: z.lazy(() => AirportWhereUniqueInputSchema).optional()
}).strict();

export const TripUpdateOneWithoutFlightNestedInputSchema: z.ZodType<Prisma.TripUpdateOneWithoutFlightNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutFlightInputSchema),z.lazy(() => TripUncheckedCreateWithoutFlightInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutFlightInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutFlightInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithoutFlightInputSchema),z.lazy(() => TripUncheckedUpdateWithoutFlightInputSchema) ]).optional(),
}).strict();

export const AirlineUpdateOneWithoutFlightNestedInputSchema: z.ZodType<Prisma.AirlineUpdateOneWithoutFlightNestedInput> = z.object({
  create: z.union([ z.lazy(() => AirlineCreateWithoutFlightInputSchema),z.lazy(() => AirlineUncheckedCreateWithoutFlightInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AirlineCreateOrConnectWithoutFlightInputSchema).optional(),
  upsert: z.lazy(() => AirlineUpsertWithoutFlightInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => AirlineWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AirlineUpdateWithoutFlightInputSchema),z.lazy(() => AirlineUncheckedUpdateWithoutFlightInputSchema) ]).optional(),
}).strict();

export const AirportUpdateOneWithoutFlightNestedInputSchema: z.ZodType<Prisma.AirportUpdateOneWithoutFlightNestedInput> = z.object({
  create: z.union([ z.lazy(() => AirportCreateWithoutFlightInputSchema),z.lazy(() => AirportUncheckedCreateWithoutFlightInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AirportCreateOrConnectWithoutFlightInputSchema).optional(),
  upsert: z.lazy(() => AirportUpsertWithoutFlightInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => AirportWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AirportUpdateWithoutFlightInputSchema),z.lazy(() => AirportUncheckedUpdateWithoutFlightInputSchema) ]).optional(),
}).strict();

export const QuoteCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutServiceInputSchema),z.lazy(() => QuoteCreateWithoutServiceInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutServiceInputSchema),z.lazy(() => QuoteCreateWithoutServiceInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutServiceInputSchema),z.lazy(() => QuoteCreateWithoutServiceInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutServiceInputSchema),z.lazy(() => QuoteCreateWithoutServiceInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteCreateNestedManyWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutLine_itemsInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedCreateNestedManyWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateNestedManyWithoutLine_itemsInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUpdateManyWithoutLine_itemsNestedInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutLine_itemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutLine_itemsInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutLine_itemsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutLine_itemsInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutLine_itemsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutLine_itemsInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutLine_itemsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedUpdateManyWithoutLine_itemsNestedInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutLine_itemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutLine_itemsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutLine_itemsInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutLine_itemsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutLine_itemsInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutLine_itemsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutLine_itemsInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutLine_itemsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteCreateNestedManyWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutSales_taxInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateWithoutSales_taxInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManySales_taxInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedCreateNestedManyWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateNestedManyWithoutSales_taxInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateWithoutSales_taxInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManySales_taxInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUpdateManyWithoutSales_taxNestedInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutSales_taxNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateWithoutSales_taxInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutSales_taxInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutSales_taxInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManySales_taxInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutSales_taxInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutSales_taxInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutSales_taxInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutSales_taxInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedUpdateManyWithoutSales_taxNestedInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutSales_taxNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateWithoutSales_taxInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutSales_taxInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutSales_taxInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutSales_taxInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManySales_taxInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutSales_taxInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutSales_taxInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutSales_taxInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutSales_taxInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteCreateNestedManyWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutVehicleInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutVehicleInputSchema),z.lazy(() => QuoteCreateWithoutVehicleInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyVehicleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedCreateNestedManyWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateNestedManyWithoutVehicleInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutVehicleInputSchema),z.lazy(() => QuoteCreateWithoutVehicleInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyVehicleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const QuoteUpdateManyWithoutVehicleNestedInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithoutVehicleNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutVehicleInputSchema),z.lazy(() => QuoteCreateWithoutVehicleInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutVehicleInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyVehicleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutVehicleInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutVehicleInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutVehicleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const QuoteUncheckedUpdateManyWithoutVehicleNestedInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutVehicleNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutVehicleInputSchema),z.lazy(() => QuoteCreateWithoutVehicleInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutVehicleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => QuoteUpsertWithWhereUniqueWithoutVehicleInputSchema),z.lazy(() => QuoteUpsertWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyVehicleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithWhereUniqueWithoutVehicleInputSchema),z.lazy(() => QuoteUpdateWithWhereUniqueWithoutVehicleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => QuoteUpdateManyWithWhereWithoutVehicleInputSchema),z.lazy(() => QuoteUpdateManyWithWhereWithoutVehicleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightCreateNestedManyWithoutAirlineInputSchema: z.ZodType<Prisma.FlightCreateNestedManyWithoutAirlineInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirlineInputSchema),z.lazy(() => FlightCreateWithoutAirlineInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirlineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedManyWithoutAirlineInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedManyWithoutAirlineInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirlineInputSchema),z.lazy(() => FlightCreateWithoutAirlineInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirlineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUpdateManyWithoutAirlineNestedInputSchema: z.ZodType<Prisma.FlightUpdateManyWithoutAirlineNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirlineInputSchema),z.lazy(() => FlightCreateWithoutAirlineInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirlineInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirlineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirlineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirlineInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirlineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutAirlineInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutAirlineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateManyWithoutAirlineNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutAirlineNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirlineInputSchema),z.lazy(() => FlightCreateWithoutAirlineInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirlineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirlineInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirlineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirlineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirlineInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirlineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutAirlineInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutAirlineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightCreateNestedManyWithoutAirportInputSchema: z.ZodType<Prisma.FlightCreateNestedManyWithoutAirportInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirportInputSchema),z.lazy(() => FlightCreateWithoutAirportInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedCreateNestedManyWithoutAirportInputSchema: z.ZodType<Prisma.FlightUncheckedCreateNestedManyWithoutAirportInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirportInputSchema),z.lazy(() => FlightCreateWithoutAirportInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FlightUpdateManyWithoutAirportNestedInputSchema: z.ZodType<Prisma.FlightUpdateManyWithoutAirportNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirportInputSchema),z.lazy(() => FlightCreateWithoutAirportInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirportInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirportInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutAirportInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutAirportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FlightUncheckedUpdateManyWithoutAirportNestedInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutAirportNestedInput> = z.object({
  create: z.union([ z.lazy(() => FlightCreateWithoutAirportInputSchema),z.lazy(() => FlightCreateWithoutAirportInputSchema).array(),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema),z.lazy(() => FlightCreateOrConnectWithoutAirportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirportInputSchema),z.lazy(() => FlightUpsertWithWhereUniqueWithoutAirportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FlightCreateManyAirportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FlightWhereUniqueInputSchema),z.lazy(() => FlightWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirportInputSchema),z.lazy(() => FlightUpdateWithWhereUniqueWithoutAirportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FlightUpdateManyWithWhereWithoutAirportInputSchema),z.lazy(() => FlightUpdateManyWithWhereWithoutAirportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  startsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  endsWith: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.union([ z.boolean(),z.lazy(() => BooleanFieldRefInputSchema) ]).optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.union([ z.boolean(),z.lazy(() => BooleanFieldRefInputSchema) ]).optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_starts_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_ends_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  array_contains: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_starts_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_ends_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldRefInputSchema) ]).optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => IntFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  lte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gt: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  gte: z.union([ z.number(),z.lazy(() => FloatFieldRefInputSchema) ]).optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_starts_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  string_ends_with: z.union([ z.string(),z.lazy(() => StringFieldRefInputSchema) ]).optional(),
  array_contains: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_starts_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  array_ends_with: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema) ]).optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonFieldRefInputSchema),z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const UserCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const UserCreateManyAccountInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyAccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyAccountInputSchema),z.lazy(() => UserCreateManyAccountInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone_number_country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_customer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  account_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  payment_method: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableFilterSchema).optional(),
  full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email_verified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputSchema).optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUsersInputSchema).optional(),
  conversion: z.lazy(() => ConversionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutUserNestedInputSchema).optional(),
  account: z.lazy(() => AccountUpdateOneWithoutUsersNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  session_token: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  session_token: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QuoteCreateWithoutUserInputSchema: z.ZodType<Prisma.QuoteCreateWithoutUserInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutUserInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  service_number: z.number(),
  vehicle_number: z.number(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const QuoteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManyUserInputSchema),z.lazy(() => QuoteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountCreateWithoutUsersInputSchema: z.ZodType<Prisma.AccountCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number()
}).strict();

export const AccountUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number()
}).strict();

export const AccountCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const ConversionCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable()
}).strict();

export const ConversionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable()
}).strict();

export const ConversionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ConversionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ConversionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ConversionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ConversionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConversionCreateManyUserInputSchema),z.lazy(() => ConversionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  session_token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const QuoteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const QuoteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const QuoteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => QuoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateManyMutationInputSchema),z.lazy(() => QuoteUncheckedUpdateManyWithoutQuotesInputSchema) ]),
}).strict();

export const QuoteScalarWhereInputSchema: z.ZodType<Prisma.QuoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuoteScalarWhereInputSchema),z.lazy(() => QuoteScalarWhereInputSchema).array() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  selected_hours: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  selected_passengers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  is_round_trip: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_booked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quote_total: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  service_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  vehicle_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reference_value: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sales_tax_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quote_subtotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quote_tax_total: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  short_link: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  combined_line_items: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const AccountUpsertWithoutUsersInputSchema: z.ZodType<Prisma.AccountUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const AccountUpdateWithoutUsersInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversionUpdateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ConversionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ConversionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ConversionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversionUpdateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ConversionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ConversionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ConversionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversionUpdateManyMutationInputSchema),z.lazy(() => ConversionUncheckedUpdateManyWithoutConversionInputSchema) ]),
}).strict();

export const ConversionScalarWhereInputSchema: z.ZodType<Prisma.ConversionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversionScalarWhereInputSchema),z.lazy(() => ConversionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversionScalarWhereInputSchema),z.lazy(() => ConversionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  utm_term: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  utm_medium: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  utm_source: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  utm_campaign: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gclid: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  source: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  conversion_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutConversionInputSchema: z.ZodType<Prisma.UserCreateWithoutConversionInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputSchema).optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutConversionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConversionInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutConversionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutConversionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutConversionInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversionInputSchema) ]),
}).strict();

export const UserUpsertWithoutConversionInputSchema: z.ZodType<Prisma.UserUpsertWithoutConversionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutConversionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutConversionInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversionInputSchema) ]),
}).strict();

export const UserUpdateWithoutConversionInputSchema: z.ZodType<Prisma.UserUpdateWithoutConversionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutUserNestedInputSchema).optional(),
  account: z.lazy(() => AccountUpdateOneWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutConversionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutConversionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PriceCreateWithoutQuoteInputSchema: z.ZodType<Prisma.PriceCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  trip: z.lazy(() => TripCreateNestedOneWithoutPriceInputSchema)
}).strict();

export const PriceUncheckedCreateWithoutQuoteInputSchema: z.ZodType<Prisma.PriceUncheckedCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  trip_id: z.string()
}).strict();

export const PriceCreateOrConnectWithoutQuoteInputSchema: z.ZodType<Prisma.PriceCreateOrConnectWithoutQuoteInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PriceCreateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const PriceCreateManyQuoteInputEnvelopeSchema: z.ZodType<Prisma.PriceCreateManyQuoteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PriceCreateManyQuoteInputSchema),z.lazy(() => PriceCreateManyQuoteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ServiceCreateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  service_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().optional().nullable()
}).strict();

export const ServiceUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  service_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().optional().nullable()
}).strict();

export const ServiceCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const VehicleCreateWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  vehicle_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  max_passengers: z.number().optional(),
  max_luggage: z.number().optional(),
  per_km: z.number().optional(),
  per_hour: z.number().optional(),
  min_hours: z.number().optional(),
  min_distance: z.number().optional(),
  min_rate: z.number().optional(),
  is_active: z.boolean().optional(),
  label: z.string(),
  limo_anywhere_id: z.number().optional().nullable(),
  fasttrak_id: z.number().optional().nullable(),
  vehicle_image: z.string().optional().nullable()
}).strict();

export const VehicleUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  vehicle_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  max_passengers: z.number().optional(),
  max_luggage: z.number().optional(),
  per_km: z.number().optional(),
  per_hour: z.number().optional(),
  min_hours: z.number().optional(),
  min_distance: z.number().optional(),
  min_rate: z.number().optional(),
  is_active: z.boolean().optional(),
  label: z.string(),
  limo_anywhere_id: z.number().optional().nullable(),
  fasttrak_id: z.number().optional().nullable(),
  vehicle_image: z.string().optional().nullable()
}).strict();

export const VehicleCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => VehicleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VehicleCreateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const UserCreateWithoutQuotesInputSchema: z.ZodType<Prisma.UserCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUsersInputSchema).optional(),
  conversion: z.lazy(() => ConversionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const SalesTaxCreateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  tax_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional()
}).strict();

export const SalesTaxUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  tax_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional()
}).strict();

export const SalesTaxCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => SalesTaxWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const LineItemCreateWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  item_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable()
}).strict();

export const LineItemUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  item_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable()
}).strict();

export const LineItemCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => LineItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LineItemCreateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const TripCreateWithoutQuoteInputSchema: z.ZodType<Prisma.TripCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceCreateNestedOneWithoutTripInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutQuoteInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutQuoteInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutQuoteInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const TripCreateManyQuoteInputEnvelopeSchema: z.ZodType<Prisma.TripCreateManyQuoteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TripCreateManyQuoteInputSchema),z.lazy(() => TripCreateManyQuoteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PaymentCreateWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  trip: z.lazy(() => TripCreateNestedOneWithoutPaymentInputSchema)
}).strict();

export const PaymentUncheckedCreateWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  trip_id: z.string()
}).strict();

export const PaymentCreateOrConnectWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutQuoteInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const PaymentCreateManyQuoteInputEnvelopeSchema: z.ZodType<Prisma.PaymentCreateManyQuoteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PaymentCreateManyQuoteInputSchema),z.lazy(() => PaymentCreateManyQuoteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PriceUpsertWithWhereUniqueWithoutQuoteInputSchema: z.ZodType<Prisma.PriceUpsertWithWhereUniqueWithoutQuoteInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PriceUpdateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutQuoteInputSchema) ]),
  create: z.union([ z.lazy(() => PriceCreateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const PriceUpdateWithWhereUniqueWithoutQuoteInputSchema: z.ZodType<Prisma.PriceUpdateWithWhereUniqueWithoutQuoteInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateWithoutQuoteInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutQuoteInputSchema) ]),
}).strict();

export const PriceUpdateManyWithWhereWithoutQuoteInputSchema: z.ZodType<Prisma.PriceUpdateManyWithWhereWithoutQuoteInput> = z.object({
  where: z.lazy(() => PriceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateManyMutationInputSchema),z.lazy(() => PriceUncheckedUpdateManyWithoutPricingInputSchema) ]),
}).strict();

export const PriceScalarWhereInputSchema: z.ZodType<Prisma.PriceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  line_items_list: z.lazy(() => JsonNullableFilterSchema).optional(),
  line_items_subtotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_tax: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_total: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ServiceUpsertWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutQuotesInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutQuotesInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VehicleUpsertWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleUpsertWithoutQuotesInput> = z.object({
  update: z.union([ z.lazy(() => VehicleUpdateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedUpdateWithoutQuotesInputSchema) ]),
  create: z.union([ z.lazy(() => VehicleCreateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const VehicleUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  max_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  max_luggage: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  per_km: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  per_hour: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  min_hours: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_distance: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_rate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fasttrak_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VehicleUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  max_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  max_luggage: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  per_km: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  per_hour: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  min_hours: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_distance: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  min_rate: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fasttrak_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutQuotesInputSchema: z.ZodType<Prisma.UserUpsertWithoutQuotesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutQuotesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const UserUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.UserUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  account: z.lazy(() => AccountUpdateOneWithoutUsersNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SalesTaxUpsertWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUpsertWithoutQuotesInput> = z.object({
  update: z.union([ z.lazy(() => SalesTaxUpdateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedUpdateWithoutQuotesInputSchema) ]),
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const SalesTaxUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesTaxUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUncheckedUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LineItemUpsertWithWhereUniqueWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUpsertWithWhereUniqueWithoutQuotesInput> = z.object({
  where: z.lazy(() => LineItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LineItemUpdateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedUpdateWithoutQuotesInputSchema) ]),
  create: z.union([ z.lazy(() => LineItemCreateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const LineItemUpdateWithWhereUniqueWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUpdateWithWhereUniqueWithoutQuotesInput> = z.object({
  where: z.lazy(() => LineItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LineItemUpdateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedUpdateWithoutQuotesInputSchema) ]),
}).strict();

export const LineItemUpdateManyWithWhereWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUpdateManyWithWhereWithoutQuotesInput> = z.object({
  where: z.lazy(() => LineItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LineItemUpdateManyMutationInputSchema),z.lazy(() => LineItemUncheckedUpdateManyWithoutLine_itemsInputSchema) ]),
}).strict();

export const LineItemScalarWhereInputSchema: z.ZodType<Prisma.LineItemScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LineItemScalarWhereInputSchema),z.lazy(() => LineItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LineItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LineItemScalarWhereInputSchema),z.lazy(() => LineItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  item_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_percentage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_taxable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  applies_to: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TripUpsertWithWhereUniqueWithoutQuoteInputSchema: z.ZodType<Prisma.TripUpsertWithWhereUniqueWithoutQuoteInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TripUpdateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedUpdateWithoutQuoteInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const TripUpdateWithWhereUniqueWithoutQuoteInputSchema: z.ZodType<Prisma.TripUpdateWithWhereUniqueWithoutQuoteInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TripUpdateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedUpdateWithoutQuoteInputSchema) ]),
}).strict();

export const TripUpdateManyWithWhereWithoutQuoteInputSchema: z.ZodType<Prisma.TripUpdateManyWithWhereWithoutQuoteInput> = z.object({
  where: z.lazy(() => TripScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TripUpdateManyMutationInputSchema),z.lazy(() => TripUncheckedUpdateManyWithoutTripsInputSchema) ]),
}).strict();

export const TripScalarWhereInputSchema: z.ZodType<Prisma.TripScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pickup_date: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pickup_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  distance_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration_value: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  distance_value: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  calculated_distance: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  service_label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  vehicle_label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  affiliate_payout: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  is_farmed_out: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_return: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip_order: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  price_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  carry_on_luggage: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  large_luggage: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const PaymentUpsertWithWhereUniqueWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutQuoteInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PaymentUpdateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutQuoteInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const PaymentUpdateWithWhereUniqueWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutQuoteInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PaymentUpdateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutQuoteInputSchema) ]),
}).strict();

export const PaymentUpdateManyWithWhereWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutQuoteInput> = z.object({
  where: z.lazy(() => PaymentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PaymentUpdateManyMutationInputSchema),z.lazy(() => PaymentUncheckedUpdateManyWithoutPaymentInputSchema) ]),
}).strict();

export const PaymentScalarWhereInputSchema: z.ZodType<Prisma.PaymentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  is_preauthorized: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_paid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  setup_intent: z.lazy(() => JsonNullableFilterSchema).optional(),
  payment_intent: z.lazy(() => JsonNullableFilterSchema).optional(),
  payment_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PriceCreateWithoutTripInputSchema: z.ZodType<Prisma.PriceCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutPricingInputSchema).optional()
}).strict();

export const PriceUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.PriceUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  quote_number: z.number().optional().nullable()
}).strict();

export const PriceCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.PriceCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PriceCreateWithoutTripInputSchema),z.lazy(() => PriceUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const QuoteCreateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteCreateWithoutTripsInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutTripsInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number(),
  vehicle_number: z.number(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutTripsInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutTripsInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutTripsInputSchema) ]),
}).strict();

export const PaymentCreateWithoutTripInputSchema: z.ZodType<Prisma.PaymentCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutPaymentInputSchema).optional()
}).strict();

export const PaymentUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  quote_number: z.number().optional().nullable()
}).strict();

export const PaymentCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const LocationCreateWithoutTripInputSchema: z.ZodType<Prisma.LocationCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  formatted_address: z.string(),
  full_name: z.string().optional().nullable(),
  place_id: z.string(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  route_order: z.number().optional()
}).strict();

export const LocationUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  formatted_address: z.string(),
  full_name: z.string().optional().nullable(),
  place_id: z.string(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  route_order: z.number().optional()
}).strict();

export const LocationCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutTripInputSchema),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const LocationCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.LocationCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationCreateManyTripInputSchema),z.lazy(() => LocationCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FlightCreateWithoutTripInputSchema: z.ZodType<Prisma.FlightCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable(),
  airline: z.lazy(() => AirlineCreateNestedOneWithoutFlightInputSchema).optional(),
  airport: z.lazy(() => AirportCreateNestedOneWithoutFlightInputSchema).optional()
}).strict();

export const FlightUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  airline_id: z.number().optional().nullable(),
  airport_id: z.number().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable()
}).strict();

export const FlightCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const PriceUpsertWithoutTripInputSchema: z.ZodType<Prisma.PriceUpsertWithoutTripInput> = z.object({
  update: z.union([ z.lazy(() => PriceUpdateWithoutTripInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => PriceCreateWithoutTripInputSchema),z.lazy(() => PriceUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const PriceUpdateWithoutTripInputSchema: z.ZodType<Prisma.PriceUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote: z.lazy(() => QuoteUpdateOneWithoutPricingNestedInputSchema).optional()
}).strict();

export const PriceUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const QuoteUpsertWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUpsertWithoutTripsInput> = z.object({
  update: z.union([ z.lazy(() => QuoteUpdateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutTripsInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutTripsInputSchema) ]),
}).strict();

export const QuoteUpdateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutTripsInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutTripsInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const PaymentUpsertWithoutTripInputSchema: z.ZodType<Prisma.PaymentUpsertWithoutTripInput> = z.object({
  update: z.union([ z.lazy(() => PaymentUpdateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const PaymentUpdateWithoutTripInputSchema: z.ZodType<Prisma.PaymentUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote: z.lazy(() => QuoteUpdateOneWithoutPaymentNestedInputSchema).optional()
}).strict();

export const PaymentUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.LocationUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationUpdateWithoutTripInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutTripInputSchema),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const LocationUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.LocationUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateWithoutTripInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const LocationUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.LocationUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => LocationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationUpdateManyMutationInputSchema),z.lazy(() => LocationUncheckedUpdateManyWithoutLocationsInputSchema) ]),
}).strict();

export const LocationScalarWhereInputSchema: z.ZodType<Prisma.LocationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereInputSchema),z.lazy(() => LocationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  formatted_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  types: z.lazy(() => JsonFilterSchema).optional(),
  is_origin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_destination: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_waypoint: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  trip_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  route_order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const FlightUpsertWithoutTripInputSchema: z.ZodType<Prisma.FlightUpsertWithoutTripInput> = z.object({
  update: z.union([ z.lazy(() => FlightUpdateWithoutTripInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const FlightUpdateWithoutTripInputSchema: z.ZodType<Prisma.FlightUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline: z.lazy(() => AirlineUpdateOneWithoutFlightNestedInputSchema).optional(),
  airport: z.lazy(() => AirportUpdateOneWithoutFlightNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airport_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripCreateWithoutLocationsInputSchema: z.ZodType<Prisma.TripCreateWithoutLocationsInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceCreateNestedOneWithoutTripInputSchema).optional(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutLocationsInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutLocationsInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  quote_number: z.number(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutLocationsInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutLocationsInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedCreateWithoutLocationsInputSchema) ]),
}).strict();

export const TripUpsertWithoutLocationsInputSchema: z.ZodType<Prisma.TripUpsertWithoutLocationsInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedUpdateWithoutLocationsInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedCreateWithoutLocationsInputSchema) ]),
}).strict();

export const TripUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.TripUpdateWithoutLocationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUpdateOneWithoutTripNestedInputSchema).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutLocationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const QuoteCreateWithoutPricingInputSchema: z.ZodType<Prisma.QuoteCreateWithoutPricingInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutPricingInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutPricingInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number(),
  vehicle_number: z.number(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutPricingInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutPricingInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutPricingInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPricingInputSchema) ]),
}).strict();

export const TripCreateWithoutPriceInputSchema: z.ZodType<Prisma.TripCreateWithoutPriceInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutPriceInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutPriceInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  quote_number: z.number(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutPriceInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutPriceInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutPriceInputSchema),z.lazy(() => TripUncheckedCreateWithoutPriceInputSchema) ]),
}).strict();

export const QuoteUpsertWithoutPricingInputSchema: z.ZodType<Prisma.QuoteUpsertWithoutPricingInput> = z.object({
  update: z.union([ z.lazy(() => QuoteUpdateWithoutPricingInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutPricingInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutPricingInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPricingInputSchema) ]),
}).strict();

export const QuoteUpdateWithoutPricingInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutPricingInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutPricingInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutPricingInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const TripUpsertWithoutPriceInputSchema: z.ZodType<Prisma.TripUpsertWithoutPriceInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutPriceInputSchema),z.lazy(() => TripUncheckedUpdateWithoutPriceInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutPriceInputSchema),z.lazy(() => TripUncheckedCreateWithoutPriceInputSchema) ]),
}).strict();

export const TripUpdateWithoutPriceInputSchema: z.ZodType<Prisma.TripUpdateWithoutPriceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutPriceInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutPriceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripCreateWithoutPaymentInputSchema: z.ZodType<Prisma.TripCreateWithoutPaymentInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceCreateNestedOneWithoutTripInputSchema).optional(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutPaymentInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutPaymentInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  quote_number: z.number(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutPaymentInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutPaymentInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const QuoteCreateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteCreateWithoutPaymentInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutPaymentInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number(),
  vehicle_number: z.number(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutPaymentInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const TripUpsertWithoutPaymentInputSchema: z.ZodType<Prisma.TripUpsertWithoutPaymentInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedUpdateWithoutPaymentInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const TripUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.TripUpdateWithoutPaymentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUpdateOneWithoutTripNestedInputSchema).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutPaymentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const QuoteUpsertWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUpsertWithoutPaymentInput> = z.object({
  update: z.union([ z.lazy(() => QuoteUpdateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutPaymentInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const QuoteUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutPaymentInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutPaymentInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const TripCreateWithoutFlightInputSchema: z.ZodType<Prisma.TripCreateWithoutFlightInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceCreateNestedOneWithoutTripInputSchema).optional(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutFlightInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutFlightInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().optional().nullable(),
  distance_value: z.number().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  quote_number: z.number(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().optional().nullable(),
  large_luggage: z.number().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutFlightInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutFlightInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutFlightInputSchema),z.lazy(() => TripUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const AirlineCreateWithoutFlightInputSchema: z.ZodType<Prisma.AirlineCreateWithoutFlightInput> = z.object({
  name: z.string().optional().nullable(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable(),
  callsign: z.string().optional().nullable(),
  country: z.string().optional().nullable()
}).strict();

export const AirlineUncheckedCreateWithoutFlightInputSchema: z.ZodType<Prisma.AirlineUncheckedCreateWithoutFlightInput> = z.object({
  id: z.number().optional(),
  name: z.string().optional().nullable(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable(),
  callsign: z.string().optional().nullable(),
  country: z.string().optional().nullable()
}).strict();

export const AirlineCreateOrConnectWithoutFlightInputSchema: z.ZodType<Prisma.AirlineCreateOrConnectWithoutFlightInput> = z.object({
  where: z.lazy(() => AirlineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AirlineCreateWithoutFlightInputSchema),z.lazy(() => AirlineUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const AirportCreateWithoutFlightInputSchema: z.ZodType<Prisma.AirportCreateWithoutFlightInput> = z.object({
  name: z.string(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  lat: z.number(),
  lng: z.number(),
  timezone: z.string(),
  type: z.string(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable()
}).strict();

export const AirportUncheckedCreateWithoutFlightInputSchema: z.ZodType<Prisma.AirportUncheckedCreateWithoutFlightInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  lat: z.number(),
  lng: z.number(),
  timezone: z.string(),
  type: z.string(),
  iata: z.string().optional().nullable(),
  icao: z.string().optional().nullable()
}).strict();

export const AirportCreateOrConnectWithoutFlightInputSchema: z.ZodType<Prisma.AirportCreateOrConnectWithoutFlightInput> = z.object({
  where: z.lazy(() => AirportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AirportCreateWithoutFlightInputSchema),z.lazy(() => AirportUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const TripUpsertWithoutFlightInputSchema: z.ZodType<Prisma.TripUpsertWithoutFlightInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutFlightInputSchema),z.lazy(() => TripUncheckedUpdateWithoutFlightInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutFlightInputSchema),z.lazy(() => TripUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const TripUpdateWithoutFlightInputSchema: z.ZodType<Prisma.TripUpdateWithoutFlightInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUpdateOneWithoutTripNestedInputSchema).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutFlightInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutFlightInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const AirlineUpsertWithoutFlightInputSchema: z.ZodType<Prisma.AirlineUpsertWithoutFlightInput> = z.object({
  update: z.union([ z.lazy(() => AirlineUpdateWithoutFlightInputSchema),z.lazy(() => AirlineUncheckedUpdateWithoutFlightInputSchema) ]),
  create: z.union([ z.lazy(() => AirlineCreateWithoutFlightInputSchema),z.lazy(() => AirlineUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const AirlineUpdateWithoutFlightInputSchema: z.ZodType<Prisma.AirlineUpdateWithoutFlightInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  callsign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AirlineUncheckedUpdateWithoutFlightInputSchema: z.ZodType<Prisma.AirlineUncheckedUpdateWithoutFlightInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  callsign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AirportUpsertWithoutFlightInputSchema: z.ZodType<Prisma.AirportUpsertWithoutFlightInput> = z.object({
  update: z.union([ z.lazy(() => AirportUpdateWithoutFlightInputSchema),z.lazy(() => AirportUncheckedUpdateWithoutFlightInputSchema) ]),
  create: z.union([ z.lazy(() => AirportCreateWithoutFlightInputSchema),z.lazy(() => AirportUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const AirportUpdateWithoutFlightInputSchema: z.ZodType<Prisma.AirportUpdateWithoutFlightInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timezone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AirportUncheckedUpdateWithoutFlightInputSchema: z.ZodType<Prisma.AirportUncheckedUpdateWithoutFlightInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timezone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  iata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icao: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const QuoteCreateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteCreateWithoutServiceInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutServiceInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  vehicle_number: z.number(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const QuoteCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManyServiceInputSchema),z.lazy(() => QuoteCreateManyServiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QuoteUpsertWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const QuoteUpdateWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const QuoteUpdateManyWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => QuoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateManyMutationInputSchema),z.lazy(() => QuoteUncheckedUpdateManyWithoutQuotesInputSchema) ]),
}).strict();

export const QuoteCreateWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteCreateWithoutLine_itemsInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutLine_itemsInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number(),
  vehicle_number: z.number(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutLine_itemsInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema) ]),
}).strict();

export const QuoteUpsertWithWhereUniqueWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutLine_itemsInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutLine_itemsInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutLine_itemsInputSchema) ]),
}).strict();

export const QuoteUpdateWithWhereUniqueWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutLine_itemsInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateWithoutLine_itemsInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutLine_itemsInputSchema) ]),
}).strict();

export const QuoteUpdateManyWithWhereWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutLine_itemsInput> = z.object({
  where: z.lazy(() => QuoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateManyMutationInputSchema),z.lazy(() => QuoteUncheckedUpdateManyWithoutQuotesInputSchema) ]),
}).strict();

export const QuoteCreateWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteCreateWithoutSales_taxInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutSales_taxInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number(),
  vehicle_number: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutSales_taxInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema) ]),
}).strict();

export const QuoteCreateManySales_taxInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManySales_taxInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManySales_taxInputSchema),z.lazy(() => QuoteCreateManySales_taxInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QuoteUpsertWithWhereUniqueWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutSales_taxInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutSales_taxInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema) ]),
}).strict();

export const QuoteUpdateWithWhereUniqueWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutSales_taxInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutSales_taxInputSchema) ]),
}).strict();

export const QuoteUpdateManyWithWhereWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutSales_taxInput> = z.object({
  where: z.lazy(() => QuoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateManyMutationInputSchema),z.lazy(() => QuoteUncheckedUpdateManyWithoutQuotesInputSchema) ]),
}).strict();

export const QuoteCreateWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteCreateWithoutVehicleInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceCreateNestedManyWithoutQuoteInputSchema).optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteUncheckedCreateWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutVehicleInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().optional(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputSchema).optional()
}).strict();

export const QuoteCreateOrConnectWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutVehicleInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema) ]),
}).strict();

export const QuoteCreateManyVehicleInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManyVehicleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManyVehicleInputSchema),z.lazy(() => QuoteCreateManyVehicleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const QuoteUpsertWithWhereUniqueWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUpsertWithWhereUniqueWithoutVehicleInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutVehicleInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema) ]),
}).strict();

export const QuoteUpdateWithWhereUniqueWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUpdateWithWhereUniqueWithoutVehicleInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutVehicleInputSchema) ]),
}).strict();

export const QuoteUpdateManyWithWhereWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUpdateManyWithWhereWithoutVehicleInput> = z.object({
  where: z.lazy(() => QuoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => QuoteUpdateManyMutationInputSchema),z.lazy(() => QuoteUncheckedUpdateManyWithoutQuotesInputSchema) ]),
}).strict();

export const FlightCreateWithoutAirlineInputSchema: z.ZodType<Prisma.FlightCreateWithoutAirlineInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable(),
  trip: z.lazy(() => TripCreateNestedOneWithoutFlightInputSchema).optional(),
  airport: z.lazy(() => AirportCreateNestedOneWithoutFlightInputSchema).optional()
}).strict();

export const FlightUncheckedCreateWithoutAirlineInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutAirlineInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  trip_id: z.string().optional().nullable(),
  airport_id: z.number().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable()
}).strict();

export const FlightCreateOrConnectWithoutAirlineInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutAirlineInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema) ]),
}).strict();

export const FlightCreateManyAirlineInputEnvelopeSchema: z.ZodType<Prisma.FlightCreateManyAirlineInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FlightCreateManyAirlineInputSchema),z.lazy(() => FlightCreateManyAirlineInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FlightUpsertWithWhereUniqueWithoutAirlineInputSchema: z.ZodType<Prisma.FlightUpsertWithWhereUniqueWithoutAirlineInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FlightUpdateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutAirlineInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirlineInputSchema) ]),
}).strict();

export const FlightUpdateWithWhereUniqueWithoutAirlineInputSchema: z.ZodType<Prisma.FlightUpdateWithWhereUniqueWithoutAirlineInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateWithoutAirlineInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutAirlineInputSchema) ]),
}).strict();

export const FlightUpdateManyWithWhereWithoutAirlineInputSchema: z.ZodType<Prisma.FlightUpdateManyWithWhereWithoutAirlineInput> = z.object({
  where: z.lazy(() => FlightScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateManyMutationInputSchema),z.lazy(() => FlightUncheckedUpdateManyWithoutFlightInputSchema) ]),
}).strict();

export const FlightScalarWhereInputSchema: z.ZodType<Prisma.FlightScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightScalarWhereInputSchema),z.lazy(() => FlightScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  airline_code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  airline_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flight_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_landed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_arrived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  departure_time_actual: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  arrival_time_actual: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  airline_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  airport_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  departure_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  arrival_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FlightCreateWithoutAirportInputSchema: z.ZodType<Prisma.FlightCreateWithoutAirportInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable(),
  trip: z.lazy(() => TripCreateNestedOneWithoutFlightInputSchema).optional(),
  airline: z.lazy(() => AirlineCreateNestedOneWithoutFlightInputSchema).optional()
}).strict();

export const FlightUncheckedCreateWithoutAirportInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutAirportInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  trip_id: z.string().optional().nullable(),
  airline_id: z.number().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable()
}).strict();

export const FlightCreateOrConnectWithoutAirportInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutAirportInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema) ]),
}).strict();

export const FlightCreateManyAirportInputEnvelopeSchema: z.ZodType<Prisma.FlightCreateManyAirportInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FlightCreateManyAirportInputSchema),z.lazy(() => FlightCreateManyAirportInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FlightUpsertWithWhereUniqueWithoutAirportInputSchema: z.ZodType<Prisma.FlightUpsertWithWhereUniqueWithoutAirportInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FlightUpdateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutAirportInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedCreateWithoutAirportInputSchema) ]),
}).strict();

export const FlightUpdateWithWhereUniqueWithoutAirportInputSchema: z.ZodType<Prisma.FlightUpdateWithWhereUniqueWithoutAirportInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateWithoutAirportInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutAirportInputSchema) ]),
}).strict();

export const FlightUpdateManyWithWhereWithoutAirportInputSchema: z.ZodType<Prisma.FlightUpdateManyWithWhereWithoutAirportInput> = z.object({
  where: z.lazy(() => FlightScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FlightUpdateManyMutationInputSchema),z.lazy(() => FlightUncheckedUpdateManyWithoutFlightInputSchema) ]),
}).strict();

export const UserCreateManyAccountInputSchema: z.ZodType<Prisma.UserCreateManyAccountInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  phone_number_country: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.string().optional().nullable(),
  email_verified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();

export const UserUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number_country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  payment_method: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_verified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  session_token: z.string(),
  expires: z.coerce.date()
}).strict();

export const QuoteCreateManyUserInputSchema: z.ZodType<Prisma.QuoteCreateManyUserInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  quote_total: z.number(),
  service_number: z.number().int(),
  vehicle_number: z.number().int(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().int().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ConversionCreateManyUserInputSchema: z.ZodType<Prisma.ConversionCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional().nullable(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  session_token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuoteUpdateWithoutUserInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutUserInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutUserInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateManyWithoutQuotesInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutQuotesInput> = z.object({
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ConversionUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ConversionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ConversionUncheckedUpdateManyWithoutConversionInputSchema: z.ZodType<Prisma.ConversionUncheckedUpdateManyWithoutConversionInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PriceCreateManyQuoteInputSchema: z.ZodType<Prisma.PriceCreateManyQuoteInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  trip_id: z.string()
}).strict();

export const TripCreateManyQuoteInputSchema: z.ZodType<Prisma.TripCreateManyQuoteInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.string().optional().nullable(),
  pickup_time: z.string().optional().nullable(),
  distance_text: z.string().optional().nullable(),
  duration_text: z.string().optional().nullable(),
  duration_value: z.number().int().optional().nullable(),
  distance_value: z.number().int().optional().nullable(),
  calculated_distance: z.number().optional().nullable(),
  service_label: z.string().optional().nullable(),
  vehicle_label: z.string().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  trip_order: z.number().int().optional().nullable(),
  price_id: z.string().optional().nullable(),
  carry_on_luggage: z.number().int().optional().nullable(),
  large_luggage: z.number().int().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const PaymentCreateManyQuoteInputSchema: z.ZodType<Prisma.PaymentCreateManyQuoteInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  is_preauthorized: z.boolean().optional(),
  is_paid: z.boolean().optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  trip_id: z.string()
}).strict();

export const PriceUpdateWithoutQuoteInputSchema: z.ZodType<Prisma.PriceUpdateWithoutQuoteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutPriceNestedInputSchema).optional()
}).strict();

export const PriceUncheckedUpdateWithoutQuoteInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateWithoutQuoteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateManyWithoutPricingInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutPricingInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LineItemUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_percentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  applies_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LineItemUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUncheckedUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  item_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_percentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  applies_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LineItemUncheckedUpdateManyWithoutLine_itemsInputSchema: z.ZodType<Prisma.LineItemUncheckedUpdateManyWithoutLine_itemsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  item_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_percentage: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_taxable: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  applies_to: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripUpdateWithoutQuoteInputSchema: z.ZodType<Prisma.TripUpdateWithoutQuoteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUpdateOneWithoutTripNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutQuoteInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutQuoteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  price: z.lazy(() => PriceUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateManyWithoutTripsInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyWithoutTripsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  distance_value: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  calculated_distance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  service_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vehicle_label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_order: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  carry_on_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  large_luggage: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const PaymentUpdateWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUpdateWithoutQuoteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutPaymentNestedInputSchema).optional()
}).strict();

export const PaymentUncheckedUpdateWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateWithoutQuoteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentUncheckedUpdateManyWithoutPaymentInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutPaymentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  is_preauthorized: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_paid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  setup_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_intent: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  payment_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationCreateManyTripInputSchema: z.ZodType<Prisma.LocationCreateManyTripInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  lat: z.number(),
  lng: z.number(),
  name: z.string(),
  formatted_address: z.string(),
  full_name: z.string().optional().nullable(),
  place_id: z.string(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  route_order: z.number().int().optional()
}).strict();

export const LocationUpdateWithoutTripInputSchema: z.ZodType<Prisma.LocationUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  route_order: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  route_order: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationUncheckedUpdateManyWithoutLocationsInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyWithoutLocationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  route_order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuoteCreateManyServiceInputSchema: z.ZodType<Prisma.QuoteCreateManyServiceInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  vehicle_number: z.number().int(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().int().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const QuoteUpdateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutServiceInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutServiceInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUpdateWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutLine_itemsInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutLine_itemsInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteCreateManySales_taxInputSchema: z.ZodType<Prisma.QuoteCreateManySales_taxInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number().int(),
  vehicle_number: z.number().int(),
  reference_value: z.string().optional().nullable(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const QuoteUpdateWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutSales_taxInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutSales_taxInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteCreateManyVehicleInputSchema: z.ZodType<Prisma.QuoteCreateManyVehicleInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  id: z.string().uuid().optional(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  quote_total: z.number(),
  service_number: z.number().int(),
  reference_value: z.string().optional().nullable(),
  sales_tax_number: z.number().int().optional(),
  quote_subtotal: z.number().optional().nullable(),
  quote_tax_total: z.number().optional().nullable(),
  short_link: z.string().optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const QuoteUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutVehicleInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUpdateManyWithoutQuoteNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const QuoteUncheckedUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutVehicleInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quote_total: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  service_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reference_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sales_tax_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quote_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_tax_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  short_link: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  combined_line_items: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  pricing: z.lazy(() => PriceUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional()
}).strict();

export const FlightCreateManyAirlineInputSchema: z.ZodType<Prisma.FlightCreateManyAirlineInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  trip_id: z.string().optional().nullable(),
  airport_id: z.number().int().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable()
}).strict();

export const FlightUpdateWithoutAirlineInputSchema: z.ZodType<Prisma.FlightUpdateWithoutAirlineInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => TripUpdateOneWithoutFlightNestedInputSchema).optional(),
  airport: z.lazy(() => AirportUpdateOneWithoutFlightNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutAirlineInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutAirlineInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airport_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUncheckedUpdateManyWithoutFlightInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyWithoutFlightInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airport_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightCreateManyAirportInputSchema: z.ZodType<Prisma.FlightCreateManyAirportInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string().optional().nullable(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time_actual: z.string().optional().nullable(),
  arrival_time_actual: z.string().optional().nullable(),
  trip_id: z.string().optional().nullable(),
  airline_id: z.number().int().optional().nullable(),
  departure_time: z.string().optional().nullable(),
  arrival_time: z.string().optional().nullable()
}).strict();

export const FlightUpdateWithoutAirportInputSchema: z.ZodType<Prisma.FlightUpdateWithoutAirportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => TripUpdateOneWithoutFlightNestedInputSchema).optional(),
  airline: z.lazy(() => AirlineUpdateOneWithoutFlightNestedInputSchema).optional()
}).strict();

export const FlightUncheckedUpdateWithoutAirportInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutAirportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  airline_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const AffiliateFindFirstArgsSchema: z.ZodType<Prisma.AffiliateFindFirstArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  where: AffiliateWhereInputSchema.optional(),
  orderBy: z.union([ AffiliateOrderByWithRelationInputSchema.array(),AffiliateOrderByWithRelationInputSchema ]).optional(),
  cursor: AffiliateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AffiliateScalarFieldEnumSchema.array().optional(),
}).strict()

export const AffiliateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AffiliateFindFirstOrThrowArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  where: AffiliateWhereInputSchema.optional(),
  orderBy: z.union([ AffiliateOrderByWithRelationInputSchema.array(),AffiliateOrderByWithRelationInputSchema ]).optional(),
  cursor: AffiliateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AffiliateScalarFieldEnumSchema.array().optional(),
}).strict()

export const AffiliateFindManyArgsSchema: z.ZodType<Prisma.AffiliateFindManyArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  where: AffiliateWhereInputSchema.optional(),
  orderBy: z.union([ AffiliateOrderByWithRelationInputSchema.array(),AffiliateOrderByWithRelationInputSchema ]).optional(),
  cursor: AffiliateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AffiliateScalarFieldEnumSchema.array().optional(),
}).strict()

export const AffiliateAggregateArgsSchema: z.ZodType<Prisma.AffiliateAggregateArgs> = z.object({
  where: AffiliateWhereInputSchema.optional(),
  orderBy: z.union([ AffiliateOrderByWithRelationInputSchema.array(),AffiliateOrderByWithRelationInputSchema ]).optional(),
  cursor: AffiliateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AffiliateGroupByArgsSchema: z.ZodType<Prisma.AffiliateGroupByArgs> = z.object({
  where: AffiliateWhereInputSchema.optional(),
  orderBy: z.union([ AffiliateOrderByWithAggregationInputSchema.array(),AffiliateOrderByWithAggregationInputSchema ]).optional(),
  by: AffiliateScalarFieldEnumSchema.array(),
  having: AffiliateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AffiliateFindUniqueArgsSchema: z.ZodType<Prisma.AffiliateFindUniqueArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  where: AffiliateWhereUniqueInputSchema,
}).strict()

export const AffiliateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AffiliateFindUniqueOrThrowArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  where: AffiliateWhereUniqueInputSchema,
}).strict()

export const DriverFindFirstArgsSchema: z.ZodType<Prisma.DriverFindFirstArgs> = z.object({
  select: DriverSelectSchema.optional(),
  where: DriverWhereInputSchema.optional(),
  orderBy: z.union([ DriverOrderByWithRelationInputSchema.array(),DriverOrderByWithRelationInputSchema ]).optional(),
  cursor: DriverWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DriverScalarFieldEnumSchema.array().optional(),
}).strict()

export const DriverFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DriverFindFirstOrThrowArgs> = z.object({
  select: DriverSelectSchema.optional(),
  where: DriverWhereInputSchema.optional(),
  orderBy: z.union([ DriverOrderByWithRelationInputSchema.array(),DriverOrderByWithRelationInputSchema ]).optional(),
  cursor: DriverWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DriverScalarFieldEnumSchema.array().optional(),
}).strict()

export const DriverFindManyArgsSchema: z.ZodType<Prisma.DriverFindManyArgs> = z.object({
  select: DriverSelectSchema.optional(),
  where: DriverWhereInputSchema.optional(),
  orderBy: z.union([ DriverOrderByWithRelationInputSchema.array(),DriverOrderByWithRelationInputSchema ]).optional(),
  cursor: DriverWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DriverScalarFieldEnumSchema.array().optional(),
}).strict()

export const DriverAggregateArgsSchema: z.ZodType<Prisma.DriverAggregateArgs> = z.object({
  where: DriverWhereInputSchema.optional(),
  orderBy: z.union([ DriverOrderByWithRelationInputSchema.array(),DriverOrderByWithRelationInputSchema ]).optional(),
  cursor: DriverWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DriverGroupByArgsSchema: z.ZodType<Prisma.DriverGroupByArgs> = z.object({
  where: DriverWhereInputSchema.optional(),
  orderBy: z.union([ DriverOrderByWithAggregationInputSchema.array(),DriverOrderByWithAggregationInputSchema ]).optional(),
  by: DriverScalarFieldEnumSchema.array(),
  having: DriverScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DriverFindUniqueArgsSchema: z.ZodType<Prisma.DriverFindUniqueArgs> = z.object({
  select: DriverSelectSchema.optional(),
  where: DriverWhereUniqueInputSchema,
}).strict()

export const DriverFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DriverFindUniqueOrThrowArgs> = z.object({
  select: DriverSelectSchema.optional(),
  where: DriverWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const ConversionFindFirstArgsSchema: z.ZodType<Prisma.ConversionFindFirstArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  where: ConversionWhereInputSchema.optional(),
  orderBy: z.union([ ConversionOrderByWithRelationInputSchema.array(),ConversionOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ConversionScalarFieldEnumSchema.array().optional(),
}).strict()

export const ConversionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConversionFindFirstOrThrowArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  where: ConversionWhereInputSchema.optional(),
  orderBy: z.union([ ConversionOrderByWithRelationInputSchema.array(),ConversionOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ConversionScalarFieldEnumSchema.array().optional(),
}).strict()

export const ConversionFindManyArgsSchema: z.ZodType<Prisma.ConversionFindManyArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  where: ConversionWhereInputSchema.optional(),
  orderBy: z.union([ ConversionOrderByWithRelationInputSchema.array(),ConversionOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ConversionScalarFieldEnumSchema.array().optional(),
}).strict()

export const ConversionAggregateArgsSchema: z.ZodType<Prisma.ConversionAggregateArgs> = z.object({
  where: ConversionWhereInputSchema.optional(),
  orderBy: z.union([ ConversionOrderByWithRelationInputSchema.array(),ConversionOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ConversionGroupByArgsSchema: z.ZodType<Prisma.ConversionGroupByArgs> = z.object({
  where: ConversionWhereInputSchema.optional(),
  orderBy: z.union([ ConversionOrderByWithAggregationInputSchema.array(),ConversionOrderByWithAggregationInputSchema ]).optional(),
  by: ConversionScalarFieldEnumSchema.array(),
  having: ConversionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ConversionFindUniqueArgsSchema: z.ZodType<Prisma.ConversionFindUniqueArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  where: ConversionWhereUniqueInputSchema,
}).strict()

export const ConversionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConversionFindUniqueOrThrowArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  where: ConversionWhereUniqueInputSchema,
}).strict()

export const QuoteFindFirstArgsSchema: z.ZodType<Prisma.QuoteFindFirstArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  where: QuoteWhereInputSchema.optional(),
  orderBy: z.union([ QuoteOrderByWithRelationInputSchema.array(),QuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: QuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: QuoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const QuoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.QuoteFindFirstOrThrowArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  where: QuoteWhereInputSchema.optional(),
  orderBy: z.union([ QuoteOrderByWithRelationInputSchema.array(),QuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: QuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: QuoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const QuoteFindManyArgsSchema: z.ZodType<Prisma.QuoteFindManyArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  where: QuoteWhereInputSchema.optional(),
  orderBy: z.union([ QuoteOrderByWithRelationInputSchema.array(),QuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: QuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: QuoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const QuoteAggregateArgsSchema: z.ZodType<Prisma.QuoteAggregateArgs> = z.object({
  where: QuoteWhereInputSchema.optional(),
  orderBy: z.union([ QuoteOrderByWithRelationInputSchema.array(),QuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: QuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const QuoteGroupByArgsSchema: z.ZodType<Prisma.QuoteGroupByArgs> = z.object({
  where: QuoteWhereInputSchema.optional(),
  orderBy: z.union([ QuoteOrderByWithAggregationInputSchema.array(),QuoteOrderByWithAggregationInputSchema ]).optional(),
  by: QuoteScalarFieldEnumSchema.array(),
  having: QuoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const QuoteFindUniqueArgsSchema: z.ZodType<Prisma.QuoteFindUniqueArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  where: QuoteWhereUniqueInputSchema,
}).strict()

export const QuoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.QuoteFindUniqueOrThrowArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  where: QuoteWhereUniqueInputSchema,
}).strict()

export const TripFindFirstArgsSchema: z.ZodType<Prisma.TripFindFirstArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TripScalarFieldEnumSchema.array().optional(),
}).strict()

export const TripFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TripFindFirstOrThrowArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TripScalarFieldEnumSchema.array().optional(),
}).strict()

export const TripFindManyArgsSchema: z.ZodType<Prisma.TripFindManyArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TripScalarFieldEnumSchema.array().optional(),
}).strict()

export const TripAggregateArgsSchema: z.ZodType<Prisma.TripAggregateArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TripGroupByArgsSchema: z.ZodType<Prisma.TripGroupByArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithAggregationInputSchema.array(),TripOrderByWithAggregationInputSchema ]).optional(),
  by: TripScalarFieldEnumSchema.array(),
  having: TripScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TripFindUniqueArgsSchema: z.ZodType<Prisma.TripFindUniqueArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict()

export const TripFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TripFindUniqueOrThrowArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict()

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict()

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict()

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict()

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const PriceFindFirstArgsSchema: z.ZodType<Prisma.PriceFindFirstArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PriceScalarFieldEnumSchema.array().optional(),
}).strict()

export const PriceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PriceFindFirstOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PriceScalarFieldEnumSchema.array().optional(),
}).strict()

export const PriceFindManyArgsSchema: z.ZodType<Prisma.PriceFindManyArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PriceScalarFieldEnumSchema.array().optional(),
}).strict()

export const PriceAggregateArgsSchema: z.ZodType<Prisma.PriceAggregateArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PriceGroupByArgsSchema: z.ZodType<Prisma.PriceGroupByArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithAggregationInputSchema.array(),PriceOrderByWithAggregationInputSchema ]).optional(),
  by: PriceScalarFieldEnumSchema.array(),
  having: PriceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PriceFindUniqueArgsSchema: z.ZodType<Prisma.PriceFindUniqueArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const PriceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PriceFindUniqueOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const PaymentFindFirstArgsSchema: z.ZodType<Prisma.PaymentFindFirstArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PaymentScalarFieldEnumSchema.array().optional(),
}).strict()

export const PaymentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PaymentFindFirstOrThrowArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PaymentScalarFieldEnumSchema.array().optional(),
}).strict()

export const PaymentFindManyArgsSchema: z.ZodType<Prisma.PaymentFindManyArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PaymentScalarFieldEnumSchema.array().optional(),
}).strict()

export const PaymentAggregateArgsSchema: z.ZodType<Prisma.PaymentAggregateArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PaymentGroupByArgsSchema: z.ZodType<Prisma.PaymentGroupByArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithAggregationInputSchema.array(),PaymentOrderByWithAggregationInputSchema ]).optional(),
  by: PaymentScalarFieldEnumSchema.array(),
  having: PaymentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PaymentFindUniqueArgsSchema: z.ZodType<Prisma.PaymentFindUniqueArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict()

export const PaymentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PaymentFindUniqueOrThrowArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict()

export const FlightFindFirstArgsSchema: z.ZodType<Prisma.FlightFindFirstArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FlightScalarFieldEnumSchema.array().optional(),
}).strict()

export const FlightFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FlightFindFirstOrThrowArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FlightScalarFieldEnumSchema.array().optional(),
}).strict()

export const FlightFindManyArgsSchema: z.ZodType<Prisma.FlightFindManyArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FlightScalarFieldEnumSchema.array().optional(),
}).strict()

export const FlightAggregateArgsSchema: z.ZodType<Prisma.FlightAggregateArgs> = z.object({
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithRelationInputSchema.array(),FlightOrderByWithRelationInputSchema ]).optional(),
  cursor: FlightWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FlightGroupByArgsSchema: z.ZodType<Prisma.FlightGroupByArgs> = z.object({
  where: FlightWhereInputSchema.optional(),
  orderBy: z.union([ FlightOrderByWithAggregationInputSchema.array(),FlightOrderByWithAggregationInputSchema ]).optional(),
  by: FlightScalarFieldEnumSchema.array(),
  having: FlightScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FlightFindUniqueArgsSchema: z.ZodType<Prisma.FlightFindUniqueArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
}).strict()

export const FlightFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FlightFindUniqueOrThrowArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
}).strict()

export const ServiceFindFirstArgsSchema: z.ZodType<Prisma.ServiceFindFirstArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ServiceScalarFieldEnumSchema.array().optional(),
}).strict()

export const ServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindFirstOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ServiceScalarFieldEnumSchema.array().optional(),
}).strict()

export const ServiceFindManyArgsSchema: z.ZodType<Prisma.ServiceFindManyArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ServiceScalarFieldEnumSchema.array().optional(),
}).strict()

export const ServiceAggregateArgsSchema: z.ZodType<Prisma.ServiceAggregateArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ServiceGroupByArgsSchema: z.ZodType<Prisma.ServiceGroupByArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithAggregationInputSchema.array(),ServiceOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceScalarFieldEnumSchema.array(),
  having: ServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ServiceFindUniqueArgsSchema: z.ZodType<Prisma.ServiceFindUniqueArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const ServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindUniqueOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const LineItemFindFirstArgsSchema: z.ZodType<Prisma.LineItemFindFirstArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  where: LineItemWhereInputSchema.optional(),
  orderBy: z.union([ LineItemOrderByWithRelationInputSchema.array(),LineItemOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LineItemScalarFieldEnumSchema.array().optional(),
}).strict()

export const LineItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LineItemFindFirstOrThrowArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  where: LineItemWhereInputSchema.optional(),
  orderBy: z.union([ LineItemOrderByWithRelationInputSchema.array(),LineItemOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LineItemScalarFieldEnumSchema.array().optional(),
}).strict()

export const LineItemFindManyArgsSchema: z.ZodType<Prisma.LineItemFindManyArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  where: LineItemWhereInputSchema.optional(),
  orderBy: z.union([ LineItemOrderByWithRelationInputSchema.array(),LineItemOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LineItemScalarFieldEnumSchema.array().optional(),
}).strict()

export const LineItemAggregateArgsSchema: z.ZodType<Prisma.LineItemAggregateArgs> = z.object({
  where: LineItemWhereInputSchema.optional(),
  orderBy: z.union([ LineItemOrderByWithRelationInputSchema.array(),LineItemOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LineItemGroupByArgsSchema: z.ZodType<Prisma.LineItemGroupByArgs> = z.object({
  where: LineItemWhereInputSchema.optional(),
  orderBy: z.union([ LineItemOrderByWithAggregationInputSchema.array(),LineItemOrderByWithAggregationInputSchema ]).optional(),
  by: LineItemScalarFieldEnumSchema.array(),
  having: LineItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LineItemFindUniqueArgsSchema: z.ZodType<Prisma.LineItemFindUniqueArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  where: LineItemWhereUniqueInputSchema,
}).strict()

export const LineItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LineItemFindUniqueOrThrowArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  where: LineItemWhereUniqueInputSchema,
}).strict()

export const SalesTaxFindFirstArgsSchema: z.ZodType<Prisma.SalesTaxFindFirstArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  where: SalesTaxWhereInputSchema.optional(),
  orderBy: z.union([ SalesTaxOrderByWithRelationInputSchema.array(),SalesTaxOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesTaxWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesTaxScalarFieldEnumSchema.array().optional(),
}).strict()

export const SalesTaxFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SalesTaxFindFirstOrThrowArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  where: SalesTaxWhereInputSchema.optional(),
  orderBy: z.union([ SalesTaxOrderByWithRelationInputSchema.array(),SalesTaxOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesTaxWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesTaxScalarFieldEnumSchema.array().optional(),
}).strict()

export const SalesTaxFindManyArgsSchema: z.ZodType<Prisma.SalesTaxFindManyArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  where: SalesTaxWhereInputSchema.optional(),
  orderBy: z.union([ SalesTaxOrderByWithRelationInputSchema.array(),SalesTaxOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesTaxWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SalesTaxScalarFieldEnumSchema.array().optional(),
}).strict()

export const SalesTaxAggregateArgsSchema: z.ZodType<Prisma.SalesTaxAggregateArgs> = z.object({
  where: SalesTaxWhereInputSchema.optional(),
  orderBy: z.union([ SalesTaxOrderByWithRelationInputSchema.array(),SalesTaxOrderByWithRelationInputSchema ]).optional(),
  cursor: SalesTaxWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SalesTaxGroupByArgsSchema: z.ZodType<Prisma.SalesTaxGroupByArgs> = z.object({
  where: SalesTaxWhereInputSchema.optional(),
  orderBy: z.union([ SalesTaxOrderByWithAggregationInputSchema.array(),SalesTaxOrderByWithAggregationInputSchema ]).optional(),
  by: SalesTaxScalarFieldEnumSchema.array(),
  having: SalesTaxScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SalesTaxFindUniqueArgsSchema: z.ZodType<Prisma.SalesTaxFindUniqueArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  where: SalesTaxWhereUniqueInputSchema,
}).strict()

export const SalesTaxFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SalesTaxFindUniqueOrThrowArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  where: SalesTaxWhereUniqueInputSchema,
}).strict()

export const VehicleFindFirstArgsSchema: z.ZodType<Prisma.VehicleFindFirstArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereInputSchema.optional(),
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(),VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VehicleScalarFieldEnumSchema.array().optional(),
}).strict()

export const VehicleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindFirstOrThrowArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereInputSchema.optional(),
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(),VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VehicleScalarFieldEnumSchema.array().optional(),
}).strict()

export const VehicleFindManyArgsSchema: z.ZodType<Prisma.VehicleFindManyArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereInputSchema.optional(),
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(),VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VehicleScalarFieldEnumSchema.array().optional(),
}).strict()

export const VehicleAggregateArgsSchema: z.ZodType<Prisma.VehicleAggregateArgs> = z.object({
  where: VehicleWhereInputSchema.optional(),
  orderBy: z.union([ VehicleOrderByWithRelationInputSchema.array(),VehicleOrderByWithRelationInputSchema ]).optional(),
  cursor: VehicleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VehicleGroupByArgsSchema: z.ZodType<Prisma.VehicleGroupByArgs> = z.object({
  where: VehicleWhereInputSchema.optional(),
  orderBy: z.union([ VehicleOrderByWithAggregationInputSchema.array(),VehicleOrderByWithAggregationInputSchema ]).optional(),
  by: VehicleScalarFieldEnumSchema.array(),
  having: VehicleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VehicleFindUniqueArgsSchema: z.ZodType<Prisma.VehicleFindUniqueArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema,
}).strict()

export const VehicleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VehicleFindUniqueOrThrowArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema,
}).strict()

export const LineItemToQuoteFindFirstArgsSchema: z.ZodType<Prisma.LineItemToQuoteFindFirstArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  where: LineItemToQuoteWhereInputSchema.optional(),
  orderBy: z.union([ LineItemToQuoteOrderByWithRelationInputSchema.array(),LineItemToQuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemToQuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LineItemToQuoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const LineItemToQuoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LineItemToQuoteFindFirstOrThrowArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  where: LineItemToQuoteWhereInputSchema.optional(),
  orderBy: z.union([ LineItemToQuoteOrderByWithRelationInputSchema.array(),LineItemToQuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemToQuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LineItemToQuoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const LineItemToQuoteFindManyArgsSchema: z.ZodType<Prisma.LineItemToQuoteFindManyArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  where: LineItemToQuoteWhereInputSchema.optional(),
  orderBy: z.union([ LineItemToQuoteOrderByWithRelationInputSchema.array(),LineItemToQuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemToQuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LineItemToQuoteScalarFieldEnumSchema.array().optional(),
}).strict()

export const LineItemToQuoteAggregateArgsSchema: z.ZodType<Prisma.LineItemToQuoteAggregateArgs> = z.object({
  where: LineItemToQuoteWhereInputSchema.optional(),
  orderBy: z.union([ LineItemToQuoteOrderByWithRelationInputSchema.array(),LineItemToQuoteOrderByWithRelationInputSchema ]).optional(),
  cursor: LineItemToQuoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LineItemToQuoteGroupByArgsSchema: z.ZodType<Prisma.LineItemToQuoteGroupByArgs> = z.object({
  where: LineItemToQuoteWhereInputSchema.optional(),
  orderBy: z.union([ LineItemToQuoteOrderByWithAggregationInputSchema.array(),LineItemToQuoteOrderByWithAggregationInputSchema ]).optional(),
  by: LineItemToQuoteScalarFieldEnumSchema.array(),
  having: LineItemToQuoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const LineItemToQuoteFindUniqueArgsSchema: z.ZodType<Prisma.LineItemToQuoteFindUniqueArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  where: LineItemToQuoteWhereUniqueInputSchema,
}).strict()

export const LineItemToQuoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LineItemToQuoteFindUniqueOrThrowArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  where: LineItemToQuoteWhereUniqueInputSchema,
}).strict()

export const AirlineFindFirstArgsSchema: z.ZodType<Prisma.AirlineFindFirstArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  where: AirlineWhereInputSchema.optional(),
  orderBy: z.union([ AirlineOrderByWithRelationInputSchema.array(),AirlineOrderByWithRelationInputSchema ]).optional(),
  cursor: AirlineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AirlineScalarFieldEnumSchema.array().optional(),
}).strict()

export const AirlineFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AirlineFindFirstOrThrowArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  where: AirlineWhereInputSchema.optional(),
  orderBy: z.union([ AirlineOrderByWithRelationInputSchema.array(),AirlineOrderByWithRelationInputSchema ]).optional(),
  cursor: AirlineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AirlineScalarFieldEnumSchema.array().optional(),
}).strict()

export const AirlineFindManyArgsSchema: z.ZodType<Prisma.AirlineFindManyArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  where: AirlineWhereInputSchema.optional(),
  orderBy: z.union([ AirlineOrderByWithRelationInputSchema.array(),AirlineOrderByWithRelationInputSchema ]).optional(),
  cursor: AirlineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AirlineScalarFieldEnumSchema.array().optional(),
}).strict()

export const AirlineAggregateArgsSchema: z.ZodType<Prisma.AirlineAggregateArgs> = z.object({
  where: AirlineWhereInputSchema.optional(),
  orderBy: z.union([ AirlineOrderByWithRelationInputSchema.array(),AirlineOrderByWithRelationInputSchema ]).optional(),
  cursor: AirlineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AirlineGroupByArgsSchema: z.ZodType<Prisma.AirlineGroupByArgs> = z.object({
  where: AirlineWhereInputSchema.optional(),
  orderBy: z.union([ AirlineOrderByWithAggregationInputSchema.array(),AirlineOrderByWithAggregationInputSchema ]).optional(),
  by: AirlineScalarFieldEnumSchema.array(),
  having: AirlineScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AirlineFindUniqueArgsSchema: z.ZodType<Prisma.AirlineFindUniqueArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  where: AirlineWhereUniqueInputSchema,
}).strict()

export const AirlineFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AirlineFindUniqueOrThrowArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  where: AirlineWhereUniqueInputSchema,
}).strict()

export const AirportFindFirstArgsSchema: z.ZodType<Prisma.AirportFindFirstArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  where: AirportWhereInputSchema.optional(),
  orderBy: z.union([ AirportOrderByWithRelationInputSchema.array(),AirportOrderByWithRelationInputSchema ]).optional(),
  cursor: AirportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AirportScalarFieldEnumSchema.array().optional(),
}).strict()

export const AirportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AirportFindFirstOrThrowArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  where: AirportWhereInputSchema.optional(),
  orderBy: z.union([ AirportOrderByWithRelationInputSchema.array(),AirportOrderByWithRelationInputSchema ]).optional(),
  cursor: AirportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AirportScalarFieldEnumSchema.array().optional(),
}).strict()

export const AirportFindManyArgsSchema: z.ZodType<Prisma.AirportFindManyArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  where: AirportWhereInputSchema.optional(),
  orderBy: z.union([ AirportOrderByWithRelationInputSchema.array(),AirportOrderByWithRelationInputSchema ]).optional(),
  cursor: AirportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AirportScalarFieldEnumSchema.array().optional(),
}).strict()

export const AirportAggregateArgsSchema: z.ZodType<Prisma.AirportAggregateArgs> = z.object({
  where: AirportWhereInputSchema.optional(),
  orderBy: z.union([ AirportOrderByWithRelationInputSchema.array(),AirportOrderByWithRelationInputSchema ]).optional(),
  cursor: AirportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AirportGroupByArgsSchema: z.ZodType<Prisma.AirportGroupByArgs> = z.object({
  where: AirportWhereInputSchema.optional(),
  orderBy: z.union([ AirportOrderByWithAggregationInputSchema.array(),AirportOrderByWithAggregationInputSchema ]).optional(),
  by: AirportScalarFieldEnumSchema.array(),
  having: AirportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AirportFindUniqueArgsSchema: z.ZodType<Prisma.AirportFindUniqueArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  where: AirportWhereUniqueInputSchema,
}).strict()

export const AirportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AirportFindUniqueOrThrowArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  where: AirportWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const AffiliateCreateArgsSchema: z.ZodType<Prisma.AffiliateCreateArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  data: z.union([ AffiliateCreateInputSchema,AffiliateUncheckedCreateInputSchema ]),
}).strict()

export const AffiliateUpsertArgsSchema: z.ZodType<Prisma.AffiliateUpsertArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  where: AffiliateWhereUniqueInputSchema,
  create: z.union([ AffiliateCreateInputSchema,AffiliateUncheckedCreateInputSchema ]),
  update: z.union([ AffiliateUpdateInputSchema,AffiliateUncheckedUpdateInputSchema ]),
}).strict()

export const AffiliateCreateManyArgsSchema: z.ZodType<Prisma.AffiliateCreateManyArgs> = z.object({
  data: z.union([ AffiliateCreateManyInputSchema,AffiliateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AffiliateDeleteArgsSchema: z.ZodType<Prisma.AffiliateDeleteArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  where: AffiliateWhereUniqueInputSchema,
}).strict()

export const AffiliateUpdateArgsSchema: z.ZodType<Prisma.AffiliateUpdateArgs> = z.object({
  select: AffiliateSelectSchema.optional(),
  data: z.union([ AffiliateUpdateInputSchema,AffiliateUncheckedUpdateInputSchema ]),
  where: AffiliateWhereUniqueInputSchema,
}).strict()

export const AffiliateUpdateManyArgsSchema: z.ZodType<Prisma.AffiliateUpdateManyArgs> = z.object({
  data: z.union([ AffiliateUpdateManyMutationInputSchema,AffiliateUncheckedUpdateManyInputSchema ]),
  where: AffiliateWhereInputSchema.optional(),
}).strict()

export const AffiliateDeleteManyArgsSchema: z.ZodType<Prisma.AffiliateDeleteManyArgs> = z.object({
  where: AffiliateWhereInputSchema.optional(),
}).strict()

export const DriverCreateArgsSchema: z.ZodType<Prisma.DriverCreateArgs> = z.object({
  select: DriverSelectSchema.optional(),
  data: z.union([ DriverCreateInputSchema,DriverUncheckedCreateInputSchema ]),
}).strict()

export const DriverUpsertArgsSchema: z.ZodType<Prisma.DriverUpsertArgs> = z.object({
  select: DriverSelectSchema.optional(),
  where: DriverWhereUniqueInputSchema,
  create: z.union([ DriverCreateInputSchema,DriverUncheckedCreateInputSchema ]),
  update: z.union([ DriverUpdateInputSchema,DriverUncheckedUpdateInputSchema ]),
}).strict()

export const DriverCreateManyArgsSchema: z.ZodType<Prisma.DriverCreateManyArgs> = z.object({
  data: z.union([ DriverCreateManyInputSchema,DriverCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DriverDeleteArgsSchema: z.ZodType<Prisma.DriverDeleteArgs> = z.object({
  select: DriverSelectSchema.optional(),
  where: DriverWhereUniqueInputSchema,
}).strict()

export const DriverUpdateArgsSchema: z.ZodType<Prisma.DriverUpdateArgs> = z.object({
  select: DriverSelectSchema.optional(),
  data: z.union([ DriverUpdateInputSchema,DriverUncheckedUpdateInputSchema ]),
  where: DriverWhereUniqueInputSchema,
}).strict()

export const DriverUpdateManyArgsSchema: z.ZodType<Prisma.DriverUpdateManyArgs> = z.object({
  data: z.union([ DriverUpdateManyMutationInputSchema,DriverUncheckedUpdateManyInputSchema ]),
  where: DriverWhereInputSchema.optional(),
}).strict()

export const DriverDeleteManyArgsSchema: z.ZodType<Prisma.DriverDeleteManyArgs> = z.object({
  where: DriverWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const ConversionCreateArgsSchema: z.ZodType<Prisma.ConversionCreateArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  data: z.union([ ConversionCreateInputSchema,ConversionUncheckedCreateInputSchema ]),
}).strict()

export const ConversionUpsertArgsSchema: z.ZodType<Prisma.ConversionUpsertArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  where: ConversionWhereUniqueInputSchema,
  create: z.union([ ConversionCreateInputSchema,ConversionUncheckedCreateInputSchema ]),
  update: z.union([ ConversionUpdateInputSchema,ConversionUncheckedUpdateInputSchema ]),
}).strict()

export const ConversionCreateManyArgsSchema: z.ZodType<Prisma.ConversionCreateManyArgs> = z.object({
  data: z.union([ ConversionCreateManyInputSchema,ConversionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ConversionDeleteArgsSchema: z.ZodType<Prisma.ConversionDeleteArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  where: ConversionWhereUniqueInputSchema,
}).strict()

export const ConversionUpdateArgsSchema: z.ZodType<Prisma.ConversionUpdateArgs> = z.object({
  select: ConversionSelectSchema.optional(),
  include: ConversionIncludeSchema.optional(),
  data: z.union([ ConversionUpdateInputSchema,ConversionUncheckedUpdateInputSchema ]),
  where: ConversionWhereUniqueInputSchema,
}).strict()

export const ConversionUpdateManyArgsSchema: z.ZodType<Prisma.ConversionUpdateManyArgs> = z.object({
  data: z.union([ ConversionUpdateManyMutationInputSchema,ConversionUncheckedUpdateManyInputSchema ]),
  where: ConversionWhereInputSchema.optional(),
}).strict()

export const ConversionDeleteManyArgsSchema: z.ZodType<Prisma.ConversionDeleteManyArgs> = z.object({
  where: ConversionWhereInputSchema.optional(),
}).strict()

export const QuoteCreateArgsSchema: z.ZodType<Prisma.QuoteCreateArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  data: z.union([ QuoteCreateInputSchema,QuoteUncheckedCreateInputSchema ]),
}).strict()

export const QuoteUpsertArgsSchema: z.ZodType<Prisma.QuoteUpsertArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  where: QuoteWhereUniqueInputSchema,
  create: z.union([ QuoteCreateInputSchema,QuoteUncheckedCreateInputSchema ]),
  update: z.union([ QuoteUpdateInputSchema,QuoteUncheckedUpdateInputSchema ]),
}).strict()

export const QuoteCreateManyArgsSchema: z.ZodType<Prisma.QuoteCreateManyArgs> = z.object({
  data: z.union([ QuoteCreateManyInputSchema,QuoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const QuoteDeleteArgsSchema: z.ZodType<Prisma.QuoteDeleteArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  where: QuoteWhereUniqueInputSchema,
}).strict()

export const QuoteUpdateArgsSchema: z.ZodType<Prisma.QuoteUpdateArgs> = z.object({
  select: QuoteSelectSchema.optional(),
  include: QuoteIncludeSchema.optional(),
  data: z.union([ QuoteUpdateInputSchema,QuoteUncheckedUpdateInputSchema ]),
  where: QuoteWhereUniqueInputSchema,
}).strict()

export const QuoteUpdateManyArgsSchema: z.ZodType<Prisma.QuoteUpdateManyArgs> = z.object({
  data: z.union([ QuoteUpdateManyMutationInputSchema,QuoteUncheckedUpdateManyInputSchema ]),
  where: QuoteWhereInputSchema.optional(),
}).strict()

export const QuoteDeleteManyArgsSchema: z.ZodType<Prisma.QuoteDeleteManyArgs> = z.object({
  where: QuoteWhereInputSchema.optional(),
}).strict()

export const TripCreateArgsSchema: z.ZodType<Prisma.TripCreateArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  data: z.union([ TripCreateInputSchema,TripUncheckedCreateInputSchema ]),
}).strict()

export const TripUpsertArgsSchema: z.ZodType<Prisma.TripUpsertArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
  create: z.union([ TripCreateInputSchema,TripUncheckedCreateInputSchema ]),
  update: z.union([ TripUpdateInputSchema,TripUncheckedUpdateInputSchema ]),
}).strict()

export const TripCreateManyArgsSchema: z.ZodType<Prisma.TripCreateManyArgs> = z.object({
  data: z.union([ TripCreateManyInputSchema,TripCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TripDeleteArgsSchema: z.ZodType<Prisma.TripDeleteArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict()

export const TripUpdateArgsSchema: z.ZodType<Prisma.TripUpdateArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  data: z.union([ TripUpdateInputSchema,TripUncheckedUpdateInputSchema ]),
  where: TripWhereUniqueInputSchema,
}).strict()

export const TripUpdateManyArgsSchema: z.ZodType<Prisma.TripUpdateManyArgs> = z.object({
  data: z.union([ TripUpdateManyMutationInputSchema,TripUncheckedUpdateManyInputSchema ]),
  where: TripWhereInputSchema.optional(),
}).strict()

export const TripDeleteManyArgsSchema: z.ZodType<Prisma.TripDeleteManyArgs> = z.object({
  where: TripWhereInputSchema.optional(),
}).strict()

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict()

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict()

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict()

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict()

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict()

export const PriceCreateArgsSchema: z.ZodType<Prisma.PriceCreateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceCreateInputSchema,PriceUncheckedCreateInputSchema ]),
}).strict()

export const PriceUpsertArgsSchema: z.ZodType<Prisma.PriceUpsertArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
  create: z.union([ PriceCreateInputSchema,PriceUncheckedCreateInputSchema ]),
  update: z.union([ PriceUpdateInputSchema,PriceUncheckedUpdateInputSchema ]),
}).strict()

export const PriceCreateManyArgsSchema: z.ZodType<Prisma.PriceCreateManyArgs> = z.object({
  data: z.union([ PriceCreateManyInputSchema,PriceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PriceDeleteArgsSchema: z.ZodType<Prisma.PriceDeleteArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const PriceUpdateArgsSchema: z.ZodType<Prisma.PriceUpdateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceUpdateInputSchema,PriceUncheckedUpdateInputSchema ]),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const PriceUpdateManyArgsSchema: z.ZodType<Prisma.PriceUpdateManyArgs> = z.object({
  data: z.union([ PriceUpdateManyMutationInputSchema,PriceUncheckedUpdateManyInputSchema ]),
  where: PriceWhereInputSchema.optional(),
}).strict()

export const PriceDeleteManyArgsSchema: z.ZodType<Prisma.PriceDeleteManyArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
}).strict()

export const PaymentCreateArgsSchema: z.ZodType<Prisma.PaymentCreateArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  data: z.union([ PaymentCreateInputSchema,PaymentUncheckedCreateInputSchema ]),
}).strict()

export const PaymentUpsertArgsSchema: z.ZodType<Prisma.PaymentUpsertArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
  create: z.union([ PaymentCreateInputSchema,PaymentUncheckedCreateInputSchema ]),
  update: z.union([ PaymentUpdateInputSchema,PaymentUncheckedUpdateInputSchema ]),
}).strict()

export const PaymentCreateManyArgsSchema: z.ZodType<Prisma.PaymentCreateManyArgs> = z.object({
  data: z.union([ PaymentCreateManyInputSchema,PaymentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PaymentDeleteArgsSchema: z.ZodType<Prisma.PaymentDeleteArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict()

export const PaymentUpdateArgsSchema: z.ZodType<Prisma.PaymentUpdateArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  data: z.union([ PaymentUpdateInputSchema,PaymentUncheckedUpdateInputSchema ]),
  where: PaymentWhereUniqueInputSchema,
}).strict()

export const PaymentUpdateManyArgsSchema: z.ZodType<Prisma.PaymentUpdateManyArgs> = z.object({
  data: z.union([ PaymentUpdateManyMutationInputSchema,PaymentUncheckedUpdateManyInputSchema ]),
  where: PaymentWhereInputSchema.optional(),
}).strict()

export const PaymentDeleteManyArgsSchema: z.ZodType<Prisma.PaymentDeleteManyArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
}).strict()

export const FlightCreateArgsSchema: z.ZodType<Prisma.FlightCreateArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  data: z.union([ FlightCreateInputSchema,FlightUncheckedCreateInputSchema ]),
}).strict()

export const FlightUpsertArgsSchema: z.ZodType<Prisma.FlightUpsertArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
  create: z.union([ FlightCreateInputSchema,FlightUncheckedCreateInputSchema ]),
  update: z.union([ FlightUpdateInputSchema,FlightUncheckedUpdateInputSchema ]),
}).strict()

export const FlightCreateManyArgsSchema: z.ZodType<Prisma.FlightCreateManyArgs> = z.object({
  data: z.union([ FlightCreateManyInputSchema,FlightCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FlightDeleteArgsSchema: z.ZodType<Prisma.FlightDeleteArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  where: FlightWhereUniqueInputSchema,
}).strict()

export const FlightUpdateArgsSchema: z.ZodType<Prisma.FlightUpdateArgs> = z.object({
  select: FlightSelectSchema.optional(),
  include: FlightIncludeSchema.optional(),
  data: z.union([ FlightUpdateInputSchema,FlightUncheckedUpdateInputSchema ]),
  where: FlightWhereUniqueInputSchema,
}).strict()

export const FlightUpdateManyArgsSchema: z.ZodType<Prisma.FlightUpdateManyArgs> = z.object({
  data: z.union([ FlightUpdateManyMutationInputSchema,FlightUncheckedUpdateManyInputSchema ]),
  where: FlightWhereInputSchema.optional(),
}).strict()

export const FlightDeleteManyArgsSchema: z.ZodType<Prisma.FlightDeleteManyArgs> = z.object({
  where: FlightWhereInputSchema.optional(),
}).strict()

export const ServiceCreateArgsSchema: z.ZodType<Prisma.ServiceCreateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
}).strict()

export const ServiceUpsertArgsSchema: z.ZodType<Prisma.ServiceUpsertArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
  create: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
  update: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
}).strict()

export const ServiceCreateManyArgsSchema: z.ZodType<Prisma.ServiceCreateManyArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ServiceDeleteArgsSchema: z.ZodType<Prisma.ServiceDeleteArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const ServiceUpdateArgsSchema: z.ZodType<Prisma.ServiceUpdateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
  where: ServiceWhereUniqueInputSchema,
}).strict()

export const ServiceUpdateManyArgsSchema: z.ZodType<Prisma.ServiceUpdateManyArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
}).strict()

export const ServiceDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDeleteManyArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
}).strict()

export const LineItemCreateArgsSchema: z.ZodType<Prisma.LineItemCreateArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  data: z.union([ LineItemCreateInputSchema,LineItemUncheckedCreateInputSchema ]),
}).strict()

export const LineItemUpsertArgsSchema: z.ZodType<Prisma.LineItemUpsertArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  where: LineItemWhereUniqueInputSchema,
  create: z.union([ LineItemCreateInputSchema,LineItemUncheckedCreateInputSchema ]),
  update: z.union([ LineItemUpdateInputSchema,LineItemUncheckedUpdateInputSchema ]),
}).strict()

export const LineItemCreateManyArgsSchema: z.ZodType<Prisma.LineItemCreateManyArgs> = z.object({
  data: z.union([ LineItemCreateManyInputSchema,LineItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const LineItemDeleteArgsSchema: z.ZodType<Prisma.LineItemDeleteArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  where: LineItemWhereUniqueInputSchema,
}).strict()

export const LineItemUpdateArgsSchema: z.ZodType<Prisma.LineItemUpdateArgs> = z.object({
  select: LineItemSelectSchema.optional(),
  include: LineItemIncludeSchema.optional(),
  data: z.union([ LineItemUpdateInputSchema,LineItemUncheckedUpdateInputSchema ]),
  where: LineItemWhereUniqueInputSchema,
}).strict()

export const LineItemUpdateManyArgsSchema: z.ZodType<Prisma.LineItemUpdateManyArgs> = z.object({
  data: z.union([ LineItemUpdateManyMutationInputSchema,LineItemUncheckedUpdateManyInputSchema ]),
  where: LineItemWhereInputSchema.optional(),
}).strict()

export const LineItemDeleteManyArgsSchema: z.ZodType<Prisma.LineItemDeleteManyArgs> = z.object({
  where: LineItemWhereInputSchema.optional(),
}).strict()

export const SalesTaxCreateArgsSchema: z.ZodType<Prisma.SalesTaxCreateArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  data: z.union([ SalesTaxCreateInputSchema,SalesTaxUncheckedCreateInputSchema ]),
}).strict()

export const SalesTaxUpsertArgsSchema: z.ZodType<Prisma.SalesTaxUpsertArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  where: SalesTaxWhereUniqueInputSchema,
  create: z.union([ SalesTaxCreateInputSchema,SalesTaxUncheckedCreateInputSchema ]),
  update: z.union([ SalesTaxUpdateInputSchema,SalesTaxUncheckedUpdateInputSchema ]),
}).strict()

export const SalesTaxCreateManyArgsSchema: z.ZodType<Prisma.SalesTaxCreateManyArgs> = z.object({
  data: z.union([ SalesTaxCreateManyInputSchema,SalesTaxCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SalesTaxDeleteArgsSchema: z.ZodType<Prisma.SalesTaxDeleteArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  where: SalesTaxWhereUniqueInputSchema,
}).strict()

export const SalesTaxUpdateArgsSchema: z.ZodType<Prisma.SalesTaxUpdateArgs> = z.object({
  select: SalesTaxSelectSchema.optional(),
  include: SalesTaxIncludeSchema.optional(),
  data: z.union([ SalesTaxUpdateInputSchema,SalesTaxUncheckedUpdateInputSchema ]),
  where: SalesTaxWhereUniqueInputSchema,
}).strict()

export const SalesTaxUpdateManyArgsSchema: z.ZodType<Prisma.SalesTaxUpdateManyArgs> = z.object({
  data: z.union([ SalesTaxUpdateManyMutationInputSchema,SalesTaxUncheckedUpdateManyInputSchema ]),
  where: SalesTaxWhereInputSchema.optional(),
}).strict()

export const SalesTaxDeleteManyArgsSchema: z.ZodType<Prisma.SalesTaxDeleteManyArgs> = z.object({
  where: SalesTaxWhereInputSchema.optional(),
}).strict()

export const VehicleCreateArgsSchema: z.ZodType<Prisma.VehicleCreateArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  data: z.union([ VehicleCreateInputSchema,VehicleUncheckedCreateInputSchema ]),
}).strict()

export const VehicleUpsertArgsSchema: z.ZodType<Prisma.VehicleUpsertArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema,
  create: z.union([ VehicleCreateInputSchema,VehicleUncheckedCreateInputSchema ]),
  update: z.union([ VehicleUpdateInputSchema,VehicleUncheckedUpdateInputSchema ]),
}).strict()

export const VehicleCreateManyArgsSchema: z.ZodType<Prisma.VehicleCreateManyArgs> = z.object({
  data: z.union([ VehicleCreateManyInputSchema,VehicleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VehicleDeleteArgsSchema: z.ZodType<Prisma.VehicleDeleteArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  where: VehicleWhereUniqueInputSchema,
}).strict()

export const VehicleUpdateArgsSchema: z.ZodType<Prisma.VehicleUpdateArgs> = z.object({
  select: VehicleSelectSchema.optional(),
  include: VehicleIncludeSchema.optional(),
  data: z.union([ VehicleUpdateInputSchema,VehicleUncheckedUpdateInputSchema ]),
  where: VehicleWhereUniqueInputSchema,
}).strict()

export const VehicleUpdateManyArgsSchema: z.ZodType<Prisma.VehicleUpdateManyArgs> = z.object({
  data: z.union([ VehicleUpdateManyMutationInputSchema,VehicleUncheckedUpdateManyInputSchema ]),
  where: VehicleWhereInputSchema.optional(),
}).strict()

export const VehicleDeleteManyArgsSchema: z.ZodType<Prisma.VehicleDeleteManyArgs> = z.object({
  where: VehicleWhereInputSchema.optional(),
}).strict()

export const LineItemToQuoteCreateArgsSchema: z.ZodType<Prisma.LineItemToQuoteCreateArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  data: z.union([ LineItemToQuoteCreateInputSchema,LineItemToQuoteUncheckedCreateInputSchema ]),
}).strict()

export const LineItemToQuoteUpsertArgsSchema: z.ZodType<Prisma.LineItemToQuoteUpsertArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  where: LineItemToQuoteWhereUniqueInputSchema,
  create: z.union([ LineItemToQuoteCreateInputSchema,LineItemToQuoteUncheckedCreateInputSchema ]),
  update: z.union([ LineItemToQuoteUpdateInputSchema,LineItemToQuoteUncheckedUpdateInputSchema ]),
}).strict()

export const LineItemToQuoteCreateManyArgsSchema: z.ZodType<Prisma.LineItemToQuoteCreateManyArgs> = z.object({
  data: z.union([ LineItemToQuoteCreateManyInputSchema,LineItemToQuoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const LineItemToQuoteDeleteArgsSchema: z.ZodType<Prisma.LineItemToQuoteDeleteArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  where: LineItemToQuoteWhereUniqueInputSchema,
}).strict()

export const LineItemToQuoteUpdateArgsSchema: z.ZodType<Prisma.LineItemToQuoteUpdateArgs> = z.object({
  select: LineItemToQuoteSelectSchema.optional(),
  data: z.union([ LineItemToQuoteUpdateInputSchema,LineItemToQuoteUncheckedUpdateInputSchema ]),
  where: LineItemToQuoteWhereUniqueInputSchema,
}).strict()

export const LineItemToQuoteUpdateManyArgsSchema: z.ZodType<Prisma.LineItemToQuoteUpdateManyArgs> = z.object({
  data: z.union([ LineItemToQuoteUpdateManyMutationInputSchema,LineItemToQuoteUncheckedUpdateManyInputSchema ]),
  where: LineItemToQuoteWhereInputSchema.optional(),
}).strict()

export const LineItemToQuoteDeleteManyArgsSchema: z.ZodType<Prisma.LineItemToQuoteDeleteManyArgs> = z.object({
  where: LineItemToQuoteWhereInputSchema.optional(),
}).strict()

export const AirlineCreateArgsSchema: z.ZodType<Prisma.AirlineCreateArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  data: z.union([ AirlineCreateInputSchema,AirlineUncheckedCreateInputSchema ]),
}).strict()

export const AirlineUpsertArgsSchema: z.ZodType<Prisma.AirlineUpsertArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  where: AirlineWhereUniqueInputSchema,
  create: z.union([ AirlineCreateInputSchema,AirlineUncheckedCreateInputSchema ]),
  update: z.union([ AirlineUpdateInputSchema,AirlineUncheckedUpdateInputSchema ]),
}).strict()

export const AirlineCreateManyArgsSchema: z.ZodType<Prisma.AirlineCreateManyArgs> = z.object({
  data: z.union([ AirlineCreateManyInputSchema,AirlineCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AirlineDeleteArgsSchema: z.ZodType<Prisma.AirlineDeleteArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  where: AirlineWhereUniqueInputSchema,
}).strict()

export const AirlineUpdateArgsSchema: z.ZodType<Prisma.AirlineUpdateArgs> = z.object({
  select: AirlineSelectSchema.optional(),
  include: AirlineIncludeSchema.optional(),
  data: z.union([ AirlineUpdateInputSchema,AirlineUncheckedUpdateInputSchema ]),
  where: AirlineWhereUniqueInputSchema,
}).strict()

export const AirlineUpdateManyArgsSchema: z.ZodType<Prisma.AirlineUpdateManyArgs> = z.object({
  data: z.union([ AirlineUpdateManyMutationInputSchema,AirlineUncheckedUpdateManyInputSchema ]),
  where: AirlineWhereInputSchema.optional(),
}).strict()

export const AirlineDeleteManyArgsSchema: z.ZodType<Prisma.AirlineDeleteManyArgs> = z.object({
  where: AirlineWhereInputSchema.optional(),
}).strict()

export const AirportCreateArgsSchema: z.ZodType<Prisma.AirportCreateArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  data: z.union([ AirportCreateInputSchema,AirportUncheckedCreateInputSchema ]),
}).strict()

export const AirportUpsertArgsSchema: z.ZodType<Prisma.AirportUpsertArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  where: AirportWhereUniqueInputSchema,
  create: z.union([ AirportCreateInputSchema,AirportUncheckedCreateInputSchema ]),
  update: z.union([ AirportUpdateInputSchema,AirportUncheckedUpdateInputSchema ]),
}).strict()

export const AirportCreateManyArgsSchema: z.ZodType<Prisma.AirportCreateManyArgs> = z.object({
  data: z.union([ AirportCreateManyInputSchema,AirportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AirportDeleteArgsSchema: z.ZodType<Prisma.AirportDeleteArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  where: AirportWhereUniqueInputSchema,
}).strict()

export const AirportUpdateArgsSchema: z.ZodType<Prisma.AirportUpdateArgs> = z.object({
  select: AirportSelectSchema.optional(),
  include: AirportIncludeSchema.optional(),
  data: z.union([ AirportUpdateInputSchema,AirportUncheckedUpdateInputSchema ]),
  where: AirportWhereUniqueInputSchema,
}).strict()

export const AirportUpdateManyArgsSchema: z.ZodType<Prisma.AirportUpdateManyArgs> = z.object({
  data: z.union([ AirportUpdateManyMutationInputSchema,AirportUncheckedUpdateManyInputSchema ]),
  where: AirportWhereInputSchema.optional(),
}).strict()

export const AirportDeleteManyArgsSchema: z.ZodType<Prisma.AirportDeleteManyArgs> = z.object({
  where: AirportWhereInputSchema.optional(),
}).strict()