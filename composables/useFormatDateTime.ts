import { Ref } from 'vue'

export function useFormatDateTime() {
  type FormatDateOptions = {
    year?: 'numeric' | '2-digit'
    month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
    day?: 'numeric' | '2-digit'
    hour?: 'numeric' | '2-digit'
    minute?: 'numeric' | '2-digit'
    hour12?: boolean
  }

  function coerceStringToNumber(ts: string | number) {
    if (typeof ts === 'string') {
      return parseInt(ts)
    } else {
      return ts
    }
  }

  const formatDateTime = (date: Date, options: FormatDateOptions): string => {
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  const formattedDate = (date: string | number) => {
    return formatDateTime(new Date(coerceStringToNumber(date)), {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })
  }

  const formattedTime = (time: number | string) => {
    return formatDateTime(new Date(coerceStringToNumber(time)), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }
  return {
    formattedTime,
    formattedDate,
  }
}
