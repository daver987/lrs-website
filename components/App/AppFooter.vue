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
      class="w-full bg-background-dark px-6 pt-24 pb-8 lg:px-10 lg:pt-16 lg:pb-4"
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
            <Icon class="mr-8 text-3xl text-primary" name="zmdi:phone" />
            <NuxtLink
              :href="`tel:${companyPhone}`"
              class="cursor-pointer font-body text-base tracking-wider text-white hover:text-primary"
              >{{ companyPhone }}
            </NuxtLink>
          </div>
          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-4xl text-primary" name="ic:outline-mail" />
            <NuxtLink
              :href="`mailto:${companyEmail}`"
              class="cursor-pointer font-body text-base tracking-wider text-white hover:text-primary"
              >{{ companyEmail }}
            </NuxtLink>
          </div>
        </div>
        <div class="my-8 space-y-4">
          <h3
            class="text-xs uppercase leading-relaxed tracking-[0.5em] text-brand md:text-sm text-xl uppercase tracking-widest text-primary"
          >
            Quick Links
          </h3>
          <nav>
            <ul
              class="flex flex-col font-body font-bold uppercase leading-relaxed tracking-wider text-body-light"
            >
              <li v-for="myNavigation in nav" :key="myNavigation.id">
                <NuxtLink
                  :to="myNavigation.href"
                  active-class="text-brand hover:text-brand-600"
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
            class="text-xs uppercase leading-relaxed tracking-[0.5em] text-brand md:text-sm text-xl uppercase tracking-widest text-primary"
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
            class="text-center font-body text-base uppercase tracking-wider text-body-light"
          >
            Socialize With {{ companyName }}
          </p>
          <div class="max-w-40 mx-auto flex flex-row justify-center gap-8">
            <Icon class="text-3xl text-primary" name="zmdi:facebook" />
            <Icon class="text-3xl text-primary" name="zmdi:twitter" />
            <Icon class="text-3xl text-primary" name="zmdi:instagram" />
          </div>
        </div>
      </div>
    </div>
    <SubFooter />
  </footer>
</template>
