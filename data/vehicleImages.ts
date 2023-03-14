export interface VehicleImages {
  id: number
  vehicleImageAlt: string
  vehicleImageSrc: string
}

export const vehicleImages = <VehicleImages[]>[
  {
    id: 1,
    vehicleImageAlt: 'Standard Sedan',
    vehicleImageSrc: '/images/cadillac-xts-1.png',
  },
  {
    id: 2,
    vehicleImageAlt: 'Premium Sedan',
    vehicleImageSrc: '/images/lincoln-continental-1.png',
  },
  {
    id: 3,
    vehicleImageAlt: 'Standard SUV',
    vehicleImageSrc: '/images/suburban.png',
  },
  {
    id: 4,
    vehicleImageAlt: 'Premium SUV',
    vehicleImageSrc: '/images/lincoln-navigator-6.png',
  },
]
