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

export function combineLineItems(quote: Quote): LineItem[] {
  const combinedItems: { [label: string]: LineItem } = {}

  // Iterate through the line_items_list of the first trip
  for (const item of quote.trips[0].line_items_list) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
    }
  }

  // If the second trip exists, iterate through its line_items_list
  if (quote.trips[1]) {
    for (const item of quote.trips[1].line_items_list) {
      if (!combinedItems[item.label]) {
        combinedItems[item.label] = { ...item }
      } else {
        combinedItems[item.label].total += item.total
      }
    }
  }

  // Convert the combinedItems object back to an array
  return Object.values(combinedItems)
}
