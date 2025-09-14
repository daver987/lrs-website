import type { DateArray, EventStatus } from 'ics'
import * as ics from 'ics'
import { Buffer } from 'node:buffer'

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

async function createIcsString(event: Event): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    ics.createEvent(event, (error, value) => {
      if (error) {
        reject(error)
      } else {
        resolve(value)
      }
    })
  })
}

async function createIcsBase64(event: Event): Promise<string> {
  const value = await createIcsString(event)
  return Buffer.from(value).toString('base64')
}

async function createIcsBuffer(event: Event): Promise<Buffer> {
  const value = await createIcsString(event)
  return Buffer.from(value)
}

export function useIcsCal() {
  return {
    createIcsFile: createIcsBase64,
    createIcsString,
    createIcsBuffer,
  }
}
