import { acceptHMRUpdate, defineStore } from 'pinia'
import { consola } from 'consola'

export const useStripeStore = defineStore('stripeStore', {
  state: () => {
    return {
      customer: {},
      session: {},
      client_secret: '',
    }
  },
  actions: {
    setCustomer(items: any) {
      this.customer = items
      consola.info('Set Customer Fired')
    },
    setSession(item: any) {
      this.session = item
      consola.info('Set Session Fired')
    },
    setClientSecret(intent: any) {
      this.client_secret = intent.client_secret
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStripeStore, import.meta.hot))
}
