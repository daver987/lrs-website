<script lang="ts" setup>
import { useCartStore } from '~/app/stores/useCartStore'
import { storeToRefs } from 'pinia'
import { useStripeStore } from '~/app/stores/useStripeStore'
import { format } from 'date-fns'
import { ref } from '#imports'
import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { useImageFallback } from '~/composables/useImageFallback'

type QuoteWithRelations = Prisma.QuoteGetPayload<{
  include: {
    user: true
    vehicle: true
    service: true
    trips: {
      include: {
        price: true
        payment: true
        locations: true
      }
    }
  }
}>

const combinedLineItemsSchema = z.object({
  total: z.number(),
  label: z.string(),
  amount: z.number(),
})

type CombinedLineItems = z.infer<typeof combinedLineItemsSchema>

const quote: Ref<QuoteWithRelations | null> = ref(null)
const quoteNumberAsString = useRoute().query.quote_number
const combinedLineItems: Ref<CombinedLineItems[] | null> = ref(null)
const userId: Ref<string> = ref('')

if (typeof quoteNumberAsString === 'string') {
  const { data: quoteData } = await useTrpc().quote.get.useQuery({
    quote_number: parseInt(quoteNumberAsString),
  })
  quote.value = quoteData.value
  combinedLineItems.value = quote.value
    .combined_line_items as CombinedLineItems[]
  userId.value = quote.value.user.id
  console.log('[GET_QUOTE:]:success', quoteData.value)
} else {
  console.log('[GET_QUOTE]:failed')
  await navigateTo('/')
}

const quoteNumber = ref(quote.value?.quote_number)
const cartStore = useCartStore()
const stripeStore = useStripeStore()
const { addedToCart, loading } = storeToRefs(cartStore)
const currentDate = format(new Date(), 'PPPP')
const checkoutLoading = ref(false)
const { onImgError } = useImageFallback()

const createBooking = async () => {
  checkoutLoading.value = true
  try {
    const { setupIntent, stripeId, statusCode } =
      await useTrpc().stripe.createSetup.mutate({
        userId: userId.value,
        quoteNumber: quoteNumber.value as number,
      })

    if (statusCode === 200) {
      stripeStore.setCustomer(stripeId)
      stripeStore.setClientSecret(setupIntent)
      await navigateTo({
        path: '/flightinfo',
        query: {
          quote_number: quoteNumber.value,
          client_secret: setupIntent.client_secret,
        },
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
  <main class="mx-auto max-w-2xl px-4 pb-8 pt-6 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1
      class="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
    >
      <span class="mr-1">{{ useAppConfig().brand.name }}</span> -
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
          <span
            >{{ useAppConfig().brand.orderPrefix }}-{{
              quote!.quote_number
            }}</span
          >
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
          <time :datetime="currentDate">{{ currentDate }}</time>
        </dd>
      </dl>
      <div class="mt-4 sm:mt-0">
        <NuxtLink class="font-medium text-brand-600 hover:text-brand" to="/">
          Continue Browsing
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
    </div>
    <form
      class="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
    >
      <section class="lg:col-span-7" aria-labelledby="cart-heading">
        <h2 class="sr-only" id="cart-heading">Items in your shopping cart</h2>
        <ul
          class="divide-y divide-neutral-200 border-b border-t border-neutral-200"
          role="list"
        >
          <li
            class="flex py-6 sm:py-8"
            v-for="(trip, index) in quote!.trips"
            :key="trip.trip_order!"
          >
            <div class="shrink-0">
              <img
                class="object-contain object-center w-24 h-24 rounded-md sm:h-48 sm:w-48"
                :alt="quote!.vehicle.label"
                :src="quote!.vehicle?.vehicle_image! as string"
                @error="onImgError"
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
                        class="font-medium text-neutral-700 hover:text-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-200"
                        to="/"
                      >
                        {{ quote!.service.label }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <div class="mt-2 flex flex-col space-y-1 text-sm">
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Date: </span
                      >{{ trip.pickup_date }}
                      <span class="text-brand-400">Time: </span
                      >{{ trip.pickup_time }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">PU: </span
                      >{{ trip.locations[0].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">DO: </span
                      >{{ trip.locations[1].full_name }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Vehicle Type: </span
                      >{{ quote!.vehicle.label }}
                    </p>
                    <p class="text-neutral-500 dark:text-neutral-100">
                      <span class="text-brand-400">Passengers: </span
                      >{{ quote!.selected_passengers }}
                    </p>
                  </div>
                  <p class="text-neutral-500 dark:text-neutral-100">
                    <span class="text-brand-400">Total Price: </span>$
                    {{ quote!.quote_total }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div class="absolute right-0 top-0" v-if="false">
                    <button
                      class="-m-2 inline-flex p-2 text-neutral-400 hover:text-neutral-500"
                      type="button"
                    >
                      <span class="sr-only">Remove</span>
                      <Icon
                        class="h-5 w-5"
                        aria-hidden="true"
                        name="heroicons:x-mark-20-solid"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <p
                class="mt-4 flex space-x-2 text-sm text-neutral-700 dark:text-neutral-200"
              >
                <Icon
                  class="h-5 w-5 shrink-0 text-green-500"
                  v-if="quote!.is_round_trip"
                  aria-hidden="true"
                  name="heroicons:check-20-solid"
                />
                <Icon
                  class="h-5 w-5 shrink-0 text-neutral-300"
                  v-else
                  aria-hidden="true"
                  name="heroicons:clock-20-solid"
                />
                <span>
                  {{
                    quote!.is_round_trip
                      ? index === 0
                        ? 'One Way Trip'
                        : 'Return Trip'
                      : 'One Way Trip'
                  }}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section
        class="mt-16 rounded-lg bg-neutral-100 px-4 py-6 dark:bg-neutral-900 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        aria-labelledby="summary-heading"
      >
        <h2
          class="text-lg font-medium text-neutral-900 dark:text-neutral-100"
          id="summary-heading"
        >
          {{ addedToCart ? 'Order' : 'Quote' }} Summary
        </h2>

        <dl class="mt-6 space-y-4">
          <div
            class="flex items-center justify-between border-t border-neutral-200 pt-4"
            v-for="item in combinedLineItems"
            :key="item.label"
          >
            <dt
              class="flex items-center text-sm text-neutral-600 dark:text-neutral-300"
            >
              <span>{{ item.label }}</span>
              <a
                class="ml-2 shrink-0 text-neutral-400 hover:text-neutral-500"
                href="#"
              >
                <span class="sr-only"
                  >Learn more about how {{ item.label }} is calculated</span
                >
                <Icon
                  class="h-5 w-5"
                  aria-hidden="true"
                  name="heroicons:question-mark-circle-20-solid"
                />
              </a>
            </dt>
            <dd
              class="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              $ {{ item.total.toFixed(2) }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-xs hover:bg-red-700 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
            v-if="!addedToCart"
            type="button"
            @click="cartStore.addToCart()"
          >
            {{ loading ? 'Adding To Cart...' : 'Add To Cart' }}
          </button>
          <button
            class="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium uppercase text-white shadow-xs hover:bg-red-700 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-neutral-50"
            v-else
            type="button"
            @click="createBooking"
          >
            {{ checkoutLoading ? 'Loading...' : 'Book Now' }}
          </button>
        </div>
      </section>
    </form>
  </main>
</template>
