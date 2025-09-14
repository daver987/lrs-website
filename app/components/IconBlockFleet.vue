<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
  grid: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div :class="grid">
    <BaseCard
      class="flex flex-col space-y-6 bg-white px-8 py-12 shadow-xl md:px-6 lg:px-8"
    >
      <p
        class="text-center font-brand-subheading uppercase tracking-[0.4em] text-brand md:text-left"
      >
        luxury vehicle
      </p>
      <h2
        class="text-center font-brand-heading text-4xl uppercase text-neutral-400 md:text-left xl:text-5xl"
      >
        {{ heading }}
      </h2>
      <div class="flex max-w-lg justify-center md:justify-start">
        <BaseButton
          :nuxtLink="true"
          kind="btn-flat"
          label="View More"
          to="/fleet"
        >
          <Icon
            class="h-12 w-auto text-brand"
            name="ic:twotone-arrow-right-alt"
          />
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>
