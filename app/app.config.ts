export default defineAppConfig({
  brand: {
    slug: 'lrs',
    name: 'Luxury Ride Service',
    legalName: 'Luxury Ride Service',
    domain: 'https://luxuryrideservice.com',
    contact: {
      email: 'booking@luxuryrideservice.com',
      phoneE164: '+16479942424',
      phoneDisplay: '647.994.2424',
    },
    orderPrefix: 'LRS',
    assets: {
      logo: {
        light: '/images/Luxury-Ride-Service-Logo.png',
        dark: '/images/Luxury-Ride-Service-Logo.png',
      },
      favicon: '/favicon.ico',
      images: {
        heroBackground: '/images/gradient-background.svg',
        fleetBackground: '/images/gradient-background.svg',
      },
    },
    seo: {
      title: 'Luxury Ride Service - Premium Chauffeured Transportation',
      description:
        'Luxury Ride Service delivers elevated black car and chauffeur experiences for airport transfers, corporate travel, and special occasions across the Greater Toronto and Hamilton Area.',
      ogImage: '/images/Luxury-Ride-Service-Logo.png',
      twitterImage: '/images/Luxury-Ride-Service-Logo.png',
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
  features: {
    ecommerceEnabled: false,
    useMockCatalog: true,
  },
})
