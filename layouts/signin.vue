<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { navigation } from '~/data/navigation'
</script>

<template>
  <div class="min-h-screen">
    <Disclosure v-slot="{ open }" as="nav">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="h-18 flex justify-between">
          <div class="flex">
            <div class="flex shrink-0 items-center">
              <NuxtLink to="/">
                <img
                  class="mt-2 block h-12 w-auto lg:hidden"
                  src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/6a0f4d3c-3f6a-4e4e-f86b-1face7a5e400/1920"
                  alt="Your Company"
                />
              </NuxtLink>
              <NuxtLink to="/">
                <img
                  class="mt-4 hidden h-16 w-auto lg:block"
                  src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/6a0f4d3c-3f6a-4e4e-f86b-1face7a5e400/1920"
                  alt="Your Company"
                />
              </NuxtLink>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Current: "border-brand text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
              <NuxtLink
                class="inline-flex items-center border-transparent font-sans text-sm font-medium capitalize text-gray-500 hover:border-gray-300 hover:text-gray-700"
                v-for="link in navigation"
                :key="link.id"
                :to="link.href"
                exact-active-class="border-brand text-gray-900"
                >{{ link.name }}</NuxtLink
              >
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center" v-show="false">
            <button
              class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2"
              type="button"
            >
              <span class="sr-only">View notifications</span>
              <Icon class="h-6 w-6" name="heroicons:bell" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu class="relative ml-3" as="div">
              <div>
                <MenuButton
                  class="flex rounded-full bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  v-show="false"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden"
                >
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Your Profile</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Settings</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Sign out</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-brand"
            >
              <span class="sr-only">Open main menu</span>
              <Icon
                class="block h-6 w-6"
                v-if="!open"
                name="heroicons:bars-3"
                aria-hidden="true"
              />
              <Icon
                class="block h-6 w-6"
                v-else
                name="heroicons:x-mark"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <!-- Current: "bg-brand-50 border-brand text-brand-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
          <DisclosureButton
            class="block border-l-4 border-brand bg-brand-50 py-2 pl-3 pr-4 text-base font-medium text-brand-700"
            as="a"
            href="#"
          >
            Dashboard
          </DisclosureButton>
          <DisclosureButton
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            as="a"
            href="#"
          >
            Team
          </DisclosureButton>
          <DisclosureButton
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            as="a"
            href="#"
          >
            Projects
          </DisclosureButton>
          <DisclosureButton
            class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
            as="a"
            href="#"
          >
            Calendar
          </DisclosureButton>
        </div>
        <div class="border-t border-gray-200 pb-3 pt-4">
          <div class="flex items-center px-4">
            <div class="shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">Tom Cook</div>
              <div class="text-sm font-medium text-gray-500">
                tom@example.com
              </div>
            </div>
            <button
              class="ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-brand focus:ring-offset-2"
              type="button"
            >
              <span class="sr-only">View notifications</span>
              <Icon class="h-6 w-6" name="heroicons:bell" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <DisclosureButton
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              as="a"
              href="#"
            >
              Your Profile
            </DisclosureButton>
            <DisclosureButton
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              as="a"
              href="#"
            >
              Settings
            </DisclosureButton>
            <DisclosureButton
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              as="a"
              href="#"
            >
              Sign out
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <slot />
    <SubFooter />
  </div>
</template>
