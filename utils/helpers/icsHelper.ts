import { DateArray, EventStatus } from 'ics'
import * as ics from 'ics'
import { Ref, ref } from 'vue'

interface Attendee {
  name: string
  email: string
  rsvp?: boolean
}

interface Event {
  start: DateArray
  duration: { hours: number; minutes: number }
  title: string
  description: string
  location: string
  url: string
  geo: { lat: number; lon: number }
  status?: EventStatus
  organizer?: { name: string; email: string }
}

export function useIcsCal() {
  const eventStart: Ref<DateArray | null> = ref(null)
  const eventDuration: Ref<{ hours: number; minutes: number } | null> =
    ref(null)
  const eventTitle: Ref<string> = ref('')
  const pickupLocation: Ref<string> = ref('')
  const geo: Ref<{ lat: number; lon: number } | null> = ref(null)
  const url: Ref<string> = ref('')
  const organizer: Ref<{ name: string; email: string } | null> = ref(null)
  const status: Ref<EventStatus | null> = ref(null)
  const clientName = ref('')

  async function createIcsFile(event: Event): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      ics.createEvent(event, (error, value) => {
        if (error) {
          reject(error)
        } else {
          const base64Ics = Buffer.from(value).toString('base64')
          resolve(base64Ics)
        }
      })
    })
  }

  return {
    eventStart,
    eventDuration,
    eventTitle,
    pickupLocation,
    geo,
    url,
    organizer,
    status,
    clientName,
    createIcsFile,
  }
}
