<script lang="ts" setup>
const currentYear = new Date().getFullYear()
const appConfig = useAppConfig()
</script>

<template>
  <div class="bg-brand py-3 text-center">
    <p class="text-sm uppercase text-gray-50">
      &copy;<span>{{ currentYear }}</span> {{ appConfig.brand.legalName }}. All
      rights reserved
    </p>
  </div>
</template>
