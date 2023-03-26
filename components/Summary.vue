<script setup lang="ts">
import { generatePdf } from '@/utils/generatePdf'
import { useTrpc, ref } from '#imports'
import type { QuoteFormReturn } from '~~/schema/QuoteFormSchema'
import { useQuery } from '@tanstack/vue-query'
import { z } from 'zod'

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
const quote = quoteData.value!.quote

const { quote_number, user, vehicle, trips, service, combined_line_items } =
  quote as unknown as QuoteFormReturn
const orderSummary = ref(null)

// const quote = useDefaults().defaultQuote
// const stripe = useStripe()
// const messageElement = stripe.messageElement
// const clientSecret = stripe.clientSecret

// const { $client } = useNuxtApp()

// const route = useRoute()
// const { quote_number } = route.query
// clientSecret.value = setup_intent_client_secret as string
// await stripe.checkSetupIntent()
// const quoteNumberSchema = z.coerce.number()
// const quoteNumber = quoteNumberSchema.parse(quote_number)

// const { data } = await useTrpc().quote.get.useQuery({
// quote_number: quoteNumber,
// })
// quote.value = data.value

const sendConfirmation = async () => {
  const booked = await useTrpc().book.bookOrder.query({
    quote_number,
    id: trips[0].id,
  })
  return booked
}
await sendConfirmation()

const saveOrderSummary = async () => {
  if (orderSummary.value) {
    await generatePdf(orderSummary.value)
  }
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pb-6">
    <div class="flex w-full justify-end py-1 uppercase">
      <button
        @click="saveOrderSummary"
        type="button"
        class="hover:bg-brand-500 rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        Save Summary as PDF
      </button>
    </div>
    <div class="bg-white p-4 md:p-8" id="order-summary" ref="orderSummary">
      <div class="mx-auto w-full md:max-w-4xl">
        <div class="mb-6 flex items-center justify-between">
          <img
            class="h-auto w-32"
            src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/6a0f4d3c-3f6a-4e4e-f86b-1face7a5e400/1920"
            alt="Logo"
          />
          <div class="text-right">
            <h1 class="text-xl font-bold">Summary</h1>
            <p>
              Quote Number:
              <span class="text-red-700"> HPL-{{ quote_number }}</span>
            </p>
          </div>
        </div>
        <div class="mb-6 border-b-2 border-gray-200"></div>
        <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 class="text-lg font-bold">Customer Details</h2>
            <p>
              <span class="font-semibold">Name: </span>
              {{ user.first_name }} {{ user.last_name }}
            </p>
            <p>
              <span class="font-semibold">Email: </span>
              {{ user.email_address }}
            </p>
            <p>
              <span class="font-semibold">Phone: </span>
              {{ user.phone_number }}
            </p>
          </div>
          <div>
            <h2 class="text-lg font-bold">Vehicle</h2>
            <p>
              <span class="font-semibold">Type: </span>
              {{ vehicle.label }}
            </p>
            <img
              class="mt-2 h-auto w-48"
              :src="vehicle.vehicle_image!"
              alt="Vehicle Image"
            />
          </div>
        </div>
        <div class="mb-6">
          <h2 class="mb-4 text-lg font-bold">Trip Details</h2>
          <div
            v-for="(trip, index) in trips"
            :key="index"
            class="mb-4 rounded-md border p-4"
          >
            <p>
              <span class="font-semibold">Pick Up: </span>
              {{ trips[0].location[0].full_name }}
            </p>
            <p>
              <span class="font-semibold">Drop Off: </span>
              {{ trips[0].location[1].full_name }}
            </p>
            <p>
              <span class="font-semibold">Pickup Date: </span>
              {{ trips[0].formatted_pickup_date }}
            </p>
            <p>
              <span class="font-semibold">Pickup Time: </span>
              {{ trips[0].formatted_pickup_time }}
            </p>
            <p>
              <span class="font-semibold">Service: </span>
              {{ service.label }}
            </p>
            <div class="mt-4">
              <table class="w-full">
                <tbody>
                  <tr
                    v-for="(lineItem, itemIndex) in combined_line_items"
                    :key="itemIndex"
                    class="border-t border-gray-200"
                  >
                    <td class="py-2">{{ lineItem.label }}</td>
                    <td class="py-2 text-right">
                      ${{ lineItem.total.toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p v-for="item in combined_line_items" :key="item.label">
            <span class="font-semibold">{{ item.label }}:</span>
            <span> ${{ item.total.toFixed(2) }}</span>
          </p>
        </div>
        <div class="mt-6 border-t-2 border-gray-200 pt-6">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex flex-col">
              <p class="font-brand-body text-base font-bold text-black">
                Check your email for your trip confirmation
              </p>
              <p class="max-w-[65ch] font-brand-body text-sm text-red-700">
                **Please note, due to scheduling you may not receive a
                confirmation right away. If your trip is not confirmed within 2
                hours, please contact us at 647-360-9631
              </p>
            </div>
            <div class="flex flex-col">
              <p class="font-brand-body text-base font-bold text-black">
                Contact us if your trip is booked within 6 hours or less
              </p>
              <p class="font-brand-body text-sm text-red-700">
                Due to scheduling, we may not be able to accommodate your
                request if it is booked less than two hours from now. We will
                contact you asap if we cannot accommodate your booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  img {
    max-width: 100% !important;
  }
}
</style>
