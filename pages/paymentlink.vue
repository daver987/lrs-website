<script lang="ts" setup>
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import vehicle from '~/components/Vehicle.vue'

definePageMeta({
  name: 'paymentlink',
  layout: 'store',
  colorMode: 'dark',
})

const model = new OpenAI({ temperature: 0.9 })
const template = 'What is a good name for a company that makes {product}?'
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ['product'],
})

// type CombinedLineItems = {
//   label: string
//   total: number
// }

const stripeClient = useStripe()

// const quoteNumberAsString = useRoute().query.quote_number as string
// const quote = await getQuote(quoteNumberAsString)
//
// const { vehicle, service, trips, user, quote_number, quote_total } = quote!
//
// const combinedLineItems: Ref<CombinedLineItems[] | null> = ref(null)
// combinedLineItems.value = quote?.combined_line_items as CombinedLineItems[]

// const gtm = useGtm()
// const gclidCookie = useCookie('gclid')
// const tags = useRuntimeConfig().public
//
// function triggerEvent(totalPrice: number) {
//   gtm?.trackEvent({
//     event: 'submitOrder',
//     event_category: 'Purchase',
//     event_label: 'Submit Order',
//     value: totalPrice,
//     send_to: tags.GA4_SEND_TO,
//     conversion: tags.G_ADS_ORDER_SUBMIT_CONVERSION,
//     conversion_label: tags.G_ADS_ORDER_SUBMIT_CONVERSION_LABEL,
//     gclid: gclidCookie.value,
//     non_interaction: false,
//   })
// }
//
// function setEnhancedTracking(email: string, phone: string, order_id: string) {
//   const hashedEmail = sha256(email)
//   const hashedPhone = sha256(phone)
//
//   gtm?.trackEvent({
//     set: 'user_data',
//     email: [hashedEmail],
//     phone_number: [hashedPhone],
//   })
//   gtm?.trackEvent({
//     set: 'orderId',
//     orderId: order_id,
//   })
// }

const {
  fullName,
  emailAddress,
  phoneNumber,
  linkAuthenticationElement,
  clientSecret,
  websiteURL,
  quoteNumber,
  publicKey,
} = stripeClient

const priceTest = 1000
publicKey.value = useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY

onMounted(() => {
  nextTick(async () => {
    await stripeClient.initStripePaymentRequestButton(1000)
  })
})

const isLoading = ref(false)

//todo: add in the creation of draft invoice in stripe
//todo: add region functionality for auto tax calculation for out of town trips
//todo: make proper cancel page
</script>

<template>
  <div class="h-screen w-full">
    <!-- Background color split screen for large screens -->
    <div
      class="fixed left-0 top-0 hidden h-full w-1/2 bg-neutral-100 lg:block"
      aria-hidden="true"
    />
    <div
      class="fixed right-0 top-0 hidden h-full w-1/2 bg-brand-900 lg:block"
      aria-hidden="true"
    />

    <header
      class="relative mx-auto max-w-7xl bg-brand-900 py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pb-10 lg:pt-16"
    >
      <div class="mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0">
        <NuxtLink class="self-center" to="/">
          <span class="sr-only">{{ useAppConfig().brand.name }}</span>
          <NuxtPicture
            :img-attrs="{
              class: 'w-auto h-12 lg:h-14',
            }"
            :alt="`${useAppConfig().brand.name} Logo`"
            :src="useAppConfig().brand.assets.logo.light"
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
        class="bg-brand-900 pb-12 pt-2 text-brand-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
        aria-labelledby="summary-heading"
      >
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <h2 class="sr-only" id="summary-heading">Order summary</h2>

          <div
            class="rounded-lg bg-white p-6 text-brand-900 shadow-md dark:bg-neutral-400"
          >
            <dl>
              <dt class="text-lg font-medium">Amount Due</dt>
              <dd class="mt-1 text-3xl font-bold tracking-tight text-brand-900">
                $ {{ totalPrice }}
              </dd>
            </dl>

            <ul
              class="divide-y divide-neutral-200 text-sm font-medium"
              role="list"
            >
              <li
                class="flex items-start space-x-4 py-6"
                v-for="trip in trips"
                :key="trip.pickup_time as string"
              >
                <NuxtPicture
                  :alt="vehicle.label"
                  :img-attrs="{
                    class:
                      'h-32 w-32 flex-none rounded-md object-contain object-center',
                  }"
                  :src="vehicle.vehicle_image!"
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
                class="flex items-center justify-between"
                v-for="item in combinedLineItems"
                :key="item.label"
              >
                <dt v-if="item.label === 'Total' ? '' : item.label">
                  {{ item.label }}
                </dt>
                <dd v-if="item.label === 'Total' ? '' : item.label">
                  ${{ item.total }}
                </dd>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-200 pt-6 text-brand-900"
              >
                <dt class="text-base">Total</dt>
                <dd class="text-base">${{ totalPrice }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        class="py-8 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
        aria-labelledby="payment-and-shipping-heading"
      >
        <h2 class="sr-only" id="payment-and-shipping-heading">
          Payment and shipping details
        </h2>

        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div>
            <h3
              class="text-lg font-medium text-neutral-900"
              id="payment-heading"
            >
              Payment details
            </h3>

            <form class="p-6" id="payment-form" @submit.prevent="submitOrder">
              <div
                id="link-authentication-element"
                ref="linkAuthenticationElement"
              ></div>
              <div id="payment-request-button">
                <!-- A Stripe Element will be inserted here. -->
              </div>
              <div
                class="mt-2 flex justify-end border-t border-neutral-200 pt-6"
              >
                <button
                  class="w-full rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium uppercase text-white shadow-xs hover:bg-brand-700 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
                  id="submit"
                  type="submit"
                >
                  <div class="spinner hidden" id="spinner"></div>
                  <span id="button-text" v-if="isLoading"
                    >Processing......</span
                  >
                  <span id="button-text" v-else>Complete Booking</span>
                </button>
                <div class="hidden" id="payment-message"></div>
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
