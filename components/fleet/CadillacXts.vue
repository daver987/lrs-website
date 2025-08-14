<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2
          class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
        >
          Cadillac XTS<br />
          Sedan
        </h2>
      </div>
      <div>
        <NuxtPicture
          src="/images/standard_sedan-2.png"
          alt="XTS"
          width="1242"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="font-brand-subheading uppercase tracking-[0.4em] text-brand">
          About The Vehicle
        </h3>
        <p class="font-brand-body text-neutral-400">
          If you're looking for a legend to take care of you regardless of
          whether your destination is Toronto or Montreal, the Cadillac XTS is
          it. Its sophisticated and sleek design comes with features that make
          you feel like royalty on wheels—from power seats with memory positions
          to genuine rosewood accents. With an infinite list of amenities
          (including in-car WiFi), there's no guessing what comfort features
          await inside this car for celebrities, business people, or travellers.
        </p>
      </BaseCard>
      <div>
        <NuxtPicture
          src="/images/standard_sedan-1.jpg"
          alt="XTS"
          :img-attrs="{ class: 'h-full object-cover object-center w-full' }"
          width="1920"
        />
      </div>
    </div>
    <div
      class="mb-12 grid auto-cols-auto grid-cols-1 place-items-center md:grid-cols-12 md:gap-4"
    >
      <div class="col-span-2 mb-6 md:col-span-4 md:mb-0">
        <NuxtPicture
          src="/images/standard_sedan-3.jpg"
          alt="XTS"
          :img-attrs="{ class: 'h-full object-cover object-center w-full' }"
          width="1011"
        />
      </div>
      <div class="col-span-6">
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/65d84ca4-1cc0-428e-fde8-5aca205b4200/1920"
          alt="XTS"
          :img-attrs="{ class: 'h-full object-cover object-center w-full' }"
          width="1920"
        />
      </div>
    </div>
    <div class="flex w-full flex-row justify-end">
      <Luggage class="md:-mt-48" :peopleAmount="3" :luggageAmount="3" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
