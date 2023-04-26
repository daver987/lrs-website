import { publicProcedure, router } from '~/server/trpc/trpc'

interface LineItem {
  label: string
  total: number
  id: number
}

interface NewQuote {
  trips: any[]
  sales_tax: { tax_name: string }
  service: { label: string }
  vehicle: { label: string; vehicle_image: string }
  base_rate: number
  created_at: string
  is_booked: boolean
  is_round_trip: boolean
  line_items_total: number
  pickup_date: number
  pickup_time: number
  quote_number: number
  return_date: any
  return_time: any
  sales_tax_id: number
  selected_hours: any
  service_number: number
  tax_amount: number
  total_price: number
  updated_at: string
  user_id: string
  vehicle_number: number
}

const lineItemsListTest = [
  {
    label: 'Gratuity',
    total: 25.57,
    id: 1,
  },
  {
    label: 'Fuel Surcharge',
    total: 10.23,
    id: 2,
  },
]

const newQuoteTest = {
  trips: [
    {
      destination_formatted_address: '1265 Sixth Line, Oakville, Ontario',
      destination_name: '1265 Sixth Line, Oakville, Ontario',
      is_return: false,
      origin_name: 'Toronto Pearson Airport',
      origin_formatted_address: '6644 Silver Dart Drive, Mississauga Ontario',
    },
  ],
  sales_tax: {
    tax_name: 'HST',
  },
  service: {
    label: 'From Airport',
  },
  vehicle: {
    label: 'Standard SUV',
    vehicle_image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024',
  },

  base_rate: 127.8459,
  created_at: '2023-02-20T20:49:42.485Z',
  is_booked: false,
  is_round_trip: false,
  line_items_total: 35.796852,
  pickup_date: 1677128400000,
  pickup_time: 1676880300000,
  quote_number: 6,
  return_date: 0,
  return_time: 0,
  sales_tax_id: 1,
  selected_hours: null,
  selected_passengers: 1,
  service_number: 3,
  tax_amount: 17.94956436,
  total_price: 181.59231636,
  updated_at: '2023-02-20T20:49:42.485Z',
  user_id: 'b98f28e7-9505-4bb2-8f47-7bc006584828',
  vehicle_number: 3,
}

const quoteData = {
  newQuote: {
    quote_number: 2520,
    created_at: '2023-02-23T07:53:55.066Z',
    updated_at: '2023-02-23T07:53:55.066Z',
    selected_hours: null,
    selected_passengers: 1,
    pickup_date: 1677042000000,
    pickup_time: 1677146400000,
    return_date: null,
    return_time: null,
    is_round_trip: false,
    is_booked: false,
    base_rate: 279.791,
    line_items_total: 78.34148,
    tax_amount: 39.2826564,
    total_price: 397.4151364,
    session_id: null,
    user_id: 'b98f28e7-9505-4bb2-8f47-7bc006584828',
    service_number: 3,
    vehicle_number: 2,
    sales_tax_id: 1,
    sales_tax: {
      id: 1,
      created_at: '2023-01-06T16:01:30.060Z',
      updated_at: '2023-01-06T16:01:30.060Z',
      tax_name: 'HST',
      amount: 13,
      region: 'ON',
      is_active: true,
    },
    vehicle: {
      value: 2,
      created_at: '2023-01-06T17:43:53.310Z',
      updated_at: '2023-01-06T17:43:53.310Z',
      max_passengers: 3,
      max_luggage: 3,
      per_km: 1.9,
      per_hour: 90,
      min_hours: 2,
      min_distance: 25,
      min_rate: 90,
      is_active: true,
      label: 'Premium Sedan',
      limo_anywhere_id: 117683,
      vehicle_image:
        'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d171f30-de2f-447c-a602-95ccf248c600/1024',
    },
    service: {
      value: 3,
      created_at: '2023-01-07T21:39:33.497Z',
      updated_at: '2023-01-07T21:39:33.497Z',
      label: 'From Airport',
      is_active: true,
      is_hourly: false,
      limo_anywhere_id: 131743,
    },
    trips: [
      {
        id: 'dd1cabbf-a17d-4f24-a0ca-4f11894f7e56',
        created_at: '2023-02-23T07:53:55.066Z',
        updated_at: '2023-02-23T07:53:55.066Z',
        origin_lat: 43.6858094,
        origin_lng: -79.6041328,
        origin_name: 'Toronto Pearson International Airport',
        origin_formatted_address:
          '6301 Silver Dart Dr, Mississauga, ON L5P 1B2, Canada',
        origin_full_name:
          'Toronto Pearson International Airport, 6301 Silver Dart Dr, Mississauga, ON L5P 1B2, Canada',
        origin_types: ['airport', 'point_of_interest', 'establishment'],
        origin_place_id: 'ChIJkdQtwEo5K4gRxQ4DxOldHbQ',
        destination_lat: 43.0895577,
        destination_lng: -79.0849436,
        destination_name: 'Niagara Falls',
        destination_formatted_address: 'Niagara Falls, ON, Canada',
        destination_full_name: 'Niagara Falls, ON, Canada',
        destination_types: ['locality', 'political'],
        destination_place_id: 'ChIJuU2C7F5E04kRiKK9VmHF0kY',
        distance: 124.89,
        is_return: false,
        notes: null,
        quote_number: 2520,
      },
    ],
    user: {
      id: 'b98f28e7-9505-4bb2-8f47-7bc006584828',
      created_at: '2023-02-20T10:03:22.053Z',
      updated_at: '2023-02-20T10:03:22.053Z',
      first_name: 'David',
      last_name: 'Robertson',
      email_address: 'oplholds@hotmail.com',
      phone_number: '+1 289 400 9408',
      stripe_customer_id: 'cus_NJ2n3Hf3XAhPei',
      is_customer: false,
      account_id: null,
      notes: null,
      meta_data: null,
    },
  },
  lineItemsList: [
    {
      id: '1',
      created_at: '2023-01-06T16:07:13.683Z',
      updated_at: '2023-01-06T16:07:13.683Z',
      label: 'Gratuity',
      description: null,
      is_percentage: true,
      is_taxable: false,
      amount: 20,
      is_active: true,
      total: 55.958200000000005,
    },
    {
      id: '2',
      created_at: '2023-01-06T17:41:21.800Z',
      updated_at: '2023-01-06T17:41:21.800Z',
      label: 'Fuel Surcharge',
      description: null,
      is_percentage: true,
      is_taxable: true,
      amount: 8,
      is_active: true,
      total: 22.38328,
    },
  ],
}
export const salesTaxRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.conn.execute('SELECT * FROM SalesTax')
    return results.rows
  }),
})

export const lineItemsRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.conn.execute('SELECT * FROM LineItem')
    return results.rows
  }),
})

export const serviceRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.conn.execute(
      'SELECT * FROM Service ORDER BY service_number ASC'
    )
    return results.rows
  }),
})

export const vehicleRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.conn.execute(
      'SELECT * FROM Vehicle ORDER BY vehicle_number ASC'
    )
    return results.rows
  }),
})
