import { acceptHMRUpdate, defineStore } from 'pinia'
import { QuotesWithTripsAndUser } from '~/server/utils/trpcUtils'

interface State {
  quote: QuotesWithTripsAndUser | null
}

export const useQuoteStore = defineStore('quoteStore', {
  state: (): State => ({
    quote: null,
  }),
  actions: {
    setQuote(quote: QuotesWithTripsAndUser) {
      this.quote = quote
      console.log('Set Quote Fired')
    },
  },
})

if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
