<script setup lang="ts">
import { servicesHome } from '~/data/servicesHome'
import { features } from '~/data/features'

definePageMeta({
  name: 'Home',
  layout: 'default',
  colorMode: 'dark',
})
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
  meta: [
    {
      name: 'description',
      content:
        'High Park Livery offers top-quality black car services in the Greater Toronto Area. Book a ride for airport transfers, corporate travel, or special events.',
    },
  ],
  title: 'High Park Livery - Premium Black Car Service in Greater Toronto',
})

const color = useColorMode()
const iconColor = color.value === 'light' ? '#fff' : '#737373'
const $img = useImage()
const backgroundImage = ref('/images/gradient-background.svg')
const fleetBackgroundImage = ref('/images/premium_suv-1.jpg')
const bgImg = useBackgroundImage($img, backgroundImage)
const fleetBackgroundImg = useBackgroundImage($img, fleetBackgroundImage)
</script>

<template>
  <div>
    <div class="relative min-h-screen overflow-hidden" :style="bgImg">
      <AppNavigation />
      <div class="relative">
        <div class="mt-16 sm:mt-24">
          <div class="mx-auto max-w-7xl">
            <div class="lg:grid lg:grid-cols-12 lg:gap-8">
              <div
                class="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left"
              >
                <div class="align-center lg:align-start flex flex-col">
                  <h1
                    class="mb-2 text-center font-brand-heading text-3xl capitalize text-white sm:text-4xl md:text-left md:text-5xl"
                  >
                    Experience Toronto's Finest Car Service
                  </h1>
                  <p
                    class="text-center font-brand-subheading uppercase tracking-widest text-brand md:text-left"
                  >
                    High Park Livery
                  </p>
                  <ImageSwitcher />
                </div>
              </div>
              <div class="mt-16 px-3 pb-8 sm:mt-24 lg:col-span-6 lg:mt-0">
                <QuoteFormTwo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseSection class="px-4">
      <div
        class="mx-auto grid grid-cols-1 gap-3 @container md:grid-cols-2 lg:max-w-7xl lg:grid-cols-4"
      >
        <IconBlockServices
          v-for="feature in features"
          :key="feature.title"
          :body="feature.body"
          :subtitle="feature.subtitle"
          :icon-name="feature.iconName"
          :title="feature.title"
        />
      </div>
    </BaseSection>
    <BaseSection
      class="bg-black/50 bg-cover bg-center bg-no-repeat pt-10 bg-blend-hard-light"
      :style="fleetBackgroundImg"
    >
      <BaseContainer
        class="flex flex-col place-items-center justify-between lg:flex-row"
      >
        <div class="mb-4 space-y-4">
          <p
            class="text-center font-brand-subheading uppercase tracking-widest text-brand lg:text-left"
          >
            The Many Types of Comfort We offer
          </p>
          <h2
            class="text-center font-heading text-4xl capitalize text-neutral-100 lg:text-left lg:text-5xl"
          >
            Our Fleet
          </h2>
        </div>
        <div>
          <BaseButton
            kind="btn-light"
            label="View All"
            to="/fleet"
            :nuxtLink="true"
          />
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection class="px-4 pt-0 sm:px-6 lg:px-8">
      <BaseContainer
        class="-mt-12 grid grid-cols-1 gap-6 bg-white shadow-xl dark:bg-neutral-700 md:grid-cols-2"
      >
        <div class="px-6 py-10 font-brand-body text-neutral-400 md:pr-12">
          <p class="font-brand-body text-sm">
            Upgrade your travel experience with
            <span class="font-brand-subheading text-sm uppercase text-brand"
              >High Park Livery's</span
            >
            exceptional car service in Toronto. Our carefully curated fleet
            showcases the finest in luxury transportation, ensuring that every
            journey exceeds your expectations. Select from a range of premium
            vehicles, including the Cadillac XTS, Lincoln Navigator SUV,
            Cadillac Escalade SUV, and Lincoln Continental, all designed to
            cater to the discerning tastes of our clientele.<br /><br />
            For over a decade, High Park Livery has provided unparalleled
            chauffeur service to the Toronto GTA market. Our expert drivers are
            dedicated to delivering top-notch service, ensuring a smooth and
            comfortable ride. As a comprehensive transportation provider, we
            cater to diverse travel requirements with our versatile fleet,
            offering specialty vehicles for larger groups and customized
            tours.<br /><br />
            Discover the exceptional options available with High Park Livery's
            limo service. Contact us to learn more about our distinguished fleet
            and experience the ultimate in luxury transportation.
          </p>
        </div>
        <div class="flex w-full place-items-center justify-center p-6">
          <icon class="text-neutral-400" name="ri:24-hours-line" size="256" />
        </div>
      </BaseContainer>
    </BaseSection>

    <BaseSection>
      <BaseContainer
        class="mx-auto mb-8 flex max-w-4xl flex-col md:mb-4 md:grid md:flex-none md:grid-cols-2 md:grid-rows-1 md:items-stretch lg:max-w-7xl"
      >
        <IconBlockFleet
          class="order-1 md:order-first md:col-span-1 md:col-start-1 md:w-full md:self-center"
          heading="Cadillac XTS"
        />
        <IconBlockFleetImage
          class="md:col-span-1 md:col-start-2"
          altText="XTS Interior"
          image="/images/standard_sedan-4.jpg"
        />
      </BaseContainer>
      <BaseContainer
        class="mx-auto flex max-w-4xl flex-col items-stretch gap-x-2 md:grid md:flex-none md:grid-cols-2 lg:max-w-7xl"
      >
        <IconBlockFleet
          class="order-2 mb-8 w-full md:col-span-1 md:col-start-1 md:row-start-2 md:mb-4 md:max-w-[80%] md:justify-self-end"
          heading="Cadillac Escalade"
        />
        <IconBlockFleetImage
          class="order-1 md:col-span-1 md:col-start-1 md:row-start-1 md:row-end-2 md:mb-0 md:self-end"
          altText="Escalade Interior"
          image="/images/premium_suv-1.jpg"
        />
        <IconBlockFleet
          class="order-4 w-full md:order-first md:max-w-[80%] md:place-self-end md:justify-self-end md:pb-8"
          heading="Lincoln Continental"
        />
        <IconBlockFleetImage
          class="order-3 md:col-start-2 md:row-start-2 md:-mt-8"
          altText="Continental Interior"
          image="/images/premium_sedan-1.jpg"
        />
      </BaseContainer>
    </BaseSection>
    <BaseSection class="pb-0">
      <NuxtPicture
        alt="Toronto Skyline"
        :img-attrs="{
          class: 'object-cover object-center lg:mx-auto lg:max-w-6xl',
        }"
        src="/images/toronto-9.jpg"
        width="1920"
        loading="lazy"
      />
    </BaseSection>
    <BaseSection class="px-4 pt-0 sm:px-6 lg:px-8">
      <BaseContainer class="-mt-16 bg-white pb-16 pt-32 dark:bg-neutral-700">
        <p
          class="text-center font-brand-subheading uppercase tracking-[0.4em] text-brand"
        >
          WHAT High Park Livery OFFERS YOU
        </p>
        <h2
          class="mt-4 text-center font-brand-heading text-4xl uppercase text-neutral-400 dark:text-neutral-300 lg:text-5xl"
        >
          We Offer
        </h2>
      </BaseContainer>
      <div
        class="mx-auto -mt-8 grid max-w-7xl grid-cols-1 gap-4 bg-white p-6 shadow-xl @container dark:bg-neutral-700 lg:grid-cols-2"
      >
        <IconBlockAbout
          class="shadow-none"
          v-for="service in servicesHome"
          :key="service.id"
          :body="service.body"
          :icon-name="service.iconName"
          :title="service.title"
        />
      </div>
    </BaseSection>
    <BaseSection>
      <BaseContainer class="space-y-8">
        <p
          class="text-center font-brand-subheading uppercase tracking-[0.4em] text-brand"
        >
          High Park Livery PARTNERS
        </p>
        <h2
          class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-5xl"
        >
          They Trust Us
        </h2>
      </BaseContainer>
      <TheLogoCloud />
    </BaseSection>
  </div>
</template>
