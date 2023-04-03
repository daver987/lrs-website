import { z } from 'zod'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const quoteNumberAsString = to.query.quote_number

  if (!quoteNumberAsString) {
    return navigateTo('/')
  }
  const quoteNumberSchema = z.coerce.number()
  const quoteNumber = quoteNumberSchema.parse(quoteNumberAsString)
  const quoteData = await useTrpc().quote.getFiltered.query({
    quote_number: quoteNumber,
  })

  if (!quoteData) {
    return navigateTo('/')
  }
})
