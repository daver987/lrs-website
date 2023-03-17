import { acceptHMRUpdate, defineStore } from 'pinia'
import { Summary } from '~/schema/summarySchema'

interface QuoteState {
  quote: Summary | null
}

export const useQuoteStore = defineStore('quoteStore', {
  state: (): QuoteState => ({
    quote: null,
  }),
  actions: {
    setQuote(quote: Summary) {
      this.quote = quote
      console.log('Set Quote Fired')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
