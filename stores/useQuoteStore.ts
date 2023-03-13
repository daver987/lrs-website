import { acceptHMRUpdate, defineStore } from 'pinia'

export const useQuoteStore = defineStore({
  id: 'quoteStore',

  state: () => ({
    quote: {},
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
