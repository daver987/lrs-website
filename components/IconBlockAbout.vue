<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="p-4 sm:flex">
    <div class="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
      <img :alt="altText" :src="`/icons/${image}.svg`" class="w-16" />
    </div>
    <div>
      <h3
        class="font-brand-subheading text-lg uppercase tracking-widest text-brand"
      >
        {{ title }}
      </h3>
      <p class="mt-1 font-brand-body text-neutral-400">{{ body }}</p>
    </div>
  </div>
</template>
