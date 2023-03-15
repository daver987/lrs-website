import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const serviceRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany()
  }),
})
