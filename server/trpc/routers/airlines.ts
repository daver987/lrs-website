import { router, publicProcedure } from '../trpc'
export const airlineRouter = router({
  getAirlines: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.airline.findMany({
      select: {
        name: true,
        id: true,
      },
    })
  }),
})
