<script lang="ts" setup>
defineProps({
  kind: {
    type: String,
    default: 'luggage',
  },
  amount: {
    type: Number,
    default: 3,
  },
})
</script>

<template>
  <div class="mb-8 flex h-full flex-col items-center space-y-4 md:m-0">
    <slot></slot>
    <h4
      class="text-center font-brand-subheading uppercase tracking-widest text-neutral-500 dark:text-brand"
    >
      {{ kind }}
    </h4>
    <p
      class="font-brand-heading text-5xl text-neutral-700 dark:text-neutral-400"
    >
      {{ amount }}
    </p>
  </div>
</template>
