<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2
          class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
        >
          Lincoln Continental Sedan
        </h2>
      </div>
      <div>
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/58d16f60-282e-4e29-1805-ebfee9794f00/1920"
          alt="Lincoln Continental Sedan"
          :img-attrs="{ class: 'h-full object-cover object-center w-full' }"
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
          The Lincoln Continental is the industry's sleekest, most sophisticated
          limousine available. It features leather seating and fine wood
          accents. Its four chrome-accented headlights are sure to turn heads
          wherever you go. Elegant, luxurious, and spacious. Handles like a
          dream with an amazing ride. This is a perfect choice for a night on
          the town with friends or family. Our Lincoln Continental is designed
          for stylish comfort and spacious luxury. If you are looking for an
          elegant way to travel then our Lincoln Continental is just what you
          need!
        </p>
      </BaseCard>
      <div>
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/9b996a38-002e-4bef-5269-f8fa60b11c00/1920"
          alt="Lincoln Continental Interior"
          width="1920"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 gap-4">
      <div class="col-span-1">
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5736467c-b928-4091-e3aa-e1f1524a3f00/1920"
          alt="Lincoln Continental Interior"
          :img-attrs="{
            class: 'object-cover object-center w-full md:max-w-5xl',
          }"
          width="1920"
        />
      </div>
    </div>
    <div class="flex w-full flex-row justify-end">
      <Luggage :peopleAmount="3" :luggageAmount="3" class="md:-mt-48" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
