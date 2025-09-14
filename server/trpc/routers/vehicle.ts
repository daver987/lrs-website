import { publicProcedure, router } from '../trpc'
import chalk from 'chalk'
import { consola } from 'consola'

export const vehicleRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedVehicles = await useStorage().getItem('formItems:vehicles')
    if (!storedVehicles) {
      const vehicles = await ctx.prisma.vehicle.findMany({
        orderBy: {
          vehicle_number: 'asc',
        },
      })
      await useStorage().setItem('formItems:vehicles', JSON.stringify(vehicles))
      consola.info(chalk.blue('[NEW_VEHICLE]', vehicles))
      return vehicles
    } else {
      consola.info(
        chalk.green('[STORED_VEHICLE]', JSON.stringify(storedVehicles))
      )
      return storedVehicles
    }
  }),
})
