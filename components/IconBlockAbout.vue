<script setup lang="ts">
interface Props {
  iconName: string
  title: string
  body: string
}
defineProps<Props>()
</script>

<template>
  <div class="p-6 sm:flex">
    <div class="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
      <Icon :name="iconName" size="48" class="text-neutral-400" />
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
