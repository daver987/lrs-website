---
url: "https://nuxt-naiveui.bg.tn/components/naive-layout-navbar.html"
title: "NaiveLayoutNavbar | Nuxt Naive UI"
---

[Skip to content](https://nuxt-naiveui.bg.tn/components/naive-layout-navbar.html#VPContent)

Return to top

# NaiveLayoutNavbar [​](https://nuxt-naiveui.bg.tn/components/naive-layout-navbar.html\#naivelayoutnavbar)

This component can be used for page layout with navbar. It's based on `naive-ui` [layout](https://www.naiveui.com/en-US/os-theme/components/layout).

ts

```
interface MenuLinkRoute {
  label: string;
  icon?: string;
  to?: RouteLocationRaw;
  children?: MenuLinkRoute[];
}
```

### Props [​](https://nuxt-naiveui.bg.tn/components/naive-layout-navbar.html\#props)

| **Name** | **Type** | **Default** | **Note** |
| --- | --- | --- | --- |
| nativeScrollbar | boolean | false |  |
| routes | MenuLinkRoute | \[ \] | The routes for the navbar |
| drawerRoutes | MenuLinkRoute | \[ \] | The routes for the drawer |
| drawerClosable | boolean | true | Whether the drawer content is closable |
| drawerWidth | string \| number | 100% |  |
| drawerPlacement | top \| right \| bottom \| left | left |  |
| toggleIcon | string | `ph:equals` |  |
| togglePlacement | right \| left | right |  |
| header | LayoutHeaderProps |  | Passed to `n-layout-header`, [docs](https://www.naiveui.com/en-US/dark/components/layout#Layout-Header-Props) |

### Slots [​](https://nuxt-naiveui.bg.tn/components/naive-layout-navbar.html\#slots)

- `start`, placed at the left-side of navbar.
- `end`, placed at the right-side of navbar.
- `drawer-header`, placed at the top of the drawer.
- `drawer-footer`, placed at the bottom of the drawer.
- `default`, the content of the page.