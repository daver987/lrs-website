<script lang="ts" setup>
const props = defineProps({
  aboveHeading: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  companyPhone: {
    type: String,
    required: false,
    default: undefined,
  },
  companyEmail: {
    type: String,
    required: false,
    default: undefined,
  },
  overlayOpacity: {
    type: Number,
    required: false,
    default: 0.65,
  },
  maxWidthClass: {
    type: String,
    required: false,
    default: 'max-w-6xl',
  },
})

const appConfig = useAppConfig()
const displayPhone = computed(
  () => props.companyPhone || appConfig.brand?.contact?.phoneDisplay || ''
)
const displayEmail = computed(
  () => props.companyEmail || appConfig.brand?.contact?.email || ''
)
const phoneHref = computed(
  () => `tel:${appConfig.brand?.contact?.phoneE164 || displayPhone.value}`
)
const backgroundImage = computed(() => ({
  backgroundImage: "url('/images/gradient-background.svg')",
}))
const headerImage = computed(() => props.image || '')
</script>

<template>
  <header
    class="relative min-h-screen overflow-hidden"
    :style="backgroundImage"
  >
    <AppNavigation />

    <BaseContainer class="relative mt-20">
      <div class="relative flex justify-center">
        <div
          class="pointer-events-auto absolute left-0 top-1/2 hidden min-w-[160px] -translate-x-1/2 -translate-y-1/2 -rotate-90 md:flex md:justify-between"
        >
          <NuxtLink
            class="inline-flex items-center gap-2 font-brand-body text-sm uppercase tracking-widest text-neutral-200"
            :href="phoneHref"
          >
            <span class="text-brand">CALL :</span>
            <span>{{ displayPhone }}</span>
          </NuxtLink>
        </div>

        <div
          class="pointer-events-auto absolute right-0 top-1/2 hidden min-w-[200px] translate-x-1/2 -translate-y-1/2 rotate-90 md:flex md:justify-between"
        >
          <NuxtLink
            class="inline-flex items-center gap-2 font-brand-body text-sm uppercase tracking-widest text-neutral-200"
            :href="`mailto:${displayEmail}`"
          >
            <span class="text-brand">EMAIL :</span>
            <span>{{ displayEmail }}</span>
          </NuxtLink>
        </div>

        <div :class="['relative w-full', maxWidthClass]">
          <div
            class="relative w-full overflow-hidden border border-neutral-800"
          >
            <div class="relative aspect-[4/3] md:aspect-[21/9]">
              <img
                class="absolute inset-0 h-full w-full object-cover"
                v-if="headerImage"
                :src="headerImage"
                alt="Header visual"
              />
              <div
                class="absolute inset-0 bg-black"
                :style="{ opacity: overlayOpacity }"
              />
              <div
                class="relative flex h-full flex-col items-center justify-center gap-6 px-6 py-16 text-center md:items-start md:px-12 md:text-left"
              >
                <p
                  class="font-brand-subheading text-sm uppercase leading-relaxed tracking-widest text-brand md:text-base"
                >
                  {{ aboveHeading }}
                </p>
                <h1
                  class="font-brand-heading text-4xl uppercase leading-tight text-neutral-200 lg:text-5xl"
                >
                  {{ heading }}
                </h1>
                <p class="max-w-xl font-brand-body text-neutral-400">
                  {{ body }}
                </p>

                <div class="flex flex-col items-center gap-2 md:hidden">
                  <NuxtLink
                    class="font-brand-body text-sm uppercase tracking-widest text-neutral-200"
                    :href="phoneHref"
                  >
                    <span class="text-brand">CALL :</span>
                    <span class="ml-1">{{ displayPhone }}</span>
                  </NuxtLink>
                  <NuxtLink
                    class="font-brand-body text-sm uppercase tracking-widest text-neutral-200"
                    :href="`mailto:${displayEmail}`"
                  >
                    <span class="text-brand">EMAIL :</span>
                    <span class="ml-1">{{ displayEmail }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>
