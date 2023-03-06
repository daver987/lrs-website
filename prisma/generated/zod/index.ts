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

export const AccountScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','company_name','company_address','company_phone','company_email','company_account_number']);

export const ConversionScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','utm_term','utm_medium','utm_source','utm_campaign','gclid','source','conversion_name','user_id']);

export const FlightScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','airline_code','airline_name','flight_number','is_active','is_landed','is_arrived','departure_time','arrival_time','departure_time_actual','arrival_time_actual','trip_id']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const LineItemScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','label','description','is_percentage','is_taxable','is_active','amount','applies_to']);

export const LocationScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','lat','lng','name','formatted_address','full_name','types','place_id','is_origin','is_destination','is_waypoint','trip_id']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const PaymentScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','is_preauthorized','is_paid','setup_intent','payment_intent','payment_type','notes','trip_id','quote_number']);

export const QuoteScalarFieldEnumSchema = z.enum(['quote_number','created_at','updated_at','pickup_date','pickup_time','return_date','return_time','formatted_pickup_date','formatted_pickup_time','formatted_return_date','formatted_return_time','return_service_type','selected_hours','selected_passengers','is_round_trip','is_booked','user_id','service_id','vehicle_id','sales_tax_id']);

export const SalesTaxScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','tax_name','amount','region','is_active']);

export const ServiceScalarFieldEnumSchema = z.enum(['value','created_at','updated_at','label','is_active','is_hourly','limo_anywhere_id']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TripScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','quote_number','origin_lat','origin_lng','origin_name','origin_formatted_address','origin_full_name','origin_types','origin_place_id','destination_lat','destination_lng','destination_name','destination_formatted_address','destination_full_name','destination_types','destination_place_id','distance','flight_information','line_items_list','line_items_subtotal','line_items_tax','line_items_total','affiliate_payout','is_farmed_out','is_return','notes']);

export const UserScalarFieldEnumSchema = z.enum(['id','created_at','updated_at','first_name','last_name','email_address','phone_number','stripe_customer_id','is_customer','account_id','notes','meta_data']);

export const VehicleScalarFieldEnumSchema = z.enum(['value','created_at','updated_at','max_passengers','max_luggage','per_km','per_hour','min_hours','min_distance','min_rate','is_active','label','limo_anywhere_id','vehicle_image']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int(),
})

export type Account = z.infer<typeof AccountSchema>

// ACCOUNT PARTIAL SCHEMA
//------------------------------------------------------

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  users: UserWithRelations[];
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array(),
}))

// ACCOUNT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountPartialRelations = {
  users?: UserPartialWithRelations[];
};

export type AccountPartialWithRelations = z.infer<typeof AccountPartialSchema> & AccountPartialRelations

export const AccountPartialWithRelationsSchema: z.ZodType<AccountPartialWithRelations> = AccountPartialSchema.merge(z.object({
  users: z.lazy(() => UserPartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email_address: z.string().nullable(),
  phone_number: z.string().nullable(),
  stripe_customer_id: z.string().nullable(),
  is_customer: z.boolean(),
  account_id: z.string().nullable(),
  notes: z.string().nullable(),
  meta_data: NullableJsonValue.optional(),
})

export type User = z.infer<typeof UserSchema>

// USER PARTIAL SCHEMA
//------------------------------------------------------

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  quotes: QuoteWithRelations[];
  Account?: AccountWithRelations | null;
  conversion?: ConversionWithRelations | null;
};

export type UserWithRelations = Omit<z.infer<typeof UserSchema>, "meta_data"> & {
  meta_data?: NullableJsonInput;
} & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  quotes: z.lazy(() => QuoteWithRelationsSchema).array(),
  Account: z.lazy(() => AccountWithRelationsSchema).nullable(),
  conversion: z.lazy(() => ConversionWithRelationsSchema).nullable(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  quotes?: QuotePartialWithRelations[];
  Account?: AccountPartialWithRelations | null;
  conversion?: ConversionPartialWithRelations | null;
};

export type UserPartialWithRelations = Omit<z.infer<typeof UserPartialSchema>, "meta_data"> & {
  meta_data?: NullableJsonInput;
} & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  quotes: z.lazy(() => QuotePartialWithRelationsSchema).array(),
  Account: z.lazy(() => AccountPartialWithRelationsSchema).nullable(),
  conversion: z.lazy(() => ConversionPartialWithRelationsSchema).nullable(),
})).partial()

/////////////////////////////////////////
// CONVERSION SCHEMA
/////////////////////////////////////////

export const ConversionSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
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

// CONVERSION PARTIAL SCHEMA
//------------------------------------------------------

export const ConversionPartialSchema = ConversionSchema.partial()

export type ConversionPartial = z.infer<typeof ConversionPartialSchema>

// CONVERSION RELATION SCHEMA
//------------------------------------------------------

export type ConversionRelations = {
  user: UserWithRelations;
};

export type ConversionWithRelations = z.infer<typeof ConversionSchema> & ConversionRelations

export const ConversionWithRelationsSchema: z.ZodType<ConversionWithRelations> = ConversionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// CONVERSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ConversionPartialRelations = {
  user?: UserPartialWithRelations;
};

export type ConversionPartialWithRelations = z.infer<typeof ConversionPartialSchema> & ConversionPartialRelations

export const ConversionPartialWithRelationsSchema: z.ZodType<ConversionPartialWithRelations> = ConversionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

/////////////////////////////////////////
// QUOTE SCHEMA
/////////////////////////////////////////

export const QuoteSchema = z.object({
  quote_number: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  pickup_date: z.number().nullable(),
  pickup_time: z.number().nullable(),
  return_date: z.number().nullable(),
  return_time: z.number().nullable(),
  formatted_pickup_date: z.string().nullable(),
  formatted_pickup_time: z.string().nullable(),
  formatted_return_date: z.string().nullable(),
  formatted_return_time: z.string().nullable(),
  return_service_type: z.string().nullable(),
  selected_hours: z.number().int().nullable(),
  selected_passengers: z.number().int(),
  is_round_trip: z.boolean(),
  is_booked: z.boolean(),
  user_id: z.string(),
  service_id: z.number().int(),
  vehicle_id: z.number().int(),
  sales_tax_id: z.number().int(),
})

export type Quote = z.infer<typeof QuoteSchema>

// QUOTE PARTIAL SCHEMA
//------------------------------------------------------

export const QuotePartialSchema = QuoteSchema.partial()

export type QuotePartial = z.infer<typeof QuotePartialSchema>

// QUOTE RELATION SCHEMA
//------------------------------------------------------

export type QuoteRelations = {
  service: ServiceWithRelations;
  vehicle: VehicleWithRelations;
  user: UserWithRelations;
  sales_tax?: SalesTaxWithRelations | null;
  line_items: LineItemWithRelations[];
  trips: TripWithRelations[];
  payment?: PaymentWithRelations | null;
};

export type QuoteWithRelations = z.infer<typeof QuoteSchema> & QuoteRelations

export const QuoteWithRelationsSchema: z.ZodType<QuoteWithRelations> = QuoteSchema.merge(z.object({
  service: z.lazy(() => ServiceWithRelationsSchema),
  vehicle: z.lazy(() => VehicleWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
  sales_tax: z.lazy(() => SalesTaxWithRelationsSchema).nullable(),
  line_items: z.lazy(() => LineItemWithRelationsSchema).array(),
  trips: z.lazy(() => TripWithRelationsSchema).array(),
  payment: z.lazy(() => PaymentWithRelationsSchema).nullable(),
}))

// QUOTE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type QuotePartialRelations = {
  service?: ServicePartialWithRelations;
  vehicle?: VehiclePartialWithRelations;
  user?: UserPartialWithRelations;
  sales_tax?: SalesTaxPartialWithRelations | null;
  line_items?: LineItemPartialWithRelations[];
  trips?: TripPartialWithRelations[];
  payment?: PaymentPartialWithRelations | null;
};

export type QuotePartialWithRelations = z.infer<typeof QuotePartialSchema> & QuotePartialRelations

export const QuotePartialWithRelationsSchema: z.ZodType<QuotePartialWithRelations> = QuotePartialSchema.merge(z.object({
  service: z.lazy(() => ServicePartialWithRelationsSchema),
  vehicle: z.lazy(() => VehiclePartialWithRelationsSchema),
  user: z.lazy(() => UserPartialWithRelationsSchema),
  sales_tax: z.lazy(() => SalesTaxPartialWithRelationsSchema).nullable(),
  line_items: z.lazy(() => LineItemPartialWithRelationsSchema).array(),
  trips: z.lazy(() => TripPartialWithRelationsSchema).array(),
  payment: z.lazy(() => PaymentPartialWithRelationsSchema).nullable(),
})).partial()

/////////////////////////////////////////
// TRIP SCHEMA
/////////////////////////////////////////

export const TripSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  quote_number: z.number().int(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().nullable(),
  origin_types: InputJsonValue,
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().nullable(),
  destination_types: InputJsonValue,
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: NullableJsonValue.optional(),
  line_items_list: NullableJsonValue.optional(),
  line_items_subtotal: z.number().nullable(),
  line_items_tax: z.number().nullable(),
  line_items_total: z.number().nullable(),
  affiliate_payout: z.number().nullable(),
  is_farmed_out: z.boolean().nullable(),
  is_return: z.boolean(),
  notes: z.string().nullable(),
})

export type Trip = z.infer<typeof TripSchema>

// TRIP PARTIAL SCHEMA
//------------------------------------------------------

export const TripPartialSchema = TripSchema.partial()

export type TripPartial = z.infer<typeof TripPartialSchema>

// TRIP RELATION SCHEMA
//------------------------------------------------------

export type TripRelations = {
  quote: QuoteWithRelations;
  Payment?: PaymentWithRelations | null;
  locations: LocationWithRelations[];
  flight?: FlightWithRelations | null;
};

export type TripWithRelations = Omit<z.infer<typeof TripSchema>, "flight_information" | "line_items_list"> & {
  flight_information?: NullableJsonInput;
  line_items_list?: NullableJsonInput;
} & TripRelations

