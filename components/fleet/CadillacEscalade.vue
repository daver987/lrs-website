<template>
  <div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <div>
        <h2
          class="text-center font-brand-heading text-4xl uppercase dark:text-neutral-400 lg:text-left lg:text-5xl"
        >
          Cadillac Escalade<br />SUV
        </h2>
      </div>
      <div>
        <NuxtPicture
          src="/images/premium_suv-2.png"
          alt="Cadillac-Escalade"
          width="1920"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 place-items-center md:grid-cols-2">
      <BaseCard class="space-y-6">
        <h3 class="font-brand-subheading uppercase tracking-[0.4em] text-brand">
          About The Vehicle
        </h3>
        <p class="font-brand-body text-neutral-400">
          The Cadillac Escalade combines luxury, style, and comfort with
          high-tech features. The luxurious features include soft leather
          upholstery, a state-of-the-art entertainment system. The tech upgrades
          make this vehicle a perfect choice for a comfortable ride on your
          night out. The Escalade's powerful engine provides 6.2 litres of V8
          power that can take you to your destination in no time. You'll enjoy
          the comfortable leather seats with piping on the edges as well as
          electronic seat controls. Reserve this vehicle today!
        </p>
      </BaseCard>
      <div>
        <NuxtPicture
          src="/images/premium_suv-12.jpg"
          alt="Cadillac-Escalade"
          :img-attrs="{ class: 'object-cover object-center w-full' }"
          width="1980"
        />
      </div>
    </div>
    <div class="mb-12 grid grid-cols-1 gap-4">
      <div class="col-span-1 w-full lg:w-[80%]">
        <NuxtPicture
          src="/images/premium_suv-1.jpg"
          alt="Cadillac-Escalade"
          width="960"
          :img-attrs="{ class: 'object-cover object-center w-full' }"
        />
      </div>
    </div>
    <div class="flex w-full flex-row justify-end">
      <Luggage :peopleAmount="6" :luggageAmount="6" class="md:-mt-48" />
    </div>
  </div>
</template>
