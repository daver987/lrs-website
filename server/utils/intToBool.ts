export function convertIntToBoolean(
  row,
  exclude: string[] = [],
  enabled = true
) {
  if (!enabled) return row

  const newRow = { ...row }
  Object.keys(newRow).forEach((col) => {
    if (!exclude.includes(col)) {
      if (newRow[col] === 1) {
        newRow[col] = true
      } else if (newRow[col] === 0) {
        newRow[col] = false
      }
    }
  })
  return newRow
}