export const TripWithRelationsSchema: z.ZodType<TripWithRelations> = TripSchema.merge(z.object({
  quote: z.lazy(() => QuoteWithRelationsSchema),
  Payment: z.lazy(() => PaymentWithRelationsSchema).nullable(),
  locations: z.lazy(() => LocationWithRelationsSchema).array(),
  flight: z.lazy(() => FlightWithRelationsSchema).nullable(),
}))

// TRIP PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TripPartialRelations = {
  quote?: QuotePartialWithRelations;
  Payment?: PaymentPartialWithRelations | null;
  locations?: LocationPartialWithRelations[];
  flight?: FlightPartialWithRelations | null;
};

export type TripPartialWithRelations = Omit<z.infer<typeof TripPartialSchema>, "flight_information" | "line_items_list"> & {
  flight_information?: NullableJsonInput;
  line_items_list?: NullableJsonInput;
} & TripPartialRelations

export const TripPartialWithRelationsSchema: z.ZodType<TripPartialWithRelations> = TripPartialSchema.merge(z.object({
  quote: z.lazy(() => QuotePartialWithRelationsSchema),
  Payment: z.lazy(() => PaymentPartialWithRelationsSchema).nullable(),
  locations: z.lazy(() => LocationPartialWithRelationsSchema).array(),
  flight: z.lazy(() => FlightPartialWithRelationsSchema).nullable(),
})).partial()

/////////////////////////////////////////
// FLIGHT SCHEMA
/////////////////////////////////////////

export const FlightSchema = z.object({
  id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  airline_code: z.string(),
  airline_name: z.string().nullable(),
  flight_number: z.string(),
  is_active: z.boolean(),
  is_landed: z.boolean(),
  is_arrived: z.boolean(),
  departure_time: z.coerce.date().nullable(),
  arrival_time: z.coerce.date().nullable(),
  departure_time_actual: z.coerce.date().nullable(),
  arrival_time_actual: z.coerce.date().nullable(),
  trip_id: z.string().nullable(),
})

export type Flight = z.infer<typeof FlightSchema>

// FLIGHT PARTIAL SCHEMA
//------------------------------------------------------

export const FlightPartialSchema = FlightSchema.partial()

export type FlightPartial = z.infer<typeof FlightPartialSchema>

// FLIGHT RELATION SCHEMA
//------------------------------------------------------

export type FlightRelations = {
  trip?: TripWithRelations | null;
};

export type FlightWithRelations = z.infer<typeof FlightSchema> & FlightRelations

export const FlightWithRelationsSchema: z.ZodType<FlightWithRelations> = FlightSchema.merge(z.object({
  trip: z.lazy(() => TripWithRelationsSchema).nullable(),
}))

// FLIGHT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type FlightPartialRelations = {
  trip?: TripPartialWithRelations | null;
};

export type FlightPartialWithRelations = z.infer<typeof FlightPartialSchema> & FlightPartialRelations

export const FlightPartialWithRelationsSchema: z.ZodType<FlightPartialWithRelations> = FlightPartialSchema.merge(z.object({
  trip: z.lazy(() => TripPartialWithRelationsSchema).nullable(),
})).partial()

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
  types: InputJsonValue,
  place_id: z.string(),
  is_origin: z.boolean(),
  is_destination: z.boolean(),
  is_waypoint: z.boolean(),
  trip_id: z.string().nullable(),
})

export type Location = z.infer<typeof LocationSchema>

// LOCATION PARTIAL SCHEMA
//------------------------------------------------------

export const LocationPartialSchema = LocationSchema.partial()

export type LocationPartial = z.infer<typeof LocationPartialSchema>

// LOCATION RELATION SCHEMA
//------------------------------------------------------

export type LocationRelations = {
  trip?: TripWithRelations | null;
};

export type LocationWithRelations = z.infer<typeof LocationSchema> & LocationRelations

export const LocationWithRelationsSchema: z.ZodType<LocationWithRelations> = LocationSchema.merge(z.object({
  trip: z.lazy(() => TripWithRelationsSchema).nullable(),
}))

// LOCATION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type LocationPartialRelations = {
  trip?: TripPartialWithRelations | null;
};

export type LocationPartialWithRelations = z.infer<typeof LocationPartialSchema> & LocationPartialRelations

export const LocationPartialWithRelationsSchema: z.ZodType<LocationPartialWithRelations> = LocationPartialSchema.merge(z.object({
  trip: z.lazy(() => TripPartialWithRelationsSchema).nullable(),
})).partial()

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
  trip_id: z.string().nullable(),
  quote_number: z.number().int(),
})

export type Payment = z.infer<typeof PaymentSchema>

// PAYMENT PARTIAL SCHEMA
//------------------------------------------------------

export const PaymentPartialSchema = PaymentSchema.partial()

export type PaymentPartial = z.infer<typeof PaymentPartialSchema>

// PAYMENT RELATION SCHEMA
//------------------------------------------------------

export type PaymentRelations = {
  trip?: TripWithRelations | null;
  quote: QuoteWithRelations;
};

export type PaymentWithRelations = Omit<z.infer<typeof PaymentSchema>, "setup_intent" | "payment_intent"> & {
  setup_intent?: NullableJsonInput;
  payment_intent?: NullableJsonInput;
} & PaymentRelations

export const PaymentWithRelationsSchema: z.ZodType<PaymentWithRelations> = PaymentSchema.merge(z.object({
  trip: z.lazy(() => TripWithRelationsSchema).nullable(),
  quote: z.lazy(() => QuoteWithRelationsSchema),
}))

// PAYMENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PaymentPartialRelations = {
  trip?: TripPartialWithRelations | null;
  quote?: QuotePartialWithRelations;
};

export type PaymentPartialWithRelations = Omit<z.infer<typeof PaymentPartialSchema>, "setup_intent" | "payment_intent"> & {
  setup_intent?: NullableJsonInput;
  payment_intent?: NullableJsonInput;
} & PaymentPartialRelations

export const PaymentPartialWithRelationsSchema: z.ZodType<PaymentPartialWithRelations> = PaymentPartialSchema.merge(z.object({
  trip: z.lazy(() => TripPartialWithRelationsSchema).nullable(),
  quote: z.lazy(() => QuotePartialWithRelationsSchema),
})).partial()

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  value: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  label: z.string(),
  is_active: z.boolean(),
  is_hourly: z.boolean(),
  limo_anywhere_id: z.number().int().nullable(),
})

export type Service = z.infer<typeof ServiceSchema>

// SERVICE PARTIAL SCHEMA
//------------------------------------------------------

export const ServicePartialSchema = ServiceSchema.partial()

export type ServicePartial = z.infer<typeof ServicePartialSchema>

// SERVICE RELATION SCHEMA
//------------------------------------------------------

export type ServiceRelations = {
  quotes: QuoteWithRelations[];
};

export type ServiceWithRelations = z.infer<typeof ServiceSchema> & ServiceRelations

export const ServiceWithRelationsSchema: z.ZodType<ServiceWithRelations> = ServiceSchema.merge(z.object({
  quotes: z.lazy(() => QuoteWithRelationsSchema).array(),
}))

// SERVICE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ServicePartialRelations = {
  quotes?: QuotePartialWithRelations[];
};

export type ServicePartialWithRelations = z.infer<typeof ServicePartialSchema> & ServicePartialRelations

