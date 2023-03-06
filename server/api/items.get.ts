import { LineItemSchema } from '~/prisma/generated/zod'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.lineItem.findMany()
    if (data) {
      return LineItemSchema.array().parse(data)
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get User Error:', error)
    return error
  }
})
