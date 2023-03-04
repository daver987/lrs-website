import { useToNumber } from '@vueuse/core'
import { z } from 'zod'

export const quoteSchema = z
  .object({
    quote_number: z.number(),
    formatted_pickup_date: z.string(),
    formatted_pickup_time: z.string(),
    formatted_return_date: z.string().nullable(),
    formatted_return_time: z.string().nullable(),
    return_service_type: z.string(),
    is_round_trip: z.boolean(),
    selected_passengers: z.number(),
    selected_hours: z.number().nullable(),
    service: z
      .object({
        label: z.string(),
      })
      .strip(),
    vehicle: z
      .object({
        label: z.string(),
        vehicle_image: z.string(),
      })
      .strip(),
    trips: z.array(
      z
        .object({
          origin_full_name: z.string(),
          destination_full_name: z.string(),
          line_items_tax: z.number(),
          line_items_subtotal: z.number(),
          line_items_total: z.number(),
          line_items_list: z.array(
            z.object({
              tax: z.number(),
              label: z.string(),
              total: z.number(),
            })
          ),
        })
        .strip()
    ),
    sales_tax: z
      .object({
        tax_name: z.string(),
      })
      .strip(),
    user: z
      .object({
        first_name: z.string(),
        last_name: z.string(),
        phone_number: z.string(),
        email_address: z.string().email(),
        id: z.string(),
      })
      .strip(),
  })
  .strip()

export type Quote = z.infer<typeof quoteSchema>

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const query = getQuery(event)
    const quote_number = useToNumber(query.quote_number as string)
    const data = await prisma.quote.findUnique({
      where: { quote_number: quote_number.value },
      select: {
        quote_number: true,
        return_service_type: true,
        formatted_pickup_date: true,
        formatted_pickup_time: true,
        formatted_return_date: true,
        formatted_return_time: true,
        is_round_trip: true,
        selected_passengers: true,
        service: {
          select: {
            label: true,
          },
        },
        vehicle: {
          select: {
            label: true,
            vehicle_image: true,
          },
        },
        user: {
          select: {
            first_name: true,
            last_name: true,
            phone_number: true,
            email_address: true,
            id: true,
          },
        },
        trips: {
          select: {
            destination_full_name: true,
            line_items_list: true,
            line_items_subtotal: true,
            line_items_tax: true,
            line_items_total: true,
            origin_full_name: true,
          },
        },
        sales_tax: {
          select: {
            tax_name: true,
          },
        },
      },
    })
    if (data) {
      const quote = data
      console.log('Returned Quote:', quote)
      return quote
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get Quote Error:', error)
    return error
  }
})
