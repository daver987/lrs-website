import { router, publicProcedure } from '../trpc'
export const salesTaxRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.salesTax.findMany()
  }),
})
