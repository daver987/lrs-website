import { useTrpc } from '~/composables/useTrpc'
import { useQuery } from '@tanstack/vue-query'
import { QuoteFormReturn } from '~/schema/QuoteFormSchema'
import { z } from 'zod'

export async function getQuote(quoteNumber: string) {
  const quoteNumberSchema = z.coerce.number()
  const routeQuoteNumber = quoteNumberSchema.parse(quoteNumber)
  const getQuote = () =>
    useTrpc().quote.get.query({
      quote_number: routeQuoteNumber,
    })

  const { data: quoteData, suspense: quoteSuspense } = await useQuery({
    queryKey: ['quote'],
    queryFn: getQuote,
  })
  await quoteSuspense()
  return quoteData.value! as unknown as QuoteFormReturn
}
