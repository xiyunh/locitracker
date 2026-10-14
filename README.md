# Loci — Sticker Tracker

Marketing and pre-order site for **Loci**, a sticker-thin item tracker that sticks to keys,
passports, and bags — the world's first sticker tracker. Dark navy/gold design with
**#11385b** as the primary brand color.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Brand

- **Primary color:** `#11385b`
- **Accent color:** `#c9a962` (gold)
- **Product:** Loci Sticker (Single & 4 Pack) + refills and fobs
- **App:** Loci companion app + the Loci finding network

## Sections

- Announcement bar (pre order now)
- Sticky navigation (with Pre Order button)
- Hero with interactive 3D sticker scene
- Product showcase (Single, 4 Pack, accessories)
- Device + app headline
- Tracking features (Keys, Luggage, Pets, Find nearby, etc.)
- Setup / how it works
- Day-in-life scenarios with Loci app mockups
- Press carousel
- Payment options
- Newsletter footer

## Pre-order

`/pre-order` collects name, email, and product (`?product=<catalog id>` pre-selects one).
Submissions are always saved in browser `localStorage` (`loci-preorder-submissions`) and can be
exported as an Excel-compatible CSV from the confirmation screen.

To also send submissions to Supabase, create a `preorders` table
(`id text primary key, name text, email text, product text, created_at timestamptz`) with an
anon insert policy, then add to a local `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Restart the dev server after adding the variables.

## Shopper backend & welcome emails

With the same Supabase env vars set, shopper data syncs to the backend
(everything still works local-only without them):

- **Sign-ups** → `shoppers` table via the `signup` edge function, which also
  sends a one-time welcome email through [Resend](https://resend.com).
- **Profiles** (contact, addresses, shipping method, preferences) → upserted
  into `shopper_profiles` (debounced) whenever a signed-in shopper edits them.
- **Orders** → inserted into `orders` at checkout.

Setup:

1. Run `supabase/schema.sql` in the Supabase SQL editor (tables + RLS: anon can
   insert/upsert, nothing is publicly readable).
2. Deploy the edge function and set its secrets:

   ```bash
   supabase functions deploy signup --no-verify-jwt
   supabase secrets set RESEND_API_KEY=re_xxx WELCOME_FROM="Loci <hello@yourdomain.com>" SITE_URL=https://yoursite.com
   ```

Without `RESEND_API_KEY` the sign-up is still recorded; the email is skipped.
Note: the site has no real authentication yet, so profile/order writes trust the
client — move to Supabase Auth before handling sensitive production data.

## Stack

- Vite + React
- Tailwind CSS v4
- Framer Motion
- Lucide React icons
