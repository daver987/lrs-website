import { router, publicProcedure } from '../trpc'
import chalk from 'chalk'

export const lineItemsRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedLineItems = await useStorage().getItem('formItems:lineItems')
    if (!storedLineItems) {
      const lineItems = await ctx.prisma.lineItem.findMany()
      useStorage().setItem('formItems:lineItems', lineItems)
      console.log(chalk.blue('[NEW_LINE_ITEMS]', JSON.stringify(lineItems)))
      return lineItems
    } else {
      console.log(
        chalk.green('[STORED_LINE_ITEMS]', JSON.stringify(storedLineItems))
      )
      return storedLineItems
    }
  }),
})
