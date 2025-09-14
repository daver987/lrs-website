import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => {
    return { addedToCart: false, loading: false }
  },
  actions: {
    async addToCart() {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.addedToCart = true
      this.loading = false
    },
    async removeFromCart() {
      this.loading = true
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.addedToCart = false
      this.loading = false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
