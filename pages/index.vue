<script setup lang="ts">
import { servicesHome } from '~/data/servicesHome'
import { features } from '~/data/features'

definePageMeta({
  name: 'Home',
  layout: 'default',
  colorMode: 'dark',
})

const color = useColorMode()
console.log('color', color.value)
const iconColor = color.value === 'light' ? '#fff' : '#737373'
const $img = useImage()
const backgroundImage = computed(() => {
  const imgUrl = $img(
    'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/c2f2c5f0-7a8d-4617-e4aa-d81156a40600/4200',
    { width: 100 }
  )
  return { backgroundImage: `url('${imgUrl}')` }
})
const fleetImage = computed(() => {
  const imgUrl = $img(
    'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/5d10059a-b5c4-44cc-ef3f-6ef867396000/1920',
    { width: 100 }
  )
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <div>
    <div class="relative min-h-screen overflow-hidden" :style="backgroundImage">
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
                  <NuxtPicture
                    :img-attrs="{
                      class:
                        'self-center object-cover object-center max-w-sm mt-8 md:max-w-lg md:self-start',
                    }"
                    alt="Lincoln Continental"
                    src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/58d16f60-282e-4e29-1805-ebfee9794f00/1920"
                    width="1920"
                  />
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
      :style="fleetImage"
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
        <div class="py-10 px-6 font-brand-body text-neutral-400 md:pr-12">
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
          <SvgIcon
            name="24-hours"
            :color="iconColor"
            :size="250"
            alt="24 hours icon"
          />
        </div>
      </BaseContainer>
    </BaseSection>

    <BaseSection>
      <BaseContainer
        class="mx-auto mb-8 flex max-w-4xl flex-col md:mb-4 md:grid md:flex-none md:grid-cols-2 md:grid-rows-1 md:items-stretch lg:max-w-7xl"
      >
        <IconBlockFleet
          heading="Cadillac XTS"
          class="order-1 md:order-first md:col-span-1 md:col-start-1 md:w-full md:self-center"
        />
        <IconBlockFleetImage
          altText="XTS Interior"
          image="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/f0204aa2-4cb2-4204-10e5-5c3bed0d3500/1920"
          class="md:col-span-1 md:col-start-2"
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
          altText="Escalade Interior"
          class="order-1 md:col-span-1 md:col-start-1 md:row-start-1 md:row-end-2 md:mb-0 md:self-end"
          image="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/180e12f4-a0c1-4c70-b5af-5f05bbfa4700/1920"
        />
        <IconBlockFleet
          class="order-4 w-full md:order-first md:max-w-[80%] md:place-self-end md:justify-self-end md:pb-8"
          heading="Lincoln Continental"
        />
        <IconBlockFleetImage
          altText="Continental Interior"
          class="order-3 md:col-start-2 md:row-start-2 md:-mt-8"
          image="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/7968b80b-ad94-4501-02ca-43e552c67100/1920"
        />
      </BaseContainer>
    </BaseSection>
    <BaseSection class="pb-0">
      <NuxtPicture
        alt="Toronto Skyline"
        :img-attrs="{
          class: 'object-cover object-center lg:mx-auto lg:max-w-6xl',
        }"
        src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/d7e1f6bc-c349-4e62-48c4-642bbfcb3c00/1920"
        width="1920"
        loading="lazy"
      />
    </BaseSection>
    <BaseSection class="px-4 pt-0 sm:px-6 lg:px-8">
      <BaseContainer class="-mt-16 bg-white pt-32 pb-16 dark:bg-neutral-700">
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
          v-for="service in servicesHome"
          :key="service.title"
          :alt-text="service.altText"
          :body="service.body"
          :image="service.image"
          :title="service.title"
          class="shadow-none"
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

    <AppFooter />
  </div>
</template>
