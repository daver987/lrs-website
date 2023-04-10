import { loadStripe } from '@stripe/stripe-js'
import { useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
	const publicKey = useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY
	const stripe = async () => {
		return await loadStripe(publicKey)
	}
	return {
		provide: {
			stripe,
		},
	}
})
