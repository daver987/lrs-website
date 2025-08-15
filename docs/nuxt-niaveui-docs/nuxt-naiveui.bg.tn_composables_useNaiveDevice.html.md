---
url: "https://nuxt-naiveui.bg.tn/composables/useNaiveDevice.html"
title: "useNaiveDevice | Nuxt Naive UI"
---

[Skip to content](https://nuxt-naiveui.bg.tn/composables/useNaiveDevice.html#VPContent)

Return to top

# useNaiveDevice [​](https://nuxt-naiveui.bg.tn/composables/useNaiveDevice.html\#usenaivedevice)

This universal composable is intended to detect the device type based on the user agent. It can be helpful to lazy load components based on the device type to minimize page load time.

The exposed properties are `isMobileOrTablet` and `isMobile`.

In the case of pre-rendering, it's recommended to be aware of hydration mismatch issues. In such a case, it's recommended to use these global CSS classes `naive-mobile-or-tablet` and `naive-not-mobile-or-tablet` for responsive behavior.