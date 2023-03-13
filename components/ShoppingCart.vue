<script setup lang="ts">
import { useQuoteStore } from '~/stores/useQuoteStore'
import { useCartStore } from '~/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { useStripeStore } from '~/stores/useStripeStore'
import { format } from 'date-fns'
import { SummarySchema } from '~/schema/summarySchema'
import type { Summary } from '~/schema/summarySchema'
import { ref } from '#imports'

const quoteStore = useQuoteStore()
const cartStore = useCartStore()
const stripeStore = useStripeStore()

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
    id: '',
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

if (quoteStore.quote) {
  Object.assign(quote, quoteStore.quote)
  console.log('Store assigned to quote')
}

const route = useRoute()
const { quote_number } = route.query
if (quote_number) {
  console.log('Quote Number in route:', quote_number)
  const { data } = await useFetch('/api/quote', {
    method: 'GET',
    query: { quote_number: quote_number },
  })
  const parsedQuote = SummarySchema.strip().parse(data.value)
  console.log('Fetched Data from route:', parsedQuote)
  Object.assign(quote, parsedQuote)
  Object.assign(quoteStore.quote, parsedQuote)
  console.log('Fetched data assigned to quote')
}

const checkoutLoading = ref(false)

const createBooking = async () => {
  checkoutLoading.value = true
  try {
    const { data: response } = await useFetch('/api/booking', {
      method: 'POST',
      body: quote,
    })
    console.log('Stripe Response', response.value)
    if (response.value) {
      const {
        customer,
        setupIntent,
        statusCode,
        update: prismaData,
      } = response.value
      console.log('Prisma Data:', prismaData)
      console.log('Stripe Customer:', customer)
      stripeStore.setCustomer(customer)
      console.log('Stripe Setup Intent', setupIntent)
      stripeStore.setClientSecret(setupIntent)
      console.log('Status Code:', statusCode)
    }

    await until(response.value).toBeTruthy() // use wait utility function to avoid setTimeout

    checkoutLoading.value = false

    await navigateTo('/checkout', {
      redirectCode: 303,
      external: false,
    })
  } catch (error) {
    console.error(error)

    checkoutLoading.value = false
  }
}
</script>

<template>
  <main class="mx-auto max-w-2xl px-4 pt-6 pb-8 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1
      class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"
    >
      <span class="mr-1">High Park Livery </span>-
      <span class="ml-1">{{ addedToCart ? ' Order' : ' Quote' }} Details</span>
    </h1>
    <div class="mt-2 text-sm sm:flex sm:justify-between">
      <dl class="flex">
        <dt class="text-gray-500 dark:text-gray-100">
          {{ addedToCart ? 'Order' : 'Quote' }} Number&nbsp;<span
            class="mx-2 text-gray-400 dark:text-gray-100"
            aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-red-600">
          <span>HPL-{{ quote.quote_number }}</span>
        </dd>
        <dt>
          <span class="sr-only">Date</span>
          <span class="mx-2 text-gray-400 dark:text-gray-100" aria-hidden="true"
            >&middot;</span
          >
        </dt>
        <dd class="font-medium text-gray-900 dark:text-gray-100">
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
          class="divide-y divide-gray-200 border-t border-b border-gray-200"
        >
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
                        class="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-200"
                        >{{ quote.trips[0].service_label }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Date: </span
                      >{{ quote.trips[0].formatted_pickup_date }}
                      <span class="text-brand-400">Time: </span>
                      {{ quote.trips[0].formatted_pickup_time }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">PU: </span
                      >{{ quote.trips[0].locations[0].full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ quote.trips[0].locations[1].full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote.vehicle.label }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote.selected_passengers }}
                    </p>
                  </div>
                  <p class="text-gray-500 dark:text-gray-100">
                    <span class="text-brand-400">Base Rate: </span>$
                    {{ quote.quote_subtotal }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="absolute top-0 right-0">
                    <button
                      v-if="false"
                      type="button"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
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
                class="mt-4 flex space-x-2 text-sm text-gray-700 dark:text-gray-200"
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
                  class="h-5 w-5 flex-shrink-0 text-gray-300"
                  aria-hidden="true"
                />
                <span>{{
                  quote.is_round_trip ? 'Round Trip' : `One Way Trip`
                }}</span>
              </p>
            </div>
          </li>
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
                        class="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-200"
                        >{{ quote.trips[1].service_label }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Date: </span
                      >{{ quote.trips[1].formatted_pickup_date }}
                      <span class="text-brand-400">Time: </span>
                      {{ quote.trips[1].formatted_pickup_time }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">PU: </span
                      >{{ quote.trips[0].locations[0].full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">DO: </span>
                      {{ quote.trips[0].locations[1].full_name }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote.vehicle.label }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote.selected_passengers }}
                    </p>
                  </div>
                  <p class="text-gray-500 dark:text-gray-100">
                    <span class="text-brand-400">Base Rate: </span>$
                    {{ quote.quote_subtotal }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div v-if="false" class="absolute top-0 right-0">
                    <button
                      type="button"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
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
                class="mt-4 flex space-x-2 text-sm text-gray-700 dark:text-gray-200"
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
                  class="h-5 w-5 flex-shrink-0 text-gray-300"
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
        class="mt-16 rounded-lg bg-gray-100 px-4 py-6 dark:bg-grey-800 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2
          id="summary-heading"
          class="text-lg font-medium text-gray-900 dark:text-gray-100"
        >
          {{ addedToCart ? 'Order' : 'Quote' }} Summary
        </h2>

        <dl class="mt-6 space-y-4">
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
            v-for="item in quote.trips[0].line_items_list"
            :key="item.label"
          >
            <dt
              class="flex items-center text-sm text-gray-600 dark:text-gray-300"
            >
              <span>{{ item.label }}</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
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
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $ {{ item.total }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="flex text-sm text-gray-600 dark:text-gray-300">
              <span>{{ quote.sales_tax.tax_name }}</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
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
            <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
              $
              {{ quote.sales_tax }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="text-base font-medium text-gray-900 dark:text-gray-100">
              {{ addedToCart ? 'Order' : 'Quote' }} total
            </dt>
            <dd class="text-base font-medium text-gray-900 dark:text-gray-100">
              $
              {{ quote.quote_total }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            v-if="!addedToCart"
            @click="cartStore.addToCart()"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ loading ? 'Adding To Cart...' : 'Add To Cart' }}
          </button>
          <button
            v-else
            @click="createBooking"
            type="button"
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            {{ checkoutLoading ? 'Loading...' : 'Book Now' }}
          </button>
        </div>
      </section>
    </form>
  </main>
</template>
