import { acceptHMRUpdate, defineStore } from 'pinia'
import type { QuoteFormReturn } from '~~/shared/schemas'
import { consola } from 'consola'

interface State {
  quote: QuoteFormReturn | null
}

export const useQuoteStore = defineStore('quoteStore', {
  state: (): State => ({
    quote: null,
  }),
  actions: {
    setQuote(quote: QuoteFormReturn) {
      this.quote = quote
      consola.info('Set Quote Fired')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
