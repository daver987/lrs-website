import { format, add } from 'date-fns'
import { useToNumber } from '@vueuse/core'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const now = format(new Date(), 'T')
  const tomorrow = format(add(new Date(), { days: 1 }), 'T')
  const quotes = await prisma.quote.findMany({
    where: {
      pickup_date: {
        gte: useToNumber(now).value,
        lte: useToNumber(tomorrow).value,
      },
      is_booked: true,
      payment: {
        is_preauthorized: false,
      },
    },
  })
})
