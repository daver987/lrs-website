<script setup lang="ts">
import { ref, reactive } from '#imports'
import { Ref } from 'vue'
import { z } from 'zod'
import { SelectOption } from 'naive-ui'

type AutocompleteOption = {
  label: string
  value: string
}

const flightInfo = reactive({
  flightNumber: null,
  airline: null,
  departureAirport: null,
  arrivalAirport: null,
  arrivalDateTime: null,
})

const loading = ref(false)
const airlineData: Ref<AutocompleteOption[] | null> = ref(null)

async function getFlightOptions(
  type: 'airlines' | 'airports'
): Promise<SelectOption[] | null> {
  try {
    loading.value = true
    const data =
      type === 'airlines'
        ? await useTrpc().airline.getAirlines.query()
        : await useTrpc().airport.getAirports.query()
    const airlineSchema = z.object({
      name: z.string(),
      id: z.number(),
    })
    console.log('Airline Data:', data)

    if (data) {
      const validData = airlineSchema.array().parse(data)
      const options = validData.map(({ name, id }) => ({
        label: name,
        value: id.toString(),
      }))
      airlineData.value = options
      loading.value = false
      return options
    } else {
      throw new Error('No data received from the query')
    }
  } catch (error) {
    console.error('Error fetching airline data:', error)
    loading.value = false
    return null
  }
}

const airlineOptions = await getFlightOptions('airlines')
// const airportOptions = await getFlightOptions('airports')
const submitFlightInto = () => {
  console.log('Submit Flight')
}
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <n-card
        class="flight-info-component flex max-w-2xl flex-col"
        title="Flight Information"
      >
        <n-form class="dark:text-neutral">
          <n-grid :cols="4" x-gap="8">
            <n-form-item-gi
              :span="2"
              show-require-mark
              label="Flight Number:"
              path="flightInfo"
            >
              <n-space vertical size="large">
                <n-input
                  v-model:value="flightInfo.flightNumber"
                  placeholder="Enter Flight Number"
                  clearable
                  autofocus
                />
                <n-button
                  style="
                    padding-left: 2rem;
                    padding-right: 2rem;
                    text-transform: uppercase;
                    width: 100%;
                  "
                  @click="submitFlightInto"
                >
                  Done</n-button
                >
              </n-space>
            </n-form-item-gi>
            <n-form-item-gi :span="2" label="Airline:" path="flightInfo">
              <n-select
                :loading="loading"
                v-model:value="flightInfo.airline"
                filterable
                placeholder="Search Airlines"
                :options="airlineOptions!"
                clearable
              />
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-card>
      <n-card class="max-w-2xl">
        <n-p>
          To ensure your chauffeur is waiting for you when you arrive at the
          airport, we kindly request your flight information. By providing your
          flight details, you enable us to monitor your flight's status in
          real-time, ensuring punctual pick-up regardless of any delays or
          changes to your arrival time. Our commitment to exceptional service
          and attention to detail guarantees peace of mind, knowing that a
          professional, courteous chauffeur and a luxurious vehicle will be
          awaiting your arrival.
        </n-p>
      </n-card>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
.flight-info-component {
  /* Your custom styles */
}
</style>
