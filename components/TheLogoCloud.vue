<script lang="ts" setup>
const logos = [
  {
    key: 0,
    src: '/images/logo-cloud-5.png',
    alt: 'seph',
  },
  {
    key: 1,
    src: '/images/logo-cloud-4.png',
    alt: 'JPL',
  },
  {
    key: 2,
    src: '/images/logo-cloud-3.png',
    alt: 'A-logo',
  },
  {
    key: 3,
    src: '/images/logo-cloud-2.png',
    alt: 'lulu-logo',
  },
  {
    key: 4,
    src: '/images/logo-cloud-1.png',
    alt: 'mec',
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
      <div
        v-for="logo in logos"
        key="logo.key"
        class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
      >
        <NuxtPicture
          :alt="logo.alt"
          :img-attrs="{
            class:
              'object-contain w-full max-w-xs filter grayscale dark:filter dark:grayscale-0 hover:grayscale-0',
          }"
          :src="logo.src"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
