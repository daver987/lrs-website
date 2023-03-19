<script setup lang="ts">
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
    default: '',
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

const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const autocomplete = ref<google.maps.places.Autocomplete | null>(null)
const inputField = ref<HTMLInputElement | null>(null)
const place = ref<google.maps.places.PlaceResult | null>(null)

const loader = new Loader({
  apiKey: mapsApiKey,
  version: 'weekly',
  libraries: ['places'],
})

const initAutocomplete = async () => {
  await loader.load().then(() => {
    autocomplete.value = new google.maps.places.Autocomplete(
      inputField.value!,
      {
        componentRestrictions: { country: ['us', 'ca'] },
        fields: ['place_id', 'formatted_address', 'name', 'types'],
      }
    )
    autocomplete.value.addListener('place_changed', getAutocompleteComponents)
  })
}

const getAutocompleteComponents = () => {
  place.value = autocomplete.value!.getPlace()
  console.log('Returned place components:', place.value)
  const { place_id } = place.value
  console.log(place_id)
  emit('change', place.value)
  return place_id
}
const emit = defineEmits('update:modelValue')
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

onMounted(async () => {
  await initAutocomplete()
})
const modelValue = ref('')
</script>

<template>
  <div
    class="rounded border border-gray-300 bg-white px-3 shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
  >
    <label :for="name" class="font-regular block text-xxs text-gray-700">{{
      label
    }}</label>
    <input
      ref="inputField"
      :aria-label="label"
      :name="name"
      :id="name"
      type="text"
      class="autocomplete-input"
      @input="handleInput"
    />
  </div>
</template>

<!--<style scoped>-->
<!--.autocomplete-input {-->
<!--  box-sizing: border-box;-->
<!--  font-size: 14px;-->
<!--  line-height: 1.5;-->
<!--  font-family: inherit;-->
<!--  border: none;-->
<!--  outline: none;-->
<!--  text-align: inherit;-->
<!--  transition: -webkit-text-fill-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),-->
<!--    caret-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),-->
<!--    color 0.3s cubic-bezier(0.4, 0, 0.2, 1),-->
<!--    text-decoration-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);-->
<!--  cursor: text;-->
<!--  padding-top: calc((34px - 1.5 * 14px) / 2);-->
<!--  padding-bottom: calc((34px - 1.5 * 14px) / 2);-->
<!--  -webkit-appearance: none;-->
<!--  scrollbar-width: none;-->
<!--  width: 100%;-->
<!--  min-width: 0;-->
<!--  text-decoration-color: rgba(255, 255, 255, 0.82);-->
<!--  color: rgba(255, 255, 255, 0.82);-->
<!--  caret-color: #8a6642;-->
<!--  background-color: transparent;-->
<!--  height: 34px;-->
<!--}-->
<!--</style>-->
