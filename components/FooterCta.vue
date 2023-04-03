<template>
  <div
    class="relative z-10 mx-auto -mb-28 flex max-w-7xl flex-col space-y-4 bg-white px-8 py-10 shadow-xl dark:bg-neutral-700 lg:-mb-12 lg:flex-row lg:justify-between lg:space-y-0"
  >
    <div class="lg:self-center">
      <h2
        class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-300"
      >
        interested in our services?
      </h2>
    </div>
    <div class="self-center">
      <BaseButton
        kind="btn-dark"
        label="Reserve Now"
        to="/reservations"
        :nuxt-link="true"
      />
    </div>
  </div>
</template>
