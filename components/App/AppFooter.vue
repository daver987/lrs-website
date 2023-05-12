<script setup lang="ts">
import { NavigationItem } from '~/data/navigation'

interface CompanyData {
  companyName: string
  companyEmail: string
  companyPhone: string
  companyLogo: string
}
interface Props {
  companyData: CompanyData
  navigation: NavigationItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <footer>
    <div class="px-6 lg:px-10">
      <slot name="footer-cta"> </slot>
    </div>
    <div
      class="w-full bg-neutral-800 px-6 pb-8 pt-24 dark:bg-neutral-900 lg:px-10 lg:pb-4 lg:pt-16"
    >
      <div
        class="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <div class="my-8 space-y-10">
          <NuxtLink to="/" class="block max-w-[125px]">
            <NuxtPicture
              :alt="companyData.companyName"
              :src="companyData.companyLogo"
              :img-attrs="{
                class: 'object-contain object-center w-full',
              }"
              width="1920"
            />
          </NuxtLink>

          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-3xl text-brand" name="zmdi:phone" />
            <NuxtLink
              :href="`tel:${companyData.companyPhone}`"
              class="cursor-pointer tracking-wider text-neutral-200 hover:text-brand dark:text-neutral-400"
              >{{ companyData.companyPhone }}
            </NuxtLink>
          </div>
          <div class="flex flex-row justify-items-center">
            <Icon class="mr-8 text-4xl text-brand" name="ic:outline-mail" />
            <NuxtLink
              :href="`mailto:${companyData.companyEmail}`"
              class="cursor-pointer tracking-widest text-neutral-200 hover:text-brand dark:text-neutral-400"
              >{{ companyData.companyEmail }}
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
              <li v-for="nav in navigation" :key="nav.id">
                <NuxtLink
                  :to="nav.href"
                  active-class="text-brand hover:text-brand-600"
                  class="hover:text-brand"
                >
                  {{ nav.name }}
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
          <slot name="email-input"> </slot>
          <BaseButton
            button
            kind="btn-solid"
            class="w-full"
            label="Subscribe"
          />
          <p
            class="text-center uppercase tracking-wider text-neutral-200 dark:text-neutral-400"
          >
            Socialize With {{ companyData.companyName }}
          </p>
          <div class="max-w-40 mx-auto flex flex-row justify-center gap-8">
            <Icon class="text-3xl text-brand" name="zmdi:facebook" />
            <Icon class="text-3xl text-brand" name="zmdi:twitter" />
            <Icon class="text-3xl text-brand" name="zmdi:instagram" />
          </div>
        </div>
      </div>
    </div>
    <slot name="sub-footer"></slot>
  </footer>
</template>
