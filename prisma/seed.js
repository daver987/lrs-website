// Minimal seed script for local/dev DB
// Populates Vehicles, Services, LineItems, SalesTax for quote form options
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedVehicles() {
  // Clear existing
  await prisma.vehicle.deleteMany({})

  await prisma.vehicle.createMany({
    data: [
      {
        label: 'Luxury Sedan',
        max_passengers: 3,
        max_luggage: 3,
        per_km: 1.7,
        per_hour: 80,
        min_hours: 2,
        min_distance: 25, // base rule aligns with 25km minimum
        min_rate: 0,
        is_active: true,
        vehicle_image: '/images/standard_sedan-4.jpg',
      },
      {
        label: 'Luxury SUV',
        max_passengers: 6,
        max_luggage: 6,
        per_km: 2.1,
        per_hour: 105,
        min_hours: 2,
        min_distance: 25,
        min_rate: 0,
        is_active: true,
        vehicle_image: '/images/premium_suv-1.jpg',
      },
    ],
    skipDuplicates: true,
  })
  return { created: 2 }
}

async function seedServices() {
  await prisma.service.deleteMany({})
  await prisma.service.createMany({
    data: [
      { label: 'Point-to-Point', is_active: true, is_hourly: false }, // service_number 1
      { label: 'To Airport', is_active: true, is_hourly: false }, // service_number 2
      { label: 'From Airport', is_active: true, is_hourly: false }, // service_number 3
      { label: 'Hourly / As Directed', is_active: true, is_hourly: true }, // service_number 4
    ],
    skipDuplicates: true,
  })
  return { created: 4 }
}

async function seedLineItems() {
  await prisma.lineItem.deleteMany({})
  await prisma.lineItem.createMany({
    data: [
      {
        item_number: 2001,
        label: 'Gratuity',
        description: 'Suggested gratuity (20%)',
        is_percentage: true,
        is_taxable: false, // gratuity not taxable
        is_active: true,
        amount: 20, // percent
        applies_to: 'base',
      },
      {
        item_number: 2002,
        label: 'Fuel Surcharge',
        description: 'Fuel surcharge (8%)',
        is_percentage: true,
        is_taxable: true,
        is_active: true,
        amount: 8, // percent
        applies_to: 'base',
      },
    ],
    skipDuplicates: true,
  })
  return { created: 2 }
}

async function seedSalesTax() {
  await prisma.salesTax.deleteMany({})
  await prisma.salesTax.create({
    data: {
      tax_name: 'HST',
      amount: 13, // percent
      region: 'ON',
      is_active: true,
    },
  })
  return { created: 1 }
}

async function main() {
  const results = {}
  results.services = await seedServices()
  results.vehicles = await seedVehicles()
  results.lineItems = await seedLineItems()
  results.salesTax = await seedSalesTax()
  // eslint-disable-next-line no-console
  console.log('[prisma:seed]', results)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
