import { z } from 'zod'

const directionsSchema = z.object({
  routes: z.array(
    z
      .object({
        legs: z.array(
          z.object({
            distance: z.object({ value: z.number(), text: z.string() }),
            duration: z.object({ value: z.number(), text: z.string() }),
            end_address: z.string(),
            start_address: z.string(),
            start_location: z.object({ lat: z.number(), lng: z.number() }),
            end_location: z.object({ lat: z.number(), lng: z.number() }),
          })
        ),
      })
      .strip()
  ),
})

const config = useRuntimeConfig().public.GOOGLE_MAPS_API_KEY
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { origin, destination } = query
  try {
    const data = await $fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${config}
      `
    )
    const response = directionsSchema.parse(data)
    console.log('Directions Response', response)
    const { value: distanceValue, text: distanceText } =
      response.routes[0].legs[0].distance
    const { value: durationValue, text: durationText } =
      response.routes[0].legs[0].duration
    const { lat: startLat, lng: startLng } =
      response.routes[0].legs[0].start_location
    const { lat: endLat, lng: endLng } = response.routes[0].legs[0].end_location
    return {
      distance_value: distanceValue,
      distance_text: distanceText,
      duration_value: durationValue,
      duration_text: durationText,
      start_lat: startLat,
      start_lng: startLng,
      end_lat: endLat,
      end_lng: endLng,
    }
  } catch (e) {
    console.error(e)
    return {
      distance_value: 0,
      distance_text: 'Unknown',
      duration_value: 0,
      duration_text: 'Unknown',
      start_lat: 0,
      start_lng: 0,
      end_lat: 0,
      end_lng: 0,
    }
  }
})
