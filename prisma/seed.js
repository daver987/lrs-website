// Minimal seed script for local/dev DB
// Populates Vehicles, Services, LineItems, SalesTax for quote form options
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedVehicles() {
  const count = await prisma.vehicle.count()
  if (count > 0) return { skipped: true }

  await prisma.vehicle.createMany({
    data: [
      {
        label: 'Sedan',
        max_passengers: 3,
        max_luggage: 3,
        per_km: 2.5,
        per_hour: 65,
        min_hours: 2,
        min_distance: 0,
        min_rate: 130,
        is_active: true,
        vehicle_image: '/images/vehicles/sedan.jpg',
      },
      {
        label: 'SUV',
        max_passengers: 6,
        max_luggage: 6,
        per_km: 3.2,
        per_hour: 85,
        min_hours: 2,
        min_distance: 0,
        min_rate: 170,
        is_active: true,
        vehicle_image: '/images/vehicles/suv.jpg',
      },
      {
        label: 'Sprinter',
        max_passengers: 12,
        max_luggage: 10,
        per_km: 4.5,
        per_hour: 125,
        min_hours: 3,
        min_distance: 0,
        min_rate: 375,
        is_active: true,
        vehicle_image: '/images/vehicles/sprinter.jpg',
      },
    ],
    skipDuplicates: true,
  })
  return { created: 3 }
}

async function seedServices() {
  const count = await prisma.service.count()
  if (count > 0) return { skipped: true }

  await prisma.service.createMany({
    data: [
      { label: 'Point to Point', is_active: true, is_hourly: false },
      { label: 'Airport Transfer', is_active: true, is_hourly: false },
      { label: 'Hourly Charter', is_active: true, is_hourly: true },
    ],
    skipDuplicates: true,
  })
  return { created: 3 }
}

async function seedLineItems() {
  const count = await prisma.lineItem.count()
  if (count > 0) return { skipped: true }

  await prisma.lineItem.createMany({
    data: [
      {
        item_number: 1001,
        label: 'Gratuity',
        description: 'Suggested gratuity (20%)',
        is_percentage: true,
        is_taxable: false,
        is_active: true,
        amount: 0.2,
        applies_to: 'subtotal',
      },
      {
        item_number: 1002,
        label: 'Fuel Surcharge',
        description: 'Fuel surcharge',
        is_percentage: false,
        is_taxable: true,
        is_active: true,
        amount: 5,
        applies_to: 'trip',
      },
      {
        item_number: 1003,
        label: 'Airport Fee',
        description: 'Airport/concession fee',
        is_percentage: false,
        is_taxable: true,
        is_active: true,
        amount: 10,
        applies_to: 'trip',
      },
    ],
    skipDuplicates: true,
  })
  return { created: 3 }
}

async function seedSalesTax() {
  const count = await prisma.salesTax.count()
  if (count > 0) return { skipped: true }

  // First record will have tax_number = 1 (autoincrement)
  await prisma.salesTax.create({
    data: {
      tax_name: 'Default Sales Tax',
      amount: 0.08875,
      region: 'NY',
      is_active: true,
    },
  })
  return { created: 1 }
}

async function main() {
  const results = {}
  results.vehicles = await seedVehicles()
  results.services = await seedServices()
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
