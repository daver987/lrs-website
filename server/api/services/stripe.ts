import { Stripe } from 'stripe'
import { stripe } from './stripeInit'

export interface CreateCustomerParams {
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  id: string
}

export async function createCustomer(quote: {
  user: CreateCustomerParams
}): Promise<Stripe.Customer> {
  const { first_name, last_name, email_address, phone_number, id } = quote.user

  return await stripe.customers.create({
    email: email_address,
    name: `${first_name} ${last_name}`,
    phone: phone_number,
    metadata: {
      id,
    },
  })
}

export async function createCheckoutSession(
  quote: { quote_number: number },
  stripeCustomerId: string,
  WEBSITE_URL: string
): Promise<Stripe.Checkout.Session> {
  const { quote_number } = quote
  return await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    mode: 'setup',
    setup_intent_data: {
      metadata: {
        quote_number,
      },
    },
    success_url: `${WEBSITE_URL}/success?quote_number=${quote_number}`,
    cancel_url: `${WEBSITE_URL}/cancel`,
  })
}

export async function createSetupIntent(
  quote: { quote_number: number },
  stripeCustomerId: string
): Promise<Stripe.SetupIntent> {
  const { quote_number } = quote
  return await stripe.setupIntents.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    metadata: {
      quoteNumber: quote_number,
    },
  })
}

interface GetCustomerByEmailParams {
  email: string
}

export async function getCustomerByEmail({
  email,
}: GetCustomerByEmailParams): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({ email: email })

  if (customers.data.length > 0) {
    return customers.data[0]
  }

  return null
}

// export async function confirmPayment({
//   sessionId,
//   paymentMethodId,
// }: ConfirmPaymentParams): Promise<any> {
//   const paymentIntent = await stripe.paymentIntents.create({
//     payment_method: paymentMethodId,
//     payment_method_types: ['card'],
//     amount: 1000,
//     currency: 'cad',
//     confirmation_method: 'manual',
//     confirm: true,
//     setup_future_usage: 'off_session',
//     customer: customerId,
//     metadata: {
//       quote_number,
//       user_id,
//     },
//   })
//
//   return paymentIntent
// }
