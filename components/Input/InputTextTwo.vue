<template>
  <div class="w-full">
    <label v-show="showLabel" :for="name" class="label"
      ><span class="label-text">{{ label }}</span></label
    >
    <div class="relative max-w-xl">
      <input
        :name="name"
        :id="id"
        :type="type"
        class="w-full rounded-none font-brand-body input input-bordered input-sm placeholder:font-brand-body"
        :placeholder="placeholder"
        v-model="inputValue"
        :required="required"
      />
    </div>
    <span v-show="validation" class="label-text text-error">
      {{ validationErrorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
const {
  inputValue,
  id,
  name,
  label,
  showLabel,
  placeholder,
  type,
  required,
  validation,
  validationErrorMessage,
} = defineModels<{
  inputValue: string
  id: string
  name?: string
  label?: string
  type: string,
  placeholder?: string
  required?: boolean
  validation?: boolean
  validationErrorMessage?: string
  showLabel?: boolean
}>()
//todo improve the props and add some default values
</script>
