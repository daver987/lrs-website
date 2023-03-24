import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { createConfirmationEmail } from '~/server/services/sendGridEmail'
export const bookingRouter = router({
  bookOrder: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
      const checkQuote = await ctx.prisma.quote.findUnique({
        where: {
          quote_number: input.quote_number,
        },
        select: {
          is_booked: true,
        },
      })
      if (checkQuote?.is_booked === true) {
        console.log('Quote is booked already')
        return 'Order is already Booked'
      }
      const quote = await ctx.prisma.quote.update({
        where: {
          quote_number: input.quote_number,
        },
        data: {
          is_booked: true,
        },
        include: {
          service: true,
          vehicle: true,
          user: {
            include: {
              conversion: true,
            },
          },
          sales_tax: true,
          trips: {
            orderBy: {
              trip_order: 'asc',
            },
            include: {
              locations: {
                orderBy: {
                  route_order: 'asc',
                },
              },
            },
          },
        },
      })
      if (typeof quote === null) {
        throw new Error('Returned Quote for Booking in null')
      } else {
        console.log('Booking Information', quote)
        return await createConfirmationEmail(quote, sendGridKey)
      }
    }),
})
