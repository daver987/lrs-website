import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { createConfirmationEmail } from '~/server/services/sendGridEmail'
import { quoteFormReturnSchema } from '~/schema/QuoteFormSchema'

export const bookingRouter = router({
  updateBooking: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
        notes: z.string().optional().default('No notes supplied'),
        id: z.string(),
        large_luggage: z.number().nullable().default(0),
        carry_on_luggage: z.number().nullable().default(0),
        flight_number: z.string().nullable().default('No Flight Supplied'),
        arrival_time: z.string().nullable().default('No Arrival time Supplied'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log('Booking input', input)
      const updateData: any = {
        notes: input.notes,
        large_luggage: input.large_luggage,
        carry_on_luggage: input.carry_on_luggage,
      }

      if (input.flight_number || input.arrival_time) {
        updateData.flight = {
          create: {
            flight_number: input.flight_number || 'No Flight Supplied',
            arrival_time: input.arrival_time || 'No Arrival time Supplied',
          },
        }
      }

      const data = await ctx.prisma.quote.update({
        where: {
          quote_number: input.quote_number,
        },
        data: {
          is_booked: true,
          trips: {
            updateMany: {
              data: updateData,
              where: {
                id: input.id,
              },
            },
          },
        },
      })

      return {
        data,
        status: 200,
      }
    }),

  confirmOrder: publicProcedure
    .input(quoteFormReturnSchema)
    .mutation(async ({ ctx, input }) => {
      const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
      console.log('Booking Information', input)
      await createConfirmationEmail(input, sendGridKey)
    }),
})
