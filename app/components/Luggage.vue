<script lang="ts" setup>
defineProps({
  people: {
    type: String,
    default: 'people',
  },
  peopleAmount: {
    type: Number,
    default: 0,
  },
  luggage: {
    type: String,
    default: 'luggage',
  },
  luggageAmount: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <BaseCard class="mb-8 flex w-full justify-center md:max-w-2xl">
    <div class="flex w-full max-w-xl flex-col justify-around md:flex-row">
      <ItemCount :amount="peopleAmount" :kind="people">
        <Icon class="h-auto w-16 text-neutral-400" name="bi:people" />
      </ItemCount>
      <ItemCount :amount="luggageAmount" :kind="luggage">
        <Icon
          class="h-auto w-16 text-neutral-400"
          name="fluent:luggage-28-regular"
        />
      </ItemCount>
      <div class="flex h-full flex-col items-center justify-center">
        <BaseButton
          :nuxtLink="true"
          kind="btn-brand"
          label="Reserve"
          to="/reservations"
        />
      </div>
    </div>
  </BaseCard>
</template>
