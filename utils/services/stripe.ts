import { Stripe } from 'stripe'
import { PrismaClient, User } from '@prisma/client'

interface GetOrCreateStripCustomer {
  stripe: Stripe
  prisma: PrismaClient
  userId: string
}

interface CreateSetupIntentParams {
  quoteNumber: number
  stripeCustomerId: string
  stripe: Stripe
  prisma: PrismaClient
}

interface GetCustomerByEmailParams {
  stripe: Stripe
  email: string
}

export async function getOrCreateStripCustomerId({
  stripe,
  prisma,
  userId,
}: GetOrCreateStripCustomer): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripe_customer_id: true,
      email_address: true,
      full_name: true,
      phone_number: true,
    },
  })

  if (!user) throw new Error('User not found')

  // create a new customer
  const customer = await stripe.customers.create({
    email: user.email_address ?? undefined,
    name: user.full_name ?? undefined,
    phone: user.phone_number,
    metadata: {
      userId,
    },
  })

  // update with new customer id
  const updatedUser: User = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripe_customer_id: customer.id,
    },
  })

  if (updatedUser.stripe_customer_id) {
    return updatedUser.stripe_customer_id
  } else {
    throw new Error('Failed to update user with Stripe customer ID')
  }
}

export async function createSetupIntent({
  quoteNumber,
  stripeCustomerId,
  stripe,
  prisma,
}: CreateSetupIntentParams): Promise<Stripe.SetupIntent> {
  if (!stripeCustomerId) {
    throw new Error('Stripe customer ID is required')
  }

  if (!quoteNumber || typeof quoteNumber !== 'number') {
    throw new Error('Quote number is invalid')
  }

  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      metadata: {
        quoteNumber: quoteNumber,
      },
    })

    const quote = await prisma.quote.findUnique({
      where: { quote_number: quoteNumber },
      include: { trips: true },
    })

    if (!quote) {
      throw new Error('Quote not found')
    }

    for (const trip of quote.trips) {
      await prisma.payment.upsert({
        where: {
          trip_id: trip.id,
        },
        update: {
          setup_intent: JSON.stringify(setupIntent),
          trip: {
            connect: { id: trip.id },
          },
        },
        create: {
          setup_intent: JSON.stringify(setupIntent),
          trip: {
            connect: { id: trip.id },
          },
        },
      })
    }
    return setupIntent
  } catch (error) {
    console.error('Error creating setup intent:', error)
    throw new Error('Failed to create setup intent')
  }
}

export async function getCustomerByEmail({
  stripe,
  email,
}: GetCustomerByEmailParams): Promise<Stripe.Customer | null> {
  if (!email) {
    throw new Error('Email is required')
  }

  const customers = await stripe.customers.list({ email: email })

  if (customers.data.length > 0) {
    return customers.data[0]
  }

  return null
}

const taxRateId = 'txr_1MWuVFEm9nnVhePIlujaVvBo'
const fuelSurcharge = 'prod_NlYJ2HAaYwGg6U'
const gratuity = 'prod_NlYIBCyMFKGpTP'
const airportFee = 'prod_NlYJgktjL9N1iB'

const pointToPoint = {
  standardSuv: 'prod_NlYDJcWdMZRPSt',
  premiumSuv: 'prod_NlYBOvskEn5KZC',
  standardSedan: 'prod_NlYEjQB3uaMLB2',
  premiumSedan: 'prod_NlYGoDq9BJ6byF',
}
const hourlyAsDirected = {
  standardSuv: 'prod_NlYDx9nK1kFEo8',
  premiumSuv: 'prod_NlYB8FLqnGMaUb',
  standardSedan: 'prod_NlYFA7D3Ciw47P',
  premiumSedan: 'prod_NlYG4s0s2Hq6bG',
}
const fromAirport = {
  standardSuv: 'prod_NlYDXHuYFZVF3m',
  premiumSuv: 'prod_NiKohs3QP756Xt',
  standardSedan: 'prod_NlYF1FnuXpEAS2',
  premiumSedan: 'prod_NlYCYqUCe6Hr1Q',
}
const toAirport = {
  standardSuv: 'prod_NlYECp9qpv5X7U',
  premiumSuv: 'prod_NlYARr96LHsDQn',
  standardSedan: 'prod_NlYF0QwppLL5M7',
  premiumSedan: 'prod_NlYHOQrTrOuxec',
}
async function createPrice(
  amountInCents: number,
  productId: string,
  quoteNumber: number
) {
  const price = await stripe.prices.create({
    billing_scheme: 'per_unit',
    product: productId,
    currency: 'cad',
    unit_amount: amountInCents,
    metadata: {
      quoteNumber: quoteNumber,
    },
  })
  console.log('Stripe Product and Price', price)
  return price
}

// export const handleInvoicePaid = async ({
//   event,
//   stripe,
//   prisma,
// }: {
//   event: Stripe.Event
//   stripe: Stripe
//   prisma: PrismaClient
// }) => {
//   const invoice = event.services.object as Stripe.Invoice
//   const subscriptionId = invoice.subscription
//   const subscription = await stripe.subscriptions.retrieve(
//     subscriptionId as string
//   )
//   const userId = subscription.metadata.userId
//
//   // update user with subscription services
//   await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     services: {
//       stripeSubscriptionId: subscription.id,
//       stripeSubscriptionStatus: subscription.status,
//     },
//   })
// }
