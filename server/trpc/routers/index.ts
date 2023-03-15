import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  getServices: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany()
  }),
  getLineItems: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lineItem.findMany()
  }),
  getVehicles: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vehicle.findMany()
  }),
  getSalesTax: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.salesTax.findMany()
  }),
  getQuote: publicProcedure
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
              locations: true,
            },
          },
        },
      })
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
