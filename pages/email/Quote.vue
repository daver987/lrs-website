<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const emailData = {
  first_name: 'David',
  last_name: 'Robertson',
  email_address: 'oplholds@hotmail.com',
  phone_number: '289-400-9408',
  round_trip_total: '139.99',
  total_fare: '139.99',
  vehicle_label: 'Standard Sedan',
  service_label: 'Point To Point',
  is_round_trip: false,
  pickup_date: 'March 10, 2023',
  pickup_time: '10:00pm',
  return_date: 'January 10, 1969',
  return_time: '12:00AM',
  quote_number: '2500',
  origin_full_name: '1265 Sixth Line, Oakville, Ontario, L6H1X2',
  destination_full_name:
    'Toronto Pearson International Airport, 6900 Silverdart Drive',
  vehicle_image:
    'https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/d519ec92-d745-4c9b-6521-1466a8d28300/1024',
  visibility: false,
}
</script>
<template>
  <div style="max-width: 650px; margin: auto">
    <div style="background: black">
      <img
        src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/ec6dca30-3187-4694-7605-de32caf23100/1024"
        alt="HPL-logo"
        style="width: 100%; max-width: 150px; margin: 0 auto; display: block"
      />
    </div>
    <div style="background: #2b2b2b; padding: 2rem">
      <h2
        style="
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          color: #a57c52;
          margin-bottom: 1rem;
        "
      >
        Thank You For Your Interest
      </h2>
      <p style="color: white; text-align: center; font-size: 1rem">
        Hi <span style="font-weight: bold; color: #a57c52">John,</span> Thank
        you for your interest in
        <span style="font-weight: bold; color: #a57c52"> High Park Livery</span>
      </p>
      <br />
      <p style="color: white; text-align: center">
        Please review your requested details below to ensure they are
        accurate.<br />
        If anything needs to change, please let us know.
      </p>
      <br />
      <p style="color: white; text-align: center">
        Note that this is a
        <span style="font-weight: bold; color: #a57c52"> Quote</span> and
        <span style="font-weight: bold; color: #a57c52"> NOT</span> a
        confirmation of your trip.
      </p>
      <br />
      <p style="color: white; text-align: center">
        Please click the link below to complete your reservation.<br />
        You can call or text
        <a href="tel:6473609631" style="color: #a57c52; font-weight: bold"
          >647-360-9631</a
        >
        and we will be happy to assist you.
      </p>
      <button
        style="
          background: #cc0201;
          color: white;
          border: none;
          width: 100%;
          padding: 1rem 1rem;
          font-size: 1.5rem;
          font-weight: bold;
          border-radius: 5px;
          margin: 2rem auto;
          display: block;
          text-transform: uppercase;
        "
      >
        <a
          href="http://localhost:3000/checkout?quotenumber=2412"
          style="color: white; text-decoration: none"
          >BOOK NOW</a
        >
      </button>
    </div>
    <div style="background: black; padding: 2rem">
      <hr style="border: 1px solid #a57c52" />
      <div style="padding-top: 1rem">
        <h3
          style="
            color: white;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 2rem;
          "
        >
          Quote Request
        </h3>
        <p style="text-align: center; color: white">Requested Vehicle Type</p>
        <img
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/d519ec92-d745-4c9b-6521-1466a8d28300/1024"
          alt="Vehicle"
          style="max-width: 400px; display: block; margin: 0 auto"
        />
      </div>
      <hr style="border: 1px solid #a57c52" />
      <div style="padding-top: 1rem; padding-bottom: 1rem">
        <h3 style="color: white; margin-bottom: 0.5rem">Pickup Details</h3>
        <p style="color: #a57c52">
          Pickup Date: <span style="color: white">10-11-2020</span>
        </p>
        <p style="color: #a57c52">
          Pickup Time: <span style="color: white">3:00pm</span>
        </p>
        <p style="color: #a57c52">
          Pickup Location: <span style="color: white">Pearson Airport</span>
        </p>
        <p style="color: #a57c52">
          Dropoff Location: <span style="color: white">1265 Sixth Line</span>
        </p>
      </div>
      <hr style="border: 1px solid #a57c52" />
      <div style="padding-top: 1rem; padding-bottom: 1rem">
        <h3 style="color: white; margin-bottom: 0.5rem">Return Details</h3>
        <p style="color: #a57c52">
          Pickup Date: <span style="color: white">10-11-2020</span>
        </p>
        <p style="color: #a57c52">
          Pickup Time: <span style="color: white">3:00pm</span>
        </p>
        <p style="color: #a57c52">
          Pickup Location: <span style="color: white">Pearson Airport</span>
        </p>
        <p style="color: #a57c52">
          Dropoff Location: <span style="color: white">1265 Sixth Line</span>
        </p>
      </div>
      <hr style="border: 1px solid #a57c52" />
      <div style="padding-top: 1.5rem; padding-bottom: 1rem">
        <p style="font-size: 1.5rem; text-align: center; margin-bottom: 1rem">
          All Inclusive Price
        </p>
        <p
          style="
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #a57c52;
          "
        >
          $ 1,000
        </p>
      </div>
    </div>
    <div style="background: #2b2b2b; padding: 1rem 2rem; display: flex">
      <div style="width: 50%; color: white">
        <h3 style="color: #a57c52; margin-bottom: 0.5rem">
          Quote Request Details
        </h3>
        <p style="color: #a57c52">
          Quote Number: <span style="color: red">HPL-0000</span>
        </p>
        <p style="color: #a57c52">
          Service: <span style="color: white">3:00pm</span>
        </p>
        <p style="color: #a57c52">
          Vehicle: <span style="color: white">Pearson Airport</span>
        </p>
        <p style="color: #a57c52">
          Round Trip: <span style="color: white">1265 Sixth Line</span>
        </p>
      </div>
      <div style="width: 50%; color: white">
        <h3 style="color: #a57c52; margin-bottom: 0.5rem">Your Details</h3>
        <p style="color: #a57c52">
          Name: <span style="color: white">3:00pm</span>
        </p>
        <p style="color: #a57c52">
          Email: <span style="color: white">Pearson Airport</span>
        </p>
        <p style="color: #a57c52">
          Phone Number: <span style="color: white">1265 Sixth Line</span>
        </p>
      </div>
    </div>
    <div style="background: black; display: flex; padding: 1rem">
      <div style="width: 50%; padding-left: 1rem">
        <img
          src="https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/ec6dca30-3187-4694-7605-de32caf23100/1024"
          alt="HPL-logo"
          style="width: 100%; max-width: 100px; display: block"
        />
      </div>
      <div style="padding: 1rem">
        <p
          style="
            color: #a57c52;
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 1rem;
          "
        >
          All The Best - High Park Livery
        </p>
        <p style="color: white">
          Phone:
          <a href="tel:6473609631" style="color: #a57c52; margin-bottom: 0.5rem"
            >647-360-9631</a
          >
        </p>
        <p style="color: white">
          Email:
          <a style="color: #a57c52" href="mailto:quotes@highparklivery.com"
            >quotes@highparklivery.com</a
          >
        </p>
      </div>
    </div>
    <div style="background: #a57c52; padding: 1rem">
      <p style="text-align: center; color: #2b2b2b">
        High Park Livery, Greater Toronto Area:
        <a href="tel:6473609631" style="color: blue">647-360-9631</a>
      </p>
    </div>
  </div>
</template>
