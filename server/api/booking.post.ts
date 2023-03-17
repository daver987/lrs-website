// import {
//   createCustomer,
//   createSetupIntent,
//   getCustomerByEmail,
// } from './services/stripe'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  try {
    const prisma = event.context.prisma
    const quote = await readBody(event)
    console.log('Body is read:', quote)
    const { user, trips } = quote
    // Check if the customer exists in Stripe
    let customer = await getCustomerByEmail({ email: user.email_address })
    console.log('Checked Strip Customer:', customer)

    if (!customer) {
      // If the customer does not exist, create a new customer
      customer = await createCustomer(quote)
      console.log('Created Customer:', customer)
    }

    const stripeId = customer.id

    const setupIntent = await createSetupIntent(quote, stripeId)

    const updatedUser = await prisma.user.update({
      where: {
        email_address: quote.user.email_address,
      },
      data: {
        stripe_customer_id: stripeId,
      },
    })
    const createSetup = await prisma.payment.create({
      data: {
        setup_intent: JSON.stringify(setupIntent),
        trip: {
          connect: { id: trips[0].id },
        },
        quote: {
          connect: {
            quote_number: quote.quote_number,
          },
        },
      },
    })
    return { createSetup, updatedUser, setupIntent, customer, statusCode: 200 }
  } catch (err) {
    // Handle any errors that occur
    throw err
  }
})