export const ServicePartialWithRelationsSchema: z.ZodType<ServicePartialWithRelations> = ServicePartialSchema.merge(z.object({
  quotes: z.lazy(() => QuotePartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// LINE ITEM SCHEMA
/////////////////////////////////////////

export const LineItemSchema = z.object({
  id: z.string().uuid(),
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

// LINE ITEM PARTIAL SCHEMA
//------------------------------------------------------

export const LineItemPartialSchema = LineItemSchema.partial()

export type LineItemPartial = z.infer<typeof LineItemPartialSchema>

// LINE ITEM RELATION SCHEMA
//------------------------------------------------------

export type LineItemRelations = {
  quotes: QuoteWithRelations[];
};

export type LineItemWithRelations = z.infer<typeof LineItemSchema> & LineItemRelations

export const LineItemWithRelationsSchema: z.ZodType<LineItemWithRelations> = LineItemSchema.merge(z.object({
  quotes: z.lazy(() => QuoteWithRelationsSchema).array(),
}))

// LINE ITEM PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type LineItemPartialRelations = {
  quotes?: QuotePartialWithRelations[];
};

export type LineItemPartialWithRelations = z.infer<typeof LineItemPartialSchema> & LineItemPartialRelations

export const LineItemPartialWithRelationsSchema: z.ZodType<LineItemPartialWithRelations> = LineItemPartialSchema.merge(z.object({
  quotes: z.lazy(() => QuotePartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// SALES TAX SCHEMA
/////////////////////////////////////////

export const SalesTaxSchema = z.object({
  id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean(),
})

export type SalesTax = z.infer<typeof SalesTaxSchema>

// SALES TAX PARTIAL SCHEMA
//------------------------------------------------------

export const SalesTaxPartialSchema = SalesTaxSchema.partial()

export type SalesTaxPartial = z.infer<typeof SalesTaxPartialSchema>

// SALES TAX RELATION SCHEMA
//------------------------------------------------------

export type SalesTaxRelations = {
  quotes: QuoteWithRelations[];
};

export type SalesTaxWithRelations = z.infer<typeof SalesTaxSchema> & SalesTaxRelations

export const SalesTaxWithRelationsSchema: z.ZodType<SalesTaxWithRelations> = SalesTaxSchema.merge(z.object({
  quotes: z.lazy(() => QuoteWithRelationsSchema).array(),
}))

// SALES TAX PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type SalesTaxPartialRelations = {
  quotes?: QuotePartialWithRelations[];
};

export type SalesTaxPartialWithRelations = z.infer<typeof SalesTaxPartialSchema> & SalesTaxPartialRelations

export const SalesTaxPartialWithRelationsSchema: z.ZodType<SalesTaxPartialWithRelations> = SalesTaxPartialSchema.merge(z.object({
  quotes: z.lazy(() => QuotePartialWithRelationsSchema).array(),
})).partial()

/////////////////////////////////////////
// VEHICLE SCHEMA
/////////////////////////////////////////

export const VehicleSchema = z.object({
  value: z.number().int(),
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
  vehicle_image: z.string().nullable(),
})

export type Vehicle = z.infer<typeof VehicleSchema>

// VEHICLE PARTIAL SCHEMA
//------------------------------------------------------

export const VehiclePartialSchema = VehicleSchema.partial()

export type VehiclePartial = z.infer<typeof VehiclePartialSchema>

// VEHICLE RELATION SCHEMA
//------------------------------------------------------

export type VehicleRelations = {
  quotes: QuoteWithRelations[];
};

export type VehicleWithRelations = z.infer<typeof VehicleSchema> & VehicleRelations

export const VehicleWithRelationsSchema: z.ZodType<VehicleWithRelations> = VehicleSchema.merge(z.object({
  quotes: z.lazy(() => QuoteWithRelationsSchema).array(),
}))

// VEHICLE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type VehiclePartialRelations = {
  quotes?: QuotePartialWithRelations[];
};

export type VehiclePartialWithRelations = z.infer<typeof VehiclePartialSchema> & VehiclePartialRelations

export const VehiclePartialWithRelationsSchema: z.ZodType<VehiclePartialWithRelations> = VehiclePartialSchema.merge(z.object({
  quotes: z.lazy(() => QuotePartialWithRelationsSchema).array(),
})).partial()

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

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  Account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  conversion: z.union([z.boolean(),z.lazy(() => ConversionArgsSchema)]).optional(),
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
  quotes: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  email_address: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  stripe_customer_id: z.boolean().optional(),
  is_customer: z.boolean().optional(),
  account_id: z.boolean().optional(),
  notes: z.boolean().optional(),
  meta_data: z.boolean().optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  Account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  conversion: z.union([z.boolean(),z.lazy(() => ConversionArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
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
  updated_at: z.boolean().optional(),
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
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sales_tax: z.union([z.boolean(),z.lazy(() => SalesTaxArgsSchema)]).optional(),
  line_items: z.union([z.boolean(),z.lazy(() => LineItemFindManyArgsSchema)]).optional(),
  trips: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
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
  line_items: z.boolean().optional(),
  trips: z.boolean().optional(),
}).strict();

export const QuoteSelectSchema: z.ZodType<Prisma.QuoteSelect> = z.object({
  quote_number: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  pickup_date: z.boolean().optional(),
  pickup_time: z.boolean().optional(),
  return_date: z.boolean().optional(),
  return_time: z.boolean().optional(),
  formatted_pickup_date: z.boolean().optional(),
  formatted_pickup_time: z.boolean().optional(),
  formatted_return_date: z.boolean().optional(),
  formatted_return_time: z.boolean().optional(),
  return_service_type: z.boolean().optional(),
  selected_hours: z.boolean().optional(),
  selected_passengers: z.boolean().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.boolean().optional(),
  service_id: z.boolean().optional(),
  vehicle_id: z.boolean().optional(),
  sales_tax_id: z.boolean().optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
  vehicle: z.union([z.boolean(),z.lazy(() => VehicleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  sales_tax: z.union([z.boolean(),z.lazy(() => SalesTaxArgsSchema)]).optional(),
  line_items: z.union([z.boolean(),z.lazy(() => LineItemFindManyArgsSchema)]).optional(),
  trips: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => QuoteCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRIP
//------------------------------------------------------

export const TripIncludeSchema: z.ZodType<Prisma.TripInclude> = z.object({
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
  Payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
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
  quote_number: z.boolean().optional(),
  origin_lat: z.boolean().optional(),
  origin_lng: z.boolean().optional(),
  origin_name: z.boolean().optional(),
  origin_formatted_address: z.boolean().optional(),
  origin_full_name: z.boolean().optional(),
  origin_types: z.boolean().optional(),
  origin_place_id: z.boolean().optional(),
  destination_lat: z.boolean().optional(),
  destination_lng: z.boolean().optional(),
  destination_name: z.boolean().optional(),
  destination_formatted_address: z.boolean().optional(),
  destination_full_name: z.boolean().optional(),
  destination_types: z.boolean().optional(),
  destination_place_id: z.boolean().optional(),
  distance: z.boolean().optional(),
  flight_information: z.boolean().optional(),
  line_items_list: z.boolean().optional(),
  line_items_subtotal: z.boolean().optional(),
  line_items_tax: z.boolean().optional(),
  line_items_total: z.boolean().optional(),
  affiliate_payout: z.boolean().optional(),
  is_farmed_out: z.boolean().optional(),
  is_return: z.boolean().optional(),
  notes: z.boolean().optional(),
  quote: z.union([z.boolean(),z.lazy(() => QuoteArgsSchema)]).optional(),
  Payment: z.union([z.boolean(),z.lazy(() => PaymentArgsSchema)]).optional(),
  locations: z.union([z.boolean(),z.lazy(() => LocationFindManyArgsSchema)]).optional(),
  flight: z.union([z.boolean(),z.lazy(() => FlightArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FLIGHT
//------------------------------------------------------

export const FlightIncludeSchema: z.ZodType<Prisma.FlightInclude> = z.object({
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
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
  departure_time: z.boolean().optional(),
  arrival_time: z.boolean().optional(),
  departure_time_actual: z.boolean().optional(),
  arrival_time_actual: z.boolean().optional(),
  trip_id: z.boolean().optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
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
  types: z.boolean().optional(),
  place_id: z.boolean().optional(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  trip_id: z.boolean().optional(),
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
  value: z.boolean().optional(),
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
  value: z.boolean().optional(),
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
  vehicle_image: z.boolean().optional(),
  quotes: z.union([z.boolean(),z.lazy(() => QuoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VehicleCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  company_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  company_email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company_account_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  company_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company_phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  company_email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company_account_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email_address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_customer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  account_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableFilterSchema).optional(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional(),
  Account: z.union([ z.lazy(() => AccountRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  conversion: z.union([ z.lazy(() => ConversionRelationFilterSchema),z.lazy(() => ConversionWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional(),
  Account: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  conversion: z.lazy(() => ConversionOrderByWithRelationInputSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  email_address: z.string().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  first_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email_address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_customer: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  account_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
}).strict();

export const ConversionWhereInputSchema: z.ZodType<Prisma.ConversionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversionWhereInputSchema),z.lazy(() => ConversionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversionWhereInputSchema),z.lazy(() => ConversionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const ConversionWhereUniqueInputSchema: z.ZodType<Prisma.ConversionWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().optional(),
}).strict();

export const ConversionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
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
  _min: z.lazy(() => ConversionMinOrderByAggregateInputSchema).optional(),
}).strict();

export const ConversionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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
  pickup_date: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  pickup_time: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  return_date: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  return_time: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  formatted_return_date: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  formatted_return_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  return_service_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  selected_hours: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  selected_passengers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  is_round_trip: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_booked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  service_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  vehicle_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sales_tax_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
  vehicle: z.union([ z.lazy(() => VehicleRelationFilterSchema),z.lazy(() => VehicleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  sales_tax: z.union([ z.lazy(() => SalesTaxRelationFilterSchema),z.lazy(() => SalesTaxWhereInputSchema) ]).optional().nullable(),
  line_items: z.lazy(() => LineItemListRelationFilterSchema).optional(),
  trips: z.lazy(() => TripListRelationFilterSchema).optional(),
  payment: z.union([ z.lazy(() => PaymentRelationFilterSchema),z.lazy(() => PaymentWhereInputSchema) ]).optional().nullable(),
}).strict();

export const QuoteOrderByWithRelationInputSchema: z.ZodType<Prisma.QuoteOrderByWithRelationInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  return_date: z.lazy(() => SortOrderSchema).optional(),
  return_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_time: z.lazy(() => SortOrderSchema).optional(),
  return_service_type: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  service_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_id: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_id: z.lazy(() => SortOrderSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional(),
  vehicle: z.lazy(() => VehicleOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxOrderByWithRelationInputSchema).optional(),
  line_items: z.lazy(() => LineItemOrderByRelationAggregateInputSchema).optional(),
  trips: z.lazy(() => TripOrderByRelationAggregateInputSchema).optional(),
  payment: z.lazy(() => PaymentOrderByWithRelationInputSchema).optional(),
}).strict();

export const QuoteWhereUniqueInputSchema: z.ZodType<Prisma.QuoteWhereUniqueInput> = z.object({
  quote_number: z.number().int().optional(),
}).strict();

export const QuoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.QuoteOrderByWithAggregationInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  return_date: z.lazy(() => SortOrderSchema).optional(),
  return_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_time: z.lazy(() => SortOrderSchema).optional(),
  return_service_type: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  service_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_id: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => QuoteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => QuoteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => QuoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => QuoteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => QuoteSumOrderByAggregateInputSchema).optional(),
}).strict();

export const QuoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.QuoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema),z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema),z.lazy(() => QuoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pickup_date: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  pickup_time: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  return_date: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  return_time: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  formatted_return_date: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  formatted_return_time: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  return_service_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  selected_hours: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  selected_passengers: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  is_round_trip: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_booked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  service_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  vehicle_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  sales_tax_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const TripWhereInputSchema: z.ZodType<Prisma.TripWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  origin_lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  origin_lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  origin_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  origin_formatted_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  origin_full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  origin_types: z.lazy(() => JsonFilterSchema).optional(),
  origin_place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destination_lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  destination_lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  destination_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destination_formatted_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destination_full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  destination_types: z.lazy(() => JsonFilterSchema).optional(),
  destination_place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  distance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  flight_information: z.lazy(() => JsonNullableFilterSchema).optional(),
  line_items_list: z.lazy(() => JsonNullableFilterSchema).optional(),
  line_items_subtotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_tax: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_total: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  affiliate_payout: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  is_farmed_out: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  is_return: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  quote: z.union([ z.lazy(() => QuoteRelationFilterSchema),z.lazy(() => QuoteWhereInputSchema) ]).optional(),
  Payment: z.union([ z.lazy(() => PaymentRelationFilterSchema),z.lazy(() => PaymentWhereInputSchema) ]).optional().nullable(),
  locations: z.lazy(() => LocationListRelationFilterSchema).optional(),
  flight: z.union([ z.lazy(() => FlightRelationFilterSchema),z.lazy(() => FlightWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TripOrderByWithRelationInputSchema: z.ZodType<Prisma.TripOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  origin_lat: z.lazy(() => SortOrderSchema).optional(),
  origin_lng: z.lazy(() => SortOrderSchema).optional(),
  origin_name: z.lazy(() => SortOrderSchema).optional(),
  origin_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  origin_full_name: z.lazy(() => SortOrderSchema).optional(),
  origin_types: z.lazy(() => SortOrderSchema).optional(),
  origin_place_id: z.lazy(() => SortOrderSchema).optional(),
  destination_lat: z.lazy(() => SortOrderSchema).optional(),
  destination_lng: z.lazy(() => SortOrderSchema).optional(),
  destination_name: z.lazy(() => SortOrderSchema).optional(),
  destination_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  destination_full_name: z.lazy(() => SortOrderSchema).optional(),
  destination_types: z.lazy(() => SortOrderSchema).optional(),
  destination_place_id: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  flight_information: z.lazy(() => SortOrderSchema).optional(),
  line_items_list: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  quote: z.lazy(() => QuoteOrderByWithRelationInputSchema).optional(),
  Payment: z.lazy(() => PaymentOrderByWithRelationInputSchema).optional(),
  locations: z.lazy(() => LocationOrderByRelationAggregateInputSchema).optional(),
  flight: z.lazy(() => FlightOrderByWithRelationInputSchema).optional(),
}).strict();

export const TripWhereUniqueInputSchema: z.ZodType<Prisma.TripWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const TripOrderByWithAggregationInputSchema: z.ZodType<Prisma.TripOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  origin_lat: z.lazy(() => SortOrderSchema).optional(),
  origin_lng: z.lazy(() => SortOrderSchema).optional(),
  origin_name: z.lazy(() => SortOrderSchema).optional(),
  origin_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  origin_full_name: z.lazy(() => SortOrderSchema).optional(),
  origin_types: z.lazy(() => SortOrderSchema).optional(),
  origin_place_id: z.lazy(() => SortOrderSchema).optional(),
  destination_lat: z.lazy(() => SortOrderSchema).optional(),
  destination_lng: z.lazy(() => SortOrderSchema).optional(),
  destination_name: z.lazy(() => SortOrderSchema).optional(),
  destination_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  destination_full_name: z.lazy(() => SortOrderSchema).optional(),
  destination_types: z.lazy(() => SortOrderSchema).optional(),
  destination_place_id: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  flight_information: z.lazy(() => SortOrderSchema).optional(),
  line_items_list: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TripCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TripAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TripMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TripMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TripSumOrderByAggregateInputSchema).optional(),
}).strict();

export const TripScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TripScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  quote_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  origin_lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  origin_lng: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  origin_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  origin_formatted_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  origin_full_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  origin_types: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  origin_place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  destination_lat: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  destination_lng: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  destination_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  destination_formatted_address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  destination_full_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  destination_types: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  destination_place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  distance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  flight_information: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  line_items_list: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  line_items_subtotal: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  line_items_tax: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  line_items_total: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  affiliate_payout: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  is_farmed_out: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  is_return: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FlightWhereInputSchema: z.ZodType<Prisma.FlightWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightWhereInputSchema),z.lazy(() => FlightWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  airline_code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  airline_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  flight_number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_landed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_arrived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  departure_time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  arrival_time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  departure_time_actual: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  arrival_time_actual: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip: z.union([ z.lazy(() => TripRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional().nullable(),
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
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
}).strict();

export const FlightWhereUniqueInputSchema: z.ZodType<Prisma.FlightWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  trip_id: z.string().optional(),
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
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FlightCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FlightMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FlightMinOrderByAggregateInputSchema).optional(),
}).strict();

export const FlightScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FlightScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FlightScalarWhereWithAggregatesInputSchema),z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FlightScalarWhereWithAggregatesInputSchema),z.lazy(() => FlightScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  airline_code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  airline_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  flight_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_landed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_arrived: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  departure_time: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  arrival_time: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  departure_time_actual: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  arrival_time_actual: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  trip_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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
  types: z.lazy(() => JsonFilterSchema).optional(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_origin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_destination: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_waypoint: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  trip_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  trip: z.union([ z.lazy(() => TripRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional().nullable(),
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
  types: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
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
  types: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional(),
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
  types: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  place_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_origin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_destination: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_waypoint: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  trip_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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
  trip_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  trip: z.union([ z.lazy(() => TripRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional().nullable(),
  quote: z.union([ z.lazy(() => QuoteRelationFilterSchema),z.lazy(() => QuoteWhereInputSchema) ]).optional(),
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
  quote: z.lazy(() => QuoteOrderByWithRelationInputSchema).optional(),
}).strict();

export const PaymentWhereUniqueInputSchema: z.ZodType<Prisma.PaymentWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  trip_id: z.string().optional(),
  quote_number: z.number().int().optional(),
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
  _sum: z.lazy(() => PaymentSumOrderByAggregateInputSchema).optional(),
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
  trip_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  quote_number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_hourly: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  limo_anywhere_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional(),
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.object({
  value: z.number().int().optional(),
}).strict();

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
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
  _sum: z.lazy(() => ServiceSumOrderByAggregateInputSchema).optional(),
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
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
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_percentage: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_taxable: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  applies_to: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional(),
}).strict();

export const LineItemOrderByWithRelationInputSchema: z.ZodType<Prisma.LineItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const LineItemWhereUniqueInputSchema: z.ZodType<Prisma.LineItemWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const LineItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.LineItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  _sum: z.lazy(() => LineItemSumOrderByAggregateInputSchema).optional(),
}).strict();

export const LineItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LineItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema),z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema),z.lazy(() => LineItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tax_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  region: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional(),
}).strict();

export const SalesTaxOrderByWithRelationInputSchema: z.ZodType<Prisma.SalesTaxOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const SalesTaxWhereUniqueInputSchema: z.ZodType<Prisma.SalesTaxWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
}).strict();

export const SalesTaxOrderByWithAggregationInputSchema: z.ZodType<Prisma.SalesTaxOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
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
  _sum: z.lazy(() => SalesTaxSumOrderByAggregateInputSchema).optional(),
}).strict();

export const SalesTaxScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SalesTaxScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesTaxScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
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
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
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
  vehicle_image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  quotes: z.lazy(() => QuoteListRelationFilterSchema).optional(),
}).strict();

export const VehicleOrderByWithRelationInputSchema: z.ZodType<Prisma.VehicleOrderByWithRelationInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
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
  vehicle_image: z.lazy(() => SortOrderSchema).optional(),
  quotes: z.lazy(() => QuoteOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const VehicleWhereUniqueInputSchema: z.ZodType<Prisma.VehicleWhereUniqueInput> = z.object({
  value: z.number().int().optional(),
}).strict();

export const VehicleOrderByWithAggregationInputSchema: z.ZodType<Prisma.VehicleOrderByWithAggregationInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
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
  vehicle_image: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VehicleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VehicleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VehicleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VehicleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VehicleSumOrderByAggregateInputSchema).optional(),
}).strict();

export const VehicleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VehicleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema),z.lazy(() => VehicleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
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
  vehicle_image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int(),
  users: z.lazy(() => UserCreateNestedManyWithoutAccountInputSchema).optional(),
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutAccountInputSchema).optional(),
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
  users: z.lazy(() => UserUpdateManyWithoutAccountNestedInputSchema).optional(),
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutAccountNestedInputSchema).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number().int(),
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
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountCreateNestedOneWithoutUsersInputSchema).optional(),
  conversion: z.lazy(() => ConversionCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUpdateOneWithoutUsersNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const ConversionCreateInputSchema: z.ZodType<Prisma.ConversionCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutConversionInputSchema),
}).strict();

export const ConversionUncheckedCreateInputSchema: z.ZodType<Prisma.ConversionUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
  user_id: z.string(),
}).strict();

