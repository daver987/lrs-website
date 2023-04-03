import { useTrpc } from '~/composables/useTrpc'
import { useQuery } from '@tanstack/vue-query'
import { QuoteFormReturn } from '~/schema/QuoteFormSchema'
import { z } from 'zod'
export async function getSalesTax() {
  const getSalesTax = () => useTrpc().salesTax.get.query()

  const { data, suspense } = useQuery({
    queryKey: ['salesTax'],
    queryFn: getSalesTax,
  })
  await suspense()
  return data.value
}
export async function getLineItems() {
  const getLineItems = () => useTrpc().lineItem.get.query()

  const { data, suspense } = useQuery({
    queryKey: ['lineItem'],
    queryFn: getLineItems,
  })
  await suspense()
  return data
}
export async function getVehicle() {
  const getVehicle = () => useTrpc().vehicle.get.query()

  const { data, suspense } = useQuery({
    queryKey: ['vehicle'],
    queryFn: getVehicle,
  })
  await suspense()
  return data
}
export async function getService() {
  const getService = () => useTrpc().service.get.query()

  const { data, suspense } = useQuery({
    queryKey: ['service'],
    queryFn: getService,
  })
  await suspense()
  return data
}
export async function getQuote(quoteNumber: string) {
  const quoteNumberSchema = z.coerce.number()
  const routeQuoteNumber = quoteNumberSchema.parse(quoteNumber)
  const getQuote = () =>
    useTrpc().quote.get.query({
      quote_number: routeQuoteNumber,
    })

  const { data, suspense } = useQuery({
    queryKey: ['quote'],
    queryFn: getQuote,
  })
  await suspense()
  return data.value! as unknown as QuoteFormReturn
}
