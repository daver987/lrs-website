<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/useCartStore'
import type { QuoteFormReturn } from '~/schema/QuoteFormSchema'
import { ref, computed } from '#imports'

const cartStore = useCartStore()
const { addedToCart } = storeToRefs(cartStore)

const quoteNumberAsString = useRoute().query.quote_number
const quote = ref<null | QuoteFormReturn>(null)
const vehicleImage = ref('')
const vehicleLabel = ref('')
const serviceLabel = ref('')
const loading = ref(false)

onMounted(async () => {
  if (typeof quoteNumberAsString === 'string') {
    const { data: fetchedQuote, isLoading } = await useTrpc().quote.useQuery(
      quoteNumberAsString
    )
    loading.value = isLoading.value
    quote.value = fetchedQuote
    vehicleImage.value = fetchedQuote.vehicle.vehicle_image!
    vehicleLabel.value = fetchedQuote.vehicle.label
    serviceLabel.value = fetchedQuote.service.label
  }
})

const itemsInCart = computed(() =>
  addedToCart.value ? (quote.value!.is_round_trip ? 2 : 1) : 0
)
</script>

<template>
  <Popover class="ml-4 flow-root text-sm lg:relative lg:ml-8">
    <PopoverButton class="group -m-2 flex items-center p-2">
      <Icon
        name="heroicons:shopping-bag"
        class="h-6 w-6 flex-shrink-0 text-neutral-400 group-hover:text-neutral-500"
        aria-hidden="true"
      />
      <span
        :class="[
          addedToCart
            ? 'text-neutral-700 group-hover:text-neutral-800 dark:text-neutral-300 dark:group-hover:text-neutral-400'
            : 'text-brand-600 group-hover:text-brand-700',
        ]"
        class="ml-2 text-sm font-medium"
        >{{ itemsInCart }}</span
      >
      <span class="sr-only">items in cart, view bag</span>
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <PopoverPanel
        class="absolute inset-x-0 top-16 z-10 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
      >
        <h2 class="sr-only">Shopping Cart</h2>

        <form class="mx-auto max-w-2xl px-4" @submit.prevent>
          <ul role="list" class="divide-y divide-neutral-200">
            <li class="flex items-center py-6" v-if="!addedToCart">
              <Icon
                name="teenyicons:mood-sad-outline"
                class="h-16 w-16 flex-none rounded-md"
              />
              <div class="ml-4 flex-auto">
                <h3
                  class="font-brand-body text-lg font-medium text-neutral-900"
                >
                  Cart is Empty
                </h3>
              </div>
            </li>
            <li v-else class="flex items-center py-6">
              <NuxtPicture
                :src="vehicleImage"
                alt="Vehicle"
                :img-attrs="{
                  class:
                    'h-16 w-16 flex-none rounded-md border object-contain border-neutral-200',
                }"
              />
              <div class="ml-4 flex-auto">
                <h3 class="font-brand-body font-medium text-neutral-900">
                  <NuxtLink to="#">{{ vehicleLabel }}</NuxtLink>
                </h3>
                <p class="font-brand-body text-neutral-500">
                  {{ serviceLabel }}
                </p>
              </div>
            </li>
          </ul>
          <button
            v-if="addedToCart"
            type="submit"
            class="w-full rounded-md border border-transparent bg-brand-600 px-4 py-2 font-brand-body text-sm font-medium uppercase tracking-wider text-neutral-100 shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
          >
            Book Now
          </button>

          <p v-if="addedToCart" class="mt-6 text-center">
            <button
              @click="cartStore.removeFromCart"
              class="font-brand-body text-sm font-medium text-brand-600 hover:text-brand"
            >
              Remove From Cart
            </button>
          </p>
        </form>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
