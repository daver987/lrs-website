import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { createConfirmationEmail } from '~/server/services/sendGridEmail'
import type { QuoteFormReturn } from '~/schema/QuoteFormSchema'
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
        arrival_time: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const arrivalTime = new Date(input.arrival_time * 1000).toISOString()
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
                    arrival_time: arrivalTime,
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
      const bookingData = input
      await createConfirmationEmail(bookingData, sendGridKey)
    }),
})
