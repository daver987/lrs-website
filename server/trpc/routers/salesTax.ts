import { router, publicProcedure } from '../trpc'
import chalk from 'chalk'

export const salesTaxRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedSalesTax = await useStorage().getItem('formItems:salesTax')
    if (!storedSalesTax) {
      const salesTax = await ctx.prisma.salesTax.findMany()
      useStorage().setItem('formItems:salesTax', salesTax)
      console.log(chalk.blue('[NEW_SALES_TAX]', JSON.stringify(salesTax)))
      return salesTax
    } else {
      console.log(
        chalk.green('[STORED_SALES_TAX]', JSON.stringify(storedSalesTax))
      )
      return storedSalesTax
    }
  }),
})
