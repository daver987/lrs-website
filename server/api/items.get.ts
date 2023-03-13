import { LineItemSchema } from '~/prisma/generated/zod'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.lineItem.findMany()
    if (data) {
      console.log('Line Items SS:', data)
      return LineItemSchema.array().parse(data)
    } else {
      console.log('No Line Items found')
      return 'No Line Items found'
    }
  } catch (error) {
    console.log('Get Line Items Error:', error)
    return error
  }
})
