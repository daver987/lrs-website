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
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) throw new Error('User not found')

  if (user.stripe_customer_id) {
    return user.stripe_customer_id
  }

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
// export const handleInvoicePaid = async ({
//   event,
//   stripe,
//   prisma,
// }: {
//   event: Stripe.Event
//   stripe: Stripe
//   prisma: PrismaClient
// }) => {
//   const invoice = event.data.object as Stripe.Invoice
//   const subscriptionId = invoice.subscription
//   const subscription = await stripe.subscriptions.retrieve(
//     subscriptionId as string
//   )
//   const userId = subscription.metadata.userId
//
//   // update user with subscription data
//   await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       stripeSubscriptionId: subscription.id,
//       stripeSubscriptionStatus: subscription.status,
//     },
//   })
// }
