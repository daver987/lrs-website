import { acceptHMRUpdate, defineStore } from 'pinia'
import { Summary } from '~/schema/summarySchema'

export interface LineItem {
  label: string
  total: number
  tax: number
}

export interface ExtendedSummary extends Summary {
  combined_line_items: LineItem[]
}

export interface QuoteState {
  quote: ExtendedSummary | null
}

export const useQuoteStore = defineStore('quoteStore', {
  state: (): QuoteState => ({
    quote: null,
  }),
  actions: {
    setQuote(quote: Summary) {
      //@ts-ignore
      this.quote = quote
      console.log('Set Quote Fired')
    },
  },
})

if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
