import { router, publicProcedure } from '../trpc'
import chalk from 'chalk'
import { consola } from 'consola'

export const serviceRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedServices = await useStorage().getItem('formItems:services')
    if (storedServices) {
      consola.info(
        chalk.green('[STORED_SERVICES]', JSON.stringify(storedServices))
      )
      return storedServices
    }
    const services = await ctx.prisma.service.findMany({
      orderBy: {
        service_number: 'asc',
      },
    })
    await useStorage().setItem('formItems:services', services)
    consola.info(chalk.blue('[NEW_SERVICES]', JSON.stringify(services)))
    return services
  }),
})
