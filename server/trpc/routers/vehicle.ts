import { router, publicProcedure } from '../trpc'
export const vehicleRouter = router({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.vehicle.findMany()
  }),
})
