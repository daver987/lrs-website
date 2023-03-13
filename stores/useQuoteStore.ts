import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Summary } from '~/schema/summarySchema'

export const useQuoteStore = defineStore({
  id: 'quoteStore',

  state: () => ({
    quote: {} as Summary,
  }),

  actions: {
    setQuote(items: any) {
      this.quote = items.quote
      console.log('Set Quote Fired')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
