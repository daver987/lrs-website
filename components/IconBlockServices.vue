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
  subtitle: {
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
  <div class="flex bg-white p-4 shadow-xl @xs:flex-col dark:bg-neutral-700">
    <div class="mr-4 flex-shrink-0">
      <Icon :name="iconName" class="h-10 w-auto text-neutral-400" />
    </div>
    <div>
      <h4
        class="font-brand-subheading text-base uppercase tracking-wide text-brand"
      >
        {{ subtitle }}
      </h4>
      <p class="mt-1 font-brand-body text-neutral-400">{{ body }}</p>
    </div>
  </div>
</template>
