import { useTrpc, useQuery } from '#imports'
import _ from 'lodash'

export async function getSalesTax() {
  const { data, suspense } = useQuery({
    queryKey: ['salesTax'],
    queryFn: () => useTrpc().salesTax.get.query(),
  })
  await suspense()
  return data.value
}

export async function getLineItems() {
  const { data, suspense } = useQuery({
    queryKey: ['lineItem'],
    queryFn: () => useTrpc().lineItem.get.query(),
  })
  await suspense()
  return data
}

export async function getVehicle() {
  const { data, suspense } = useQuery({
    queryKey: ['vehicle'],
    queryFn: async () => await useTrpc().vehicle.get.query(),
  })
  await suspense()
  return data
}

export async function getService() {
  const { data, suspense } = useQuery({
    queryKey: ['service'],
    queryFn: () => useTrpc().service.get.query(),
  })
  await suspense()
  return data
}

export async function getQuote(quoteNumber: string) {
  const routeQuoteNumber = parseInt(quoteNumber)

  const { data, suspense } = useQuery({
    queryKey: ['quote'],
    queryFn: () =>
      useTrpc().quote.get.query({
        quote_number: routeQuoteNumber,
      }),
  })
  await suspense()
  return data.value
}
