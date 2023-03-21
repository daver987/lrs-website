type FormatDateOptions = {
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  hour12?: boolean
}

export const formatDateTime = (
  date: Date,
  options: FormatDateOptions
): string => {
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

const formattedDate = (timeStamp: number | string) => {
  if (typeof timeStamp === 'string') {
    formatDateTime(new Date(parseInt(timeStamp)), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  } else {
    formatDateTime(new Date(timeStamp), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }
}

const formatTime = (timeStamp: number | string) => {
  if (typeof timeStamp === 'string') {
    formatDateTime(new Date(parseInt(timeStamp)), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  } else {
    formatDateTime(new Date(timeStamp), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }
}
