export type Option = {
  label: string
  value: number
  isDisabled?: boolean
  max_passengers?: number
}

export function buildPassengerOptions(numPassengers: number): Option[] {
  const options: Option[] = []
  for (let i = 1; i <= numPassengers; i++) {
    options.push({
      label: `${i} Passenger${i > 1 ? 's' : ''}`,
      value: i,
      isDisabled: false,
    })
  }
  return options
}

export function buildHoursOptions(): Option[] {
  const options: Option[] = []
  for (let i = 2; i <= 12; i++) {
    options.push({
      label: `${i} hour${i > 1 ? 's' : ''}`,
      value: i,
    })
  }
  return options
}

export function buildLuggageOptions(numLuggage: number): Option[] {
  const options: Option[] = []
  for (let i = 1; i <= numLuggage; i++) {
    options.push({
      label: `${i} Luggage Bag${i > 1 ? 's' : ''}`,
      value: i,
      isDisabled: false,
    })
  }
  return options
}
