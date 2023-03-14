export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const query = getQuery(event)
  try {
    const user = await prisma.user.findUnique({
      where: { id: query.id as string },
      select: {
        stripe_customer_id: true,
      },
    })
    if (user) {
      return user
    } else {
      console.log('No user found')
      return 'No user found'
    }
  } catch (error) {
    console.log('Get Services Error:', error)
    return error
  }
})
