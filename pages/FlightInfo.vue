<script setup lang="ts">
import { ref, computed } from '#imports'
import { buildLuggageOptions, Option } from '~/composables/useBuildOptions'
import { useQuery } from '@tanstack/vue-query'

const router = useRouter()
const flightNumber = ref('')
const arrivalTime = ref('')
const carryOnLuggage = ref(0)
const fullSizeLuggage = ref(0)

const loading = ref(false)

const vehicleTypeFetch = () => useTrpc().vehicle.get.query()
const { data: vehicleTypes, suspense: vehicleSuspense } = await useQuery({
  queryKey: ['vehicles'],
  queryFn: vehicleTypeFetch,
})
await vehicleSuspense()
const maxLuggage = computed<number>(() => {
  const vehicleType = vehicleTypes.value!.find(
    (type: Option) => type.value === formValue.value.vehicle_id
  )
  formValue.value.luggage_count = null
  return vehicleType ? vehicleType.max_luggage : 2
})

const luggageOptions = computed(() => buildLuggageOptions(maxLuggage.value))
const formValue: any = ref({
  luggage_count: null,
  carry_on_luggage_count: null,
  large_luggage_count: null,
  flight_number: null,
  arrival_time: null,
  trip_notes: '',
  vehicle_id: null,
  return_service_id: computed(() => {
    return formValue.value.service_id === 2 ? 3 : formValue.value.service_id
  }),
  vehicle: vehicleTypes.value,
})
const submitHandler = () => {
  console.log('Submitted')
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
      <n-grid :cols="2" :x-gap="48">
        <n-grid-item :span="1">
          <n-space justify="center">
            <n-card style="width: 500px" title="Frequently Asked Questions">
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

        <n-grid-item :span="1">
          <n-space justify="center">
            <n-form>
              <n-grid :cols="1" style="max-width: 500px" :y-gap="24">
                <n-grid-item :span="1">
                  <n-card title="Flight Information:">
                    <n-grid :cols="2" :x-gap="16">
                      <n-grid-item :span="1">
                        <n-form-item-gi
                          feedback="Enter flight number, e.g. AC116"
                          :span="1"
                          class="flight-info"
                          label="Flight Number:"
                        >
                          <n-input
                            type="text"
                            id="flight-number"
                            v-model="flightNumber"
                            required
                          />
                        </n-form-item-gi>
                      </n-grid-item>
                      <n-grid-item>
                        <n-form-item-gi
                          feedback="Enter Scheduled Arrival Time"
                          :span="1"
                          label="Arrival Time:"
                        >
                          <n-date-picker
                            id="arrival-time"
                            v-model="arrivalTime"
                            required
                            type="datetime"
                          />
                        </n-form-item-gi>
                      </n-grid-item>
                    </n-grid>
                  </n-card>
                </n-grid-item>

                <n-grid-item :span="1">
                  <n-card title="Luggage Information:">
                    <n-grid :cols="2" :x-gap="12">
                      <n-form-item-gi :span="1" label="Carry-On Luggage:">
                        <n-select
                          id="carry-on"
                          v-model="carryOnLuggage"
                          min="0"
                          required
                          :options="luggageOptions"
                        />
                      </n-form-item-gi>
                      <n-form-item-gi :span="1" label="Full-Size Luggage:">
                        <n-select
                          id="full-size"
                          v-model="fullSizeLuggage"
                          min="0"
                          required
                          :options="luggageOptions"
                        />
                      </n-form-item-gi>
                    </n-grid>
                  </n-card>
                </n-grid-item>
                <n-grid-item :span="2">
                  <n-card title="Trip Notes">
                    <n-form-item
                      label="Trip Notes"
                      :show-label="false"
                      feedback="Add any notes or special instructions your trip."
                    >
                      <n-input type="textarea" rows="4" />
                    </n-form-item>
                    <template #footer>
                      <n-button
                        :loading="loading"
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
                </n-grid-item>
              </n-grid>
            </n-form>
          </n-space>
        </n-grid-item>
      </n-grid>
    </n-layout-content>
  </n-layout>
</template>
