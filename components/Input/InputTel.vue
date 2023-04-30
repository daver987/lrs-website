<script setup lang="ts">
import { toRef, watch } from "vue"
import { useTelInput } from "vue3-headless-tel-input"

interface Props {
  modelValue: string,
  default: undefined
}

const props = defineProps<Props>()

const emit = defineEmit("update:model-value")

const value = toRef(props, "modelValue");

const { inputRef, selectedCountry, selectedCountryObject, unmaskedValue, countries } = useTelInput(value);

watch(unmaskedValue, () => {
  emit("update:model-value", unmaskedValue.value);
});
</script>

<template>
  <div>
    <select v-for="country in countries" :key="country.code" v-model="selectedCountry">
      <option :value="country.code">
        {{ country.name }} {{ country.callingCode }}
      </option>
    </select>
    <input ref="inputRef" class="-mt-1 block w-full border-0 p-0 pb-0.5 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm" />
  </div>
</template>
