import { PrismaClient } from '@prisma/client'
// import { Summary, SummarySchema } from '~/schema/summarySchema'

export async function trpcUtils(
  prisma: PrismaClient,
  quote: any,
  shortLink: string
) {
  try {
    return await prisma.quote.update({
      where: {
        quote_number: quote.quote_number,
      },
      data: {
        short_link: shortLink,
      },
    })
  } catch (e) {
    console.error('Error Updating Short Link', e)
  }
}

export async function createQuote(
  quotes: any,
  prisma: PrismaClient
): Promise<any> {
  try {
    return await prisma.quote.create(quotes)
  } catch (e) {
    console.error('Error creating quote:', e)
    throw e
  }
}
