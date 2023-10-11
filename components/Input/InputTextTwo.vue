<template>
  <div class="w-full">
    <label v-show="showLabel" :for="name" class="label"
      ><span class="label-text">{{ label }}</span></label
    >
    <div class="relative max-w-xl">
      <input
        :id="id"
        v-model="inputValue"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        class="input input-bordered input-sm w-full rounded-none font-brand-body placeholder:font-brand-body"
      />
    </div>
    <span v-show="validation" class="label-text text-error">
      {{ validationErrorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
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
  type: string
  placeholder?: string
  required?: boolean
  validation?: boolean
  validationErrorMessage?: string
  showLabel?: boolean
}>()
//todo improve the props and add some default values
</script>
