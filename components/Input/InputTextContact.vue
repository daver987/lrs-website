<script lang="ts" setup>
import { useField } from 'vee-validate'

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
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
const nameRef = toRef(props, 'name')
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(nameRef, undefined, {
  initialValue: props.value,
})
</script>

<template>
  <div>
    <label
      class="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
      :for="name"
      >{{ label }}</label
    >
    <div class="relative mt-1 rounded-md shadow-xs">
      <input
        class="block w-full rounded-md dark:bg-neutral-200 sm:text-sm"
        :id="name"
        :aria-describedby="name"
        :aria-errormessage="errorMessage"
        :class="[
          errorMessage
            ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-hidden focus:ring-red-500'
            : 'border-gray-300  focus:border-brand focus:ring-brand',
        ]"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        :value="inputValue"
        @blur="handleBlur"
        @input="handleChange"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        v-show="errorMessage"
      >
        <Icon
          class="h-5 w-5 text-red-500"
          aria-hidden="true"
          name="heroicons:exclamation-circle-solid"
        />
      </div>
    </div>
    <p class="mt-2 text-sm text-red-600" v-show="errorMessage" :id="name">
      {{ errorMessage }}
    </p>
  </div>
</template>
