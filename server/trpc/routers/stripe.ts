import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import {
  getOrCreateStripCustomerId,
  createSetupIntent,
} from '~/server/services/stripe'
import {
  handleCustomerCreated,
  handleSetupIntentSucceeded,
} from '~/server/services/stripeHandlers'

export const stripeRouter = router({
  createCheckout: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        quoteNumber: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stripeId = await getOrCreateStripCustomerId({
        stripe: ctx.stripe,
        prisma: ctx.prisma,
        userId: input.userId,
      })
      const setupIntent = await createSetupIntent({
        stripeCustomerId: stripeId,
        quoteNumber: input.quoteNumber,
        stripe: ctx.stripe,
        prisma: ctx.prisma,
      })
      return { setupIntent, stripeId, statusCode: 200 }
    }),
})
