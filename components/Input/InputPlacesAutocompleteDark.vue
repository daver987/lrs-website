<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: false,
    default: 'input-el',
  },
  label: {
    type: String,
    required: false,
  },
  errorMessage: {
    type: String,
    default: 'Required -*',
  },
  placeholder: {
    type: String,
    default: 'Enter Location',
  },
  modelValue: {
    type: String,
    default: '',
  },
  showError: {
    required: false,
    type: Boolean,
    default: false,
  },
})

function formatAddress(name: string, address: string) {
  return address.includes(name) ? address : `${name}, ${address}`
}

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const autocomplete = ref<google.maps.places.Autocomplete | null>(null)
const place = ref<google.maps.places.PlaceResult | null>(null)

const loader = new Loader({
  apiKey: mapsApiKey,
  version: 'weekly',
  libraries: ['places'],
})

const initAutocomplete = async () => {
  await nextTick()
  const inputEl = document.getElementById(
    <string>props.name
  ) as HTMLInputElement

  await loader.load().then(() => {
    autocomplete.value = new google.maps.places.Autocomplete(
      inputEl!,

      {
        componentRestrictions: { country: ['us', 'ca'] },
        fields: ['place_id', 'formatted_address', 'name', 'types'],
      }
    )
    autocomplete.value.addListener('place_changed', getAutocompleteComponents)
  })
}

const cleanupAutocomplete = () => {
  if (autocomplete.value) {
    google.maps.event.clearInstanceListeners(autocomplete.value)
    autocomplete.value = null
  }
}

const getAutocompleteComponents = () => {
  place.value = autocomplete.value!.getPlace()
  const { formatted_address, name } = place.value
  const formattedLocationName = formatAddress(
    name as string,
    formatted_address as string
  )
  modelValue.value = formattedLocationName
  const newPlace = { formattedLocationName, ...place.value }
  console.log(newPlace)
  emit('change', newPlace)
}

const emit = defineEmits(['change'])

onMounted(async () => {
  await initAutocomplete()
})

onBeforeUnmount(() => {
  cleanupAutocomplete()
})
const modelValue = ref<string | undefined>('')
</script>

<template>
  <n-input
    v-model:value="modelValue"
    :input-props="{
      id: name,
      type: 'text',
    }"
    :placeholder="placeholder"
    @ready="initAutocomplete"
  />
</template>
