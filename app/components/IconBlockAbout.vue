<script lang="ts" setup>
interface Props {
  iconName: string
  title: string
  body: string
}

const props = defineProps<Props>()
const bodyText = computed(() => useBrandifyText(props.body))
</script>

<template>
  <div class="p-6 sm:flex">
    <div class="mb-4 shrink-0 sm:mb-0 sm:mr-4">
      <Icon class="text-neutral-400" :name="iconName" size="48" />
    </div>
    <div>
      <h3
        class="font-brand-subheading text-lg uppercase tracking-widest text-brand"
      >
        {{ title }}
      </h3>
      <p class="mt-1 font-brand-body text-neutral-400">{{ bodyText }}</p>
    </div>
  </div>
</template>
