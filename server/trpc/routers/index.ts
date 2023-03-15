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
  getQuote: publicProcedure.query(({ ctx, input }) => {}),
})

// export type definition of API
export type AppRouter = typeof appRouter
