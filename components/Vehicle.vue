<script setup></script>

<template>
  <div>
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <div
        class="grid items-end grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:grid-cols-2 lg:items-center"
      >
        <div class="max-w-2xl mx-auto lg:mx-0 lg:max-w-lg">
          <h2 class="pt-8 mt-16 text-center heading lg:mt-0 lg:text-left">
            Cadillac XTS Sedan
          </h2>
        </div>
        <figure>
          <div class="max-w-md mx-auto lg:max-w-xl">
            <NuxtPicture
              src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/12f57e26-99ae-4fe0-9579-fa3129277800/1920"
              alt="XTS"
              width="1920"
            />
          </div>
        </figure>
      </div>
    </div>
    <div class="container px-4 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <div
        class="grid max-w-2xl grid-cols-1 gap-x-8 lg:max-w-full lg:grid-cols-2 lg:items-center lg:gap-x-0 lg:gap-y-16"
      >
        <BaseCard class="space-y-6">
          <h3 class="subheading">About The Vehicle</h3>
          <p class="font-sans text-gray-500">
            If you're looking for a legend to take care of you regardless of
            whether your destination is Toronto or Montreal, the Cadillac XTS is
            it. Its sophisticated and sleek design comes with features that make
            you feel like royalty on wheels—from power seats with memory
            positions to genuine rosewood accents. With an infinite list of
            amenities (including in-car WiFi), there's no guessing what comfort
            features await inside this car for celebrities, business people, or
            travellers.
          </p>
        </BaseCard>
        <InputTel/>
        <figure>
          <div>
            <NuxtPicture
              src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/f0204aa2-4cb2-4204-10e5-5c3bed0d3500/1920"
              alt="XTS"
              width="1920"
              :img-attrs="{ class: 'h-full object-cover object-center w-full' }"
            />
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>
