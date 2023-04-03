import { ref } from '#imports'

export const useDefaults = () => {
  const defaultQuote = ref({
    is_round_trip: false,
    quote_number: 0,
    selected_hours: 0,
    selected_passengers: 1,
    quote_tax_total: 0,
    quote_subtotal: 0,
    quote_total: 0,
    combined_line_items: [
      {
        label: 'Default',
        total: 99.99,
        tax: 10.99,
      },
      {
        label: 'Default',
        total: 99.99,
        tax: 10.99,
      },
    ],
    user: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email_address: '',
      full_name: '',
      id: '',
      conversion: {
        utm_medium: null,
        utm_source: null,
        utm_campaign: null,
        utm_term: null,
        gclid: null,
      },
    },
    vehicle: {
      label: '',
      vehicle_image:
        'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/b4bf6461-ba55-48bd-e0ba-d613ae383000/1024',
    },
    sales_tax: { tax_name: '' },
    trips: [
      {
        trip_order: 0,
        locations: [
          {
            full_name: '',
          },
          {
            full_name: '',
          },
        ],
        formatted_pickup_date: '',
        formatted_pickup_time: '',
        service_label: '',
        line_items_tax: 0,
        line_items_subtotal: 0,
        line_items_total: 0,
        line_items_list: [
          {
            label: '',
            tax: 0,
            total: 0,
          },
        ],
      },
    ],
  })
  return { defaultQuote }
}
