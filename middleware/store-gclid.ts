export default defineNuxtRouteMiddleware((to, from) => {
  const route = useRoute()
  const gclid = route.query.gclid
  if (gclid) {
    const gclidCookie = useCookie('gclid', { maxAge: 30 * 24 * 60 * 60 })
    gclidCookie.value = gclid as string
  }
})
