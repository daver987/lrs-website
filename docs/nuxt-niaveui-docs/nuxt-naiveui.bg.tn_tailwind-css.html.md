---
url: "https://nuxt-naiveui.bg.tn/tailwind-css.html"
title: "Tailwind CSS | Nuxt Naive UI"
---

[Skip to content](https://nuxt-naiveui.bg.tn/tailwind-css.html#VPContent)

Return to top

# Tailwind CSS [​](https://nuxt-naiveui.bg.tn/tailwind-css.html\#tailwind-css)

The module provides friendly TailwindCSS integration by resolving potential style conflicts. Please make sure to install the [Nuxt Tailwind](https://tailwindcss.nuxtjs.org/) module.

#### Theme [​](https://nuxt-naiveui.bg.tn/tailwind-css.html\#theme)

ts

```
import colors from "tailwindcss/colors";

export default defineNuxtConfig({
  naiveui: {
    themeConfig: {
      light: {
        common: {
          primaryColor: colors.blue[600],
          primaryColorHover: colors.blue[500],
          primaryColorPressed: colors.blue[700],
        },
      },
      dark: {
        common: {
          primaryColor: colors.blue[500],
          primaryColorHover: colors.blue[400],
          primaryColorPressed: colors.blue[600],
        },
      },
    },
  },
});
```

#### ColorMode [​](https://nuxt-naiveui.bg.tn/tailwind-css.html\#colormode)

ts

```
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Config>{
  darkMode: "class",
};
```