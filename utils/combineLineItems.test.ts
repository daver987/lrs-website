// Import the function to test
import { combineLineItemsTwo } from '~/utils/combineLineItems'
import { expect, describe, it } from 'vitest'

// Test suite for combineLineItems function
describe('combineLineItems', () => {
  it('should combine line items correctly when there is only one trip', () => {
    const quote = {
      trips: [
        {
          line_items_list: [
            { label: 'Base Rate', tax: 10, total: 100 },
            { label: 'Gratuity', tax: 0, total: 25 },
            { label: 'Fuel Surcharge', tax: 1, total: 10 },
          ],
        },
      ],
    }

    const expectedResult = [
      { label: 'Base Rate', tax: 10, total: 100 },
      { label: 'Gratuity', tax: 0, total: 25 },
      { label: 'Fuel Surcharge', tax: 1, total: 10 },
      { label: 'Total Amount', tax: 11, total: 135 },
    ]

    expect(combineLineItemsTwo(quote)).toEqual(expectedResult)
  })

  it('should combine line items correctly when there are two trips', () => {
    const quote = {
      trips: [
        {
          line_items_list: [
            { label: 'Base Rate', tax: 10, total: 100 },
            { label: 'Gratuity', tax: 0, total: 25 },
            { label: 'Fuel Surcharge', tax: 1, total: 10 },
          ],
        },
        {
          line_items_list: [
            { label: 'Base Rate', tax: 10, total: 100 },
            { label: 'Gratuity', tax: 0, total: 25 },
            { label: 'Fuel Surcharge', tax: 1, total: 5 },
            { label: 'Pearson Airport Toll', tax: 1.73, total: 13.27 },
          ],
        },
      ],
    }

    const expectedResult = [
      { label: 'Base Rate', tax: 20, total: 200 },
      { label: 'Gratuity', tax: 0, total: 50 },
      { label: 'Fuel Surcharge', tax: 2, total: 15 },
      { label: 'Pearson Airport Toll', tax: 1.73, total: 13.27 },
      { label: 'Total Amount', tax: 23.73, total: 278.27 },
    ]

    expect(combineLineItemsTwo(quote)).toEqual(expectedResult)
  })
})
