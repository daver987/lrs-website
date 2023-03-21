import { router, publicProcedure } from '../trpc'
export const serviceRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany()
  }),
})
