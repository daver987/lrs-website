---
url: "https://nuxt-naiveui.bg.tn/get-started/setup.html"
title: "Setup | Nuxt Naive UI"
---

[Skip to content](https://nuxt-naiveui.bg.tn/get-started/setup.html#VPContent)

Return to top

# Setup [​](https://nuxt-naiveui.bg.tn/get-started/setup.html\#setup)

Add `@bg-dev/nuxt-naiveui` dependency to your project:

NPMYarnPNPM

bash

```
npm install @bg-dev/nuxt-naiveui
```

bash

```
yarn add @bg-dev/nuxt-naiveui
```

bash

```
pnpm install @bg-dev/nuxt-naiveui

# Add to `.npmrc` config file

# Option 1 (recommended)
public-hoist-pattern[]=@css-render/vue3-ssr
public-hoist-pattern[]=vueuc
public-hoist-pattern[]=naive-ui

# Option 2
shamefully-hoist=true
```

Add `@bg-dev/nuxt-naiveui` to the `modules` section of `nuxt.config.ts`:

ts

```
export default defineNuxtConfig({
  //
  modules: ["@bg-dev/nuxt-naiveui"],
  //
});
```

Set `NaiveConfig` as root component in `app.vue` and `error.vue`:

vue

```
<template>
  <naive-config>
    <!-- start here -->
  </naive-config>
</template>
```

For client-side-only rendering, the module provides [spa loading templates](https://nuxt.com/docs/api/nuxt-config#spaloadingtemplate) aligned with the current theme colors. This feature can be enabled via `spaLoadingTemplate` config option with the following animations from [SpinKit](https://tobiasahlin.com/spinkit/):

`pulse`, `bar-scale`, `dot-chase`, `dot-scale`, `dot-bounce`, `dot-rotate`, `dot-rotate-scale`, `cube-rotate-scale`, `plane-fold`, `plane-wave`, `plane-rotate`.

ts

```
export default defineNuxtConfig({
  // ...
  naiveui: {
    spaLoadingTemplate: {
      name: "bar-scale",
  },
  // ...
});
```