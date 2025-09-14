<script lang="ts" setup>
const props = defineProps({
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

const subtitleText = computed(() => useBrandifyText(props.subtitle))
const bodyText = computed(() => useBrandifyText(props.body))
</script>

<template>
  <div class="flex bg-white p-4 shadow-xl @xs:flex-col dark:bg-neutral-700">
    <div class="mr-4 shrink-0">
      <Icon class="h-10 w-auto text-neutral-400" :name="iconName" />
    </div>
    <div>
      <h4
        class="font-brand-subheading text-base uppercase tracking-wide text-brand"
      >
        {{ subtitleText }}
      </h4>
      <p class="mt-1 font-brand-body text-neutral-400">{{ bodyText }}</p>
    </div>
  </div>
</template>
