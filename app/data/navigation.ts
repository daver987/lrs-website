export interface NavigationItem {
  name: string
  href: string
  id: number
  categories?: string
}

export const navigation = <NavigationItem[]>[
  {
    name: 'Home',
    href: '/',
    id: 1,
  },
  {
    name: 'Fleet',
    href: '/fleet',
    id: 2,
  },
  {
    name: 'Services',
    href: '/services',
    id: 3,
  },
  {
    name: 'About',
    href: '/about',
    id: 4,
  },
  {
    name: 'Contact',
    href: '/contact',
    id: 5,
  },
]

// Note: Reservations and FAQ links can be re-added once booking features return.
