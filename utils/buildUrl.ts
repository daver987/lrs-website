import { ref } from 'vue'

// Get the base URL from an environment variable
const baseURL = useRuntimeConfig().public.WEBSITE_URL

export function buildURL(route: string | number, queryParam: any) {
  const url = ref(baseURL)

  // Add the route to the URL
  url.value! += route

  // If a query parameter is provided, add it to the URL
  if (queryParam) {
    url.value += `?${queryParam}`
  }

  return url
}
