// helpers/loadGoogleMaps.ts
let isGoogleMapsLoaded = false
// const mapsKey = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY

const loadGoogleMaps = async (): Promise<void> => {
  if (isGoogleMapsLoaded) return

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDJJhVTuoRoXVJA6VvmltFvUCIqvVpRZSA&libraries=places`
  script.async = true
  script.defer = true

  document.head.appendChild(script)

  // Wait for the script to load
  await new Promise<void>((resolve) => {
    script.onload = () => {
      isGoogleMapsLoaded = true
      resolve()
    }
  })
}

export default loadGoogleMaps
