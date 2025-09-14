<script lang="ts" setup>
import { useImageFallback } from '~/composables/useImageFallback'
defineProps({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
})
const { onImgError } = useImageFallback()
</script>

<template>
  <img
    class="md:object-center md:object-cover"
    :alt="altText"
    :src="image as string"
    loading="lazy"
    width="1920"
    @error="onImgError"
  />
</template>