export const ConversionUpdateInputSchema: z.ZodType<Prisma.ConversionUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutConversionNestedInputSchema).optional(),
}).strict();

export const ConversionUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
  user_id: z.string(),
}).strict();

export const ConversionUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number().int(),
  vehicle_id: z.number().int(),
  sales_tax_id: z.number().int(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUpdateInputSchema: z.ZodType<Prisma.QuoteUpdateInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateInput> = z.object({
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteCreateManyInputSchema: z.ZodType<Prisma.QuoteCreateManyInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number().int(),
  vehicle_id: z.number().int(),
  sales_tax_id: z.number().int(),
}).strict();

export const QuoteUpdateManyMutationInputSchema: z.ZodType<Prisma.QuoteUpdateManyMutationInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyInput> = z.object({
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripCreateInputSchema: z.ZodType<Prisma.TripCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  Payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional(),
}).strict();

export const TripUncheckedCreateInputSchema: z.ZodType<Prisma.TripUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  quote_number: z.number().int(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
}).strict();

export const TripUpdateInputSchema: z.ZodType<Prisma.TripUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  Payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripUncheckedUpdateInputSchema: z.ZodType<Prisma.TripUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripCreateManyInputSchema: z.ZodType<Prisma.TripCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  quote_number: z.number().int(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
}).strict();

export const TripUpdateManyMutationInputSchema: z.ZodType<Prisma.TripUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightCreateInputSchema: z.ZodType<Prisma.FlightCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time: z.coerce.date().optional().nullable(),
  arrival_time: z.coerce.date().optional().nullable(),
  departure_time_actual: z.coerce.date().optional().nullable(),
  arrival_time_actual: z.coerce.date().optional().nullable(),
  trip: z.lazy(() => TripCreateNestedOneWithoutFlightInputSchema).optional(),
}).strict();

export const FlightUncheckedCreateInputSchema: z.ZodType<Prisma.FlightUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time: z.coerce.date().optional().nullable(),
  arrival_time: z.coerce.date().optional().nullable(),
  departure_time_actual: z.coerce.date().optional().nullable(),
  arrival_time_actual: z.coerce.date().optional().nullable(),
  trip_id: z.string().optional().nullable(),
}).strict();

