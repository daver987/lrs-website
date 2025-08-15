<script lang="ts" setup>
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
</script>

<template>
  <NuxtPicture
    :alt="altText"
    :img-attrs="{
      class: 'md:object-center md:object-cover',
    }"
    :src="$img(image as string)"
    placeholder
    loading="lazy"
    width="1920"
  />
</template>
