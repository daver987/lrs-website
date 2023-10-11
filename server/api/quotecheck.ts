import { addDays, isBefore } from 'date-fns'
import { useNuxtApp } from '#app'
import chalk from 'chalk'

interface QuoteResult {
  created_at?: Date | null
  is_booked?: boolean
}

export default defineEventHandler(async (event) => {
  //pull params out of the event context
  const quoteNumberAsString = event.context
  //we need to check if quote_number exists
  // const quoteNumber = parseInt(quoteNumberAsString)
  console.log(
    chalk.magenta('[MIDDLEWARE]Quote Number as String:'),
    quoteNumberAsString
  )
  console.log('[MIDDLEWARE]:quotecheck context', quoteNumberAsString)
  // if (!Number.isInteger(quoteNumber)) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Invalid quote number',
  //   })
  // }

  // const sevenDaysFromToday = addDays(new Date(), 7)
  //
  // const { data: quoteResult } = await useTrpc().quote.getCreatedAt.useQuery({
  //   quote_number: quoteNumber,
  // })

  // return 'All good'
})