export const FlightUpdateInputSchema: z.ZodType<Prisma.FlightUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip: z.lazy(() => TripUpdateOneWithoutFlightNestedInputSchema).optional(),
}).strict();

export const FlightUncheckedUpdateInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightCreateManyInputSchema: z.ZodType<Prisma.FlightCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time: z.coerce.date().optional().nullable(),
  arrival_time: z.coerce.date().optional().nullable(),
  departure_time_actual: z.coerce.date().optional().nullable(),
  arrival_time_actual: z.coerce.date().optional().nullable(),
  trip_id: z.string().optional().nullable(),
}).strict();

export const FlightUpdateManyMutationInputSchema: z.ZodType<Prisma.FlightUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  place_id: z.string(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  trip: z.lazy(() => TripCreateNestedOneWithoutLocationsInputSchema).optional(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  place_id: z.string(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  trip_id: z.string().optional().nullable(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => TripUpdateOneWithoutLocationsNestedInputSchema).optional(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  place_id: z.string(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
  trip_id: z.string().optional().nullable(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  trip: z.lazy(() => TripCreateNestedOneWithoutPaymentInputSchema).optional(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutPaymentInputSchema),
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
  trip_id: z.string().optional().nullable(),
  quote_number: z.number().int(),
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
  trip: z.lazy(() => TripUpdateOneWithoutPaymentNestedInputSchema).optional(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutPaymentNestedInputSchema).optional(),
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
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  trip_id: z.string().optional().nullable(),
  quote_number: z.number().int(),
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
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().int().optional().nullable(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutServiceInputSchema).optional(),
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  value: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().int().optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutServiceInputSchema).optional(),
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutServiceNestedInputSchema).optional(),
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutServiceNestedInputSchema).optional(),
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  value: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().int().optional().nullable(),
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LineItemCreateInputSchema: z.ZodType<Prisma.LineItemCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutLine_itemsInputSchema).optional(),
}).strict();

export const LineItemUncheckedCreateInputSchema: z.ZodType<Prisma.LineItemUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutLine_itemsInputSchema).optional(),
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
  quotes: z.lazy(() => QuoteUpdateManyWithoutLine_itemsNestedInputSchema).optional(),
}).strict();

export const LineItemUncheckedUpdateInputSchema: z.ZodType<Prisma.LineItemUncheckedUpdateInput> = z.object({
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
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutLine_itemsNestedInputSchema).optional(),
}).strict();

export const LineItemCreateManyInputSchema: z.ZodType<Prisma.LineItemCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable(),
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
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutSales_taxInputSchema).optional(),
}).strict();

export const SalesTaxUncheckedCreateInputSchema: z.ZodType<Prisma.SalesTaxUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutSales_taxInputSchema).optional(),
}).strict();

export const SalesTaxUpdateInputSchema: z.ZodType<Prisma.SalesTaxUpdateInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutSales_taxNestedInputSchema).optional(),
}).strict();

export const SalesTaxUncheckedUpdateInputSchema: z.ZodType<Prisma.SalesTaxUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutSales_taxNestedInputSchema).optional(),
}).strict();

export const SalesTaxCreateManyInputSchema: z.ZodType<Prisma.SalesTaxCreateManyInput> = z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional(),
}).strict();

export const SalesTaxUpdateManyMutationInputSchema: z.ZodType<Prisma.SalesTaxUpdateManyMutationInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesTaxUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SalesTaxUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VehicleCreateInputSchema: z.ZodType<Prisma.VehicleCreateInput> = z.object({
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
  vehicle_image: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutVehicleInputSchema).optional(),
}).strict();

export const VehicleUncheckedCreateInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateInput> = z.object({
  value: z.number().int().optional(),
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
  vehicle_image: z.string().optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutVehicleInputSchema).optional(),
}).strict();

export const VehicleUpdateInputSchema: z.ZodType<Prisma.VehicleUpdateInput> = z.object({
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
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutVehicleNestedInputSchema).optional(),
}).strict();

export const VehicleUncheckedUpdateInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateInput> = z.object({
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutVehicleNestedInputSchema).optional(),
}).strict();

export const VehicleCreateManyInputSchema: z.ZodType<Prisma.VehicleCreateManyInput> = z.object({
  value: z.number().int().optional(),
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
  vehicle_image: z.string().optional().nullable(),
}).strict();

