<script setup lang="ts">
import { useStripeStore } from '~/stores/useStripeStore'
import { storeToRefs } from 'pinia'
import type { QuoteFormReturn } from '~~/schema/QuoteFormSchema'
import { z } from 'zod'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useTrpc } from '~/composables/useTrpc'

definePageMeta({
  name: 'checkout',
  layout: 'store',
  colorMode: 'dark',
})

const stripeClient = useStripe()
const stripeStore = useStripeStore()
const { client_secret } = storeToRefs(stripeStore)
const quoteNumberAsString = useRoute().query.quote_number
const quoteNumberSchema = z.coerce.number()
const routeQuoteNumber = quoteNumberSchema.parse(quoteNumberAsString)
const loading = ref(false)
const tripNotes = ref('')

const getQuote = () =>
  useTrpc().quote.get.query({
    quote_number: routeQuoteNumber,
  })

const { data: quoteData, suspense: quoteSuspense } = await useQuery({
  queryKey: ['quote'],
  queryFn: getQuote,
})
await quoteSuspense()
const quote = quoteData.value! as unknown as QuoteFormReturn

const {
  vehicle,
  service,
  trips,
  user,
  quote_number,
  quote_total,
  combined_line_items,
} = quote
const {
  fullName,
  emailAddress,
  paymentElement,
  phoneNumber,
  linkAuthenticationElement,
  clientSecret,
  websiteURL,
  quoteNumber,
  publicKey,
} = stripeClient

fullName.value = user.full_name!
emailAddress.value = user.email_address!
phoneNumber.value = user.phone_number!
clientSecret.value = client_secret.value
quoteNumber.value = quote_number!
websiteURL.value = useRuntimeConfig().public.WEBSITE_URL
publicKey.value = useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY

onMounted(() => {
  nextTick(async () => {
    await stripeClient.initStripeElements()
  })
})
const totalPrice = quote_total
console.log('Trip Notes', tripNotes)

const bookOrder = async () =>
  await useTrpc().book.booking.mutate({
    quote_number: routeQuoteNumber,
    notes: tripNotes.value,
    id: trips[0].id,
  })

const bookingHandler = async () => {
  try {
    const stripeResponse = await stripeClient.submitHandler()
    console.log('Stripe Response', stripeResponse)
    if (typeof stripeResponse?.success === 'number') {
      const { isLoading } = useMutation(['book'], bookOrder)
      loading.value = isLoading.value
    } else {
      throw new Error('Stripe submission failed.')
    }
  } catch (error) {
    console.error('An error occurred while processing the booking:', error)
    throw new Error('Booking failed.')
  }
}

//todo: add in the creation of draft invoice in stripe
//todo: add spot for flight information in the checkout flow
//todo: add trip notes in the checkout flow
//todo: add region functionality for auto tax calculation for out of town trips
//todo: make proper cancel page
//todo: purge codebase of old components and unnecessary packages
</script>

