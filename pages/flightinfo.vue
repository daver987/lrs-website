<script setup lang="ts">
import { ref, computed, useTrpc } from '#imports'
import { buildLuggageOptions } from '~/composables/useBuildOptions'
import { FormRules } from 'naive-ui'
import { Ref } from 'vue'

const quoteNumber = useRoute().query.quote_number as string
const quote = await getQuote(quoteNumber)
const maxLuggage = ref(quote.vehicle.max_luggage)
const formRef = ref(null)
const luggageOptions = computed(() => buildLuggageOptions(maxLuggage.value))

interface AirportInfoForm {
  id: string
  carry_on_luggage: number | null
  large_luggage: number | null
  flight_number: string | null
  arrival_time: string | null
  trip_notes: string | null
  quote_number: number
}

const formValue: Ref<AirportInfoForm> = ref({
  id: quote.trips[0].id,
  carry_on_luggage: null,
  large_luggage: null,
  flight_number: null,
  arrival_time: null,
  trip_notes: null,
  quote_number: quote.quote_number,
})

const rules = {
  arrival_time: {
    type: 'string',
    required: false,
    message: 'Please enter a pickup date',
    trigger: ['blur'],
  },

  carry_on_luggage: {
    type: 'number',
    required: false,
    message: 'Please enter in the amount of carry on luggage',
    trigger: ['blur', 'change'],
  },
  large_luggage: {
    type: 'number',
    message: 'Please Enter in The Amount of Large Luggage',
    trigger: ['blur', 'change'],
    required: false,
  },

  flight_number: {
    required: false,
    message: 'A Flight Number is Required',
    trigger: 'blur',
  },
  trip_notes: {
    required: false,
    message: 'Enter In Trip Notes',
    trigger: 'blur',
  },
  quote_number: {
    required: false,
    message: 'Add Quote',
    trigger: 'blur',
  },
} as FormRules

const isLoading = ref(false)
const submitHandler = async () => {
  isLoading.value = true
  try {
    const booking = await useTrpc().book.update.mutate({
      ...formValue.value,
    })
    console.log('Booking Object', booking)
    setTimeout(async () => {
      await navigateTo({
        path: '/checkout',
        query: { quote_number: quote.quote_number },
      })
      isLoading.value = false
    }, 1500)
  } catch (error) {
    console.error('Error during booking:', error)
    isLoading.value = false
  }
}
</script>

<template>
  <n-layout style="min-height: 100dvh">
    <n-layout-header style="padding: 8px">
      <n-space justify="center">
        <Logo size="medium" />
      </n-space>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <n-grid cols="1 1000:2" :x-gap="48" :y-gap="24">
        <n-grid-item>
          <n-space justify="center">
            <n-card
              style="width: 100%; max-width: 500px"
              title="Frequently Asked Questions"
            >
              <n-collapse
                style="max-width: 500px; min-width: 100%"
                default-expanded-names="1"
                accordion
              >
                <n-collapse-item
                  title="Why do you need my flight information?"
                  name="1"
                >
                  <div>
                    <n-p>
                      To ensure your chauffeur is waiting for you when you
                      arrive at the airport, we kindly request your flight
                      information. By providing your flight details, you enable
                      us to monitor your flight's status in real-time, ensuring
                      punctual pick-up regardless of any delays or changes to
                      your arrival time. Our commitment to exceptional service
                      and attention to detail guarantees peace of mind, knowing
                      that a professional, courteous chauffeur and a luxurious
                      vehicle will be awaiting your arrival.
                    </n-p>
                  </div>
                </n-collapse-item>
                <n-collapse-item
                  title="Why do you need my credit card?"
                  name="2"
                >
                  <n-p>
                    To ensure your chauffeur is waiting for you when you arrive
                    at the airport, we kindly request your flight information.
                    By providing your flight details, you enable us to monitor
                    your flight's status in real-time, ensuring punctual pick-up
                    regardless of any delays or changes to your arrival time.
                    Our commitment to exceptional service and attention to
                    detail guarantees peace of mind, knowing that a
                    professional, courteous chauffeur and a luxurious vehicle
                    will be awaiting your arrival.
                  </n-p>
                </n-collapse-item>
              </n-collapse>
            </n-card>
          </n-space>
        </n-grid-item>

        <n-grid-item>
          <n-space justify="center">
            <n-form
              ref="formRef"
              :label-width="80"
              :model="formValue"
              :rules="rules"
              style="width: 100%"
            >
              <n-card
                title="Flight Information:"
                style="width: 100%; margin-bottom: 1rem"
              >
                <n-grid
                  cols="1 400:2"
                  :y-gap="16"
                  :x-gap="16"
                  style="width: 100%; min-width: 400px"
                >
                  <n-form-item-gi
                    path="flight_number"
                    feedback="Enter flight number, e.g. AC116"
                    class="flight-info"
                    label="Flight Number:"
                  >
                    <n-input
                      type="text"
                      id="flight-number"
                      v-model:value="formValue.flight_number"
                      required
                      placeholder="Enter Flight Number.."
                    />
                  </n-form-item-gi>
                  <n-form-item-gi
                    path="arrival_time"
                    feedback="Enter Scheduled Arrival Time"
                    label="Arrival Time:"
                  >
                    <n-time-picker
                      id="arrival-time"
                      v-model:formatted-value="formValue.arrival_time"
                      required
                      format="h:mm a"
                      :clearable="true"
                      use12-hours
                      value-format="p"
                      placeholder="Enter Arrival Time.."
                    />
                  </n-form-item-gi>
                </n-grid>
              </n-card>

              <n-card
                title="Luggage Information:"
                style="width: 100%; margin-bottom: 1rem"
              >
                <n-grid cols="1 400:2" :y-gap="16" :x-gap="16">
                  <n-form-item-gi
                    path="carry_on_luggage"
                    label="Carry-On Luggage:"
                  >
                    <n-select
                      id="carry-on"
                      v-model:value="formValue.carry_on_luggage"
                      min="0"
                      required
                      placeholder="Select Carry On"
                      :options="luggageOptions"
                    />
                  </n-form-item-gi>
                  <n-form-item-gi
                    path="large_luggage"
                    label="Full-Size Luggage:"
                  >
                    <n-select
                      id="full-size"
                      v-model:value="formValue.large_luggage"
                      min="0"
                      required
                      placeholder="Select Large Luggage"
                      :options="luggageOptions"
                    />
                  </n-form-item-gi>
                </n-grid>
              </n-card>
              <n-card
                title="Trip Notes"
                style="width: 100%; margin-bottom: 1rem"
              >
                <n-form-item
                  path="trip_notes"
                  label="Trip Notes"
                  :show-label="false"
                  feedback="Add any notes or special instructions your trip."
                >
                  <n-input
                    v-model:value="formValue.trip_notes"
                    type="textarea"
                    rows="4"
                    placeholder="Enter Trip Notes"
                  />
                </n-form-item>
                <template #footer>
                  <n-button
                    :loading="isLoading"
                    @click="submitHandler"
                    text-color="#fff"
                    style="
                      width: 100%;
                      background-color: #a57c52;
                      text-transform: uppercase;
                    "
                    >Continue
                  </n-button>
                </template>
              </n-card>
            </n-form>
          </n-space>
        </n-grid-item>
      </n-grid>
      <n-card>
        <pre>{{ formValue }}</pre>
      </n-card>
    </n-layout-content>
  </n-layout>
</template>
