import { addDays, isBefore } from 'date-fns'
import { useNuxtApp } from '#app'
import chalk from 'chalk'

interface QuoteResult {
  created_at?: Date | null
  is_booked?: boolean
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const useTrpc = () => useNuxtApp().$client
  const quoteNumberAsString = to.query.quote_number
  console.log('[MIDDLEWARE]Quote Number as String:', quoteNumberAsString)
  const sevenDaysFromToday = addDays(new Date(), 7)

  if (typeof quoteNumberAsString !== 'string') {
    return abortNavigation('Invalid quote number')
  }

  try {
    const quoteNumber = parseInt(quoteNumberAsString)
    const { data: quoteResult } = await useTrpc().quote.getCreatedAt.useQuery({
      quote_number: quoteNumber,
    })

    const result = quoteResult.value
    console.log(chalk.magenta('[MIDDLEWARE]:checkQuote'), result)

    if (!result || !(result.created_at instanceof Date)) {
      return abortNavigation("Quote doesn't exist")
    }

    const isQuoteExpired = isBefore(sevenDaysFromToday, result.created_at)
    console.log(
      chalk.magenta('[MIDDLEWARE]result.is_booked:'),
      result.is_booked
    )

    if (isQuoteExpired) {
      return abortNavigation('Ooops! Your quote has expired.')
    }

    if (result.is_booked) {
      return abortNavigation("You can't book an already booked quote.")
    }
  } catch (error) {
    console.error(chalk.redBright('[MIDDLEWARE]:Error fetching quote:'), error)
    return abortNavigation('Error fetching quote details')
  }
})
