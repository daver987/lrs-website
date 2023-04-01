import { publicProcedure, router } from '../trpc'

export const vehicleRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.vehicle.findMany({
      orderBy: {
        vehicle_number: 'asc',
      },
    })
  }),
})