<template>
  <div class="h-screen w-full">
    <!-- Background color split screen for large screens -->
    <div
      class="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
      aria-hidden="true"
    />
    <div
      class="fixed top-0 right-0 hidden h-full w-1/2 bg-brand-900 lg:block"
      aria-hidden="true"
    />

    <header
      class="relative mx-auto max-w-7xl bg-brand-900 py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pt-16 lg:pb-10"
    >
      <div class="mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0">
        <NuxtLink to="/" class="self-center">
          <span class="sr-only">High Park Livery</span>
          <NuxtPicture
            :img-attrs="{
              class: 'w-auto h-12 lg:h-14',
            }"
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/6a0f4d3c-3f6a-4e4e-f86b-1face7a5e400/1920"
            alt="High Park Livery Logo"
            width="1920"
          />
        </NuxtLink>
      </div>
    </header>

    <main
      class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8"
    >
      <h1 class="sr-only">Checkout</h1>

      <section
        aria-labelledby="summary-heading"
        class="bg-brand-900 pt-2 pb-12 text-brand-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
      >
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div
            class="rounded-lg bg-white p-6 text-brand-900 shadow-md dark:bg-neutral-400"
          >
            <dl>
              <dt class="text-lg font-medium">Amount Due</dt>
              <dd class="mt-1 text-3xl font-bold tracking-tight text-brand-900">
                $ {{ totalPrice!.toFixed(2) }}
              </dd>
            </dl>

            <ul
              role="list"
              class="divide-y divide-neutral-200 text-sm font-medium"
            >
              <li
                v-for="trip in trips"
                :key="trip.formatted_pickup_time"
                class="flex items-start space-x-4 py-6"
              >
                <NuxtPicture
                  :img-attrs="{
                    class:
                      'h-32 w-32 flex-none rounded-md object-contain object-center',
                  }"
                  :src="vehicle.vehicle_image!"
                  :alt="vehicle.label"
                />
                <div class="flex-auto space-y-1">
                  <h3 class="text-brand-900">{{ service.label }}</h3>
                  <p class="text-brand-700">{{ vehicle.label }}</p>
                </div>
              </li>
            </ul>

            <dl
              class="space-y-6 border-t border-gray-200 pt-8 text-sm font-medium"
            >
              <div
                v-for="item in combined_line_items"
                :key="item.label"
                class="flex items-center justify-between"
              >
                <dt v-if="item.label === 'Total' ? '' : item.label">
                  {{ item.label }}
                </dt>
                <dd v-if="item.label === 'Total' ? '' : item.label">
                  ${{ item.total!.toFixed(2) }}
                </dd>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-200 pt-6 text-brand-900"
              >
                <dt class="text-base">Total</dt>
                <dd class="text-base">${{ totalPrice!.toFixed(2) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-8 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment and shipping details
        </h2>

        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div>
            <h3
              id="payment-heading"
              class="text-lg font-medium text-neutral-900"
            >
              Payment details
            </h3>

            <form
              id="payment-form"
              class="p-6"
              @submit.prevent="bookingHandler()"
            >
              <div
                id="link-authentication-element"
                ref="linkAuthenticationElement"
              ></div>
              <div id="payment-element" ref="paymentElement">
                <!--Stripe.js injects the Payment Element-->
              </div>
              <div class="col-span-full">
                <label
                  for="notes"
                  class="block text-sm font-medium leading-6 text-neutral-900"
                  >Trip Notes</label
                >
                <div class="mt-2">
                  <textarea
                    v-model="tripNotes"
                    id="notes"
                    name="notes"
                    rows="3"
                    class="block w-full rounded-md border-0 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  />
                </div>
                {{ tripNotes }}
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  <strong
                    >*Please provide any applicable flight details or additional
                    notes pertaining to your trip.</strong
                  >
                </p>
              </div>
              <div
                class="mt-2 flex justify-end border-t border-neutral-200 pt-6"
              >
                <button
                  type="submit"
                  id="submit"
                  class="w-full rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium uppercase text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
                >
                  <div class="spinner hidden" id="spinner"></div>
                  <span v-if="loading" id="button-text">Processing......</span>
                  <span v-else id="button-text">Complete Booking</span>
                </button>
                <div id="payment-message" class="hidden"></div>
              </div>
            </form>
            <div class="my-4 flex flex-col">
              <p class="font-brand-body text-sm font-bold text-neutral-900">
                We require a credit card to hold your reservation
              </p>
              <p class="max-w-[65ch] font-brand-body text-xs text-red-700">
                Please note, 24 hours before the scheduled pickup time, an
                authorization hold will be placed on your credit card for the
                full amount of your reservation.
              </p>
              <div class="mt-2 flex flex-col">
                <p class="font-brand-body text-sm font-bold text-neutral-900">
                  Card is not charged until the completion of your trip
                </p>
                <p class="font-brand-body text-xs text-red-700">
                  All prices include taxes, surcharges and gratuity
                </p>
                <p class="font-brand-body text-xs text-red-700">
                  **Does not include hwy tolls, parking fees, or any extra fees
                  incurred during the trip
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
