<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore'
import { useStorage } from '@vueuse/core'
import { useDataStore } from '~/stores/useDataStore'
import {
  mockLineItems,
  mockSalesTaxes,
  mockServices,
  mockVehicles,
} from '~/data/mockCatalog'

useHead({
  meta: [
    {
      name: 'naive-ui-style',
    },
  ],
})

const userStore = useUserStore()
const appConfig = useAppConfig()
const storageKey = `${appConfig.brand?.slug || 'brand'}_user_id`
const user_id = useStorage(storageKey, userStore.getUserId())

userStore.setUserId(user_id.value)

const dataStore = useDataStore()
const useMockCatalog = appConfig.features?.useMockCatalog ?? false

if (useMockCatalog) {
  dataStore.setVehicleTypes(mockVehicles)
  dataStore.setServiceTypes(mockServices)
  dataStore.setLineItems(mockLineItems)
  dataStore.setSalesTaxes(mockSalesTaxes)
} else {
  await callOnce(async () => {
    try {
      const trpc = useTrpc()
      const [vehicles, services, lineItems, salesTaxes] = await Promise.all([
        trpc.vehicle.get.query(),
        trpc.service.get.query(),
        trpc.lineItem.get.query(),
        trpc.salesTax.get.query(),
      ])
      dataStore.setVehicleTypes(vehicles || [])
      dataStore.setServiceTypes(services || [])
      dataStore.setLineItems(lineItems || [])
      dataStore.setSalesTaxes(salesTaxes || [])
    } catch (e) {
      console.error('[callOnce] preload catalog failed', e)
    }
  })
}
</script>

<template>
  <div class="min-h-dvh">
    <naive-config>
      <n-loading-bar-provider>
        <naive-loading-bar navigation />
        <n-message-provider>
          <div>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </div>
        </n-message-provider>
      </n-loading-bar-provider>
    </naive-config>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
