<template>
  <NuxtLink to="/">
    <div class="logo" :class="[size, shape]">
      <NuxtPicture
        v-if="shape === 'round'"
        :src="logoRound"
        :width="imageWidth"
        alt="Company Logo"
      />
      <NuxtPicture
        v-else-if="lettersOnly"
        :src="logoLetters"
        :width="imageWidth"
        alt="Company Logo"
      />
      <NuxtPicture
        v-else
        :src="logoDefault"
        :width="imageWidth"
        alt="Company Logo"
      />
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
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
const logoDefaultLight = '/images/hpl-logo-white.png'
const logoDefaultDark = '/images/hpl-logo-dark.png'
const logoRoundLight = '/images/hpl-logo-white-square.png'
const logoRoundDark = '/images/hpl-logo-dark-square.png'
const logoLetters = '/images/hpl-logo-dark.png'
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
