interface LineItem {
  label: string
  tax: number
  total: number
}

interface Trip {
  line_items_list: LineItem[]
}

interface Quote {
  trips: Trip[]
}

interface LineItem {
  label: string
  tax: number
  total: number
}

interface Trip {
  line_items_list: LineItem[]
}

interface Quote {
  trips: Trip[]
}

export function combineLineItemsTwo(quote: Quote): LineItem[] {
  const combinedItems: { [label: string]: LineItem } = {}

  // Iterate through the line_items_list of the first trip
  for (const item of quote.trips[0].line_items_list) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
      combinedItems[item.label].tax += item.tax
    }
  }

  // If the second trip exists, iterate through its line_items_list
  if (quote.trips[1]) {
    for (const item of quote.trips[1].line_items_list) {
      if (!combinedItems[item.label]) {
        combinedItems[item.label] = { ...item }
      } else {
        combinedItems[item.label].total += item.total
        combinedItems[item.label].tax += item.tax
      }
    }
  }

  // Calculate the total amount and tax
  let totalAmount = 0
  let totalTax = 0
  for (const item of Object.values(combinedItems)) {
    totalAmount += item.total
    totalTax += item.tax
  }

  // Add the Tax and Total Amount objects to the array
  const result = Object.values(combinedItems)
  result.push({ label: 'HST', total: totalTax, tax: totalTax })
  result.push({ label: 'Total', total: totalAmount + totalTax, tax: 0 })

  return result
}

export function combineLineItems(lineItems: LineItem[]): LineItem[] {
  const combinedItems: { [label: string]: LineItem } = {}

  // Iterate through the line_items_list
  for (const item of lineItems) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
      combinedItems[item.label].tax += item.tax
    }
  }

  // Calculate the total amount and tax
  let totalAmount = 0
  let totalTax = 0
  for (const item of Object.values(combinedItems)) {
    totalAmount += item.total
    totalTax += item.tax
  }

  // Add the Tax and Total Amount objects to the array
  const result = Object.values(combinedItems)
  result.push({
    label: 'HST',
    total: parseFloat(totalTax.toFixed(2)),
    tax: parseFloat(totalTax.toFixed(2)),
  })
  result.push({
    label: 'Total',
    total: parseFloat((totalAmount + totalTax).toFixed(2)),
    tax: 0,
  })

  return result
}

export function combineTwoLineItems(
  lineItems1: LineItem[],
  lineItems2: LineItem[]
): LineItem[] {
  const combinedItems: { [label: string]: LineItem } = {}

  // Iterate through the first line items array
  for (const item of lineItems1) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
      combinedItems[item.label].tax += item.tax
    }
  }

  // Iterate through the second line items array
  for (const item of lineItems2) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
      combinedItems[item.label].tax += item.tax
    }
  }

  // Convert the combinedItems object back to an array
  return Object.values(combinedItems)
}
