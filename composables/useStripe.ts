import { ref } from '#imports'
import type { Ref } from 'vue'
import {
  Stripe,
  StripeElements,
  StripeLinkAuthenticationElement,
  StripePaymentElement,
  StripePaymentRequestButtonElement,
} from '@stripe/stripe-js'
import { useNuxtApp } from '#app'

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#9f6c27',
    colorBackground: '#ffffff',
    colorText: '#222222',
    colorDanger: '#df1b41',
    fontFamily: 'Inter Var, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  },
} as const

export function useStripe() {
  const { $stripe } = useNuxtApp()
  const paymentElement: Ref<HTMLElement | null> = ref(null)
  const linkAuthenticationElement: Ref<HTMLElement | null> = ref(null)
  const messageElement: Ref<HTMLElement | null> = ref(null)
  const paymentRequest: Ref<HTMLElement | null> = ref(null)
  const fullName: Ref<string> = ref('')
  const emailAddress: Ref<string> = ref('')
  const phoneNumber: Ref<string> = ref('')
  const quoteNumber: Ref<number> = ref(0)
  const websiteURL: Ref<string> = ref('')
  const isLoading: Ref<boolean> = ref(false)
  const publicKey: Ref<string> = ref('')
  const clientSecret: Ref<string> = ref('')

  let stripePaymentElement: StripePaymentElement | null
  let stripeLinkAuthenticationElement: StripeLinkAuthenticationElement | null
  let stripePaymentRequest: StripePaymentRequestButtonElement | null
  let stripe: Stripe | null
  let elements: StripeElements

  const initStripePaymentRequestButton = async (amountInCents: number) => {
    return $stripe?.paymentRequest({
      country: 'CA',
      currency: 'cad',
      total: {
        label: 'Total',
        amount: amountInCents,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    })
  }

  const initStripeElements = async () => {
    stripe = $stripe
    elements = stripe!.elements({
      clientSecret: clientSecret.value,
      appearance,
    })
    stripePaymentElement = elements.create('payment', {
      defaultValues: {
        billingDetails: {
          name: fullName.value,
          email: emailAddress.value,
          phone: phoneNumber.value,
        },
      },
    })
    stripePaymentElement.mount(paymentElement.value!)
    stripeLinkAuthenticationElement = elements.create('linkAuthentication', {
      defaultValues: {
        email: emailAddress.value,
      },
    })
    stripeLinkAuthenticationElement.mount(linkAuthenticationElement.value!)
  }

  const submitHandler = async () => {
    isLoading.value = true
    if (!stripe || !elements) {
      console.error('Stripe is not initialized.')
      return
    }
    try {
      const { error } = await stripe.confirmSetup({
        elements: elements,
        confirmParams: {
          return_url: `${websiteURL.value}/success?quote_number=${quoteNumber.value}`,
        },
      })
      if (error) {
        console.error('Stripe error:', error)
        // Display the error to the user, consider using a UI component to show the error
      }
      return { success: 200 }
    } catch (error) {
      console.error('Error during setup confirmation:', error)
      // Handle any other errors during setup confirmation, consider using a UI component to show the error
    } finally {
      isLoading.value = false
    }
  }

  const checkSetupIntent = async (): Promise<void> => {
    if (!stripe) {
      console.error('Stripe is not initialized.')
      return
    }
    try {
      const { setupIntent } = await stripe.retrieveSetupIntent(
        clientSecret.value
      )

      if (!setupIntent) {
        console.error('No setupIntent found.')
        return
      }

      const message = messageElement.value

      switch (setupIntent.status) {
        case 'succeeded':
          if (message) {
            message.innerText = 'Success! Your payment method has been saved.'
          }
          break

        case 'processing':
          if (message) {
            message.innerText =
              "Processing payment details. We'll update you when processing is complete."
          }
          break

        case 'requires_payment_method':
          if (message) {
            message.innerText =
              'Failed to process payment details. Please try another payment method.'
          }
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          break

        default:
          if (message) {
            message.innerText =
              'An unexpected error occurred. Please try again.'
          }
          break
      }
    } catch (error) {
      console.error('Error during setup intent retrieval:', error)
      // Handle any other errors during setup intent retrieval, consider using a UI component to show the error
    }
  }

  return {
    initStripePaymentRequestButton,
    submitHandler,
    initStripeElements,
    checkSetupIntent,
    paymentElement,
    linkAuthenticationElement,
    messageElement,
    fullName,
    emailAddress,
    phoneNumber,
    publicKey,
    isLoading,
    websiteURL,
    quoteNumber,
    clientSecret,
  }
}
