type FormatDateOptions = {
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  hour12?: boolean
}

export const formatDate = (date: Date, options: FormatDateOptions): string => {
  return new Intl.DateTimeFormat('en-US', options).format(date)
}
