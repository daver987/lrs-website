import { format } from 'date-fns'

export function useFormattedDate(timestamp: number | null | undefined): string {
  if (!timestamp) {
    return ''
  }
  const date = new Date(timestamp)
  return format(date, 'MMMM dd, yyyy')
}

export function useFormattedTime(timestamp: number | null | undefined): string {
  if (!timestamp) {
    return ''
  }
  const date = new Date(timestamp)
  return format(date, 'hh:mm a')
}
