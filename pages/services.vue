<script setup lang="ts">
import { services } from '~/data/services'
import { ourTours, Tour } from '~/data/tours'
definePageMeta({
  title: 'High Park Livery Services - Quality Black Car Solutions in Toronto',
  description:
    "Explore High Park Livery's wide range of black car services in Toronto, including airport transfers, corporate travel, and special event transportation.",
  layout: 'default',
  colorMode: 'dark',
})

const tours = ourTours as Tour[]
const headerInfo = {
  aboveHeading: 'WHAT WE OFFER YOU',
  heading: 'OUR SERVICES',
  image:
    'background-image: url("https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/957a09cd-d97c-4f1d-1226-f7c31cdd8d00/1920")',
  body: "High Park Livery is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
}
const $img = useImage()
const backgroundImage = computed(() => {
  const imgUrl = $img('images/toronto-9.jpg', {
    width: '100%',
    style: 'filter: greyscale(100%)',
  })
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <BaseSection class="relative z-10 md:-mt-20">
      <BaseContainer class="bg-white shadow-xl dark:bg-neutral-700">
        <div
          class="-mt-8 grid grid-cols-1 overflow-hidden py-6 md:grid-cols-2 md:px-2 lg:px-4"
        >
          <div class="col-span-1 p-4">
            <h2
              class="mb-4 text-center font-brand-subheading uppercase tracking-[0.4em] text-brand lg:text-left"
            >
              DISCOVER OUR PREMIER SERVICES
            </h2>
            <p class="max-w-[65ch] font-brand-body text-neutral-400">
              High Park Livery is a leading car service provider in Toronto,
              dedicated to delivering top-quality service for over a decade. Our
              fleet of modern, meticulously maintained vehicles is continuously
              updated to meet the demands of the Toronto GTA market. We aim to
              provide the finest chauffeur service in Toronto, featuring our
              safe and luxurious Cadillac XTS, Lincoln Navigator, Cadillac
              Escalade, and Lincoln Continental vehicles. Our professionally
              trained drivers are committed to offering exceptional service for
              even the most discerning clients. As a comprehensive
              transportation company, we offer a variety of vehicles to
              accommodate any transportation requirement.
            </p>
          </div>
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <BaseContainer class="grid grid-cols-1 md:grid md:grid-cols-2 md:gap-4">
        <div
          :class="service.boxPosition"
          v-for="service in services"
          :key="service.title"
        >
          <div :class="service.imagePosition">
            <NuxtPicture
              :alt="service.altText"
              :src="service.image"
              :img-attrs="{
                class: 'object-cover object-center w-full',
              }"
            />
          </div>
          <div :class="service.infoPosition" class="flex">
            <div
              :class="service.infoBoxPosition"
              class="space-y-4 px-5 py-7 md:px-10 md:py-12"
            >
              <h2
                class="font-brand-subheading uppercase tracking-widest text-brand"
              >
                {{ service.aboveHeading }}
              </h2>
              <h2
                class="mt-4 font-brand-heading text-4xl uppercase text-neutral-500 dark:text-neutral-400"
              >
                {{ service.title }}
              </h2>
              <p
                class="mb-8 font-brand-body text-neutral-500 dark:text-neutral-400"
              >
                {{ service.body }}
              </p>
              <BaseButton
                class="mt-8"
                kind="btn-brand"
                label="Contact Us"
                to="/contact"
                :nuxtLink="true"
              />
            </div>
          </div>
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection
      class="space-y-3 bg-cover bg-center bg-no-repeat"
      :style="backgroundImage"
    >
      <div class="w-full">
        <p
          class="text-center font-brand-subheading uppercase tracking-widest text-brand-400"
        >
          High Park Livery Tours
        </p>
        <h2
          class="text-center font-brand-heading text-4xl uppercase text-neutral-200"
        >
          Tour Services Available
        </h2>
      </div>
    </BaseSection>
    <BaseSection class="pt-0">
      <BaseContainer
        class="grid grid-cols-1 bg-white p-2 shadow-xl dark:bg-neutral-700 md:grid-cols-2"
      >
        <IconBlockAbout
          v-for="tour in tours"
          :key="tour.title"
          :alt-text="tour.altText"
          :body="tour.body"
          :image="tour.image"
          :title="tour.title"
        />
      </BaseContainer>
    </BaseSection>
    <AppFooter />
  </div>
</template>
