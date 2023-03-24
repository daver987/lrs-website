<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: '1em',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})
const iconHref = computed(() => `/icons/${props.name}.svg#icon`)

const iconStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
  fill: props.color,
}))
</script>

<template>
  <svg class="svg-icon" :style="iconStyle" @click="$emit('click')">
    <use :href="iconHref" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
