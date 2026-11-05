# BS Store 4.1 — Bansal Store Marketplace

Responsive React + Vite storefront for Bansal Store, with retail and wholesale browsing.

## Current storefront features
- Responsive desktop and mobile marketplace layout
- Product search, category filtering and price sorting
- Retail / wholesale price switch
- Product cards and add-to-cart controls
- Cart quantity controls, clear-cart action and estimated subtotal
- Cart and wishlist saved in the current browser using localStorage
- Saved-products panel
- Account, orders and checkout preview dialogs

## Run locally
1. Install Node.js LTS.
2. Clone this repository.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` (Supabase values can be added later).
5. Run `npm run dev`.
6. Open the local URL shown in the terminal.

## Build
Run `npm run build`. Production files are generated in `dist/`.

## Supabase setup (backend foundation)
Supabase provides hosted PostgreSQL, authentication, storage and Row Level Security.

1. Create a project at [Supabase](https://supabase.com/).
2. In the project dashboard, open **SQL Editor** and run the complete script in `supabase/schema.sql`.
3. Open **Project Settings → API** (or **Data API**) and copy the Project URL and publishable/anon key.
4. Copy `.env.example` to `.env.local` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Restart the Vite development server after changing environment variables.

The Supabase client foundation is in `src/lib/supabase.js`. The current storefront dialogs are still previews; customer sign-up/login, cloud product loading, owner dashboard and order placement have not yet been connected to it.

### Important security notes
- Keep Row Level Security enabled. The SQL file enables RLS and creates starter policies.
- New accounts are assigned the `customer` role automatically.
- To grant the verified store-owner account admin access, first create/sign in to that account, then run this in Supabase SQL Editor using that account's Auth user UUID:

```sql
update public.profiles
set role = 'admin'
where id = 'PASTE_VERIFIED_AUTH_USER_UUID_HERE';
```

- Do not expose a Supabase `service_role` key, database password, payment secret or other private credential in React code, GitHub, or `.env.local` committed to Git.
- The publishable/anon key is intended for browser use only when RLS policies are correctly configured.
- Real checkout must use a server-side Edge Function/RPC to validate product prices, stock and totals. Never trust prices or totals sent by the browser.
- Do not collect real customer details or payment information through the current preview.

## Not production-ready yet
This release still uses sample product data and browser-local cart/wishlist storage. It does not yet provide live Supabase authentication, cloud inventory sync, a secure owner dashboard, server-validated order processing, delivery management, WhatsApp invoices or payment processing.

## Planned next milestones
1. Connect Supabase sign-up, login and session handling.
2. Load products and prices from the database.
3. Build admin-only product and stock management.
4. Add server-validated order creation and order tracking.
5. Add WhatsApp invoice sharing and a payment provider after business setup.
