<script lang="ts" setup>
const colorMode = useColorMode()
const color = colorMode.value
</script>

<template>
  <div class="mx-auto w-full max-w-sm lg:w-96">
    <div v-if="color === 'dark'">
      <NuxtLink to="/">
        <NuxtPicture
          :img-attrs="{ class: 'w-auto h-16' }"
          :alt="useAppConfig().brand.name"
          :src="
            useAppConfig().brand.assets.logo.dark ||
            useAppConfig().brand.assets.logo.light
          "
          width="1920"
        />
      </NuxtLink>
      <h2
        class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200"
      >
        Create account
      </h2>
    </div>

    <div v-if="color !== 'dark'">
      <NuxtLink to="/">
        <NuxtPicture
          :img-attrs="{
            class: 'w-auto h-16',
          }"
          :alt="useAppConfig().brand.name"
          :src="useAppConfig().brand.assets.logo.light"
          width="1920"
        />
      </NuxtLink>
      <h2
        class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200"
      >
        Sign up for an account
      </h2>
    </div>

    <div class="mt-8">
      <div class="mt-6">
        <form class="space-y-6" action="#" method="POST">
          <InputText
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
            type="text"
          />
          <InputText
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            type="text"
          />
          <InputText
            label="Email"
            name="email"
            placeholder="Enter Email"
            type="email"
          />
          <InputText
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            type="tel"
          />
          <InputText
            autocomplete="new-password"
            label="Password"
            name="password"
            placeholder="Enter Password"
            required=""
            type="password"
          />
          <InputText
            autocomplete="new-password"
            label="Confirm Password"
            name="confirm-password"
            placeholder="Confirm Password"
            required=""
            type="password"
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label
                class="ml-2 block text-sm text-gray-900 dark:text-gray-200"
                for="remember-me"
                >Remember me</label
              >
            </div>

            <div class="text-sm">
              <NuxtLink
                class="font-medium text-brand-600 hover:text-brand"
                to="/signin"
                >Back To Sign In
              </NuxtLink>
            </div>
          </div>

          <div>
            <button
              class="flex w-full justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
