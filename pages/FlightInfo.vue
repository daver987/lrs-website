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
const airportOptions = await getFlightOptions('airports')
const submitFlightInto = () => {
  console.log('Submit Flight')
}
</script>

<template>
  <n-card
    class="flight-info-component flex max-w-2xl flex-col"
    title="Flight Information"
  >
    <n-form class="dark:text-neutral">
      <n-grid :cols="4" x-gap="8">
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
        <n-form-item-gi :span="2" label="Flight Number:" path="flightInfo">
          <n-input
            v-model:value="flightInfo.flightNumber"
            placeholder="Enter Flight Number"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="2" label="Departure Airport:" path="flightInfo">
          <n-select
            :loading="loading"
            v-model:value="flightInfo.departureAirport"
            filterable
            :options="airportOptions!"
            placeholder="Select Departure Airport"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi :span="2" label="Arrival Airport:" path="flightInfo">
          <n-select
            :loading="loading"
            clearable
            v-model:value="flightInfo.arrivalAirport"
            filterable
            :options="airportOptions!"
            placeholder="Select Arriving Airport"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="2" label="Arrival Date/Time:" path="flightInfo">
          <n-date-picker
            v-model:value="flightInfo.arrivalDateTime"
            type="datetime"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="4">
          <n-button @click="submitFlightInto"> Flight Information</n-button>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>

<style scoped>
.flight-info-component {
  /* Your custom styles */
}
</style>