export const VehicleUpdateManyMutationInputSchema: z.ZodType<Prisma.VehicleUpdateManyMutationInput> = z.object({
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
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VehicleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateManyInput> = z.object({
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  company_address: z.lazy(() => SortOrderSchema).optional(),
  company_phone: z.lazy(() => SortOrderSchema).optional(),
  company_email: z.lazy(() => SortOrderSchema).optional(),
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  company_account_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const QuoteListRelationFilterSchema: z.ZodType<Prisma.QuoteListRelationFilter> = z.object({
  every: z.lazy(() => QuoteWhereInputSchema).optional(),
  some: z.lazy(() => QuoteWhereInputSchema).optional(),
  none: z.lazy(() => QuoteWhereInputSchema).optional(),
}).strict();

export const AccountRelationFilterSchema: z.ZodType<Prisma.AccountRelationFilter> = z.object({
  is: z.lazy(() => AccountWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AccountWhereInputSchema).optional().nullable(),
}).strict();

export const ConversionRelationFilterSchema: z.ZodType<Prisma.ConversionRelationFilter> = z.object({
  is: z.lazy(() => ConversionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ConversionWhereInputSchema).optional().nullable(),
}).strict();

export const QuoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.QuoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  meta_data: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  email_address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  stripe_customer_id: z.lazy(() => SortOrderSchema).optional(),
  is_customer: z.lazy(() => SortOrderSchema).optional(),
  account_id: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const ConversionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ConversionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ConversionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  utm_term: z.lazy(() => SortOrderSchema).optional(),
  utm_medium: z.lazy(() => SortOrderSchema).optional(),
  utm_source: z.lazy(() => SortOrderSchema).optional(),
  utm_campaign: z.lazy(() => SortOrderSchema).optional(),
  gclid: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  conversion_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ServiceRelationFilterSchema: z.ZodType<Prisma.ServiceRelationFilter> = z.object({
  is: z.lazy(() => ServiceWhereInputSchema).optional(),
  isNot: z.lazy(() => ServiceWhereInputSchema).optional(),
}).strict();

export const VehicleRelationFilterSchema: z.ZodType<Prisma.VehicleRelationFilter> = z.object({
  is: z.lazy(() => VehicleWhereInputSchema).optional(),
  isNot: z.lazy(() => VehicleWhereInputSchema).optional(),
}).strict();

export const SalesTaxRelationFilterSchema: z.ZodType<Prisma.SalesTaxRelationFilter> = z.object({
  is: z.lazy(() => SalesTaxWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SalesTaxWhereInputSchema).optional().nullable(),
}).strict();

export const LineItemListRelationFilterSchema: z.ZodType<Prisma.LineItemListRelationFilter> = z.object({
  every: z.lazy(() => LineItemWhereInputSchema).optional(),
  some: z.lazy(() => LineItemWhereInputSchema).optional(),
  none: z.lazy(() => LineItemWhereInputSchema).optional(),
}).strict();

export const TripListRelationFilterSchema: z.ZodType<Prisma.TripListRelationFilter> = z.object({
  every: z.lazy(() => TripWhereInputSchema).optional(),
  some: z.lazy(() => TripWhereInputSchema).optional(),
  none: z.lazy(() => TripWhereInputSchema).optional(),
}).strict();

export const PaymentRelationFilterSchema: z.ZodType<Prisma.PaymentRelationFilter> = z.object({
  is: z.lazy(() => PaymentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PaymentWhereInputSchema).optional().nullable(),
}).strict();

export const LineItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LineItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TripOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TripOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const QuoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteCountOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  return_date: z.lazy(() => SortOrderSchema).optional(),
  return_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_time: z.lazy(() => SortOrderSchema).optional(),
  return_service_type: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  service_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_id: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const QuoteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteAvgOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  return_date: z.lazy(() => SortOrderSchema).optional(),
  return_time: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  service_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_id: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const QuoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteMaxOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  return_date: z.lazy(() => SortOrderSchema).optional(),
  return_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_time: z.lazy(() => SortOrderSchema).optional(),
  return_service_type: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  service_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_id: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const QuoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteMinOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  return_date: z.lazy(() => SortOrderSchema).optional(),
  return_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_pickup_time: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_date: z.lazy(() => SortOrderSchema).optional(),
  formatted_return_time: z.lazy(() => SortOrderSchema).optional(),
  return_service_type: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  is_round_trip: z.lazy(() => SortOrderSchema).optional(),
  is_booked: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  service_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_id: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const QuoteSumOrderByAggregateInputSchema: z.ZodType<Prisma.QuoteSumOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  pickup_date: z.lazy(() => SortOrderSchema).optional(),
  pickup_time: z.lazy(() => SortOrderSchema).optional(),
  return_date: z.lazy(() => SortOrderSchema).optional(),
  return_time: z.lazy(() => SortOrderSchema).optional(),
  selected_hours: z.lazy(() => SortOrderSchema).optional(),
  selected_passengers: z.lazy(() => SortOrderSchema).optional(),
  service_id: z.lazy(() => SortOrderSchema).optional(),
  vehicle_id: z.lazy(() => SortOrderSchema).optional(),
  sales_tax_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const QuoteRelationFilterSchema: z.ZodType<Prisma.QuoteRelationFilter> = z.object({
  is: z.lazy(() => QuoteWhereInputSchema).optional(),
  isNot: z.lazy(() => QuoteWhereInputSchema).optional(),
}).strict();

export const LocationListRelationFilterSchema: z.ZodType<Prisma.LocationListRelationFilter> = z.object({
  every: z.lazy(() => LocationWhereInputSchema).optional(),
  some: z.lazy(() => LocationWhereInputSchema).optional(),
  none: z.lazy(() => LocationWhereInputSchema).optional(),
}).strict();

export const FlightRelationFilterSchema: z.ZodType<Prisma.FlightRelationFilter> = z.object({
  is: z.lazy(() => FlightWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => FlightWhereInputSchema).optional().nullable(),
}).strict();

export const LocationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LocationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TripCountOrderByAggregateInputSchema: z.ZodType<Prisma.TripCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  origin_lat: z.lazy(() => SortOrderSchema).optional(),
  origin_lng: z.lazy(() => SortOrderSchema).optional(),
  origin_name: z.lazy(() => SortOrderSchema).optional(),
  origin_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  origin_full_name: z.lazy(() => SortOrderSchema).optional(),
  origin_types: z.lazy(() => SortOrderSchema).optional(),
  origin_place_id: z.lazy(() => SortOrderSchema).optional(),
  destination_lat: z.lazy(() => SortOrderSchema).optional(),
  destination_lng: z.lazy(() => SortOrderSchema).optional(),
  destination_name: z.lazy(() => SortOrderSchema).optional(),
  destination_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  destination_full_name: z.lazy(() => SortOrderSchema).optional(),
  destination_types: z.lazy(() => SortOrderSchema).optional(),
  destination_place_id: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  flight_information: z.lazy(() => SortOrderSchema).optional(),
  line_items_list: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TripAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TripAvgOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  origin_lat: z.lazy(() => SortOrderSchema).optional(),
  origin_lng: z.lazy(() => SortOrderSchema).optional(),
  destination_lat: z.lazy(() => SortOrderSchema).optional(),
  destination_lng: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TripMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TripMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  origin_lat: z.lazy(() => SortOrderSchema).optional(),
  origin_lng: z.lazy(() => SortOrderSchema).optional(),
  origin_name: z.lazy(() => SortOrderSchema).optional(),
  origin_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  origin_full_name: z.lazy(() => SortOrderSchema).optional(),
  origin_place_id: z.lazy(() => SortOrderSchema).optional(),
  destination_lat: z.lazy(() => SortOrderSchema).optional(),
  destination_lng: z.lazy(() => SortOrderSchema).optional(),
  destination_name: z.lazy(() => SortOrderSchema).optional(),
  destination_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  destination_full_name: z.lazy(() => SortOrderSchema).optional(),
  destination_place_id: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TripMinOrderByAggregateInputSchema: z.ZodType<Prisma.TripMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  origin_lat: z.lazy(() => SortOrderSchema).optional(),
  origin_lng: z.lazy(() => SortOrderSchema).optional(),
  origin_name: z.lazy(() => SortOrderSchema).optional(),
  origin_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  origin_full_name: z.lazy(() => SortOrderSchema).optional(),
  origin_place_id: z.lazy(() => SortOrderSchema).optional(),
  destination_lat: z.lazy(() => SortOrderSchema).optional(),
  destination_lng: z.lazy(() => SortOrderSchema).optional(),
  destination_name: z.lazy(() => SortOrderSchema).optional(),
  destination_formatted_address: z.lazy(() => SortOrderSchema).optional(),
  destination_full_name: z.lazy(() => SortOrderSchema).optional(),
  destination_place_id: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
  is_farmed_out: z.lazy(() => SortOrderSchema).optional(),
  is_return: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const TripSumOrderByAggregateInputSchema: z.ZodType<Prisma.TripSumOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
  origin_lat: z.lazy(() => SortOrderSchema).optional(),
  origin_lng: z.lazy(() => SortOrderSchema).optional(),
  destination_lat: z.lazy(() => SortOrderSchema).optional(),
  destination_lng: z.lazy(() => SortOrderSchema).optional(),
  distance: z.lazy(() => SortOrderSchema).optional(),
  line_items_subtotal: z.lazy(() => SortOrderSchema).optional(),
  line_items_tax: z.lazy(() => SortOrderSchema).optional(),
  line_items_total: z.lazy(() => SortOrderSchema).optional(),
  affiliate_payout: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional(),
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TripRelationFilterSchema: z.ZodType<Prisma.TripRelationFilter> = z.object({
  is: z.lazy(() => TripWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TripWhereInputSchema).optional().nullable(),
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
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
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
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
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
  departure_time: z.lazy(() => SortOrderSchema).optional(),
  arrival_time: z.lazy(() => SortOrderSchema).optional(),
  departure_time_actual: z.lazy(() => SortOrderSchema).optional(),
  arrival_time_actual: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
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
  types: z.lazy(() => SortOrderSchema).optional(),
  place_id: z.lazy(() => SortOrderSchema).optional(),
  is_origin: z.lazy(() => SortOrderSchema).optional(),
  is_destination: z.lazy(() => SortOrderSchema).optional(),
  is_waypoint: z.lazy(() => SortOrderSchema).optional(),
  trip_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
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
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
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
  quote_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PaymentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentAvgOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
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
  quote_number: z.lazy(() => SortOrderSchema).optional(),
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
  quote_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const PaymentSumOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentSumOrderByAggregateInput> = z.object({
  quote_number: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  is_hourly: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LineItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LineItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LineItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LineItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  is_percentage: z.lazy(() => SortOrderSchema).optional(),
  is_taxable: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  applies_to: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const LineItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.LineItemSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesTaxCountOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesTaxAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesTaxMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesTaxMinOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  tax_name: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  region: z.lazy(() => SortOrderSchema).optional(),
  is_active: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SalesTaxSumOrderByAggregateInputSchema: z.ZodType<Prisma.SalesTaxSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VehicleCountOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleCountOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
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
  vehicle_image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VehicleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VehicleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMaxOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
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
  vehicle_image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VehicleMinOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleMinOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
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
  vehicle_image: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const VehicleSumOrderByAggregateInputSchema: z.ZodType<Prisma.VehicleSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  max_passengers: z.lazy(() => SortOrderSchema).optional(),
  max_luggage: z.lazy(() => SortOrderSchema).optional(),
  per_km: z.lazy(() => SortOrderSchema).optional(),
  per_hour: z.lazy(() => SortOrderSchema).optional(),
  min_hours: z.lazy(() => SortOrderSchema).optional(),
  min_distance: z.lazy(() => SortOrderSchema).optional(),
  min_rate: z.lazy(() => SortOrderSchema).optional(),
  limo_anywhere_id: z.lazy(() => SortOrderSchema).optional(),
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
  set: z.string().optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
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

export const QuoteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.QuoteCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteCreateWithoutUserInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
}).strict();

export const ConversionCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ConversionCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ConversionWhereUniqueInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteCreateWithoutUserInputSchema).array(),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => QuoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => QuoteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => QuoteWhereUniqueInputSchema),z.lazy(() => QuoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversionUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ConversionUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ConversionWhereUniqueInputSchema).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional(),
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

export const ConversionUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversionUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ConversionUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ConversionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversionUpdateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedUpdateWithoutUserInputSchema) ]).optional(),
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

export const ConversionUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ConversionUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversionCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ConversionUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ConversionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversionUpdateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutConversionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutConversionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversionInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutConversionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutConversionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutConversionInputSchema),z.lazy(() => UserUncheckedCreateWithoutConversionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutConversionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutConversionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutConversionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutConversionInputSchema) ]).optional(),
}).strict();

export const ServiceCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
}).strict();

export const VehicleCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => VehicleCreateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VehicleCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => VehicleWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const SalesTaxCreateNestedOneWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxCreateNestedOneWithoutQuotesInput> = z.object({
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesTaxCreateOrConnectWithoutQuotesInputSchema).optional(),
  connect: z.lazy(() => SalesTaxWhereUniqueInputSchema).optional(),
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

export const PaymentCreateNestedOneWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentCreateNestedOneWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
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

export const PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateNestedOneWithoutQuoteInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
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

export const SalesTaxUpdateOneWithoutQuotesNestedInputSchema: z.ZodType<Prisma.SalesTaxUpdateOneWithoutQuotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesTaxCreateOrConnectWithoutQuotesInputSchema).optional(),
  upsert: z.lazy(() => SalesTaxUpsertWithoutQuotesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
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

export const PaymentUpdateOneWithoutQuoteNestedInputSchema: z.ZodType<Prisma.PaymentUpdateOneWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).optional(),
  upsert: z.lazy(() => PaymentUpsertWithoutQuoteInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutQuoteInputSchema) ]).optional(),
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

export const PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateOneWithoutQuoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutQuoteInputSchema).optional(),
  upsert: z.lazy(() => PaymentUpsertWithoutQuoteInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutQuoteInputSchema) ]).optional(),
}).strict();

export const QuoteCreateNestedOneWithoutTripsInputSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutTripsInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutTripsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutTripsInputSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional(),
}).strict();

export const PaymentCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.PaymentCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
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
  connect: z.lazy(() => FlightWhereUniqueInputSchema).optional(),
}).strict();

export const PaymentUncheckedCreateNestedOneWithoutTripInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateNestedOneWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutTripInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutTripInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PaymentCreateOrConnectWithoutTripInputSchema).optional(),
  connect: z.lazy(() => PaymentWhereUniqueInputSchema).optional(),
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
  connect: z.lazy(() => FlightWhereUniqueInputSchema).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
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

export const TripCreateNestedOneWithoutFlightInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutFlightInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutFlightInputSchema),z.lazy(() => TripUncheckedCreateWithoutFlightInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutFlightInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
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

export const TripCreateNestedOneWithoutLocationsInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutLocationsInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutLocationsInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
}).strict();

export const TripUpdateOneWithoutLocationsNestedInputSchema: z.ZodType<Prisma.TripUpdateOneWithoutLocationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutLocationsInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutLocationsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithoutLocationsInputSchema),z.lazy(() => TripUncheckedUpdateWithoutLocationsInputSchema) ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutPaymentInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
}).strict();

export const QuoteCreateNestedOneWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteCreateNestedOneWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional(),
}).strict();

export const TripUpdateOneWithoutPaymentNestedInputSchema: z.ZodType<Prisma.TripUpdateOneWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutPaymentInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutPaymentInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedUpdateWithoutPaymentInputSchema) ]).optional(),
}).strict();

