import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { createConfirmationEmail } from '~/server/services/sendGridEmail'
import { QuoteFormReturn } from '~/schema/QuoteFormSchema'

export const bookingRouter = router({
  booking: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
        notes: z.string().optional(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
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
              },
              where: {
                id: input.id,
              },
            },
          },
        },
      })
      console.log('Booking Information', data)
      const bookingData = data as unknown as QuoteFormReturn
      await createConfirmationEmail(bookingData, sendGridKey)
      return {
        status: 200,
      }
    }),
})
