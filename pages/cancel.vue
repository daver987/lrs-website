<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  title: 'Cancel',
  meta: [
    {
      name: 'description',
      content: 'Cancel page',
    },
  ],
})
const input = ref(null)
</script>

<template>
  ]
  <n-layout>
    <n-layout-content>
      <n-grid>
        <n-grid-item>
          <n-h3></n-h3>
          <!--          <n-p>{{ message }}</n-p>-->
        </n-grid-item>
        <n-grid-item></n-grid-item>
      </n-grid>
    </n-layout-content>
  </n-layout>
  <FlightInformation />
</template>
