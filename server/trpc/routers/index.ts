import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { ServiceSchema } from '~/prisma/generated/zod'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        time: new Date(),
      }
    }),

  getServices: publicProcedure
    .input(z.array(ServiceSchema))
    .query(({ input }) => {
      return {}
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
