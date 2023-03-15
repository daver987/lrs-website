<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2
          class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
        >
          Lincoln Navigator SUV
        </h2>
      </div>
      <div>
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/01086df1-1b19-4ba6-af64-1992da97d600/1920"
          alt="Lincoln Navigator"
          width="1920"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="font-brand-subheading uppercase tracking-[0.4em] text-brand">
          About The Vehicle
        </h3>
        <p class="font-brand-body text-neutral-400">
          The Lincoln Navigator is one of the best vehicles to use for your
          night on the town. It comfortably fits six people, has plenty of
          amenities, and delivers luxury. The three-tonne colossus can easily
          fit through most Toronto streets while being sure to arrive in style
          with its surround sound stereo system, leather seats, seat warmers and
          more. With so many features that come standard you can't go wrong
          using this vehicle for your big night out.
        </p>
      </BaseCard>
      <div>
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/7478bff4-9a97-4165-c6a6-d9c9f040b300/1920"
          alt="Lincoln Navigator"
          width="1920"
        />
      </div>
    </div>
    <div
      class="mb-12 grid auto-cols-auto grid-cols-1 place-items-center md:grid-cols-12 md:gap-4"
    >
      <div class="col-span-1 mb-6 md:col-span-4 md:mb-0">
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/7ab09c99-a398-4c97-6813-5691753f0400/1920"
          alt="Lincoln Navigator"
          width="1920"
        />
      </div>
      <div class="col-span-6">
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/043be3f9-3ac5-4957-c1b0-469554bdc600/1920"
          alt="Lincoln Navigator"
          width="1920"
        />
      </div>
    </div>
    <div class="flex w-full flex-row justify-end">
      <Luggage :peopleAmount="6" :luggageAmount="6" class="md:-mt-48" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
