import { acceptHMRUpdate, defineStore } from 'pinia'
import { Vehicle, Service, LineItem, SalesTax } from '~/prisma/generated/zod'

export const useDataStore = defineStore({
  id: 'data',

  state: () => ({
    lineItems: [] as LineItem[],
    salesTaxes: [] as SalesTax[],
    serviceTypes: [] as Service[],
    vehicleTypes: [] as Vehicle[],
  }),

  actions: {
    setLineItems(items: any) {
      this.lineItems = items
    },
    setSalesTaxes(taxes: any) {
      this.salesTaxes = taxes
    },
    setServiceTypes(services: any) {
      this.serviceTypes = services
    },
    setVehicleTypes(vehicles: any) {
      this.vehicleTypes = vehicles
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}
