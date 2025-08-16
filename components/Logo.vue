<template>
  <NuxtLink to="/">
    <div class="logo" :class="[size, shape]">
      <img
        v-if="shape === 'round'"
        :src="logoRound as string"
        :width="imageWidth"
        alt="Company Logo"
        @error="onImgError"
      />
      <img
        v-else-if="lettersOnly"
        :src="logoLetters as string"
        :width="imageWidth"
        alt="Company Logo"
        @error="onImgError"
      />
      <img
        v-else
        :src="logoDefault as string"
        :width="imageWidth"
        alt="Company Logo"
        @error="onImgError"
      />
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { useImageFallback } from '~/composables/useImageFallback'
const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value),
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value: string) => ['light', 'dark'].includes(value),
  },
  shape: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'round'].includes(value),
  },
  lettersOnly: Boolean,
})
const imageWidth = {
  small: 50,
  medium: 100,
  large: 150,
}[props.size] as number
const appConfig = useAppConfig()
const { onImgError } = useImageFallback()
const logoDefaultLight = appConfig.brand.assets.logo.light
const logoDefaultDark =
  appConfig.brand.assets.logo.dark || appConfig.brand.assets.logo.light
// Fallbacks for shapes if brand doesn't provide specific variants
const logoRoundLight = appConfig.brand.assets.logo.light
const logoRoundDark =
  appConfig.brand.assets.logo.dark || appConfig.brand.assets.logo.light
const logoLetters =
  appConfig.brand.assets.logo.dark || appConfig.brand.assets.logo.light
const logoDefault = props.theme === 'light' ? logoDefaultLight : logoDefaultDark
const logoRound = props.theme === 'light' ? logoRoundLight : logoRoundDark
</script>

<style scoped>
.logo {
  display: inline-block;
}

.small {
  width: 75px;
}

.medium {
  width: 125px;
}

.large {
  width: 175px;
}

.round img {
  border-radius: 50%;
}
</style>
