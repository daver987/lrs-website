import { SalesTaxSchema } from '~/prisma/generated/zod'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.salesTax.findMany()
    if (data) {
      console.log('Sales Tax SS:', data)
      return SalesTaxSchema.array().parse(data)
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Sales Tax Error:', error)
    return error
  }
})
