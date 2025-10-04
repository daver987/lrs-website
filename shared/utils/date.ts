export function parseTimeString(timeStr: string) {
  const hoursRegex = /(\d+)\s*hour(s)?/
  const minsRegex = /(\d+)\s*min(s)?/

  const hoursMatch = timeStr.match(hoursRegex)
  const minsMatch = timeStr.match(minsRegex)

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0
  const minutes = minsMatch ? parseInt(minsMatch[1], 10) : 0

  return { hours, minutes }
}

type DateAndTime = [
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
]

function parseMonth(monthStr: string) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const index = monthNames.findIndex((month) => month === monthStr)

  return index === -1 ? null : index + 1
}

export function parseDateTime(dateStr: string, timeStr: string): DateAndTime {
  const dateParts = dateStr.split(' ')
  const year = parseInt(dateParts[2], 10)
  const month = parseMonth(dateParts[0]) as number
  const day = parseInt(dateParts[1].slice(0, -1), 10)

  const timeParts = timeStr.split(':')
  const hours = parseInt(timeParts[0], 10)
  const minutes = parseInt(timeParts[1].split(' ')[0], 10)
  const amPm = timeParts[1].split(' ')[1]

  const adjustedHours =
    amPm === 'PM' && hours !== 12
      ? hours + 12
      : hours === 12 && amPm === 'AM'
        ? 0
        : hours

  return [year, month, day, adjustedHours, minutes]
}
