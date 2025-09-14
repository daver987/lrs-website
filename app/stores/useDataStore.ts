import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Vehicle, Service, LineItem, SalesTax } from '~/shared/schemas'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      lineItems: [] as LineItem[],
      salesTaxes: [] as SalesTax[],
      serviceTypes: [] as Service[],
      vehicleTypes: [] as Vehicle[],
    }
  },

  actions: {
    setLineItems(items: LineItem[]) {
      this.lineItems = items
    },
    setSalesTaxes(taxes: SalesTax[]) {
      this.salesTaxes = taxes
    },
    setServiceTypes(services: Service[]) {
      this.serviceTypes = services
    },
    setVehicleTypes(vehicles: Vehicle[]) {
      this.vehicleTypes = vehicles
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}
