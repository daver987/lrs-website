import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
export const vehicleRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vehicle.findMany()
  }),
})
