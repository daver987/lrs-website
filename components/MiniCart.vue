<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/stores/useCartStore'
import type { QuoteFormReturn } from '~/schema/QuoteFormSchema'
import { ref, computed } from '#imports'
import { useImageFallback } from '~/composables/useImageFallback'

const cartStore = useCartStore()
const { addedToCart } = storeToRefs(cartStore)

const quoteNumberAsString = useRoute().query.quote_number
const quote = ref<null | QuoteFormReturn>(null)
const vehicleImage = ref('')
const vehicleLabel = ref('')
const serviceLabel = ref('')
const loading = ref(false)
const { onImgError } = useImageFallback()

onMounted(async () => {
  if (typeof quoteNumberAsString === 'string') {
    const quoteNumber = parseInt(quoteNumberAsString)
    const data = await useTrpc().quote.get.query({
      quote_number: quoteNumber,
    })
    if (data.status === 'NO_QUOTE') {
      return
    } else if (data.status === 'FOUND_QUOTE' && data.quote) {
      vehicleImage.value = data.quote.vehicle.vehicle_image!
      vehicleLabel.value = data.quote.vehicle.label
      serviceLabel.value = data.quote.service.label
    }
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
        class="h-6 w-6 shrink-0 text-neutral-400 group-hover:text-neutral-500"
        name="heroicons:shopping-bag"
        aria-hidden="true"
      />
      <span
        class="ml-2 text-sm font-medium"
        :class="[
          addedToCart
            ? 'text-neutral-700 group-hover:text-neutral-800 dark:text-neutral-300 dark:group-hover:text-neutral-400'
            : 'text-brand-600 group-hover:text-brand-700',
        ]"
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
          <ul class="divide-y divide-neutral-200" role="list">
            <li class="flex items-center py-6" v-if="!addedToCart">
              <Icon
                class="h-16 w-16 flex-none rounded-md"
                name="teenyicons:mood-sad-outline"
              />
              <div class="ml-4 flex-auto">
                <h3
                  class="font-brand-body text-lg font-medium text-neutral-900"
                >
                  Cart is Empty
                </h3>
              </div>
            </li>
            <li class="flex items-center py-6" v-else>
              <img
                class="h-16 w-16 flex-none rounded-md border object-contain border-neutral-200"
                :src="vehicleImage as string"
                alt="Vehicle"
                @error="onImgError"
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
            class="w-full rounded-md border border-transparent bg-brand-600 px-4 py-2 font-brand-body text-sm font-medium uppercase tracking-wider text-neutral-100 shadow-xs hover:bg-brand-700 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
            v-if="addedToCart"
            type="submit"
          >
            Book Now
          </button>

          <p class="mt-6 text-center" v-if="addedToCart">
            <button
              class="font-brand-body text-sm font-medium text-brand-600 hover:text-brand"
              @click="cartStore.removeFromCart"
            >
              Remove From Cart
            </button>
          </p>
        </form>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
