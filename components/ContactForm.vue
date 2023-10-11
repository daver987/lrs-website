<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { ContactFormSchema } from '~/schema/contactFormSchema'
import { useUserStore } from '~/stores/useUserStore'

const userStore = useUserStore()
const { user_id: userId } = storeToRefs(userStore)

const schema = toTypedSchema(ContactFormSchema)
const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
})

const isShown = ref(false)
const loading = ref(false)
const onSubmit = handleSubmit(async (values: ContactFormSchema) => {
  try {
    loading.value = true
    console.log('Form Values', values)
    const formDataResponse = await useTrpc().user.userForm.mutate({
      ...values,
      userId: userId.value,
    })
    console.log('Contact Form:', formDataResponse)
    setTimeout(() => {
      isShown.value = true
      loading.value = false
      resetForm()
    }, 2500)
    setTimeout(() => {
      isShown.value = false
    }, 7500)
    return
  } catch (e) {
    console.log(e)
  }
})
//Todo Connect to zapier using trpc
</script>

<template>
  <div>
    <main class="overflow-hidden">
      <section aria-labelledby="contact-heading" class="relative">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="relative bg-white shadow-xl dark:bg-neutral-700">
            <h2 id="contact-heading" class="sr-only">Contact us</h2>

            <div class="grid grid-cols-1 lg:grid-cols-3">
              <div
                class="relative overflow-hidden bg-gradient-to-b from-brand to-brand-600 px-6 py-10 sm:px-10 xl:p-12"
              >
                <div
                  aria-hidden="true"
                  class="pointer-events-none absolute inset-0 sm:hidden"
                >
                  <svg
                    class="absolute inset-0 h-full w-full"
                    fill="none"
                    height="388"
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 343 388"
                    width="343"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                      fill="url(#linear1)"
                      fill-opacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear1"
                        gradientUnits="userSpaceOnUse"
                        x1="254.553"
                        x2="961.66"
                        y1="107.554"
                        y2="814.66"
                      >
                        <stop offset="" stop-color="#fff" />
                        <stop offset="1" stop-color="#fff" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  aria-hidden="true"
                  class="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-1/2 sm:block lg:hidden"
                >
                  <svg
                    class="absolute inset-0 h-full w-full"
                    fill="none"
                    height="339"
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 359 339"
                    width="359"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                      fill="url(#linear2)"
                      fill-opacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear2"
                        gradientUnits="userSpaceOnUse"
                        x1="192.553"
                        x2="899.66"
                        y1="28.553"
                        y2="735.66"
                      >
                        <stop offset="" stop-color="#fff" />
                        <stop offset="1" stop-color="#fff" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  aria-hidden="true"
                  class="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-1/2 lg:block"
                >
                  <svg
                    class="absolute inset-0 h-full w-full"
                    fill="none"
                    height="678"
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 160 678"
                    width="160"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                      fill="url(#linear3)"
                      fill-opacity=".1"
                    />
                    <defs>
                      <linearGradient
                        id="linear3"
                        gradientUnits="userSpaceOnUse"
                        x1="192.553"
                        x2="899.66"
                        y1="325.553"
                        y2="1032.66"
                      >
                        <stop offset="" stop-color="#fff" />
                        <stop offset="1" stop-color="#fff" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3
                  class="font-brand-subheading text-lg font-medium uppercase tracking-[0.4em] text-neutral-200"
                >
                  Get In Touch
                </h3>
                <p
                  class="mt-6 max-w-3xl font-brand-body text-base text-brand-50"
                >
                  At High Park Livery, we strive to make your travel experience
                  as elegant and effortless as possible. Contact us today.
                </p>
                <dl class="mt-8 space-y-6">
                  <dt><span class="sr-only">Phone number</span></dt>
                  <dd class="flex text-base text-brand-50">
                    <icon
                      aria-hidden="true"
                      class="h-6 w-6 flex-shrink-0 text-brand-200"
                      name="heroicons:phone"
                    />
                    <span class="ml-3">+1 (647) 360-9631</span>
                  </dd>
                  <dt><span class="sr-only">Email</span></dt>
                  <dd class="flex text-base text-brand-50">
                    <Icon
                      aria-hidden="true"
                      class="h-6 w-6 flex-shrink-0 text-brand-200"
                      name="heroicons:envelope"
                    />
                    <span class="ml-3">info@highparklivery.com</span>
                  </dd>
                </dl>
                <ul class="mt-8 flex space-x-12" role="list">
                  <li>
                    <a class="text-brand-200 hover:text-brand-100" href="#">
                      <span class="sr-only">Facebook</span>
                      <svg
                        aria-hidden="true"
                        class="h-7 w-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a class="text-brand-200 hover:text-brand-100" href="#">
                      <span class="sr-only">GitHub</span>
                      <svg
                        aria-hidden="true"
                        class="h-7 w-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a class="text-brand-200 hover:text-brand-100" href="#">
                      <span class="sr-only">Twitter</span>
                      <svg
                        aria-hidden="true"
                        class="h-7 w-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Contact form -->
              <div class="px-6 py-10 sm:px-10 lg:col-span-2 xl:p-12">
                <h3
                  class="font-brand-subheading text-lg uppercase tracking-[0.4em] text-neutral-900 dark:text-neutral-400"
                >
                  Send us a message
                </h3>
                <form
                  class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                  @submit="onSubmit"
                >
                  <div>
                    <InputTextContact
                      label="First name"
                      name="first_name"
                      placeholder="First Name..."
                      type="text"
                    />
                  </div>
                  <div>
                    <InputTextContact
                      label="Last name"
                      name="last_name"
                      placeholder="Last Name..."
                      type="text"
                    />
                  </div>
                  <div>
                    <InputTextContact
                      label="Email"
                      name="email_address"
                      placeholder="Email Address..."
                      type="email"
                    />
                  </div>
                  <div>
                    <InputTextContact
                      autocomplete="tel"
                      label="Phone Number"
                      name="phone_number"
                      placeholder="Phone Number..."
                      type="tel"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <InputTextContact
                      label="Subject"
                      name="subject"
                      placeholder="Enter in a Subject"
                      type="text"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <div class="flex justify-between">
                      <label
                        class="block text-sm font-medium text-neutral-700"
                        for="message"
                        >Message</label
                      >
                      <span
                        id="message-max"
                        class="text-sm text-neutral-500 dark:text-neutral-400"
                        >Max. 500 characters</span
                      >
                    </div>
                    <div class="mt-1">
                      <Field v-slot="{ field, errorMessage }" name="message">
                        <textarea
                          id="message"
                          aria-describedby="message-max"
                          class="block w-full rounded-md border-neutral-300 px-4 py-3 shadow-sm focus:border-brand focus:ring-brand dark:bg-neutral-200"
                          placeholder="Send Us a Message...."
                          rows="4"
                          v-bind="field"
                        />
                        <ErrorMessage class="red-700" name="message" />
                      </Field>
                    </div>
                  </div>
                  <div class="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      class="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-6 py-2 text-base font-medium uppercase tracking-wider text-white shadow-sm hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:w-auto"
                      type="submit"
                    >
                      {{ loading ? 'Submitting....' : 'Submit' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Notification
      :show="isShown"
      message1="Your Message has been submitted"
      message2="Someone from our team will get back to you shortly"
    />
  </div>
</template>
