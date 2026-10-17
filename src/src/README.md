# AurumTrade Platform

AurumTrade is a modern trading dashboard project featuring a navy-blue, white, and gold interface.

## Features

- Trading dashboard
- Markets and illustrative price displays
- Demo trading terminal
- Portfolio and order history pages
- Wallet and funding interface
- Analytics workspace
- Signals and news section
- Notifications and profile settings
- Admin center placeholder
- Supabase integration setup

## Technology

- HTML
- CSS
- JavaScript
- Vite
- Supabase JavaScript client
- Netlify deployment

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for deployment:

```bash
npm run build
```

## Netlify settings

Build command: `npm run build`

Publish directory: `dist`

Configure these environment variables in Netlify:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Important

This project currently uses illustrative market prices and simulated demo orders. It does not execute live trades, process deposits, or process withdrawals. Authentication and secure administrative functionality require further configuration.
