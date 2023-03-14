interface LineItem {
  label: string
  total: string
  tax: string
}

interface Totals {
  line_items_tax: number
  line_items_subtotal: number
  line_items_total: number
}

export function combineLineItems(lineItems: any): LineItem[] {
  const combinedLineItems = lineItems.reduce(
    (acc: { label: string; total: string; tax: string }[], curr: any) => {
      curr.line_items_list.forEach((lineItem: LineItem) => {
        const index = acc.findIndex((item) => item.label === lineItem.label)
        if (index >= 0) {
          acc[index].total = (+acc[index].total + +lineItem.total).toFixed(2)
          acc[index].tax = (+acc[index].tax + +lineItem.tax).toFixed(2)
        } else {
          acc.push({
            label: lineItem.label,
            total: lineItem.total,
            tax: lineItem.tax,
          })
        }
      })
      return acc
    },
    []
  )

  return combinedLineItems.map((lineItem: LineItem) => {
    lineItem.total = parseFloat(lineItem.total).toFixed(2)
    lineItem.tax = parseFloat(lineItem.tax).toFixed(2)
    return lineItem
  })
}

export function combineTotals(totals: Array<Totals>): Totals {
  const combinedTotals = totals.reduce<Totals>(
    (acc, curr) => {
      acc.line_items_tax += curr.line_items_tax
      acc.line_items_subtotal += curr.line_items_subtotal
      acc.line_items_total += curr.line_items_total
      return acc
    },
    { line_items_tax: 0, line_items_subtotal: 0, line_items_total: 0 }
  )

  return Object.entries(combinedTotals).reduce<Totals>(
    (acc, [key, value]) => {
      acc[key as keyof Totals] = value.toFixed(2)
      return acc
    },
    { line_items_tax: 0, line_items_subtotal: 0, line_items_total: 0 }
  )
}
