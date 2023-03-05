import {
  // createCheckoutSession,
  createCustomer,
  createSetupIntent,
  getCustomerByEmail,
} from './services/stripe'
import { Quote } from './quote.get'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const prisma = event.context.prisma
    const quote = await readBody(event)
    console.log('Body is read:', quote)
    const { user } = quote as Quote
    // Check if the customer exists in Stripe
    let customer = await getCustomerByEmail({ email: user.email_address })
    console.log('Checked Strip Customer:', customer)

    if (!customer) {
      // If the customer does not exist, create a new customer
      customer = await createCustomer(quote as Quote)
      console.log('Created Customer:', customer)
    }

    const stripeId = customer.id

    // Create a checkout session
    // const session = await createCheckoutSession(quote, stripeId, WEBSITE_URL)
    const setupIntent = await createSetupIntent(quote, stripeId)

    // Add the session ID and stripe ID to the user and quotes table
    const update = await prisma.user.update({
      where: {
        email_address: quote.user.email_address,
      },
      data: {
        stripe_customer_id: stripeId,
      },
    })
    const createSetup = await prisma.payment.create({
      data: {
        setup_intent: setupIntent as unknown as Prisma.InputJsonValue,
        quote: {
          connect: {
            quote_number: quote.quote_number,
          },
        },
      },
    })
    // Return the session ID to the client
    return { createSetup, update, setupIntent, customer, statusCode: 200 }
  } catch (err) {
    // Handle any errors that occur
    throw err
  }
})
