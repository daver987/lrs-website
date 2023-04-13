<template>
  <div>
    <section class="my-32 w-full">
      <div
        class="mx-auto mb-8 flex max-w-7xl flex-col-reverse md:grid md:grid-cols-10"
      >
        <div class="w-full md:col-span-6">
          <BaseCard class="w-full space-y-6">
            <h2
              class="font-brand-subheading uppercase tracking-[0.4em] text-brand"
            >
              About The Vehicle
            </h2>
            <h3
              class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
            >
              Executive <br />Sprinter Van
            </h3>
            <p class="max-w-[50ch] font-brand-body text-neutral-400">
              The 11 Passenger Sprinter Van is a perfect vehicle for the large
              group looking to travel together. This van can accommodate up to
              eleven people with luggage. This makes it perfect for large
              groups, and corporate tours.
            </p>
          </BaseCard>
        </div>
        <div class="w-full md:col-span-4">
          <NuxtPicture
            src="/images/sprinter-5.png"
            alt="11 Passenger Van"
            :img-attrs="{
              class:
                'object-cover object-center w-full max-w-2xl md:w-5xl md:-ml-40 md:-mt-32',
            }"
            width="1920"
          />
        </div>
      </div>
      <Luggage :peopleAmount="11" :luggageAmount="11" />
    </section>
    <section class="mb-16 w-full md:mb-32">
      <div class="flex flex-col md:grid md:grid-cols-10">
        <div class="w-full md:relative md:col-span-4">
          <NuxtPicture
            src="/images/standard_suv-1.png"
            alt="GMC Yukon XL"
            :img-attrs="{
              class:
                'object-cover object-center w-full md:w-5xl w-2xl md:right-0 md:bottom-[55%] md:left-0',
            }"
            width="1920"
          />
        </div>
        <div class="mb-8 md:col-span-6">
          <BaseCard class="container col-span-6 mb-8 space-y-6 md:pl-56">
            <h2
              class="font-brand-subheading uppercase tracking-[0.4em] text-brand"
            >
              ABOUT THE VEHICLE
            </h2>
            <h3
              class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
            >
              Chevy Suburban
            </h3>
            <p class="max-w-[50ch] font-brand-body text-neutral-400">
              The Chevy Suburban is a full-size SUV that seats up to six people
              comfortably. This vehicle can be used for airport transportation,
              weddings or any other destination requiring an upgrade from a
              sedan. This SUV is the workhorse of the limo industry. You can see
              it on highways, at airports and at all events where there is a
              need for upscale transportation.
            </p>
          </BaseCard>
          <Luggage :peopleAmount="6" :luggageAmount="6" />
        </div>
      </div>
    </section>
    <section class="mb-16 w-full md:mb-24">
      <div class="flex flex-col-reverse md:grid md:grid-cols-10">
        <div class="mb-8 md:col-span-6">
          <BaseCard class="container space-y-6 md:col-span-6">
            <h2
              class="font-brand-subheading uppercase tracking-[0.4em] text-brand"
            >
              ABOUT THE VEHICLE
            </h2>
            <h3
              class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
            >
              YUKON XL
            </h3>
            <p class="max-w-[50ch] font-brand-body text-neutral-400">
              The GMC Yukon XL is a full-size SUV that seats up to eight people
              comfortably. This vehicle can be used for airport transportation,
              weddings or any other destination requiring an upgrade from a
              sedan. This SUV, like the Suburban, is a workhorse of the limo
              industry. You can see it on highways, at airports and at all
              events where there is a need for upscale transportation.
            </p>
          </BaseCard>
        </div>
        <div class="w-full md:relative md:col-span-4">
          <NuxtPicture
            src="/images/standard_suv-3.png"
            alt="GMC Yukon XL"
            :img-attrs="{
              class:
                'object-cover object-center w-full md:max-w-3xl md:right-0 md:-bottom-12 md:absolute',
            }"
            width="1920"
          />
        </div>
      </div>
      <Luggage :peopleAmount="6" :luggageAmount="6" />
    </section>
  </div>
</template>
<script setup lang="ts"></script>
