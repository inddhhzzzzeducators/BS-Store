# BS Store 4.0 — Bansal Store Marketplace

A responsive React + Vite storefront prototype for Bansal Store, supporting retail and wholesale browsing.

## Features in this version
- Responsive desktop and mobile marketplace layout
- Product search and category filtering
- Retail / wholesale price switch
- Product cards and add-to-cart controls
- Cart quantity controls and estimated subtotal
- Cart persistence in the current browser using localStorage
- Account, orders and checkout preview dialogs

## Run locally
1. Install Node.js LTS.
2. Clone this repository.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown in the terminal.

## Build
Run `npm run build`. Production files are generated in `dist/`.

## Important prototype limitations
This release uses sample product data and browser-local cart storage. It does **not** yet provide real customer authentication, cloud inventory, secure admin permissions, order processing, delivery management, WhatsApp integration or payment processing. Do not collect real customer details or payment information through this prototype.

## Planned production architecture
- Supabase Auth for customer accounts
- PostgreSQL with Row Level Security for customer, order and inventory data
- Server-side authorization for owner/admin operations
- Secure image storage for product photos
- Payment provider integration after business and compliance setup
- Order notifications and invoice generation

Never place database service-role keys, payment secrets or private credentials in frontend code.
