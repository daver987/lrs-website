<script setup lang="ts">
import { useCartStore } from '~/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { useStripeStore } from '~/stores/useStripeStore'
import { format } from 'date-fns'
import { ref } from '#imports'
import { z } from 'zod'
import { useQuery } from '@tanstack/vue-query'

const quoteNumberAsString = useRoute().query.quote_number
const quoteNumberSchema = z.coerce.number()
const quoteNumber = quoteNumberSchema.parse(quoteNumberAsString)
const getQuote = () =>
  useTrpc().quote.get.query({
    quote_number: quoteNumber,
  })
const { data: quoteData, suspense: quoteSuspense } = await useQuery({
  queryKey: ['quote'],
  queryFn: getQuote,
})
await quoteSuspense()

const quote = quoteData.value!
const cartStore = useCartStore()
const stripeStore = useStripeStore()
const { addedToCart, loading } = storeToRefs(cartStore)
const currentDate = format(new Date(), 'PPPP')
const checkoutLoading = ref(false)

const createBooking = async () => {
  checkoutLoading.value = true
  try {
    const { setupIntent, stripeId, statusCode } =
      await useTrpc().stripe.createCheckout.mutate({
        userId: quote!.user.id,
        quoteNumber: quote!.quote_number,
      })

    if (statusCode === 200) {
      stripeStore.setCustomer(stripeId)
      stripeStore.setClientSecret(setupIntent)
      await navigateTo({
        path: '/checkout',
        query: { quote_number: quoteNumber },
      })
    } else {
      console.error('Failed to create booking. Status code:', statusCode)
    }
  } catch (error) {
    console.error('Error creating booking:', error)
  } finally {
    checkoutLoading.value = false
  }
}
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 pt-6 pb-8 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1
      class="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
    >
      <span class="mr-1">High Park Livery </span>-
      <span class="ml-1">{{ addedToCart ? ' Order' : ' Quote' }} Details</span>
    </h1>
    <div class="mt-2 text-sm sm:flex sm:justify-between">
      <dl class="flex">
        <dt class="text-neutral-500 dark:text-neutral-100">
          {{ addedToCart ? 'Order' : 'Quote' }} Number&nbsp;<span
            class="mx-2 text-neutral-400 dark:text-neutral-100"
            aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-red-600">
          <span>HPL-{{ quote!.quote_number }}</span>
        </dd>
        <dt>
          <span class="sr-only">Date</span>
          <span
            class="mx-2 text-neutral-400 dark:text-neutral-100"
            aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-neutral-900 dark:text-neutral-100">
          <time :datetime="currentDate">{{ currentDate }} </time>
        </dd>
      </dl>
      <div class="mt-4 sm:mt-0">
        <NuxtLink to="/" class="font-medium text-brand-600 hover:text-brand">
          Continue Browsing
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
    </div>
    <form
      class="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
    >
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
        <ul
          role="list"
          class="divide-y divide-neutral-200 border-t border-b border-neutral-200"
        >
          <li
            v-for="(trip, index) in quote!.trips"
            :key="trip.trip_order!"
            class="flex py-6 sm:py-8"
          >
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="quote!.vehicle.vehicle_image!"
                :alt="quote!.vehicle.label"
                :img-attrs="{
                  class:
                    'object-contain object-center w-24 h-24 rounded-md sm:h-48 sm:w-48',
                }"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div
                class="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0"
              >
                <div>
                  <div class="mb-2 flex justify-between">
                    <h3 class="text-base">
                      <NuxtLink
                        to="/"
                        class="font-medium text-neutral-700 hover:text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-200"
                      >
                        {{ quote!.service.label }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Date: </span
                      >{{ trip.formatted_pickup_date }}
                      <span class="text-brand-400">Time: </span
                      >{{ trip.formatted_pickup_time }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">PU: </span
                      >{{ trip.locations[0].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">DO: </span
                      >{{ trip.locations[1].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote!.vehicle.label }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote!.selected_passengers }}
                    </p>
                  </div>
                  <p class="text-neutral-500 dark:text-neutral-100">
                    <span class="text-brand-400">Base Rate: </span>$
                    {{ quote!.quote_total }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div v-if="false" class="absolute top-0 right-0">
                    <button
                      type="button"
                      class="-m-2 inline-flex p-2 text-neutral-400 hover:text-neutral-500"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        name="heroicons:x-mark-20-solid"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="mt-4 flex space-x-2 text-sm text-neutral-700 dark:text-neutral-200"
              >
                <Icon
                  name="heroicons:check-20-solid"
                  v-if="quote!.is_round_trip"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-neutral-300"
                  aria-hidden="true"
                />
                <span>
                  {{
                    quote!.is_round_trip
                      ? index === 0
                        ? 'One Way Trip'
                        : 'Return Trip'
                      : 'One Way Trip'
                  }}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section
        aria-labelledby="summary-heading"
        class="mt-16 rounded-lg bg-neutral-100 px-4 py-6 dark:bg-neutral-900 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2
          id="summary-heading"
          class="text-lg font-medium text-neutral-900 dark:text-neutral-100"
        >
          {{ addedToCart ? 'Order' : 'Quote' }} Summary
        </h2>

        <dl class="mt-6 space-y-4">
          <div
            class="flex items-center justify-between border-t border-neutral-200 pt-4"
            v-for="item in quote!.combined_line_items"
            :key="item.label"
          >
            <dt
              class="flex items-center text-sm text-neutral-600 dark:text-neutral-300"
            >
              <span>{{ item.label }}</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-neutral-400 hover:text-neutral-500"
              >
                <span class="sr-only"
                  >Learn more about how {{ item.label }} is calculated</span
                >
                <Icon
                  name="heroicons:question-mark-circle-20-solid"
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            </dt>
            <dd
              class="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              $ {{ item.total.toFixed(2) }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            v-if="!addedToCart"
            @click="cartStore.addToCart()"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
          >
            {{ loading ? 'Adding To Cart...' : 'Add To Cart' }}
          </button>
          <button
            v-else
            @click="createBooking"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
          >
            {{ checkoutLoading ? 'Loading...' : 'Book Now' }}
          </button>
        </div>
      </section>
    </form>
  </main>
</template>
