---
url: "https://nuxt-naiveui.bg.tn/upgrades/v2.html"
title: "Upgrade to V2 | Nuxt Naive UI"
---

[Skip to content](https://nuxt-naiveui.bg.tn/upgrades/v2.html#VPContent)

Return to top

# Upgrade to V2 [​](https://nuxt-naiveui.bg.tn/upgrades/v2.html\#upgrade-to-v2)

### ✨ New features [​](https://nuxt-naiveui.bg.tn/upgrades/v2.html\#%E2%9C%A8-new-features)

- Ensure compatibility with Nuxt v4 - [source](https://github.com/becem-gharbi/nuxt-naiveui/commit/d1b7eab).
- Add `generateTailwindColorThemes` utility to generate color themes - [source](https://github.com/becem-gharbi/nuxt-naiveui/commit/3f291b0).

### ⚠️ Breaking changes [​](https://nuxt-naiveui.bg.tn/upgrades/v2.html\#%E2%9A%A0%EF%B8%8F-breaking-changes)

- Rename the utility `generateColorThemes` to `generateAntdColorThemes` \- [source](https://github.com/becem-gharbi/nuxt-naiveui/commit/c5c848d).
- Remove `themeConfig` prop of `NaiveConfig` component - [source](https://github.com/becem-gharbi/nuxt-naiveui/commit/c2a61ba).
- Remove `path` property of `MenuLinkRoute` and `TabbarRoute`, use `to` instead - [source](https://github.com/becem-gharbi/nuxt-naiveui/commit/fff716b).
- Rename the CSS classes `mobileOrTablet` and `notMobileOrTablet` to `naive-mobile-or-tablet` and `naive-not-mobile-or-tablet` \- [source](https://github.com/becem-gharbi/nuxt-naiveui/commit/ba00bbe).
- Disallow theme configuration via `app.config` file - [source](https://github.com/becem-gharbi/nuxt-naiveui/pull/78).