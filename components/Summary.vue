<script setup lang="ts">
// import { exportToPDF } from '#imports'
import { format } from 'date-fns'
import { SummarySchema } from '~/schema/summarySchema'
import type { Summary } from '~/schema/summarySchema'
import { ref } from '#imports'

const currentDate = format(new Date(), 'PPP')

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

const route = useRoute()
const { quote_number } = route.query

console.log('Quote Number in route:', quote_number)
const { data } = await useFetch('/api/quote', {
  method: 'GET',
  query: { quote_number: quote_number },
})
const parsedData = SummarySchema.strip().parse(data.value)
console.log('Fetched Data from route:', parsedData)
Object.assign(quote.value, parsedData)

const printSummary = () => {
  window.print()
}
</script>

<template>
  <BaseContainer class="rounded bg-gray-100 p-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="font-sans text-xl font-semibold text-gray-900">
          Thank You For Your Booking
        </h1>
        <p class="mt-2 text-sm font-bold text-gray-700">
          <span
            class="font-sans text-base font-bold leading-relaxed text-gray-900"
            >Order Number: </span
          ><span
            class="font-sans text-base font-bold leading-relaxed text-red-600"
          >
            HPL-{{ quote.quote_number }}</span
          ><span class="font-sans font-medium"> {{ currentDate }}</span
          ><br />
          <span class="font-sans font-medium text-black"> For: </span>
          <span class="font-sans font-normal"
            >{{ quote.user.first_name }}
            {{ quote.user.last_name + '  ' }}
          </span>
          <span class="font-sans font-medium">
            {{ quote.user.phone_number }}</span
          >
          <br />
          <span class="font-sans font-medium text-black"> Email: </span>
          <span class="font-sans font-normal">{{
            quote.user.email_address
          }}</span
          ><br /><span class="font-sans font-medium text-black">
            Pick up Date:
          </span>
          <time
            :datetime="quote.trips[0].formatted_pickup_date ?? undefined"
            class="font-sans font-normal"
            >{{ quote.trips[0].formatted_pickup_date }}
          </time>
          <br />
          <span class="font-sans font-medium text-black"> Pick up Time: </span>
          <time
            class="font-sans font-normal"
            :datetime="quote.trips[0].formatted_pickup_time ?? undefined"
            >{{ quote.trips[0].formatted_pickup_time }}
          </time>
        </p>
        <p v-if="quote.is_round_trip">
          <span class="font-sans font-medium text-black">
            Return Pick up Date:
          </span>
          <time
            class="font-sans font-normal"
            :datetime="quote.trips[1].formatted_pickup_date ?? undefined"
            >{{ quote.trips[1].formatted_pickup_date }}
          </time>
          <br />
          <span class="font-sans font-medium text-black">
            Return Pick up Time:
          </span>

          <time
            class="font-sans font-normal"
            :datetime="quote.trips[1].formatted_pickup_time ?? undefined"
            >{{ quote.trips[1].formatted_pickup_time }}
          </time>
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="printSummary"
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 font-sans text-sm font-medium uppercase tracking-wider text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
        >
          Print
        </button>
      </div>
    </div>
    <div class="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0" ref="summary">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
            >
              <span class="font-sans sm:hidden">Details</span>
              <span class="invisible font-sans sm:visible">Routing</span>
            </th>

            <th
              scope="col"
              class="hidden py-3.5 px-3 text-right font-sans text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Service Type
            </th>
            <th
              scope="col"
              class="hidden py-3.5 px-3 text-right font-sans text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Vehicle Type
            </th>
            <th
              scope="col"
              class="py-3.5 pl-3 pr-4 text-right font-sans text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900">Routing </span>
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">PU: </span
                >{{ quote.trips[0].locations[0].full_name }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">DO: </span>
                {{ quote.trips[0].locations[1].full_name }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900"
                  >Vehicle Type:
                </span>
                {{ quote.vehicle.label }}<br /><span
                  class="font-bold text-gray-900"
                  >Service Type: </span
                >{{ quote.trips[0].service_label }}
              </div>
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ quote.trips[0].service_label }}
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ quote.vehicle.label }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{
                quote.trips[0] ? quote.trips[0].line_items_total : 'Loading....'
              }}
            </td>
          </tr>
          <tr v-if="quote.is_round_trip" class="border-b border-gray-200">
            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900">Routing </span>
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">PU: </span
                >{{ quote.trips[1].locations[0].full_name }}
              </div>
              <div class="font-normal text-gray-500">
                <span class="font-sans font-bold text-gray-900">DO: </span>
                {{ quote.trips[1].locations[1].full_name }}
              </div>
              <div class="mt-0.5 text-gray-500 sm:hidden">
                <span class="font-sans font-bold text-gray-900"
                  >Vehicle Type:
                </span>
                {{ quote.vehicle.label }}<br /><span
                  class="font-sans font-bold text-gray-900"
                  >Service Type: </span
                >{{ quote.trips[1].service_label }}
              </div>
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ quote.trips[1].service_label }}
            </td>
            <td
              class="hidden px-3 py-4 text-right font-sans text-sm text-gray-500 sm:table-cell"
            >
              {{ quote.vehicle.label }}
            </td>
            <td
              class="py-4 pl-3 pr-4 text-right font-sans text-sm text-gray-500 sm:pr-6 md:pr-0"
            >
              ${{
                quote.trips[1] ? quote.trips[1].line_items_total : 'Loading....'
              }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="row"
              colspan="3"
              class="hidden pt-4 pl-6 pr-3 text-right font-sans text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
            >
              Total
            </th>
            <th
              scope="row"
              class="pt-3 pl-4 pr-3 text-left font-sans text-sm font-semibold text-gray-900 sm:hidden"
            >
              Total
            </th>
            <td
              class="pt-3 pl-3 pr-4 text-right font-sans text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
            >
              ${{ quote.quote_total }}
            </td>
          </tr>
        </tfoot>
      </table>
      <table class="mt-4">
        <tr class="border-t border-gray-200 pb-4">
          <td class="py-2">
            <BaseContainer>
              <div
                class="mt-4 mb-6 grid grid-cols-1 items-start gap-4 md:grid-cols-2"
              >
                <div class="mb-2 flex flex-col">
                  <p class="font-sans text-base font-bold text-black">
                    Check your email for your trip confirmation
                  </p>
                  <p class="max-w-[65ch] font-sans text-sm text-red-700">
                    **Please note, due to scheduling you may not receive a
                    confirmation right away. If your trip is not confirmed
                    within 2 hours, please contact us at 647-360-9631
                  </p>
                </div>
                <div class="flex flex-col">
                  <p class="font-sans text-base font-bold text-black">
                    Contact us if your trip is booked within 6 hours or less
                  </p>
                  <p class="font-sans text-sm text-red-700">
                    Due to scheduling, we may not be able to accommodate your
                    request if it is booked less than two hours from now. We
                    will contact you asap if we cannot accommodate your booking.
                  </p>
                </div>
              </div>
            </BaseContainer>
          </td>
        </tr>
      </table>
    </div>
  </BaseContainer>
</template>
