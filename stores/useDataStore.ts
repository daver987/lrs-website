import { acceptHMRUpdate, defineStore } from 'pinia'
// import { Vehicle, Service, LineItem, SalesTax } from '~/prisma/generated/zod'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      lineItems: [] as unknown,
      salesTaxes: [] as unknown,
      serviceTypes: [] as unknown,
      vehicleTypes: [] as unknown,
    }
  },

  actions: {
    setLineItems(items: unknown) {
      this.lineItems = items
    },
    setSalesTaxes(taxes: unknown) {
      this.salesTaxes = taxes
    },
    setServiceTypes(services: unknown) {
      this.serviceTypes = services
    },
    setVehicleTypes(vehicles: unknown) {
      this.vehicleTypes = vehicles
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}
