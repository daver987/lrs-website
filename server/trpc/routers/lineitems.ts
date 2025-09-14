import { router, publicProcedure } from '../trpc'
import chalk from 'chalk'
import { consola } from 'consola'

export const lineItemsRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedLineItems = await useStorage().getItem('formItems:lineItems')
    if (!storedLineItems) {
      const lineItems = await ctx.prisma.lineItem.findMany()
      useStorage().setItem('formItems:lineItems', lineItems)
      consola.info(chalk.blue('[NEW_LINE_ITEMS]', JSON.stringify(lineItems)))
      return lineItems
    } else {
      consola.info(
        chalk.green('[STORED_LINE_ITEMS]', JSON.stringify(storedLineItems))
      )
      return storedLineItems
    }
  }),
})
