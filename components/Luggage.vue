<script setup lang="ts">
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
      <ItemCount :kind="people" :amount="peopleAmount">
        <Icon name="bi:people" class="h-auto w-16 text-neutral-400" />
      </ItemCount>
      <ItemCount :kind="luggage" :amount="luggageAmount">
        <Icon
          name="fluent:luggage-28-regular"
          class="h-auto w-16 text-neutral-400"
        />
      </ItemCount>
      <div class="flex h-full flex-col items-center justify-center">
        <BaseButton
          kind="btn-brand"
          label="Reserve"
          to="/reservations"
          :nuxtLink="true"
        />
      </div>
    </div>
  </BaseCard>
</template>