export const QuoteUpdateOneRequiredWithoutPaymentNestedInputSchema: z.ZodType<Prisma.QuoteUpdateOneRequiredWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => QuoteCreateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => QuoteCreateOrConnectWithoutPaymentInputSchema).optional(),
  upsert: z.lazy(() => QuoteUpsertWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => QuoteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => QuoteUpdateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutPaymentInputSchema) ]).optional(),
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

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const UserCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const UserCreateManyAccountInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyAccountInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyAccountInputSchema),z.lazy(() => UserCreateManyAccountInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
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
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  last_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email_address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stripe_customer_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_customer: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  account_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta_data: z.lazy(() => JsonNullableFilterSchema).optional(),
}).strict();

export const QuoteCreateWithoutUserInputSchema: z.ZodType<Prisma.QuoteCreateWithoutUserInput> = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutUserInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service_id: z.number(),
  vehicle_id: z.number(),
  sales_tax_id: z.number(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutUserInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const QuoteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManyUserInputSchema),z.lazy(() => QuoteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AccountCreateWithoutUsersInputSchema: z.ZodType<Prisma.AccountCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number(),
}).strict();

export const AccountUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  company_name: z.string(),
  company_address: z.string(),
  company_phone: z.string().optional().nullable(),
  company_email: z.string(),
  company_account_number: z.number(),
}).strict();

export const AccountCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUsersInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const ConversionCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
}).strict();

export const ConversionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ConversionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  utm_term: z.string().optional().nullable(),
  utm_medium: z.string().optional().nullable(),
  utm_source: z.string().optional().nullable(),
  utm_campaign: z.string().optional().nullable(),
  gclid: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  conversion_name: z.string().optional().nullable(),
}).strict();

export const ConversionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ConversionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ConversionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]),
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
  pickup_date: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  pickup_time: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  return_date: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  return_time: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  formatted_return_date: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  formatted_return_time: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  return_service_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  selected_hours: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  selected_passengers: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  is_round_trip: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_booked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  service_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  vehicle_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  sales_tax_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
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
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company_account_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversionUpsertWithoutUserInputSchema: z.ZodType<Prisma.ConversionUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => ConversionUpdateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ConversionCreateWithoutUserInputSchema),z.lazy(() => ConversionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ConversionUpdateWithoutUserInputSchema: z.ZodType<Prisma.ConversionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  utm_term: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_medium: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  utm_campaign: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gclid: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  conversion_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutConversionInputSchema: z.ZodType<Prisma.UserCreateWithoutConversionInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteCreateNestedManyWithoutUserInputSchema).optional(),
  Account: z.lazy(() => AccountCreateNestedOneWithoutUsersInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutConversionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutConversionInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
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
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutUserNestedInputSchema).optional(),
  Account: z.lazy(() => AccountUpdateOneWithoutUsersNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutConversionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutConversionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
}).strict();

export const ServiceCreateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceCreateWithoutQuotesInput> = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().optional().nullable(),
}).strict();

export const ServiceUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutQuotesInput> = z.object({
  value: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  is_active: z.boolean().optional(),
  is_hourly: z.boolean().optional(),
  limo_anywhere_id: z.number().optional().nullable(),
}).strict();

export const ServiceCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const VehicleCreateWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleCreateWithoutQuotesInput> = z.object({
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
  vehicle_image: z.string().optional().nullable(),
}).strict();

export const VehicleUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleUncheckedCreateWithoutQuotesInput> = z.object({
  value: z.number().optional(),
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
  vehicle_image: z.string().optional().nullable(),
}).strict();

export const VehicleCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => VehicleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VehicleCreateWithoutQuotesInputSchema),z.lazy(() => VehicleUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const UserCreateWithoutQuotesInputSchema: z.ZodType<Prisma.UserCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  Account: z.lazy(() => AccountCreateNestedOneWithoutUsersInputSchema).optional(),
  conversion: z.lazy(() => ConversionCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  account_id: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  conversion: z.lazy(() => ConversionUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutQuotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const SalesTaxCreateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxCreateWithoutQuotesInput> = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional(),
}).strict();

export const SalesTaxUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  tax_name: z.string(),
  amount: z.number(),
  region: z.string(),
  is_active: z.boolean().optional(),
}).strict();

export const SalesTaxCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => SalesTaxWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const LineItemCreateWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable(),
}).strict();

export const LineItemUncheckedCreateWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemUncheckedCreateWithoutQuotesInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  label: z.string(),
  description: z.string().optional().nullable(),
  is_percentage: z.boolean().optional(),
  is_taxable: z.boolean().optional(),
  is_active: z.boolean().optional(),
  amount: z.number(),
  applies_to: z.string().optional().nullable(),
}).strict();

export const LineItemCreateOrConnectWithoutQuotesInputSchema: z.ZodType<Prisma.LineItemCreateOrConnectWithoutQuotesInput> = z.object({
  where: z.lazy(() => LineItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LineItemCreateWithoutQuotesInputSchema),z.lazy(() => LineItemUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const TripCreateWithoutQuoteInputSchema: z.ZodType<Prisma.TripCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  Payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional(),
}).strict();

export const TripUncheckedCreateWithoutQuoteInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
}).strict();

export const TripCreateOrConnectWithoutQuoteInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutQuoteInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutQuoteInputSchema),z.lazy(() => TripUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const TripCreateManyQuoteInputEnvelopeSchema: z.ZodType<Prisma.TripCreateManyQuoteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TripCreateManyQuoteInputSchema),z.lazy(() => TripCreateManyQuoteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
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
  trip: z.lazy(() => TripCreateNestedOneWithoutPaymentInputSchema).optional(),
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
  trip_id: z.string().optional().nullable(),
}).strict();

export const PaymentCreateOrConnectWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutQuoteInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]),
}).strict();

export const ServiceUpsertWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutQuotesInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutQuotesInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutQuotesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutQuotesInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_hourly: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  limo_anywhere_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ServiceUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutQuotesInput> = z.object({
  value: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  vehicle_image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VehicleUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.VehicleUncheckedUpdateWithoutQuotesInput> = z.object({
  value: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  Account: z.lazy(() => AccountUpdateOneWithoutUsersNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  account_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  conversion: z.lazy(() => ConversionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const SalesTaxUpsertWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUpsertWithoutQuotesInput> = z.object({
  update: z.union([ z.lazy(() => SalesTaxUpdateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedUpdateWithoutQuotesInputSchema) ]),
  create: z.union([ z.lazy(() => SalesTaxCreateWithoutQuotesInputSchema),z.lazy(() => SalesTaxUncheckedCreateWithoutQuotesInputSchema) ]),
}).strict();

export const SalesTaxUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUpdateWithoutQuotesInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tax_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  region: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesTaxUncheckedUpdateWithoutQuotesInputSchema: z.ZodType<Prisma.SalesTaxUncheckedUpdateWithoutQuotesInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  quote_number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  origin_lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  origin_lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  origin_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  origin_formatted_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  origin_full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  origin_types: z.lazy(() => JsonFilterSchema).optional(),
  origin_place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destination_lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  destination_lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  destination_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destination_formatted_address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  destination_full_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  destination_types: z.lazy(() => JsonFilterSchema).optional(),
  destination_place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  distance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  flight_information: z.lazy(() => JsonNullableFilterSchema).optional(),
  line_items_list: z.lazy(() => JsonNullableFilterSchema).optional(),
  line_items_subtotal: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_tax: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  line_items_total: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  affiliate_payout: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  is_farmed_out: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  is_return: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PaymentUpsertWithoutQuoteInputSchema: z.ZodType<Prisma.PaymentUpsertWithoutQuoteInput> = z.object({
  update: z.union([ z.lazy(() => PaymentUpdateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutQuoteInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentCreateWithoutQuoteInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutQuoteInputSchema) ]),
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
  trip: z.lazy(() => TripUpdateOneWithoutPaymentNestedInputSchema).optional(),
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
  trip_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const QuoteCreateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteCreateWithoutTripsInput> = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutTripsInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number(),
  vehicle_id: z.number(),
  sales_tax_id: z.number(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema).optional(),
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
  quote: z.lazy(() => QuoteCreateNestedOneWithoutPaymentInputSchema),
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
  quote_number: z.number(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  place_id: z.string(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  place_id: z.string(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
}).strict();

export const LocationCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutTripInputSchema),z.lazy(() => LocationUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const LocationCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.LocationCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationCreateManyTripInputSchema),z.lazy(() => LocationCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const FlightCreateWithoutTripInputSchema: z.ZodType<Prisma.FlightCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time: z.coerce.date().optional().nullable(),
  arrival_time: z.coerce.date().optional().nullable(),
  departure_time_actual: z.coerce.date().optional().nullable(),
  arrival_time_actual: z.coerce.date().optional().nullable(),
}).strict();

export const FlightUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.FlightUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  airline_code: z.string(),
  airline_name: z.string().optional().nullable(),
  flight_number: z.string(),
  is_active: z.boolean().optional(),
  is_landed: z.boolean().optional(),
  is_arrived: z.boolean().optional(),
  departure_time: z.coerce.date().optional().nullable(),
  arrival_time: z.coerce.date().optional().nullable(),
  departure_time_actual: z.coerce.date().optional().nullable(),
  arrival_time_actual: z.coerce.date().optional().nullable(),
}).strict();

export const FlightCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.FlightCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => FlightWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const QuoteUpsertWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUpsertWithoutTripsInput> = z.object({
  update: z.union([ z.lazy(() => QuoteUpdateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutTripsInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutTripsInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutTripsInputSchema) ]),
}).strict();

export const QuoteUpdateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutTripsInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateWithoutTripsInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutTripsInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema).optional(),
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
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutPaymentNestedInputSchema).optional(),
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
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
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
  types: z.lazy(() => JsonFilterSchema).optional(),
  place_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_origin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_destination: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_waypoint: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  trip_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FlightUpsertWithoutTripInputSchema: z.ZodType<Prisma.FlightUpsertWithoutTripInput> = z.object({
  update: z.union([ z.lazy(() => FlightUpdateWithoutTripInputSchema),z.lazy(() => FlightUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => FlightCreateWithoutTripInputSchema),z.lazy(() => FlightUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const FlightUpdateWithoutTripInputSchema: z.ZodType<Prisma.FlightUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FlightUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.FlightUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  airline_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  airline_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  flight_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_landed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_arrived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  departure_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  departure_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arrival_time_actual: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TripCreateWithoutFlightInputSchema: z.ZodType<Prisma.TripCreateWithoutFlightInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  Payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
}).strict();

export const TripUncheckedCreateWithoutFlightInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutFlightInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  quote_number: z.number(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
}).strict();

export const TripCreateOrConnectWithoutFlightInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutFlightInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutFlightInputSchema),z.lazy(() => TripUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const TripUpsertWithoutFlightInputSchema: z.ZodType<Prisma.TripUpsertWithoutFlightInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutFlightInputSchema),z.lazy(() => TripUncheckedUpdateWithoutFlightInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutFlightInputSchema),z.lazy(() => TripUncheckedCreateWithoutFlightInputSchema) ]),
}).strict();

