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
          src="/images/premium_sedan-3.png"
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
          src="/images/premium_sedan-4.jpg"
          alt="Lincoln Continental Interior"
          width="1920"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 gap-4">
      <div class="col-span-1">
        <NuxtPicture
          src="/images/premium_sedan-1.jpg"
          alt="Lincoln Continental Interior"
          :img-attrs="{
            class: 'object-cover object-center w-full md:max-w-5xl',
          }"
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
