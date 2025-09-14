export function useBrandifyText(input: string | undefined | null): string {
  if (!input) return ''
  const { brand } = useAppConfig()
  const name = brand?.name || ''
  if (!name) return input
  // Handle possessive and plain name
  const possessivePattern = /High Park Livery's/g
  const namePattern = /High Park Livery/g
  return input
    .replace(possessivePattern, `${name}'s`)
    .replace(namePattern, name)
}
