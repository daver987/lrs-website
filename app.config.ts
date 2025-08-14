export default defineAppConfig({
  brand: {
    slug: 'hpl',
    name: 'High Park Livery',
    legalName: 'High Park Livery Inc.',
    domain: 'https://highparklivery.com',
    contact: {
      email: 'info@highparklivery.com',
      phoneE164: '+16473609631',
      phoneDisplay: '647.360.9631',
    },
    orderPrefix: 'HPL',
    assets: {
      logo: {
        light: '/images/HPL-Logo-White.png',
        dark: '/images/hpl-logo-dark.png',
      },
      favicon: '/favicon.ico',
      images: {
        heroBackground: '/images/gradient-background.svg',
        fleetBackground: '/images/premium_suv-1.jpg',
      },
    },
    seo: {
      title: 'High Park Livery - Premium Black Car Service in Greater Toronto',
      description:
        'High Park Livery offers top-quality black car services in the Greater Toronto Area. Book a ride for airport transfers, corporate travel, or special events.',
      ogImage: '/images/HPL-Logo-White.png',
      twitterImage: '/images/HPL-Logo-White.png',
    },
    ui: {
      colors: {
        brand: {
          50: '#F7F2EE',
          100: '#EEE5DD',
          200: '#DECCBA',
          300: '#CDB398',
          400: '#BD9975',
          DEFAULT: '#A57C52',
          600: '#8A6642',
          700: '#674D32',
          800: '#453321',
          900: '#221A11',
        },
      },
    },
  },
})
