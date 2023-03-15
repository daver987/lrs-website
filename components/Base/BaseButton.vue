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
    'border-0 text-brand font-brand-body hover:border-brand hover:text-brand active:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand',
  'btn-solid':
    'bg-brand border-brand text-neutral-900 hover:border-brand hover:text-neutral-900',
}

const props = defineProps<Props>()

const btnStyle = computed(() => {
  const style =
    buttonStyles[props.kind || 'btn-light'] || buttonStyles['btn-light']
  return `inline-flex items-center cursor-pointer border border-solid ${style} text-base py-2 px-5 tracking-[0.4em] uppercase hover:transform hover:transition hover:ease-in-out hover:scale-x-105 hover:-translate-y-1 hover:duration-300 active:bg-brand/20`
})
const NuxtLink = resolveComponent('nuxt-link')
</script>
<template>
  <component
    @click="$emit('click')"
    :class="btnStyle"
    v-if="button || nuxtLink || link"
    :to="to"
    :href="href"
    :is="button ? 'button' : nuxtLink ? NuxtLink : 'a'"
  >
    <span class="mx-auto">{{ label }}<slot /></span>
  </component>
</template>
