import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const salesTaxRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.salesTax.findMany()
  }),
})
