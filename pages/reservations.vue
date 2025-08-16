<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { navigation } from '~/data/navigation'
import { useImageFallback } from '~/composables/useImageFallback'

definePageMeta({
  layout: 'auth',
  name: 'reservations',
})

const appConfig = useAppConfig()
useHead({
  title: `Reserve Your ${appConfig.brand.name} Black Car Service in Toronto`,
  meta: [
    {
      name: 'description',
      content: `Book your next ${appConfig.brand.name} ride online. Ensure a seamless and luxurious transportation experience for airport transfers, corporate travel, and special events.`,
    },
  ],
})

const nav = navigation

const open = ref<boolean>(false)
const src = '/images/hpl-logo-dark.png'
useScriptTag(
  'https://embed.evertransit.com/schedule.html?theme=default&api_key=d1966e57408430a9f1ef27738da11530ef1053b766334b82da016e6436c8cd765f'
)
const { onImgError } = useImageFallback()
</script>

<template>
  <div class="h-full px-4 lg:px-2">
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-40 lg:hidden" as="div" @close="open = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-neutral-400"
                  type="button"
                  @click="open = false"
                >
                  <span class="sr-only">Close menu</span>
                  <Icon
                    class="h-6 w-6"
                    name="heroicons:x-mark"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div class="space-y-6 border-t border-neutral-200 px-4 py-6">
                <template v-for="page in nav" :key="page.id">
                  <div class="flow-root">
                    <NuxtLink
                      class="-m-2 block p-2 font-medium capitalize"
                      exact-active-class="dark:text-brand dark:hover:text-brand-600"
                      :to="page.href"
                      >{{ page.name }}
                    </NuxtLink>
                  </div>
                </template>
              </div>

              <div class="space-y-6 border-t border-neutral-200 px-4 py-6">
                <div class="flow-root">
                  <NuxtLink
                    class="-m-2 block p-2 font-medium text-neutral-900"
                    exact-active-class="text-brand hover:text-brand-600"
                    to="/signin"
                    >Sign in
                  </NuxtLink>
                </div>
                <div class="flow-root">
                  <NuxtLink
                    class="-m-2 block p-2 font-medium text-neutral-900"
                    exact-active-class="text-brand hover:text-brand-600"
                    to="/signup"
                    >Create account
                  </NuxtLink>
                </div>
              </div>

              <div class="border-t border-neutral-200 px-4 py-6">
                <NuxtLink class="-m-2 flex items-center p-2">
                  <img
                    class="shrink-0 block w-5 h-auto"
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt="Canada flag"
                  />
                  <span class="ml-3 block text-base font-medium text-brand-600"
                    >CAD</span
                  >
                  <span class="sr-only">, change currency</span>
                </NuxtLink>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <header class="relative bg-transparent">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div class="border-b border-neutral-400 py-2">
          <div class="flex h-16 w-full justify-center lg:items-center">
            <button
              class="shrink-0 rounded-sm bg-transparent p-2 text-neutral-400 hover:text-neutral-500 lg:hidden"
              type="button"
              @click="open = true"
            >
              <span class="sr-only">Open menu</span>
              <Icon
                class="h-6 w-6"
                name="heroicons:bars-3"
                aria-hidden="true"
              />
            </button>

            <!-- Logo -->
            <div
              class="ml-2 flex w-full justify-center lg:ml-0 lg:w-auto lg:justify-start"
            >
              <NuxtLink class="self-center" to="/">
                <span class="sr-only">{{ appConfig.brand.name }}</span>
                <img
                  class="h-12 w-auto lg:h-14"
                  :src="
                    (appConfig.brand.assets.logo.dark ||
                      appConfig.brand.assets.logo.light) as string
                  "
                  :alt="`${appConfig.brand.name} Logo`"
                  width="1920"
                  @error="onImgError"
                />
              </NuxtLink>
            </div>

            <div class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <template v-for="page in nav" :key="page.id">
                  <NuxtLink
                    class="flex items-center text-sm font-medium capitalize tracking-wider text-neutral-900 hover:text-brand"
                    exact-active-class="text-brand hover:text-brand-600"
                    :to="page.href"
                    >{{ page.name }}
                  </NuxtLink>
                </template>
              </div>
            </div>

            <div class="ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <NuxtLink
                  class="text-sm font-medium text-neutral-900 hover:text-brand"
                  to="/signin"
                  exact-active-class="text-brand hover:text-brand-600"
                  >Sign in
                </NuxtLink>
                <span class="h-6 w-px bg-neutral-900" aria-hidden="true" />
                <NuxtLink
                  class="text-sm font-medium text-neutral-900 hover:text-brand"
                  to="/signup"
                  exact-active-class="text-brand hover:text-brand-600"
                  >Create account
                </NuxtLink>
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a
                  class="flex items-center text-neutral-500 hover:text-brand"
                  href="#"
                >
                  <img
                    class="shrink-0 block w-5 h-auto"
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt="Canada Flag"
                  />
                  <span class="ml-3 block text-sm font-medium">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <MiniCart />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <div class="w-full">
      <iframe
        src="https://embed.evertransit.com/schedule.html?theme=default&api_key=d1966e57408430a9f1ef27738da11530ef1053b766334b82da016e6436c8cd765f"
        height="750px"
        width="100%"
      ></iframe>
    </div>
  </div>
</template>
