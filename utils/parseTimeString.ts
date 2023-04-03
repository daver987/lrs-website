export function parseTimeString(timeStr: string) {
  const hoursRegex = /(\d+)\s*hour(s)?/
  const minsRegex = /(\d+)\s*min(s)?/

  let hoursMatch = timeStr.match(hoursRegex)
  let minsMatch = timeStr.match(minsRegex)

  let hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0
  let minutes = minsMatch ? parseInt(minsMatch[1], 10) : 0

  return { hours, minutes }
}

type DateAndTime = [
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number
]

export function parseDateTime(dateStr: string, timeStr: string): DateAndTime {
  const combinedDateTimeStr = `${dateStr} ${timeStr}`
  const dateTime = new Date(combinedDateTimeStr)

  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1 // Months are zero-based in JavaScript
  const day = dateTime.getDate()
  const hours = dateTime.getHours() // Returns hours in 0-23 format
  const minutes = dateTime.getMinutes()

  return [year, month, day, hours, minutes]
}
