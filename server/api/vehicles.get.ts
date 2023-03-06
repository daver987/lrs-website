import { VehicleSchema } from '~/prisma/generated/zod'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  try {
    const data = await prisma.vehicle.findMany()

    if (data) {
      return VehicleSchema.array().parse(data)
    } else {
      console.log('No data found')
      return 'No data found'
    }
  } catch (error) {
    console.log('Get Vehicle Error:', error)
    return error
  }
})
