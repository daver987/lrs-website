import { addDays, isBefore } from 'date-fns'

interface QuoteResult {
  created_at?: Date | null
  is_booked?: boolean
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const quoteNumberAsString = to.query.quote_number
  console.log('Quote Number as String:', quoteNumberAsString)
  const sevenDaysFromToday = addDays(new Date(), 7)

  if (typeof quoteNumberAsString === 'string') {
    try {
      const quoteNumber = parseInt(quoteNumberAsString)
      const { data: quoteResult } = await useTrpc().quote.getCreatedAt.useQuery(
        {
          quote_number: quoteNumber,
        }
      )

      const result = quoteResult.value
      console.log('Middleware Result:', result)

      if (result && result.created_at instanceof Date) {
        const isQuoteExpired = isBefore(sevenDaysFromToday, result.created_at)
        console.log('isQuoteExpired:', isQuoteExpired)
        console.log('result.is_booked:', result.is_booked)

        if (isQuoteExpired || result.is_booked) {
          await navigateTo('/')
        }
      } else {
        await navigateTo('/')
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
      await navigateTo('/')
    }
  } else {
    await navigateTo('/')
  }
})
