import { router, publicProcedure } from '../trpc'
export const lineItemsRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lineItem.findMany()
  }),
})
