<script setup lang="ts">
import { useTrpc, ref, generatePdf } from '#imports'
import { ArrowBackIcon } from 'naive-ui/es/_internal/icons'

const quoteNumberAsString = useRoute().query.quote_number as string
const quote = await getQuote(quoteNumberAsString)

const orderSummary = ref(null)

async function sendConfirmation(quoteData) {
  await useTrpc().book.confirmOrder.mutate(quoteData)
}

onBeforeRouteLeave(async () => await sendConfirmation(quote))

const saveOrderSummary = async () => {
  if (orderSummary.value) {
    await generatePdf(orderSummary.value)
  }
}

const goHome = async () => {
  await navigateTo('/')
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pb-6">
    <div class="flex w-full justify-between py-1 uppercase">
      <n-button @click="goHome" color="#A57C52" text
        ><template #icon>
          <n-icon>
            <ArrowBackIcon />
          </n-icon> </template
        >DONE</n-button
      >
      <button
        @click="saveOrderSummary"
        type="button"
        class="hover:bg-brand-500 rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        Save as PDF
      </button>
    </div>
    <div class="bg-white p-4 md:p-8" id="order-summary" ref="orderSummary">
      <div class="mx-auto w-full md:max-w-4xl">
        <div class="mb-6 flex items-center justify-between">
          <Picture
            class="h-auto w-32"
            src="/images/hpl-logo-dark.png"
            alt="Logo"
          />
          <div class="text-right">
            <h1 class="text-xl font-bold">Summary</h1>
            <p>
              Quote Number:
              <span class="text-red-700"> HPL-{{ quote?.quote_number }}</span>
            </p>
          </div>
        </div>
        <div class="mb-6 border-b-2 border-gray-200"></div>
        <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 class="text-lg font-bold">Customer Details</h2>
            <p>
              <span class="font-semibold">Name: </span>
              {{ quote.user.first_name }} {{ quote?.user.last_name }}
            </p>
            <p>
              <span class="font-semibold">Email: </span>
              {{ quote.user.email_address }}
            </p>
            <p>
              <span class="font-semibold">Phone: </span>
              {{ quote.user.phone_number }}
            </p>
          </div>
          <div>
            <h2 class="text-lg font-bold">Vehicle</h2>
            <p>
              <span class="font-semibold">Type: </span>
              {{ quote.vehicle.label }}
            </p>
            <img
              class="mt-2 h-auto w-48"
              :src="quote.vehicle.vehicle_image!"
              alt="Vehicle Image"
            />
          </div>
        </div>
        <div class="mb-6">
          <h2 class="mb-4 text-lg font-bold">Trip Details</h2>
          <div
            v-for="(trip, index) in quote.trips"
            :key="index"
            class="mb-4 rounded-md border p-4"
          >
            <p>
              <span class="font-semibold">Pick Up: </span>
              {{ quote.trips[0].locations[0].full_name }}
            </p>
            <p>
              <span class="font-semibold">Drop Off: </span>
              {{ quote.trips[0].locations[1].full_name }}
            </p>
            <p>
              <span class="font-semibold">Pickup Date: </span>
              {{ quote.trips[0].pickup_date }}
            </p>
            <p>
              <span class="font-semibold">Pickup Time: </span>
              {{ quote.trips[0].pickup_time }}
            </p>
            <p>
              <span class="font-semibold">Service: </span>
              {{ quote.service.label }}
            </p>
            <div class="mt-4">
              <table class="w-full">
                <tbody>
                  <tr
                    v-for="(lineItem, itemIndex) in quote.combined_line_items"
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
          <p v-for="item in quote.combined_line_items" :key="item.label">
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
