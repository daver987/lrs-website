<script setup lang="ts">
import { ref } from '#imports'
// import {useNuxtApp} from "#app";

// const { $client } = useNuxtApp()

// const { data: hello } = await $client.hello.useQuery({ text: 'client' })



const airline = ref('')
const flightNumber = ref('')
const date = ref('')
const time = ref('')
const isValid = ref(false)
const showResults = ref(false)
const suggestedSearch = ref('')

const validateFlight = async () => {
  // Airline validation
  if (!airline.value) {
    isValid.value = false
    suggestedSearch.value = 'Please enter an airline name or code.'
    return
  }

  // Check if the airline code is valid
  const response = await fetch(
    `https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat`
  )
  const airlines = await response.text()
  const airlineCodes = airlines
    .split('\n')
    .map((airline: string) => airline.split(',')[3])
    .filter((code: string) => code !== '\\N')

  const matchingAirline = airlineCodes.find(
    (code: string) =>
      code.toLowerCase() === airline.value.toLowerCase() ||
      airline.value.toLowerCase() === 'air ' + code.toLowerCase()
  )

  if (!matchingAirline && airline.value) {
    isValid.value = false
    suggestedSearch.value = `Did you mean ${airlineCodes.join(', ')}?`
    return
  }

  // Flight number validation
  if (!flightNumber.value) {
    isValid.value = false
    suggestedSearch.value = 'Please enter a flight number.'
    return
  }

  const flightNumberRegex = /^[0-9]+[a-zA-Z]{0,2}$/
  if (!flightNumberRegex.test(flightNumber.value) && flightNumber.value) {
    isValid.value = false
    suggestedSearch.value = 'Please enter a valid flight number.'
    return
  }

  // Date and time validation
  if (!date.value || !time.value) {
    isValid.value = false
    suggestedSearch.value = 'Please enter a date and time.'
    return
  }

  const now = new Date()
  const datetime = new Date(`${date.value}T${time.value}:00`)

  if (datetime < now) {
    isValid.value = false
    suggestedSearch.value = 'Please enter a future date and time.'
    return
  }

  // All validations pass
  isValid.value = true
  suggestedSearch.value = ''
}

const submitForm = () => {
  validateFlight()
  showResults.value = true
}

const {data: myData} =
</script>

<template>
  <div class="p-6">
    <h2 class="mb-4 text-2xl font-bold">Flight Checker</h2>

    <form @submit.prevent="submitForm" class="mx-auto mb-8 max-w-lg">
      <div class="mb-4">
        <label for="airline" class="mb-1 block text-lg font-medium">
          Airline Name or Code
        </label>
        <input
          id="airline"
          type="text"
          v-model="airline"
          placeholder="Enter airline name or code"
          class="form-input w-full border-gray-300 text-lg focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': !isValid && !airline }"
          aria-describedby="airline-help"
          required
        />
        <p
          v-if="!isValid && !airline"
          class="mt-2 text-red-600"
          id="airline-help"
        >
          Please enter an airline name or code.
        </p>
      </div>

      <div class="mb-4">
        <label for="flight-number" class="mb-1 block text-lg font-medium">
          Flight Number
        </label>
        <input
          id="flight-number"
          type="text"
          v-model="flightNumber"
          placeholder="Enter flight number"
          class="form-input w-full border-gray-300 text-lg focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': !isValid && !flightNumber }"
          aria-describedby="flight-number-help"
          required
        />
        <p
          v-if="!isValid && !flightNumber"
          class="mt-2 text-red-600"
          id="flight-number-help"
        >
          Please enter a flight number.
        </p>
        <p
          v-if="
            !isValid && flightNumber && !flightNumberRegex.test(flightNumber)
          "
          class="mt-2 text-red-600"
        >
          Please enter a valid flight number.
        </p>
      </div>

      <div class="mb-4">
        <label for="date" class="mb-1 block text-lg font-medium"> Date </label>
        <input
          id="date"
          type="date"
          v-model="date"
          placeholder="Enter date"
          class="form-input w-full border-gray-300 text-lg focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': !isValid && !date }"
          aria-describedby="date-help"
          required
        />
        <p v-if="!isValid && !date" class="mt-2 text-red-600" id="date-help">
          Please enter a date.
        </p>
      </div>

      <div class="mb-8">
        <label for="time" class="mb-1 block text-lg font-medium"> Time </label>
        <input
          id="time"
          type="time"
          v-model="time"
          placeholder="Enter time"
          class="form-input w-full border-gray-300 text-lg focus:border-blue-500 focus:ring-blue-500"
          :class="{ 'border-red-500': !isValid && !time }"
          aria-describedby="time-help"
          required
        />
        <p v-if="!isValid && !time" class="mt-2 text-red-600" id="time-help">
          Please enter a time.
        </p>
      </div>

      <button
        type="submit"
        class="w-full rounded-md bg-blue-600 py-3 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        :disabled="!isValid"
      >
        Check Flight
      </button>
    </form>

    <div v-if="showResults" class="text-lg">
      <p v-if="isValid" class="font-medium text-green-700">
        The flight is valid!
      </p>
      <p v-else class="font-medium text-red-700">
        The flight is not valid. You may have been trying to search for
        <span v-if="suggestedSearch">{{ suggestedSearch }}</span>
        <span v-else>something else</span>.
      </p>
    </div>
  </div>
</template>
