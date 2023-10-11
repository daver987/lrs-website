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
    :src="image"
    loading="lazy"
    width="1920"
  />
</template>
