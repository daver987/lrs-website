<script lang="ts" setup>
const images = [
  '/images/premium_sedan-3.png',
  '/images/premium_suv-2.png',
  '/images/standard_suv-2.png',
  'images/premium_suv-14.png',
]

const currentImageIndex = ref(0)

const switchImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

watchEffect((onInvalidate) => {
  const timer = setInterval(switchImage, 5000)

  onInvalidate(() => {
    clearInterval(timer)
  })
})
</script>

<template>
  <div class="image-container">
    <transition mode="out-in" name="crossfade">
      <img
        class="image"
        :key="images[currentImageIndex]"
        :src="images[currentImageIndex]"
        alt="Switching images"
      />
    </transition>
  </div>
</template>

<style>
.image-container {
  position: relative;
  width: auto;
  height: 400px;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 2s;
}

.crossfade-enter,
.crossfade-leave-to {
  opacity: 0;
}
</style>
