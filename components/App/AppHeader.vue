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
})

const $img = useImage()
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
const backgroundImage = computed(() => {
  const imgUrl = $img('/images/gradient-background.svg', {
    fit: '',
    format: '',
    height: 0,
    width: 100,
  })
  return { backgroundImage: `url('${imgUrl}')` }
})
const headerImage = computed(() => {
  const imgUrl = $img(props.image as string, { width: '100%' })
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <header
    class="relative min-h-screen overflow-hidden"
    :style="backgroundImage"
  >
    <AppNavigation />
    <BaseContainer class="relative mt-20 grid grid-cols-1 md:grid-cols-2">
      <div
        class="relative bg-black bg-opacity-60 bg-cover bg-center bg-no-repeat py-32 bg-blend-darken md:col-span-2 md:px-10"
        :style="headerImage"
      >
        <div class="space-y-4 text-center md:text-left">
          <p
            class="text-center font-brand-subheading text-sm uppercase leading-relaxed tracking-widest text-brand md:text-left md:text-base"
          >
            {{ aboveHeading }}
          </p>
          <h1
            class="text-center font-brand-heading text-4xl uppercase leading-tight text-neutral-200 md:text-left lg:text-5xl"
          >
            {{ heading }}
          </h1>
          <p
            class="mx-auto max-w-xs font-brand-body text-neutral-400 md:m-0 md:text-left"
          >
            {{ body }}
          </p>
          <div
            class="bottom-1/2 tracking-wide md:absolute md:-left-20 md:-rotate-90 md:transform"
          >
            <NuxtLink
              class="text-center font-brand-body text-sm text-neutral-200"
              :href="phoneHref"
              ><span class="text-brand">CALL :</span>
              {{ displayPhone }}
            </NuxtLink>
          </div>
          <div
            class="bottom-1/2 my-1 md:absolute md:-right-36 md:rotate-90 md:transform"
          >
            <NuxtLink
              class="text-center font-brand-body text-sm uppercase tracking-wide text-neutral-200"
              :href="`mailto:${displayEmail}`"
              ><span class="text-brand">EMAIL :</span>
              {{ displayEmail }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>
