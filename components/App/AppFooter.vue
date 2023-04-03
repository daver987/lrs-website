<script setup lang="ts">
import { navigation, NavigationItem } from '~/data/navigation'

const companyName = 'High Park Livery'
const companyEmail = 'info@highparklivery.com'
const companyPhone = '647.360.9631'
const companyLogo =
  'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c6c7415a-d52d-46fa-a85e-1ba5153b2000/1920'

const nav = navigation as NavigationItem[]
</script>

<template>
  <footer>
    <div class="px-6 lg:px-10">
      <FooterCta />
    </div>
    <div
      class="w-full bg-neutral-800 px-6 pt-24 pb-8 dark:bg-neutral-900 lg:px-10 lg:pt-16 lg:pb-4"
    >
      <div
        class="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <div class="my-8 space-y-10">
          <NuxtLink to="/" class="block max-w-[125px]">
            <NuxtPicture
              :alt="companyName"
              :src="companyLogo"
              :img-attrs="{
                class: 'object-contain object-center w-full',
              }"
              width="1920"
            />
          </NuxtLink>

          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-3xl text-brand" name="zmdi:phone" />
            <NuxtLink
              :href="`tel:${companyPhone}`"
              class="cursor-pointer tracking-wider text-neutral-200 hover:text-brand dark:text-neutral-400"
              >{{ companyPhone }}
            </NuxtLink>
          </div>
          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-4xl text-brand" name="ic:outline-mail" />
            <NuxtLink
              :href="`mailto:${companyEmail}`"
              class="cursor-pointer tracking-widest text-neutral-200 hover:text-brand dark:text-neutral-400"
              >{{ companyEmail }}
            </NuxtLink>
          </div>
        </div>
        <div class="my-8 space-y-4">
          <h3
            class="font-subheading uppercase leading-relaxed tracking-[0.5em] text-brand md:text-lg"
          >
            Quick Links
          </h3>
          <nav>
            <ul
              class="flex flex-col space-y-2 font-brand-subheading uppercase tracking-widest text-neutral-200 dark:text-neutral-400"
            >
              <li v-for="myNavigation in nav" :key="myNavigation.id">
                <NuxtLink
                  :to="myNavigation.href"
                  active-class="text-brand hover:text-brand-600"
                  class="hover:text-brand"
                >
                  {{ myNavigation.name }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="my-8 space-y-6 lg:space-y-4">
          <label
            for="email"
            class="font-subheading uppercase leading-relaxed tracking-[0.5em] text-brand md:text-lg"
          >
            Sign Up
          </label>
          <EmailInput />
          <BaseButton
            button
            kind="btn-solid"
            class="w-full"
            label="Subscribe"
          />
          <p
            class="text-center uppercase tracking-wider text-neutral-200 dark:text-neutral-400"
          >
            Socialize With {{ companyName }}
          </p>
          <div class="max-w-40 mx-auto flex flex-row justify-center gap-8">
            <Icon class="text-3xl text-brand" name="zmdi:facebook" />
            <Icon class="text-3xl text-brand" name="zmdi:twitter" />
            <Icon class="text-3xl text-brand" name="zmdi:instagram" />
          </div>
        </div>
      </div>
    </div>
    <SubFooter />
  </footer>
</template>
