<script lang="ts" setup>
import { services } from '~/data/services'
import { ourTours } from '~/data/tours'

definePageMeta({
  layout: 'default',
  colorMode: 'dark',
})

const appConfig = useAppConfig()
useHead({
  title: `${appConfig.brand.name} Services - Quality Black Car Solutions in Toronto`,
  meta: [
    {
      name: 'description',
      content: `Explore ${appConfig.brand.name}'s wide range of black car services in Toronto, including airport transfers, corporate travel, and special event transportation.`,
    },
  ],
})

const tours = ourTours
const $img = useImage()

const backgroundImage = computed(() => {
  const imgUrl = $img('images/toronto-9.jpg', {
    width: 100,
    style: 'filter: greyscale(100%)',
  })
  return { backgroundImage: `url('${imgUrl}')` }
})

const headerInfo = {
  aboveHeading: 'WHAT WE OFFER YOU',
  heading: 'OUR SERVICES',
  image: '/images/toronto-8.jpg',
  body: `${appConfig.brand.name} is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.`,
}
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
              {{ appConfig.brand.name }} is a leading car service provider in
              Toronto, dedicated to delivering top-quality service for over a
              decade. Our fleet of modern, meticulously maintained vehicles is
              continuously updated to meet the demands of the Toronto GTA
              market. We aim to provide the finest chauffeur service in Toronto,
              featuring our safe and luxurious Cadillac XTS, Lincoln Navigator,
              Cadillac Escalade, and Lincoln Continental vehicles. Our
              professionally trained drivers are committed to offering
              exceptional service for even the most discerning clients. As a
              comprehensive transportation company, we offer a variety of
              vehicles to accommodate any transportation requirement.
            </p>
          </div>
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <BaseContainer class="grid grid-cols-1 md:grid md:grid-cols-2 md:gap-4">
        <div
          v-for="service in services"
          :key="service.title"
          :class="service.boxPosition"
        >
          <div :class="service.imagePosition">
            <NuxtPicture
              :alt="service.altText"
              :img-attrs="{
                class: 'object-cover object-center w-full',
              }"
              :src="service.image"
            />
          </div>
          <div class="flex" :class="service.infoPosition">
            <div
              class="space-y-4 px-5 py-7 md:px-10 md:py-12"
              :class="service.infoBoxPosition"
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
                :nuxtLink="true"
                kind="btn-brand"
                label="Contact Us"
                to="/contact"
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
          {{ appConfig.brand.name }} Tours
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
          :key="tour.id"
          :body="tour.body"
          :iconName="tour.iconName"
          :title="tour.title"
        />
      </BaseContainer>
    </BaseSection>
  </div>
</template>
