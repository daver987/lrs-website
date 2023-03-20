<script setup lang="ts">
import { useStripeStore } from '~/stores/useStripeStore'
import { storeToRefs } from 'pinia'
import { useQuoteStore } from '~/stores/useQuoteStore'
definePageMeta({
  name: 'checkout',
  layout: 'store',
})
const stripeClient = useStripe()
const stripeStore = useStripeStore()
const { client_secret } = storeToRefs(stripeStore)
const quoteStore = useQuoteStore()
const { quote } = storeToRefs(quoteStore)
const {
  vehicle,
  trips,
} = quote.value!
const {
  fullName,
  emailAddress,
  paymentElement,
  phoneNumber,
  linkAuthenticationElement,
  clientSecret,
  isLoading,
  websiteURL,
  quoteNumber,
  publicKey
} = stripeClient

fullName.value = quote.value?.user.full_name!
emailAddress.value = quote.value?.user.email_address!
phoneNumber.value = quote.value?.user.phone_number!
clientSecret.value = client_secret.value
quoteNumber.value = quote.value?.quote_number!
websiteURL.value = useRuntimeConfig().public.WEBSITE_URL
publicKey.value = useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY

onMounted(() => {
  nextTick(async () => {
    await stripeClient.initStripeElements()
  })
})
const totalPrice = removeLastObject(quote.value?.combined_line_items)
const lineItems = quote.value?.combined_line_items!
//todo: add in the creation of draft invoice in stripe
//todo: add spot for flight information in the checkout flow
//todo: add trip notes in the checkout flow
//todo: add iCal to the confirmation email
//todo: add region functionality for auto tax calculation for out of town trips
//todo: add webhook for order notification
//todo: make proper cancel page
//todo: purge codebase of old components and unnecessary packages
</script>

<template>
  <div class="w-full h-screen">
    <!-- Background color split screen for large screens -->
    <div
      class="fixed top-0 left-0 hidden w-1/2 h-full bg-white lg:block"
      aria-hidden="true"
    />
    <div
      class="fixed top-0 right-0 hidden w-1/2 h-full bg-brand-900 lg:block"
      aria-hidden="true"
    />

    <header
      class="relative py-6 mx-auto max-w-7xl bg-brand-900 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pt-16 lg:pb-10"
    >
      <div class="flex max-w-2xl px-4 mx-auto lg:w-full lg:max-w-lg lg:px-0">
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
      class="relative grid grid-cols-1 mx-auto max-w-7xl gap-x-16 lg:grid-cols-2 lg:px-8"
    >
      <h1 class="sr-only">Checkout</h1>

      <section
        aria-labelledby="summary-heading"
        class="pt-6 pb-12 bg-brand-900 text-brand-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
      >
        <div class="max-w-2xl px-4 mx-auto lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div
            class="p-6 bg-white rounded-lg shadow-md text-brand-900 dark:bg-neutral-400"
          >
            <dl>
              <dt class="text-sm font-medium">Amount due</dt>
              <dd class="mt-1 text-3xl font-bold tracking-tight text-brand-900">
                $ {{ totalPrice.total }}
              </dd>
            </dl>

            <ul
              role="list"
              class="text-sm font-medium divide-y divide-neutral-200"
            >
              <li
                v-for="trip in trips"
                :key="trip.formatted_pickup_time"
                class="flex items-start py-6 space-x-4"
              >
                <NuxtPicture
                  :img-attrs="{
                    class:
                      'h-32 w-32 flex-none rounded-md object-contain object-center',
                  }"
                  :src="vehicle.vehicle_image as string"
                  :alt="vehicle.label"
                />
                <div class="flex-auto space-y-1">
                  <h3 class="text-brand-900">{{ trip.service_label }}</h3>
                  <p class="text-brand-700">{{ vehicle.label }}</p>
                </div>
              </li>
            </ul>

            <dl
              class="pt-6 space-y-6 text-sm font-medium border-t border-gray-200"
            >
              <div
                v-for="item in lineItems"
                :key="item.label"
                class="flex items-center justify-between"
              >
                <dt>{{ item.label }}</dt>
                <dd>${{ item.total }}</dd>
              </div>

              <div
                class="flex items-center justify-between pt-6 border-t border-gray-200 text-brand-900"
              >
                <dt class="text-base">Total</dt>
                <dd class="text-base">${{ totalPrice.total }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment and shipping details
        </h2>

        <div class="max-w-2xl px-4 mx-auto lg:max-w-none lg:px-0">
          <div class="mt-4">
            <h3
              id="payment-heading"
              class="mb-4 text-lg font-medium text-neutral-900"
            >
              Payment details
            </h3>

            <form id="payment-form" class="p-6" @submit.prevent="stripeClient.submitHandler()">
              <div id="link-authentication-element" ref="linkAuthenticationElement"></div>
              <div id="payment-element" ref="paymentElement">
                <!--Stripe.js injects the Payment Element-->
              </div>
              <div
                class="flex justify-end pt-6 mt-10 border-t border-neutral-200"
              >
                <button
                  type="submit"
                  id="submit"
                  class="w-full px-4 py-2 text-sm font-medium text-white uppercase border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
                >
                  <div class="hidden spinner" id="spinner"></div>
                  <span v-if="isLoading" id="button-text">Processing......</span>
                  <span v-else id="button-text">Complete Booking</span>
                </button>
                <div id="payment-message" class="hidden"></div>
              </div>
            </form>
            <div class="flex flex-col my-4">
              <p class="font-sans text-sm font-bold text-neutral-900">
                We require a credit card to hold your reservation
              </p>
              <p class="max-w-[65ch] font-brand-body text-xs text-red-700">
                Please note, 24 hours before the scheduled pickup time, an
                authorization hold will be placed on your credit card for the
                full amount of your reservation.
              </p>
              <div class="flex flex-col mt-2">
                <p class="font-sans text-sm font-bold text-neutral-900">
                  Card is not charged until the completion of your trip
                </p>
                <p class="text-xs text-red-700 font-brand-body">
                  All prices include taxes, surcharges and gratuity
                </p>
                <p class="text-xs text-red-700 font-brand-body">
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
