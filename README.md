# High Park Livery Website (hpl-website-nuxt)

## Overview
This is a modern website for the High Park Livery, a black car service. The website is designed to collect leads through a custom quote form and streamline the booking process, providing customers with a smooth and efficient experience from start to finish.

## Key Features
- **Custom Quote Form:** Collects potential customer information and generates a unique booking link.
- **Email Notifications:** When a quote is submitted, an email is generated and sent via SendGrid with booking details.
- **Text Message Notifications:** Upon quote submission, a text message is sent to the customer via Twilio, including the unique booking link.
- **Database Submissions:** The quote submission details are stored in a PlanetScale database using Prisma and tRPC.
- **Secure Booking Flow:** Customers can book their ride using their unique link, which leads them to a pre-populated checkout flow.
- **Payment Integration:** The checkout process is securely handled using Stripe Elements and Stripe on the backend.
- **Confirmation & PDF Receipt:** Upon successful payment, the customer receives a confirmation and a PDF receipt.

## Tech Stack
- Frontend: Nuxt 3, Tailwind CSS
- Backend: Stripe, SendGrid, Twilio, Aircall
- Database: PlanetScale (Prisma, tRPC)

## Hosting

- Hosted on Netlify https://high-park-livery.netlify.app

## Setup & Installation

Make sure to install the dependencies:

```bash
# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```


## Contact
If you have any questions or feedback, feel free to reach out to me at info@drobertson.pro.
