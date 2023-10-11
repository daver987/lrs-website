<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="bg-brand py-3 text-center">
    <p class="text-sm uppercase text-gray-50">
      &copy;<span>{{ currentYear }}</span> High Park Livery Inc. All rights
      reserved
    </p>
  </div>
</template>
