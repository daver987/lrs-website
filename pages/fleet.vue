<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ref, resolveComponent } from '#imports'

definePageMeta({
  layout: 'default',
  title: 'High Park Livery | Luxury Fleet',
  colorMode: 'dark',
})
const headerInfo = {
  aboveHeading: 'Discover Our Luxury Vehicles',
  heading: 'OUR FLEET',
  body: "High Park Livery is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
  image:
    'background-image: url("https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/8027755f-611b-4470-96bf-4b845c9f5600/4200")',
}

const selectedTab = ref(0)

const changeTab = (index: number) => {
  selectedTab.value = index
}

const tabs = [
  {
    icon: 'Fleet-XTS-Continental',
    title: 'Cadillac XTS',
    id: '0',
    tag: resolveComponent('FleetCadillacXts'),
    to: '/fleet',
  },
  {
    icon: 'Fleet-XTS-Continental',
    title: 'Lincoln Continental',
    id: '1',
    tag: resolveComponent('FleetLincolnContinental'),
    to: '/fleet/lincoln-continental',
  },
  {
    icon: 'Fleet-Navigator-Escalade',
    title: 'Cadillac Escalade',
    id: '2',
    tag: resolveComponent('FleetCadillacEscalade'),
    to: '/fleet/cadillac-escalade',
  },
  {
    icon: 'Fleet-Navigator-Escalade',
    title: 'Lincoln Navigator',
    id: '3',
    tag: resolveComponent('FleetLincolnNavigator'),
    to: '/fleet/lincoln-navigator',
  },
  {
    icon: 'Fleet-Tesla',
    title: 'Tesla S',
    id: '4',
    tag: resolveComponent('FleetTeslaS'),
    to: '/fleet/tesla-s',
  },
  {
    icon: 'Fleet-Other',
    title: 'Other',
    id: '6',
    tag: resolveComponent('FleetOther'),
    to: '/fleet/other',
  },
]
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <TabGroup
      :selected-index="selectedTab"
      @change="changeTab"
      as="main"
      class="mx-auto max-w-7xl md:-mt-20"
    >
      <TabList
        class="relative z-10 mx-auto mb-12 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-6"
      >
        <Tab
          v-slot="{ selected }"
          v-for="tab in tabs"
          :key="tab.id"
          as="template"
        >
          <button
            :class="[
              selected
                ? 'bg-brand text-neutral-200'
                : 'bg-white text-neutral-200 dark:bg-neutral-700',
            ]"
            class="col-span-1 flex w-full flex-col items-center justify-center space-y-4 px-2 py-16 hover:bg-brand hover:text-neutral-400"
          >
            <img :src="`/icons/${tab.icon}.svg`" alt="icon" class="w-16" />
            <span
              class="text-center text-sm uppercase tracking-widest hover:text-neutral-200"
              :class="[
                selected ? 'bg-brand text-neutral-200' : 'text-neutral-400',
              ]"
            >
              {{ tab.title }}
            </span>
          </button>
        </Tab>
      </TabList>
      <TabPanels v-auto-animate="{ duration: 300 }">
        <TabPanel>
          <FleetCadillacXts />
        </TabPanel>
        <TabPanel>
          <FleetLincolnContinental />
        </TabPanel>
        <TabPanel>
          <FleetCadillacEscalade />
        </TabPanel>
        <TabPanel>
          <FleetLincolnNavigator />
        </TabPanel>
        <TabPanel>
          <FleetTeslaS />
        </TabPanel>
        <TabPanel>
          <FleetOther />
        </TabPanel>
      </TabPanels>
    </TabGroup>
    <AppFooter />
  </div>
</template>
