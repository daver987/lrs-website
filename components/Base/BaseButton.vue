<script setup lang="ts">
interface Props {
  kind?: string
  label?: string
  to?: string
  href?: string
  link?: boolean
  nuxtLink?: boolean
  button?: boolean
}

const buttonStyles: { [key: string]: string } = {
  'btn-light':
    'border-neutral-100 text-neutral-100 hover:border-brand hover:text-brand focus:border-brand focus:ring focus:ring-brand',
  'btn-brand':
    'border-brand text-brand hover:border-brand hover:text-brand focus:border-brand focus:ring focus:ring-brand',
  'btn-dark':
    'border-neutral-900 text-neutral-900 focus:border-brand focus:ring focus:ring-brand dark:text-neutral-400 dark:border-neutral-400 hover:border-brand hover:text-brand',
  'btn-flat':
    'border-0 text-brand font-brand-body hover:text-brand active:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand',
  'btn-solid':
    'bg-brand border-brand text-neutral-900 hover:border-brand hover:text-neutral-900',
}

const props = defineProps<Props>()

const btnStyle = computed(() => {
  const style =
    buttonStyles[props.kind || 'btn-light'] || buttonStyles['btn-light']
  return `inline-flex items-center cursor-pointer border border-solid ${style} text-base py-2 px-5 tracking-[0.4em] uppercase transition duration-300 active:bg-brand/20`
})
const NuxtLink = resolveComponent('nuxt-link')
</script>
<template>
  <component
    :class="['ripple', btnStyle]"
    @click="$emit('click')"
    v-if="button || nuxtLink || link"
    :to="to"
    :href="href"
    :is="button ? 'button' : nuxtLink ? NuxtLink : 'a'"
  >
    <span class="mx-auto">{{ label }}<slot /></span>
  </component>
</template>

<style scoped>
.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.ripple::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 10%,
    transparent 10.01%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.5s;
}

.ripple:hover::after {
  transform: scale(0, 0);
  opacity: 0.2;
  transition: 0s;
}
</style>
