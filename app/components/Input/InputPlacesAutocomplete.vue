<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader'

const props = defineProps({
  type: { type: String, default: 'text' },
  value: { type: String, default: '' },
  name: { type: String, required: false },
  label: { type: String, required: false },
  errorMessage: { type: String, default: 'Required -*' },
  placeholder: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  showError: { type: Boolean, default: false },
})

function formatAddress(name: string, address: string) {
  return address && name && !address.includes(name)
    ? `${name}, ${address}`
    : address || name
}

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const emit = defineEmits(['change'])

const searchQuery = ref('')
const open = ref(false)
const suggestions = ref<google.maps.places.AutocompletePrediction[]>([])
let sessionToken: google.maps.places.AutocompleteSessionToken | null = null
let acService: google.maps.places.AutocompleteService | null = null
let placesService: google.maps.places.PlacesService | null = null

const loader = new Loader({
  apiKey: mapsApiKey,
  version: 'weekly',
  libraries: ['places'],
})

async function ensureServices() {
  await loader.load()
  if (!acService) acService = new google.maps.places.AutocompleteService()
  if (!sessionToken)
    sessionToken = new google.maps.places.AutocompleteSessionToken()
  if (!placesService) {
    const div = document.createElement('div')
    placesService = new google.maps.places.PlacesService(div)
  }
}

async function fetchPredictions(input: string) {
  if (!input || input.length < 2) {
    suggestions.value = []
    open.value = false
    return
  }
  await ensureServices()
  acService!.getPlacePredictions(
    {
      input,
      sessionToken: sessionToken!,
      componentRestrictions: { country: ['us', 'ca'] },
    },
    (preds, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && preds) {
        suggestions.value = preds
        open.value = true
      } else {
        suggestions.value = []
        open.value = false
      }
    }
  )
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  searchQuery.value = target.value
  fetchPredictions(target.value)
}

function onBlur() {
  setTimeout(() => (open.value = false), 150)
}

function selectPrediction(pred: google.maps.places.AutocompletePrediction) {
  if (!placesService) return
  placesService.getDetails(
    {
      placeId: pred.place_id,
      sessionToken: sessionToken!,
      fields: ['place_id', 'formatted_address', 'name', 'types', 'geometry'],
    },
    (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const formatted_address = place.formatted_address || ''
        const name = place.name || ''
        const formattedLocationName = formatAddress(name, formatted_address)
        searchQuery.value = formattedLocationName
        open.value = false
        sessionToken = new google.maps.places.AutocompleteSessionToken()
        emit('change', {
          formattedLocationName,
          formatted_address,
          name,
          place_id: place.place_id,
          types: place.types,
          geometry: place.geometry,
        })
      }
    }
  )
}

onMounted(async () => {
  await ensureServices()
})
</script>

<template>
  <div
    class="relative w-full rounded-sm border border-gray-300 bg-white px-3 shadow-xs focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
  >
    <label class="font-regular block text-xxs text-gray-700" :for="name">{{
      label
    }}</label>
    <input
      class="autocomplete-input block w-full bg-transparent py-2 text-sm outline-none"
      :id="name"
      :aria-label="label"
      :name="name"
      type="text"
      :placeholder="placeholder"
      :value="searchQuery"
      @input="onInput"
      @blur="onBlur"
    />
    <div
      class="absolute z-50 mt-1 w-full rounded-sm border border-neutral-200 bg-white shadow-sm"
      v-if="open && suggestions.length"
    >
      <ul class="max-h-64 overflow-auto py-1 text-sm" role="listbox">
        <li
          class="cursor-pointer px-3 py-2 hover:bg-neutral-100"
          v-for="p in suggestions"
          :key="p.place_id"
          role="option"
          @mousedown.prevent="selectPrediction(p)"
        >
          <span class="block text-neutral-900">{{
            p.structured_formatting?.main_text || p.description
          }}</span>
          <span class="block text-xs text-neutral-500">{{
            p.structured_formatting?.secondary_text
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
