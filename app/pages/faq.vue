<script setup lang="ts">
definePageMeta({
  name: 'faq',
  layout: 'store',
  colorMode: 'dark',
})

const faqs = [
  {
    q: 'Why do you need my flight information?',
    a: 'We monitor flights in real time to adjust pickup if your arrival time changes and ensure your chauffeur is ready when you land.',
  },
  {
    q: 'Do you charge my card immediately?',
    a: 'We place an authorization hold 24 hours before pickup. Your card is charged after your trip completes, excluding tolls/parking and incidentals.',
  },
  {
    q: 'How is pricing calculated?',
    a: 'Pricing is based on distance or hourly rate (by service), plus applicable line items and taxes shown in the order summary.',
  },
  {
    q: 'Can I add a round trip or a stop?',
    a: 'Yes. You can toggle round trip and add a single stop on the quote form. Additional stops and complex itineraries are available upon request.',
  },
]
</script>

<template>
  <div class="bg-neutral-900 text-neutral-100 min-h-[70dvh]">
    <AppNavigation />
    <main class="mx-auto max-w-5xl px-4 py-10">
      <h1 class="text-3xl font-semibold mb-6">Frequently Asked Questions</h1>
      <div
        class="divide-y divide-neutral-800 rounded-md border border-neutral-800"
      >
        <div class="p-5" v-for="item in faqs" :key="item.q">
          <h2 class="text-lg font-medium">{{ item.q }}</h2>
          <p class="mt-2 text-neutral-300">{{ item.a }}</p>
        </div>
      </div>
    </main>
    <SubFooter />
  </div>
</template>
