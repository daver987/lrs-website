import { router } from '../trpc'
import { quoteRouter } from '~/server/trpc/routers/quote'
import { serviceRouter } from '~/server/trpc/routers/service'
import { lineItemsRouter } from '~/server/trpc/routers/lineitems'
import { salesTaxRouter } from '~/server/trpc/routers/salesTax'
import { vehicleRouter } from '~/server/trpc/routers/vehicle'
import { stripeRouter } from '~/server/trpc/routers/stripe'
import { bookingRouter } from '~/server/trpc/routers/booking'
import { airlineRouter } from '~/server/trpc/routers/airlines'
import { airportRouter } from '~/server/trpc/routers/airports'

export const appRouter = router({
  lineItem: lineItemsRouter,
  quote: quoteRouter,
  service: serviceRouter,
  salesTax: salesTaxRouter,
  vehicle: vehicleRouter,
  stripe: stripeRouter,
  book: bookingRouter,
  airline: airlineRouter,
  airport: airportRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
