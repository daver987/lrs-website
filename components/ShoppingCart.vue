<script setup lang="ts">
import { useCartStore } from '~/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { useStripeStore } from '~/stores/useStripeStore'
import { useQuoteStore } from '~/stores/useQuoteStore'
import { format } from 'date-fns'
import type { Summary } from '~/schema/summarySchema'
import { ref } from '#imports'
import { useNuxtApp } from '#app'
import { z } from 'zod'

const { $client } = useNuxtApp()
const cartStore = useCartStore()
const quoteStore = useQuoteStore()

const { addedToCart, loading } = storeToRefs(cartStore)
const currentDate = format(new Date(), 'PPPP')

const quote = ref<Summary>({
  is_round_trip: false,
  quote_number: 0,
  selected_hours: 0,
  selected_passengers: 1,
  quote_tax_total: 0,
  quote_subtotal: 0,
  quote_total: 0,
  user: {
    first_name: '',
    last_name: '',
    phone_number: '',
    email_address: '',
    full_name: '',
    id: '',
    conversion: {
      utm_medium: null,
      utm_source: null,
      utm_campaign: null,
      utm_term: null,
      gclid: null,
    },
  },
  vehicle: {
    label: '',
    vehicle_image:
      'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024',
  },
  sales_tax: { tax_name: '' },
  trips: [
    {
      locations: [
        {
          full_name: '',
        },
        {
          full_name: '',
        },
      ],
      formatted_pickup_date: '',
      formatted_pickup_time: '',
      service_label: '',
      line_items_tax: 0,
      line_items_subtotal: 0,
      line_items_total: 0,
      line_items_list: [
        {
          label: '',
          tax: 0,
          total: 0,
        },
      ],
    },
  ],
})

const route = useRoute()
const { quote_number } = route.query
const quoteNumberSchema = z.coerce.number()
const quoteNumber = quoteNumberSchema.parse(quote_number)

const { data } = await $client.quote.get.useQuery({
  quote_number: quoteNumber,
})

Object.assign(quote.value, data.value)
quoteStore.setQuote(data.value as any)
console.log('Assigned to quote:', quote.value)
const { user } = quote.value

const checkoutLoading = ref(false)

const createBooking = async () => {
  const stripeStore = useStripeStore()
  checkoutLoading.value = true

  try {
    const { setupIntent, stripeId, statusCode } =
      await $client.stripe.createCheckout.mutate({
        userId: user.id,
        quoteNumber,
      })

    console.log('Stripe Response', setupIntent)

    if (statusCode === 200) {
      stripeStore.setCustomer(stripeId)
      stripeStore.setClientSecret(setupIntent)

      await navigateTo('/checkout', {
        redirectCode: 303,
        external: false,
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
          <span>HPL-{{ quote.quote_number }}</span>
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
          <!--          One Way Trip-->
          <li class="flex py-6 sm:py-8">
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="quote.vehicle.vehicle_image!"
                :alt="quote.vehicle.label"
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
                        to="#"
                        class="font-medium text-neutral-700 hover:text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-200"
                        >{{ quote.trips[0].service_label }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Date: </span
                      >{{ quote.trips[0].formatted_pickup_date }}
                      <span class="text-brand-400">Time: </span>
                      {{ quote.trips[0].formatted_pickup_time }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">PU: </span
                      >{{ quote.trips[0].locations[0].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">DO: </span>
                      {{ quote.trips[0].locations[1].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote.vehicle.label }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote.selected_passengers }}
                    </p>
                  </div>
                  <p class="text-neutral-500 dark:text-neutral-100">
                    <span class="text-brand-400">Base Rate: </span>$
                    {{ quote.trips[0].line_items_list[0].total.toFixed(2) }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="absolute top-0 right-0">
                    <button
                      v-if="false"
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
                  v-if="quote.is_round_trip"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-neutral-300"
                  aria-hidden="true"
                />
                <span>{{
                  quote.is_round_trip ? 'Round Trip' : `One Way Trip`
                }}</span>
              </p>
            </div>
          </li>

          <!--          Return Trip-->
          <li v-if="quote.is_round_trip" class="flex py-6 sm:py-10">
            <div class="flex-shrink-0">
              <NuxtPicture
                :src="quote.vehicle.vehicle_image!"
                :alt="quote.vehicle.label"
                :img-attrs="{
                  class:
                    'object-contain object-center w-24 h-24 rounded-md sm:h-48 sm:w-48',
                }"
                width="1920"
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
                        to="#"
                        class="font-medium text-neutral-700 hover:text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-200"
                        >{{ quote.trips[1].service_label }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Date: </span
                      >{{ quote.trips[1].formatted_pickup_date }}
                      <span class="text-brand-400">Time: </span>
                      {{ quote.trips[1].formatted_pickup_time }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">PU: </span
                      >{{ quote.trips[0].locations[0].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">DO: </span>
                      {{ quote.trips[0].locations[1].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote.vehicle.label }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote.selected_passengers }}
                    </p>
                  </div>
                  <p class="text-neutral-500 dark:text-neutral-100">
                    <span class="text-brand-400">Base Rate: </span>$
                    {{ quote.quote_subtotal }}
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
                  v-if="quote.is_round_trip"
                  class="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <Icon
                  name="heroicons:clock-20-solid"
                  v-else
                  class="h-5 w-5 flex-shrink-0 text-neutral-300"
                  aria-hidden="true"
                />
                <span>{{
                  quote.is_round_trip ? 'Round Trip' : `One Way Trip`
                }}</span>
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
            v-for="item in quote.trips[0].line_items_list"
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
          <div
            class="flex items-center justify-between border-t border-neutral-200 pt-4"
          >
            <dt class="flex text-sm text-neutral-600 dark:text-neutral-300">
              <span>{{ quote.sales_tax.tax_name }}</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-neutral-400 hover:text-neutral-500"
              >
                <span class="sr-only"
                  >Learn more about how {{ quote.sales_tax.tax_name }} is
                  calculated</span
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
              $
              {{ quote.quote_tax_total }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-neutral-200 pt-4"
          >
            <dt
              class="text-base font-medium text-neutral-900 dark:text-neutral-100"
            >
              {{ addedToCart ? 'Order' : 'Quote' }} total
            </dt>
            <dd
              class="text-base font-medium text-neutral-900 dark:text-neutral-100"
            >
              $
              {{ quote.quote_total.toFixed(2) }}
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
