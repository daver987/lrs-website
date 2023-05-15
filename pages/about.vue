<script lang="ts" setup>
definePageMeta({
  title: "About High Park Livery - Greater Toronto's Black Car Service Experts",
  description:
    'Learn about High Park Livery, the trusted provider of black car services in the Greater Toronto Area. Discover our commitment to exceptional service and reliability.',
  layout: 'default',
  colorMode: 'dark',
})

const headerInfo = {
  aboveHeading: 'DISCOVER High Park Livery',
  heading: 'ABOUT US',
  body: "High Park Livery is here to help you get from place to place. It's our job to provide you with the means of transportation, and we won't stop until it's done right.",
  image: '/images/misc-8.jpg',
}
const qualities = [
  {
    id: 1,
    iconName: 'ph:crown',
    title: 'Exceptional Quality',
    body: "High Park Livery is committed to providing a top-quality fleet of vehicles in Toronto because our customers deserve nothing less than the best. We exclusively utilize the latest, meticulously maintained vehicles, ensuring a comfortable and enjoyable ride. Our professional and courteous drivers guarantee your satisfaction, whether you're heading to the airport or simply require transportation around town. Contact us today to book your exceptional journey with High Park Livery!",
  },
  {
    id: 2,
    iconName: 'mdi-light:diamond',
    title: 'Unparalleled Luxury',
    body: 'Experience the luxury you deserve with High Park Livery. Our opulent vehicles cater to those seeking a stylish and sophisticated ride, perfect for weddings, business functions, or any special occasion. Our expert drivers offer unrivaled comfort and convenience, ensuring your safe and timely arrival at your destination. Choose High Park Livery to elevate your special occasion to extraordinary heights.',
  },
  {
    id: 3,
    iconName: 'material-symbols:chair-outline-sharp',
    title: 'Ultimate Comfort',
    body: "At High Park Livery, your comfort is our top priority. Our vehicles are carefully selected to provide the utmost relaxation, featuring luxurious leather seats and ample legroom. Our hand-picked, rigorously trained drivers are dedicated to delivering the highest level of service, ensuring you're in good hands when you choose High Park Livery. We are devoted to providing a consistently comfortable and enjoyable ride for our clients.",
  },
]
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <BaseSection class="md:-mt-16">
      <BaseContainer class="md:grid md:grid-cols-2">
        <div
          class="relative -mt-8 overflow-hidden bg-white py-6 shadow-xl dark:bg-neutral-700"
        >
          <div class="py-5">
            <p
              class="text-center font-brand-subheading uppercase tracking-[0.4em] text-brand"
            >
              At the Helm
            </p>
            <h2
              class="mt-6 text-center font-brand-heading text-4xl uppercase text-neutral-900 dark:text-neutral-400"
            >
              Our Chauffeurs
            </h2>
          </div>
          <div class="px-4 py-5 sm:p-6">
            <p class="font-brand-body text-neutral-500 dark:text-neutral-400">
              Our exceptional team of chauffeurs is among the industry's finest,
              boasting extensive experience and expertise. Each of our
              professional chauffeurs is certified by the city of Toronto,
              ensuring your safety and comfort throughout your journey. Known
              for their punctuality and courteous demeanor, our drivers are
              dedicated to providing an unparalleled travel experience.<br />With
              High Park Livery, exceptional service is just a phone call away.
              Trust us to transport you to your destination on time and in
              style. For a truly extraordinary experience, don't hesitate to get
              in touch with us or request an online quote for rates and
              availability.
            </p>
          </div>
          <div class="flex justify-center px-4 py-4 sm:px-6">
            <BaseButton
              :nuxtLink="true"
              class="self-center"
              kind="btn-brand"
              label="Reserve Now"
              to="/reservations"
            />
          </div>
        </div>
        <div class="md:self-center">
          <NuxtPicture
            :img-attrs="{
              class:
                'object-center object-cover h-64 w-full md:object-left md:min-h-[18rem]',
            }"
            alt="Chauffeur Service"
            loading="lazy"
            src="/images/misc-7.jpg"
            width="919"
          />
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection>
      <BaseContainer class="place-items-center md:grid md:grid-cols-2">
        <div class="w-full max-w-xl">
          <NuxtPicture
            :img-attrs="{
              class:
                'object-center object-cover w-full min-h-[18rem] self-center md:object-left',
            }"
            alt="Tesla-S-Back-Seat"
            loading="lazy"
            src="/images/tesla-s-4.jpg"
            width="814"
          />
        </div>
        <div class="w-full max-w-xl">
          <div class="bg-white shadow-xl dark:bg-neutral-700">
            <IconBlockAbout
              v-for="quality in qualities"
              :key="quality.id"
              :body="quality.body"
              :iconName="quality.iconName"
              :title="quality.title"
            />
          </div>
        </div>
      </BaseContainer>
    </BaseSection>
    <BaseSection class="px-0">
      <NuxtPicture
        :img-attrs="{
          class: 'object-cover object-center w-full min-h-[4rem]',
        }"
        alt="Toronto-evening-skyline"
        loading="lazy"
        src="/images/toronto-7.jpg"
        width="1920"
        :modifiers="{
          effect: 'blur:100',
        }"
      />
      <BaseContainer class="px-4">
        <div
          class="overflow-hidden bg-white py-6 dark:bg-neutral-700 md:px-2 lg:px-4"
        >
          <div class="px-4 py-5 sm:px-6">
            <p
              class="text-center font-brand-subheading uppercase tracking-[0.4em] text-brand md:text-left"
            >
              High Park Livery?
            </p>
            <h2
              class="mt-6 text-center font-brand-heading text-4xl uppercase text-neutral-900 dark:text-neutral-400 md:text-left lg:text-5xl"
            >
              WHO WE ARE
            </h2>
          </div>
          <div
            class="p-6 font-brand-body text-neutral-500 dark:text-neutral-400"
          >
            <p>
              High Park Livery is a distinguished car service company based in
              Toronto, specializing in luxury transportation for clients across
              the Greater Toronto and southern Ontario regions. Our diverse
              fleet and exceptional service cater to both corporate and
              non-corporate clients, delivering highly personalized experiences
              that surpass all expectations.
            </p>
            <p>
              Choosing High Park Livery means partnering with knowledgeable
              professionals passionate about the industry. We are steadfast in
              our commitment to customer satisfaction and punctuality, offering
              valuable route suggestions and premium amenities such as
              refreshments and Wi-Fi during your journey. Our goal is to
              cultivate a comfortable and relaxing atmosphere for passengers
              throughout their travel experience.
            </p>
            <p>
              At High Park Livery, we refuse to compromise your comfort for the
              sake of affordability. Our luxury vehicles are meticulously
              maintained to meet the highest industry standards, ensuring a safe
              and memorable ride every time.
            </p>
            <p>
              Whether you're planning a night out on the town or attending a
              business meeting in downtown Toronto, High Park Livery is equipped
              to deliver a luxurious transportation experience tailored to your
              schedule and budget.
            </p>
          </div>
          <div class="px-4 py-4 sm:px-6">
            <BaseButton
              :nuxtLink="true"
              kind="btn-brand"
              label="Contact Us"
              to="/contact"
            />
          </div>
        </div>
      </BaseContainer>
    </BaseSection>
  </div>
</template>
