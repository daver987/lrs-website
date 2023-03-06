import { ServiceSchema } from '~/prisma/generated/zod'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.service.findMany()
    if (data) {
      return ServiceSchema.array().parse(data)
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get Services Error:', error)
    return error
  }
})
