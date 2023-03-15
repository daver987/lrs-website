import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { quoteRouter } from '~/server/trpc/routers/quotes'
import { serviceRouter } from '~/server/trpc/routers/service'
import { lineItemsRouter } from '~/server/trpc/routers/lineitems'
import { salesTaxRouter } from '~/server/trpc/routers/salesTax'
import { vehicleRouter } from '~/server/trpc/routers/vehicle'

export const appRouter = router({
  lineItem: lineItemsRouter,
  quote: quoteRouter,
  service: serviceRouter,
  salesTax: salesTaxRouter,
  vehicle: vehicleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
