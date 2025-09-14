import { router, publicProcedure } from '../trpc'
import chalk from 'chalk'
import { consola } from 'consola'

export const salesTaxRouter = router({
  get: publicProcedure.query(async ({ ctx }) => {
    const storedSalesTax = await useStorage().getItem('formItems:salesTax')
    if (storedSalesTax) {
      consola.info(
        chalk.green('[STORED_SALES_TAX]', JSON.stringify(storedSalesTax))
      )
      return storedSalesTax
    }
    const salesTax = await ctx.prisma.salesTax.findMany()
    useStorage().setItem('formItems:salesTax', salesTax)
    consola.info(chalk.blue('[NEW_SALES_TAX]', JSON.stringify(salesTax)))
    return salesTax
  }),
})