export const TripUpdateWithoutFlightInputSchema: z.ZodType<Prisma.TripUpdateWithoutFlightInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  Payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripUncheckedUpdateWithoutFlightInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutFlightInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripCreateWithoutLocationsInputSchema: z.ZodType<Prisma.TripCreateWithoutLocationsInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  Payment: z.lazy(() => PaymentCreateNestedOneWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional(),
}).strict();

export const TripUncheckedCreateWithoutLocationsInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutLocationsInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  quote_number: z.number(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
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
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  Payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripUncheckedUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutLocationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripCreateWithoutPaymentInputSchema: z.ZodType<Prisma.TripCreateWithoutPaymentInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutTripsInputSchema),
  locations: z.lazy(() => LocationCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightCreateNestedOneWithoutTripInputSchema).optional(),
}).strict();

export const TripUncheckedCreateWithoutPaymentInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutPaymentInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  quote_number: z.number(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  locations: z.lazy(() => LocationUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedCreateNestedOneWithoutTripInputSchema).optional(),
}).strict();

export const TripCreateOrConnectWithoutPaymentInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutPaymentInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutPaymentInputSchema),z.lazy(() => TripUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const QuoteCreateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteCreateWithoutPaymentInput> = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutPaymentInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number(),
  vehicle_id: z.number(),
  sales_tax_id: z.number(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
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
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quote: z.lazy(() => QuoteUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripUncheckedUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutPaymentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const QuoteUpsertWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUpsertWithoutPaymentInput> = z.object({
  update: z.union([ z.lazy(() => QuoteUpdateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedUpdateWithoutPaymentInputSchema) ]),
  create: z.union([ z.lazy(() => QuoteCreateWithoutPaymentInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const QuoteUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutPaymentInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutPaymentInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteCreateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteCreateWithoutServiceInput> = z.object({
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutServiceInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  vehicle_id: z.number(),
  sales_tax_id: z.number(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutServiceInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const QuoteCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManyServiceInputSchema),z.lazy(() => QuoteCreateManyServiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
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
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutLine_itemsInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number(),
  vehicle_id: z.number(),
  sales_tax_id: z.number(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema).optional(),
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
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  vehicle: z.lazy(() => VehicleCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutSales_taxInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number(),
  vehicle_id: z.number(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteCreateOrConnectWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutSales_taxInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutSales_taxInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutSales_taxInputSchema) ]),
}).strict();

export const QuoteCreateManySales_taxInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManySales_taxInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManySales_taxInputSchema),z.lazy(() => QuoteCreateManySales_taxInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
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
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutQuotesInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputSchema),
  sales_tax: z.lazy(() => SalesTaxCreateNestedOneWithoutQuotesInputSchema).optional(),
  line_items: z.lazy(() => LineItemCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteUncheckedCreateWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutVehicleInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number(),
  sales_tax_id: z.number(),
  line_items: z.lazy(() => LineItemUncheckedCreateNestedManyWithoutQuotesInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutQuoteInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedCreateNestedOneWithoutQuoteInputSchema).optional(),
}).strict();

export const QuoteCreateOrConnectWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteCreateOrConnectWithoutVehicleInput> = z.object({
  where: z.lazy(() => QuoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => QuoteCreateWithoutVehicleInputSchema),z.lazy(() => QuoteUncheckedCreateWithoutVehicleInputSchema) ]),
}).strict();

export const QuoteCreateManyVehicleInputEnvelopeSchema: z.ZodType<Prisma.QuoteCreateManyVehicleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => QuoteCreateManyVehicleInputSchema),z.lazy(() => QuoteCreateManyVehicleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
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

export const UserCreateManyAccountInputSchema: z.ZodType<Prisma.UserCreateManyAccountInput> = z.object({
  id: z.string().uuid().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email_address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
  is_customer: z.boolean().optional(),
  notes: z.string().optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const UserUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  quotes: z.lazy(() => QuoteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  conversion: z.lazy(() => ConversionUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  last_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stripe_customer_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_customer: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta_data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
}).strict();

export const QuoteCreateManyUserInputSchema: z.ZodType<Prisma.QuoteCreateManyUserInput> = z.object({
  quote_number: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().optional().nullable(),
  selected_passengers: z.number().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  service_id: z.number(),
  vehicle_id: z.number(),
  sales_tax_id: z.number(),
}).strict();

export const QuoteUpdateWithoutUserInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutUserInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutUserInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateManyWithoutQuotesInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateManyWithoutQuotesInput> = z.object({
  quote_number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripCreateManyQuoteInputSchema: z.ZodType<Prisma.TripCreateManyQuoteInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  origin_lat: z.number(),
  origin_lng: z.number(),
  origin_name: z.string(),
  origin_formatted_address: z.string(),
  origin_full_name: z.string().optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  origin_place_id: z.string(),
  destination_lat: z.number(),
  destination_lng: z.number(),
  destination_name: z.string(),
  destination_formatted_address: z.string(),
  destination_full_name: z.string().optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  destination_place_id: z.string(),
  distance: z.number(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.number().optional().nullable(),
  line_items_tax: z.number().optional().nullable(),
  line_items_total: z.number().optional().nullable(),
  affiliate_payout: z.number().optional().nullable(),
  is_farmed_out: z.boolean().optional().nullable(),
  is_return: z.boolean().optional(),
  notes: z.string().optional().nullable(),
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
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Payment: z.lazy(() => PaymentUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripUncheckedUpdateWithoutQuoteInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutQuoteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
  locations: z.lazy(() => LocationUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  flight: z.lazy(() => FlightUncheckedUpdateOneWithoutTripNestedInputSchema).optional(),
}).strict();

export const TripUncheckedUpdateManyWithoutTripsInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyWithoutTripsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  origin_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  origin_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  origin_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  origin_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  destination_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_formatted_address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  destination_full_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  destination_types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  destination_place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  distance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  flight_information: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_list: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  line_items_subtotal: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_tax: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  line_items_total: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  affiliate_payout: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_farmed_out: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_return: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  place_id: z.string(),
  is_origin: z.boolean().optional(),
  is_destination: z.boolean().optional(),
  is_waypoint: z.boolean().optional(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
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
  types: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  place_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_origin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_destination: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_waypoint: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const QuoteCreateManyServiceInputSchema: z.ZodType<Prisma.QuoteCreateManyServiceInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  vehicle_id: z.number().int(),
  sales_tax_id: z.number().int(),
}).strict();

export const QuoteUpdateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutServiceInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutServiceInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUpdateWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutLine_itemsInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateWithoutLine_itemsInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutLine_itemsInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteCreateManySales_taxInputSchema: z.ZodType<Prisma.QuoteCreateManySales_taxInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number().int(),
  vehicle_id: z.number().int(),
}).strict();

export const QuoteUpdateWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutSales_taxInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  vehicle: z.lazy(() => VehicleUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateWithoutSales_taxInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutSales_taxInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  vehicle_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteCreateManyVehicleInputSchema: z.ZodType<Prisma.QuoteCreateManyVehicleInput> = z.object({
  quote_number: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  pickup_date: z.number().optional().nullable(),
  pickup_time: z.number().optional().nullable(),
  return_date: z.number().optional().nullable(),
  return_time: z.number().optional().nullable(),
  formatted_pickup_date: z.string().optional().nullable(),
  formatted_pickup_time: z.string().optional().nullable(),
  formatted_return_date: z.string().optional().nullable(),
  formatted_return_time: z.string().optional().nullable(),
  return_service_type: z.string().optional().nullable(),
  selected_hours: z.number().int().optional().nullable(),
  selected_passengers: z.number().int().optional(),
  is_round_trip: z.boolean().optional(),
  is_booked: z.boolean().optional(),
  user_id: z.string(),
  service_id: z.number().int(),
  sales_tax_id: z.number().int(),
}).strict();

export const QuoteUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUpdateWithoutVehicleInput> = z.object({
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutQuotesNestedInputSchema).optional(),
  sales_tax: z.lazy(() => SalesTaxUpdateOneWithoutQuotesNestedInputSchema).optional(),
  line_items: z.lazy(() => LineItemUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUpdateOneWithoutQuoteNestedInputSchema).optional(),
}).strict();

export const QuoteUncheckedUpdateWithoutVehicleInputSchema: z.ZodType<Prisma.QuoteUncheckedUpdateWithoutVehicleInput> = z.object({
  quote_number: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pickup_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pickup_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_date: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_time: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_pickup_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_date: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  formatted_return_time: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  return_service_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_hours: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  selected_passengers: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  is_round_trip: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_booked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  service_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  sales_tax_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  line_items: z.lazy(() => LineItemUncheckedUpdateManyWithoutQuotesNestedInputSchema).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutQuoteNestedInputSchema).optional(),
  payment: z.lazy(() => PaymentUncheckedUpdateOneWithoutQuoteNestedInputSchema).optional(),
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