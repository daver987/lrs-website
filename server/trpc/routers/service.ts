import { router, publicProcedure } from '../trpc'
import chalk from 'chalk'

export const serviceRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedServices = await useStorage().getItem('formItems:services')
    if (!storedServices) {
      const services = await ctx.prisma.service.findMany({
        orderBy: {
          service_number: 'asc',
        },
      })
      await useStorage().setItem('formItems:services', services)
      console.log(chalk.blue('[NEW_SERVICES]', JSON.stringify(services)))
      return services
    } else {
      console.log(
        chalk.green('[STORED_SERVICES]', JSON.stringify(storedServices))
      )
      return storedServices
    }
  }),
})
