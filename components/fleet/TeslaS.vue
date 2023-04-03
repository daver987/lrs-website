<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2
          class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
        >
          Tesla S
        </h2>
      </div>
      <div>
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/966d3175-0900-4b44-8330-ccfeb264ed00/1920"
          alt="Tesla S"
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
          The Tesla Model S luxury electric car is a fantastic choice for riders
          wanting an environmentally conscious and luxurious ride. The Tesla
          Model S has become the standard in eco-friendly limousines. The Model
          S is fast, quiet and comfortable, giving it a significant advantage
          over its competition. With no engine or transmission to worry about,
          this ultimate green machine requires little maintenance to continue
          providing its eco-friendly service for years to come.
        </p>
      </BaseCard>
      <div>
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c5cff062-42f1-4edb-c895-4bf428bd8c00/1920"
          alt="Tesla S"
          width="1920"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 gap-4">
      <div class="col-span-1">
        <NuxtPicture
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/3cfdbe3b-4b0f-4821-d6dd-b4cae64dc000/1920"
          alt="Tesla S"
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
