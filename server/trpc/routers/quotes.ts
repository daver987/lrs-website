import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const quoteRouter = router({
  get: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.quote.findUnique({
        where: { quote_number: input.quote_number },
        include: {
          service: true,
          vehicle: true,
          user: true,
          sales_tax: true,
          trips: {
            include: {
              locations: {
                orderBy: {
                  updated_at: 'asc',
                },
              },
            },
          },
        },
      })
    }),
})
