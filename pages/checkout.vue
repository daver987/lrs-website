<script setup lang="ts">
import { Ref } from 'vue'
import { useGtm } from '@gtm-support/vue-gtm'


definePageMeta({
  name: 'checkout',
  layout: 'store',
  colorMode: 'dark',
})

type CombinedLineItems = {
  label: string
  total: number
}

const stripeClient = useStripe()

const quoteNumberAsString = useRoute().query.quote_number as string
const quote = await getQuote(quoteNumberAsString)

const { vehicle, service, trips, user, quote_number, quote_total } = quote!

const combinedLineItems: Ref<CombinedLineItems[] | null> = ref(null)
combinedLineItems.value = quote?.combined_line_items as CombinedLineItems[]

const gtm = useGtm()
const gclidCookie = useCookie('gclid')
const tags = useRuntimeConfig().public

function triggerEvent(totalPrice: number) {
  gtm?.trackEvent({
    event: 'submitOrder',
    event_category: 'Purchase',
    event_label: 'Submit Order',
    value: totalPrice,
    send_to: tags.GA4_SEND_TO,
    conversion: tags.G_ADS_ORDER_SUBMIT_CONVERSION,
    conversion_label: tags.G_ADS_ORDER_SUBMIT_CONVERSION_LABEL,
    gclid: gclidCookie.value,
    non_interaction: false,
  })
}

function setEnhancedTracking(email: string, phone: string, order_id: string) {
  // const hashedEmail = sha256(email)
  // const hashedPhone = sha256(phone)

  gtm?.trackEvent({
    set: 'user_data',
    email: email,
    phone_number: phone,
  })
  gtm?.trackEvent({
    set: 'orderId',
    orderId: order_id,
  })
}

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
emailAddress.value = user.email_address
phoneNumber.value = user.phone_number
clientSecret.value = useRoute().query.client_secret as string
quoteNumber.value = quote_number
websiteURL.value = useRuntimeConfig().public.WEBSITE_URL
publicKey.value = useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY

onMounted(() => {
  nextTick(async () => {
    await stripeClient.initStripeElements()
  })
})

const totalPrice = quote_total.toFixed(2)
const isLoading = ref(false)

const submitOrder = async () => {
  try {
    isLoading.value = true
    setEnhancedTracking(emailAddress.value, phoneNumber.value, quote?.id!)
    triggerEvent(quote_total)

    const stripeResponse = await stripeClient.submitHandler()
    console.log('Stripe Response', stripeResponse)

    if (typeof stripeResponse?.success === 'number') {
      isLoading.value = false
    } else {
      throw new Error('Stripe submission failed.')
    }
  } catch (error) {
    console.error('An error occurred while processing the booking:', error)
    throw new Error('Booking failed.')
  }
}
</script>

<template>
  <div class="w-full h-screen">
    <!-- Background color split screen for large screens -->
    <div
      class="fixed top-0 left-0 hidden w-1/2 h-full bg-neutral-100 lg:block"
      aria-hidden="true"
    />
    <div
      class="fixed top-0 right-0 hidden w-1/2 h-full bg-brand-900 lg:block"
      aria-hidden="true"
    />

    <header
      class="relative py-6 mx-auto max-w-7xl bg-brand-900 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pb-10 lg:pt-16"
    >
      <div class="flex max-w-2xl px-4 mx-auto lg:w-full lg:max-w-lg lg:px-0">
        <NuxtLink to="/" class="self-center">
          <span class="sr-only">High Park Livery</span>
          <NuxtPicture
            :img-attrs="{
              class: 'w-auto h-12 lg:h-14',
            }"
            src="/images/HPL-Logo-White.png"
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
        class="pt-2 pb-12 bg-brand-900 text-brand-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
      >
        <div class="max-w-2xl px-4 mx-auto lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div
            class="p-6 bg-white rounded-lg shadow-md text-brand-900 dark:bg-neutral-400"
          >
            <dl>
              <dt class="text-lg font-medium">Amount Due</dt>
              <dd class="mt-1 text-3xl font-bold tracking-tight text-brand-900">
                $ {{ totalPrice }}
              </dd>
            </dl>

            <ul
              role="list"
              class="text-sm font-medium divide-y divide-neutral-200"
            >
              <li
                v-for="trip in trips"
                :key="trip.pickup_time as string"
                class="flex items-start py-6 space-x-4"
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
              class="pt-8 space-y-6 text-sm font-medium border-t border-gray-200"
            >
              <div
                v-for="item in combinedLineItems"
                :key="item.label"
                class="flex items-center justify-between"
              >
                <dt v-if="item.label === 'Total' ? '' : item.label">
                  {{ item.label }}
                </dt>
                <dd v-if="item.label === 'Total' ? '' : item.label">
                  ${{ item.total }}
                </dd>
              </div>

              <div
                class="flex items-center justify-between pt-6 border-t border-gray-200 text-brand-900"
              >
                <dt class="text-base">Total</dt>
                <dd class="text-base">${{ totalPrice }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-8 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment and shipping details
        </h2>

        <div class="max-w-2xl px-4 mx-auto lg:max-w-none lg:px-0">
          <div>
            <h3
              id="payment-heading"
              class="text-lg font-medium text-neutral-900"
            >
              Payment details
            </h3>

            <form id="payment-form" class="p-6" @submit.prevent="submitOrder">
              <div
                id="link-authentication-element"
                ref="linkAuthenticationElement"
              ></div>
              <div id="payment-element" ref="paymentElement">
                <!--Stripe.js injects the Payment Element-->
              </div>
              <div
                class="flex justify-end pt-6 mt-2 border-t border-neutral-200"
              >
                <button
                  type="submit"
                  id="submit"
                  class="w-full px-4 py-2 text-sm font-medium text-white uppercase border border-transparent rounded-md shadow-sm bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
                >
                  <div class="hidden spinner" id="spinner"></div>
                  <span v-if="isLoading" id="button-text"
                    >Processing......</span
                  >
                  <span v-else id="button-text">Complete Booking</span>
                </button>
                <div id="payment-message" class="hidden"></div>
              </div>
            </form>
            <div class="flex flex-col my-4">
              <p class="text-sm font-bold font-brand-body text-neutral-900">
                We require a credit card to hold your reservation
              </p>
              <p class="max-w-[65ch] font-brand-body text-xs text-red-700">
                Please note, 24 hours before the scheduled pickup time, an
                authorization hold will be placed on your credit card for the
                full amount of your reservation.
              </p>
              <div class="flex flex-col mt-2">
                <p class="text-sm font-bold font-brand-body text-neutral-900">
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
