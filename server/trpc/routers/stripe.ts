import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import {
  getOrCreateStripCustomerId,
  createSetupIntent,
} from '~~/server/utils/stripe'
import { consola } from 'consola'
import chalk from 'chalk'

export const stripeRouter = router({
  createSetup: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        quoteNumber: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stripeId = await getOrCreateStripCustomerId({
        stripe: ctx.stripe,
        // @ts-expect-error - double check this
        prisma: ctx.prisma,
        userId: input.userId,
      })
      const setupIntent = await createSetupIntent({
        stripeCustomerId: stripeId,
        quoteNumber: input.quoteNumber,
        stripe: ctx.stripe,
        // @ts-expect-error - double check this
        prisma: ctx.prisma,
      })
      consola.info(chalk.blue('[CREATE_SETUP_INTENT]', setupIntent))
      return { setupIntent, stripeId, statusCode: 200 }
    }),
})
