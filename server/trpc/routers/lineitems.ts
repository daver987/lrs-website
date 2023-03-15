import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const lineItemsRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lineItem.findMany()
  }),
})
