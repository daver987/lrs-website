<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { navigation, NavigationItem } from '~/data/navigation'
import { ref } from '#imports'

defineProps({
  linkClasses: {
    required: false,
    default: 'text-white',
  },
  src: {
    require: false,
    default: '/images/HPL-Logo-White.png',
  },
})

const nav = navigation as NavigationItem[]

const open = ref(false)
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
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
                type="button"
                class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-neutral-400"
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <Icon
                  name="heroicons:x-mark"
                  class="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div class="space-y-6 border-t border-neutral-200 px-4 py-6">
              <template v-for="page in nav" :key="page.id">
                <div class="flow-root">
                  <NuxtLink
                    exact-active-class="dark:text-brand dark:hover:text-brand-600"
                    :to="page.href"
                    class="-m-2 block p-2 font-medium capitalize"
                    >{{ page.name }}
                  </NuxtLink>
                </div>
              </template>
            </div>

            <div class="space-y-6 border-t border-neutral-200 px-4 py-6">
              <div class="flow-root">
                <NuxtLink
                  exact-active-class="text-brand hover:text-brand-600"
                  to="/signin"
                  class="-m-2 block p-2 font-brand-body font-medium text-neutral-900"
                  >Sign in</NuxtLink
                >
              </div>
              <div class="flow-root">
                <NuxtLink
                  exact-active-class="text-brand hover:text-brand-600"
                  to="/signup"
                  class="-m-2 block p-2 font-brand-body font-medium text-neutral-900"
                  >Create account</NuxtLink
                >
              </div>
            </div>

            <div class="border-t border-neutral-200 px-4 py-6">
              <NuxtLink class="-m-2 flex items-center p-2">
                <NuxtPicture
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt="Canada flag"
                  :img-attrs="{
                    class: 'flex-shrink-0 block w-5 h-auto',
                  }"
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
    <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="border-b border-neutral-200/30 py-2">
        <div class="flex h-16 w-full justify-center lg:items-center">
          <button
            type="button"
            class="flex-shrink-0 rounded bg-transparent p-2 text-neutral-400 hover:text-neutral-500 lg:hidden"
            @click="open = true"
          >
            <span class="sr-only">Open menu</span>
            <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Logo -->
          <div
            class="ml-2 flex w-full justify-center lg:ml-0 lg:w-auto lg:justify-start"
          >
            <NuxtLink to="/" class="self-center">
              <span class="sr-only">High Park Livery</span>
              <NuxtPicture
                :src="src"
                alt="High Park Livery Logo"
                width="1920"
                :img-attrs="{ class: 'h-12 w-auto lg:h-14' }"
              />
            </NuxtLink>
          </div>

          <div class="hidden lg:ml-8 lg:block lg:self-stretch">
            <div
              class="flex h-full space-x-8 font-brand-body text-sm font-medium uppercase tracking-wider hover:text-brand"
            >
              <template v-for="page in nav" :key="page.id">
                <NuxtLink
                  exact-active-class="text-brand hover:text-brand-600"
                  :to="page.href"
                  :class="linkClasses"
                  class="flex items-center"
                  >{{ page.name }}</NuxtLink
                >
              </template>
            </div>
          </div>

          <div class="ml-auto flex items-center">
            <div
              class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
            >
              <NuxtLink
                to="/signin"
                exact-active-class="text-brand hover:text-brand-600"
                :class="linkClasses"
                class="font-brand-body text-sm font-medium capitalize text-neutral-200 hover:text-brand"
                >Sign in</NuxtLink
              >
              <span class="h-6 w-px bg-neutral-200" aria-hidden="true" />
              <NuxtLink
                to="/signup"
                exact-active-class="text-brand hover:text-brand-600"
                :class="linkClasses"
                class="font-brand-body text-sm font-medium capitalize text-neutral-200 hover:text-brand"
                >Create account</NuxtLink
              >
            </div>

            <div class="hidden lg:ml-8 lg:flex">
              <div
                class="flex items-center text-neutral-500 hover:text-brand dark:text-neutral-100"
              >
                <NuxtPicture
                  src="https://tailwindui.com/img/flags/flag-canada.svg"
                  alt="Canada Flag"
                  :img-attrs="{
                    class: 'flex-shrink-0 block w-5 h-auto',
                  }"
                />
                <span class="ml-3 block text-sm font-medium">CAD</span>
                <span class="sr-only">, change currency</span>
              </div>
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
</template>
