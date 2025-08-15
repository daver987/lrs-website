---
url: 'https://nuxt-naiveui.bg.tn/components/naive-navbar.html'
title: 'NaiveNavbar | Nuxt Naive UI'
---

[Skip to content](https://nuxt-naiveui.bg.tn/components/naive-navbar.html#VPContent)

Return to top

# NaiveNavbar [​](https://nuxt-naiveui.bg.tn/components/naive-navbar.html#naivenavbar)

This component provides a responsive navigation bar. It has nested menu items wrapping `NuxtLink` for routing with prefetch.

ts

```
interface MenuLinkRoute {
  label: string;
  icon?: string;
  to?: RouteLocationRaw;
  children?: MenuLinkRoute[];
}
```

Info

`MenuLinkRoute` interface can be imported from `#build/types/naiveui`.

### Props [​](https://nuxt-naiveui.bg.tn/components/naive-navbar.html#props)

| **Name**            | **Type**                       | **Default** | **Note**                                       |
| ------------------- | ------------------------------ | ----------- | ---------------------------------------------- |
| sticky              | boolean                        | true        |                                                |
| routes              | MenuLinkRoute                  | \[ \]       | The routes for menu items                      |
| drawerRoutes        | MenuLinkRoute                  | \[ \]       | Overrides routes in the drawer                 |
| drawerPlacement     | top \| right \| bottom \| left | left        |                                                |
| drawerClosable      | boolean                        | true        | Whether the drawer content is closable         |
| drawerWidth         | string \| number               | 100%        |                                                |
| menuToggleIcon      | string                         | `ph:equals` |                                                |
| menuToggleIconSize  | number \| string               | 26          |                                                |
| menuTogglePlacement | right \| left                  | right       |                                                |
| menuInverted        | boolean                        | false       | Use inverted style                             |
| menuPlacement       | right \| left \| center        | left        | Horizontal menu placement relative to viewport |
| backIcon            | boolean                        | false       | Enable back button on mobile devices           |
| backIconSize        | number \| string               | 26          |                                                |

### Slots [​](https://nuxt-naiveui.bg.tn/components/naive-navbar.html#slots)

- `start`, placed at the left-side of navbar.
- `end`, placed at the right-side of navbar.
- `toggle`, placed instead of the toggle button.
- `drawer-header`, placed at the top of the drawer.
- `drawer-content`, placed at the bottom of the `drawer-header`.
- `drawer-footer`, placed at the bottom of the drawer.
