<!-- <script setup lang="ts">


// const props = defineProps({
//   type: {
//     type: String,
//     default: 'text',
//   },
//   value: {
//     type: String,
//     default: '',
//   },
//   name: {
//     type: String,
//     required: false,
//   },
//   label: {
//     type: String,
//     required: false,
//   },
//   errorMessage: {
//     type: String,
//     default: 'Required -*',
//   },
//   placeholder: {
//     type: String,
//     default: '',
//   },
//   modelValue: {
//     type: String,
//     default: '',
//   },
//   showError: {
//     required: false,
//     type: Boolean,
//     default: false,
//   },
// })

// const mapsApiKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
const autocomplete = ref<google.maps.places.Autocomplete | null>(null)
const inputField = ref<HTMLInputElement | null>(null)
const place = ref<google.maps.places.PlaceResult | null>(null)

// const loader = new Loader({
//   apiKey: mapsApiKey,
//   version: 'weekly',
//   libraries: ['places'],
// })

// const initAutocomplete = async () => {
//   await loader.load().then(() => {
//     autocomplete.value = new google.maps.places.Autocomplete(
//       inputField.value!,
//       {
//         componentRestrictions: { country: ['us', 'ca'] },
//         fields: ['place_id', 'formatted_address', 'name', 'types'],
//       }
//     )
//     autocomplete.value.addListener('place_changed', getAutocompleteComponents)
//   })
// }

const getAutocompleteComponents = () => {
  place.value = autocomplete.value!.getPlace()
  console.log('Returned place components:', place.value)
  const { place_id } = place.value
  console.log(place_id)
  emit('change', place.value)
  return place_id
}

const emit = defineEmits(['change'])

onMounted(async () => {
  await initAutocomplete()
})
const modelValue = ref('')
</script> -->

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import loadGoogleMaps from '~~/utils/loadGoogleMaps'

export default defineComponent({
  setup() {
    const autocomplete: Ref<google.maps.places.Autocomplete | null> = ref(null)
    const name = 'autocomplete'
    const label = 'Autocomplete'

    onMounted(async () => {
      // Make sure the Google Maps JavaScript API is loaded
      await loadGoogleMaps()

      const input = document.getElementById('autocomplete') as HTMLInputElement
      if (input) {
        autocomplete.value = new google.maps.places.Autocomplete(input)
      }
    })

    return {
      autocomplete,
      name,
      label
    }
  },
})
</script>

<template>
  <div
    class="px-3 bg-white border border-gray-300 rounded shadow-sm focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600"
  >
    <label :for="name" class="block text-gray-700 font-regular text-xxs">{{
      label
    }}</label>
    <input
      ref="inputField"
      :aria-label="label"
      :name="name"
      :id="name"
      type="text"
      class="-mt-1 block w-full border-0 p-0 pb-0.5 capitalize text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
    />
  </div>
</template>
