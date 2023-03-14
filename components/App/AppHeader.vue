<script setup lang="ts">
defineProps({
  aboveHeading: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  companyPhone: {
    type: String,
    required: false,
    default: '647.360.9631',
  },
  companyEmail: {
    type: String,
    required: false,
    default: 'info@highparklivery.com',
  },
})
</script>

<template>
  <header class="relative min-h-screen overflow-hidden" style="
      background-image: url('https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c2f2c5f0-7a8d-4617-e4aa-d81156a40600/4200');
    ">
    <AppNavigation />
    <BaseContainer class="relative mt-20 grid h-full grid-cols-1 md:grid-cols-2">
      <div :style="image"
        class="relative bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat py-32 bg-blend-darken md:col-span-2 md:px-10">
        <div class="space-y-4 text-center md:text-left">
          <p class="text-center text-xs uppercase leading-relaxed tracking-[0.5em] text-brand md:text-sm text-sm tracking-widest text-brand md:text-left">
            {{ aboveHeading }}
          </p>
          <h1 class="text-center text-4xl uppercase text-heading lg:text-5xl capitalize leading-tight text-white md:text-left">
            {{ heading }}
          </h1>
          <p class="mx-auto max-w-xs md:m-0 md:text-left">
            {{ body }}
          </p>
          <div class="bottom-1/2 tracking-wide md:absolute md:-left-20 md:-rotate-90 md:transform">
            <NuxtLink :href="`tel:${companyPhone}`" class="text-center font-body text-sm text-gray-300"><span
                class="text-brand">CALL :</span>
              {{ companyPhone }}</NuxtLink>
          </div>
          <div class="bottom-1/2 my-1 md:absolute md:-right-36 md:rotate-90 md:transform">
            <NuxtLink :href="`mailto:${companyEmail}`"
              class="text-center font-body text-sm uppercase tracking-wide text-gray-300"><span class="text-brand">EMAIL
                :</span>
              {{ companyEmail }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>
