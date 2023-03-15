import { acceptHMRUpdate, defineStore } from 'pinia'

export const useQuoteStore = defineStore('quoteStore', {
  state: () => {
    return {
      quote: {},
    }
  },
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
