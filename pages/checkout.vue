<script setup lang="ts">
import type {
  Stripe,
  StripeElements,
  StripeLinkAuthenticationElement,
  StripePaymentElement,
} from '@stripe/stripe-js'
import { Ref } from 'vue'
import { stripeInit } from '~/services/stripeClientInit'
import { useStripeStore } from '~/stores/useStripeStore'
import { storeToRefs } from 'pinia'
import { useQuoteStore } from '~/stores/useQuoteStore'

definePageMeta({
  name: 'checkout',
  layout: 'auth',
})

const stripeStore = useStripeStore()
const { client_secret } = storeToRefs(stripeStore)
const stripe: Stripe | null = await stripeInit()

const quoteStore = useQuoteStore()
const { quote } = storeToRefs(quoteStore)
const {
  is_round_trip,
  quote_number,
  selected_hours,
  selected_passengers,
  quote_tax_total,
  quote_subtotal,
  quote_total,
  user,
  vehicle,
  sales_tax,
  trips,
} = quote.value!

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#9f6c27',
    colorBackground: '#ffffff',
    colorText: '#222222',
    colorDanger: '#df1b41',
    fontFamily: 'Inter Var, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  },
} as const

const elements: Ref<StripeElements | undefined> = ref()

onMounted(() => {
  nextTick(() => {
    elements.value = stripe?.elements({
      clientSecret: client_secret.value,
      appearance,
    })
    const paymentElement: StripePaymentElement | undefined =
      elements.value?.create('payment')
    const linkAuthenticationElement:
      | StripeLinkAuthenticationElement
      | undefined = elements.value?.create('linkAuthentication')
    linkAuthenticationElement?.mount('#link-authentication-element')
    paymentElement?.mount('#payment-element')
  })
})

const url = useRuntimeConfig().public.WEBSITE_URL
const websiteUrl = `${url}/success?quote_number=${quote_number}`

async function submitHandler(): Promise<void> {
  if (!stripe || !elements.value) {
    console.error('Stripe is not initialized.')
    return
  }

  try {
    const { error } = await stripe.confirmSetup({
      elements: elements.value,
      confirmParams: {
        return_url: websiteUrl,
      },
    })

    if (error) {
      console.error('Stripe error:', error)
      // Display the error to the user, consider using a UI component to show the error
    }
  } catch (error) {
    console.error('Error during setup confirmation:', error)
    // Handle any other errors during setup confirmation, consider using a UI component to show the error
  }
}

//todo: add in proper html for order
//todo: add in the creation of draft invoice in stripe
//todo: add spot for flight information in the checkout flow
//todo: add trip notes in the checkout flow
//todo: add iCal to the confirmation email
//todo: add region functionality for auto tax calculation for out of town trips
//todo: figure out some type of pdf confirmation email
//todo: add webhook for order notification
//todo: make proper cancel page
//todo: purge codebase of old components and unnecessary packages
</script>

<template>
  <div class="bg-white">
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
        class="bg-brand-900 pt-6 pb-12 text-brand-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24"
      >
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <dl>
            <dt class="text-sm font-medium">Amount due</dt>
            <dd class="mt-1 text-3xl font-bold tracking-tight text-white">
              $ {{ quote_total }}
            </dd>
          </dl>

          <ul
            role="list"
            class="divide-y divide-white divide-opacity-10 text-sm font-medium"
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
                :src="vehicle.vehicle_image"
                :alt="vehicle.label"
              />
              <div class="flex-auto space-y-1">
                <h3 class="text-white">{{ trip.service_label }}</h3>
                <p class="text-brand-200">{{ vehicle.label }}</p>
              </div>
              <p class="flex-none text-base font-medium text-white">
                {{ trip.line_items_total }}
              </p>
            </li>
          </ul>

          <dl
            class="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium"
          >
            <div class="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd>${{ quote_subtotal }}</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt>Taxes</dt>
              <dd>${{ quote_tax_total }}</dd>
            </div>

            <div
              class="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white"
            >
              <dt class="text-base">Total</dt>
              <dd class="text-base">${{ quote_total }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment and shipping details
        </h2>

        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div class="mt-4">
            <h3
              id="payment-heading"
              class="mb-4 text-lg font-medium text-gray-900"
            >
              Payment details
            </h3>

            <form id="payment-form" @submit.prevent="submitHandler">
              <div id="link-authentication-element"></div>
              <div id="payment-element">
                <!--Stripe.js injects the Payment Element-->
              </div>
              <div class="mt-10 flex justify-end border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  id="submit"
                  class="w-full rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium uppercase text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <div class="spinner hidden" id="spinner"></div>
                  <span id="button-text">Complete Booking</span>
                </button>
                <div id="payment-message" class="hidden"></div>
              </div>
            </form>
            <div class="my-4 flex flex-col">
              <p class="font-sans text-sm font-bold text-gray-900">
                We require a credit card to hold your reservation
              </p>
              <p class="max-w-[65ch] font-sans text-xs text-red-700">
                Please note, 24 hours before the scheduled pickup time, an
                authorization hold will be placed on your credit card for the
                full amount of your reservation.
              </p>
              <div class="mt-2 flex flex-col">
                <p class="font-sans text-sm font-bold text-gray-900">
                  Card is not charged until the completion of your trip
                </p>
                <p class="font-sans text-xs text-red-700">
                  All prices include taxes, surcharges and gratuity
                </p>
                <p class="font-sans text-xs text-red-700">
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
