<script setup lang="ts">
const props = defineProps({
  error: Object,
})
const $img = useImage()
const backgroundImage = computed(() => {
  const imgUrl = $img('/icons/gradient-background.svg', { width: '100%' })
  return { backgroundImage: `url('${imgUrl}')` }
})
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center p-8"
    :style="backgroundImage"
  >
    <div
      class="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-neutral-900"
    >
      <h1
        class="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-white"
      >
        Oops! An error occurred
      </h1>
      <p class="mb-8 text-center text-gray-600 dark:text-gray-300">
        {{ error.message }}
      </p>
      <div class="flex justify-center">
        <button
          class="inline-flex max-w-[200px] border border-solid border-brand bg-brand px-5 py-2 text-base uppercase tracking-[0.4em] text-neutral-900 transition duration-300 hover:border-brand hover:text-neutral-900"
          @click="handleError"
        >
          Return Home
        </button>
      </div>
    </div>
  </div>
</template>
