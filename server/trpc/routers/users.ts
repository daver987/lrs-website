import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { ContactFormSchema } from '~/schema/contactFormSchema'

const extendedForm = ContactFormSchema.extend({
  userId: z.string().optional(),
})

export const userRouter = router({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          stripe_customer_id: true,
        },
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany()
  }),
  userForm: publicProcedure
    .input(extendedForm)
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.prisma.user.findUnique({
        where: { email_address: input.email_address },
      })
      if (!user) {
        user = await ctx.prisma.user.create({
          data: {
            first_name: input.first_name,
            last_name: input.last_name,
            email_address: input.email_address,
            phone_number: input.phone_number,
            id: input.userId,
          },
        })
      }

      // Create a new message and connect it to the user
      const message = await ctx.prisma.message.create({
        data: {
          subject: input.subject,
          message: input.message,
          is_read: false,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      })

      return {
        user,
        message,
      }
    }),
})
