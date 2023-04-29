export function convertDurationToHoursAndMinutes(
  durationInSeconds: number | null
): {
  hours: number
  minutes: number
} {
  if (typeof durationInSeconds === 'number') {
    const hours = Math.floor(durationInSeconds / 3600)
    const minutes = Math.floor((durationInSeconds % 3600) / 60)
    return { hours, minutes }
  } else {
    throw new Error('Oops you did not pass in a number')
  }
}

type DateAndTime = [
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number
]
export function combineDateAndTime(
  dateTimestamp: number,
  timeTimestamp: number
): DateAndTime {
  const date = new Date(dateTimestamp)
  const time = new Date(timeTimestamp)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = time.getHours()
  const minutes = time.getMinutes()

  return [year, month, day, hours, minutes]
}
