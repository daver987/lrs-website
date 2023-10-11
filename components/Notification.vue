<script lang="ts" setup>
interface Props {
  show: boolean
  message1?: string
  message2?: string
}

const props = defineProps<Props>()

const showNotification = computed<boolean>(() => {
  return props.show
})

const close = ref<boolean>(true)

const closeNotification = (): void => {
  close.value = false
}
</script>

<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showNotification"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Icon
                  aria-hidden="true"
                  class="h-6 w-6 text-green-400"
                  name="heroicons-outline:check-circle"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ message1 }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ message2 }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  type="button"
                  @click="closeNotification"
                >
                  <span class="sr-only">Close</span>
                  <Icon
                    aria-hidden="true"
                    class="h-5 w-5"
                    name="heroicons:x-circle-20-solid"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
