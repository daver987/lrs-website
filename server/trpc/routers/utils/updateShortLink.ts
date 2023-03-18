import { PrismaClient } from '@prisma/client'
import { Summary, SummarySchema } from '~/schema/summarySchema'

export async function updateShortLink(
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
): Promise<Summary> {
  try {
    const newQuote = await prisma.quote.create(quotes)
    return SummarySchema.parse(newQuote)
  } catch (e) {
    console.error('Error creating quote:', e)
    throw e
  }
}
