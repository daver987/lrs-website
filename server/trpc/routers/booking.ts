import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import { createConfirmationEmail } from '~/server/services/sendGridEmail'
import { quoteFormReturnSchema } from '~/schema/QuoteFormSchema'

export const bookingRouter = router({
  update: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
        notes: z.string().optional().default('No notes supplied'),
        id: z.string(),
        large_luggage: z.number().optional().nullable(),
        carry_on_luggage: z.number().optional().nullable(),
        flight_number: z.string().optional().nullable(),
        arrival_time: z.string().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log('Booking input', input)

      const data = await ctx.prisma.quote.update({
        where: {
          quote_number: input.quote_number,
        },
        data: {
          is_booked: true,
        },
      })
      const tripData = ctx.prisma.trip.update({
        where: {
          id: input.id,
        },
        data: {
          carry_on_luggage: input.carry_on_luggage,
          large_luggage: input.large_luggage,
          notes: input.notes,
          flight: {
            connectOrCreate: {
              where: {
                trip_id: input.id,
              },
              create: {
                flight_number: input.flight_number!,
                arrival_time: input.arrival_time,
              },
            },
          },
        },
        include: {
          payment: true,
          price: true,
        },
      })

      return {
        ...tripData,
        ...data,
        status: 200,
      }
    }),

  confirmOrder: publicProcedure
    .input(quoteFormReturnSchema)
    .mutation(async ({ input }) => {
      const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
      console.log('Booking Information', input)
      await createConfirmationEmail(input, sendGridKey)
    }),
})
