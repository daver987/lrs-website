import { router, publicProcedure } from '../trpc'
export const airportRouter = router({
  getAirports: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.airport.findMany({
      select: {
        name: true,
        id: true,
      },
    })
  }),
})
