<script setup lang="ts">
defineProps({
  iconName: {
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
  <div
    class="flex flex-row bg-white p-4 shadow-xl @xs:flex-col dark:bg-neutral-700"
  >
    <div class="flex-shrink-0 @sm:mb-0 @sm:mr-4">
      <Icon :name="iconName" class="h-16 w-auto text-neutral-400" />
    </div>
    <div class="mt-2">
      <h3 class="font-brand-subheading uppercase tracking-widest text-brand">
        {{ title }}
      </h3>
      <p class="mt-1 font-brand-body text-neutral-400">
        {{ body }}
      </p>
    </div>
  </div>
</template>
