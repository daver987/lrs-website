<script setup lang="ts">
const logos = [
  {
    key: 0,
    src: 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/f75b4487-f4f2-4882-3d54-7f7c3db23000/1920',
    alt: 'CFIB',
  },
  {
    key: 1,
    src: 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/e08d344f-09cb-4318-30b4-7443dc0d7200/1920',
    alt: 'JPL',
  },
  {
    key: 2,
    src: 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/f5672281-3d76-480e-22fd-8ed64f42df00/1920',
    alt: 'NLA',
  },
  {
    key: 3,
    src: 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/82aa4c61-e0c2-45cc-1f99-c7c244cc6500/1920',
    alt: 'CFIB',
  },
  {
    key: 4,
    src: 'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/3271ba61-735f-4034-a9c4-68af64496c00/1920',
    alt: 'NorthBridge',
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
          :src="logo.src"
          width="1920"
          :img-attrs="{
            class:
              'object-contain w-full max-w-xs filter grayscale dark:filter dark:grayscale-0 hover:grayscale-0',
          }"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
