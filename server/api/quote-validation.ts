import { addDays, isBefore } from 'date-fns'
import chalk from 'chalk'

interface QuoteResult {
  created_at?: Date | null
  is_booked?: boolean
}

// // Implement this function to query the database and return the quote details
// async function getQuoteFromDatabase(
//   quoteNumber: number
// ): Promise<QuoteResult | null> {
//   // Query the database and return the quote details based on the provided quote_number
//   // ...
// }

export default defineEventHandler((event) => {
  const context = event.context
  console.log('Event Context:', context)

  // Check if quote_number exists in the event context
  // const quoteNumberAsString = params.quote_number
  // if (!quoteNumberAsString) {
  //   throw new Error('Quote number is missing')
  // }
  //
  // // Validate the quote_number
  // const quoteNumber = parseInt(quoteNumberAsString)
  // if (!Number.isInteger(quoteNumber)) {
  //   throw new Error('Invalid quote number')
  // }
  //
  // // Get the quote details from the database
  // const quoteResult = await getQuoteFromDatabase(quoteNumber)
  // console.log(
  //   chalk.magenta('[MIDDLEWARE]Quote Number as String:'),
  //   quoteNumberAsString
  // )
  //
  // if (!quoteResult || !(quoteResult.created_at instanceof Date)) {
  //   throw new Error("Quote doesn't exist")
  // }
  //
  // // Check if the quote is expired
  // const sevenDaysFromToday = addDays(new Date(), 7)
  // const isQuoteExpired = isBefore(sevenDaysFromToday, quoteResult.created_at)
  // console.log(
  //   chalk.magenta('[MIDDLEWARE]result.is_booked:'),
  //   quoteResult.is_booked
  // )
  //
  // if (isQuoteExpired) {
  //   throw new Error('Ooops! Your quote has expired.')
  // }
  //
  // // Check if the quote is already booked
  // if (quoteResult.is_booked) {
  //   throw new Error("You can't book an already booked quote.")
  // }

  return 'All good'
})
