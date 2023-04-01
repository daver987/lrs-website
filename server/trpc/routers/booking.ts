import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { createConfirmationEmail } from '~/server/services/sendGridEmail'
import { quoteFormReturnSchema } from '~/schema/QuoteFormSchema'

export const bookingRouter = router({
  booking: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
        notes: z.string().optional(),
        id: z.string(),
        large_luggage: z.number(),
        carry_on_luggage: z.number(),
        flight_number: z.string(),
        arrival_time: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.quote.update({
        where: {
          quote_number: input.quote_number,
        },
        data: {
          is_booked: true,
          trips: {
            update: {
              data: {
                notes: input.notes,
                large_luggage: input.large_luggage,
                carry_on_luggage: input.carry_on_luggage,
                flight: {
                  create: {
                    flight_number: input.flight_number,
                    arrival_time: input.arrival_time,
                  },
                },
              },
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
