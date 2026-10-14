-- Loci backend schema: pre-orders, shopper sign-ups, profiles, and orders.
-- Anonymous visitors can only INSERT (and upsert their profile); nothing is
-- publicly readable. Sign-ups are written by the `signup` edge function using
-- the service role.
--
-- Written for a project with "Automatically expose new tables" DISABLED:
-- privileges are granted explicitly below, and RLS policies restrict them
-- further. Safe to run either way.

create table if not exists public.preorders (
  id text primary key,
  name text not null,
  email text not null,
  product text not null,
  created_at timestamptz not null default now()
);

alter table public.preorders enable row level security;

create policy "Allow public preorder inserts"
on public.preorders for insert to anon with check (true);

create policy "Prevent public preorder reads"
on public.preorders for select to anon using (false);

-- Shopper sign-ups (written only by the signup edge function / service role)
create table if not exists public.shoppers (
  email text primary key,
  name text not null,
  created_at timestamptz not null default now(),
  welcome_email_sent_at timestamptz
);

alter table public.shoppers enable row level security;
-- no anon policies: the service role bypasses RLS.

-- Shopper profile snapshots (append-only: each sync inserts a new row;
-- the latest row per email is the current profile — see the view below)
create table if not exists public.shopper_profile_snapshots (
  id bigint generated always as identity primary key,
  email text not null,
  profile jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists shopper_profile_snapshots_email_idx
  on public.shopper_profile_snapshots (email, updated_at desc);

alter table public.shopper_profile_snapshots enable row level security;

create policy "Allow public profile snapshot inserts"
on public.shopper_profile_snapshots for insert to anon with check (true);

create policy "Prevent public profile snapshot reads"
on public.shopper_profile_snapshots for select to anon using (false);

-- Dashboard convenience: the current profile per shopper.
-- Not granted to anon, so it is not reachable through the public API.
create or replace view public.latest_shopper_profiles as
  select distinct on (email) email, profile, updated_at
  from public.shopper_profile_snapshots
  order by email, updated_at desc;

-- Placed orders
create table if not exists public.orders (
  id text primary key,
  email text,
  items jsonb not null,
  totals jsonb not null,
  shipping_address jsonb,
  shipping_method jsonb,
  status text,
  placed_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Allow public order inserts"
on public.orders for insert to anon with check (true);

create policy "Prevent public order reads"
on public.orders for select to anon using (false);

-- Explicit Data API privileges (needed when automatic table exposure is off).
-- RLS above still applies on top of these grants; select stays policy-blocked.
grant usage on schema public to anon;
grant insert on public.preorders to anon;
grant insert on public.shopper_profile_snapshots to anon;
grant insert on public.orders to anon;
-- `shoppers` gets no anon grants: only the signup edge function (service role)
-- writes to it.

-- service_role bypasses RLS but still needs SQL privileges when automatic
-- table exposure is disabled.
grant usage on schema public to service_role;
grant all on public.shoppers to service_role;
grant all on public.preorders to service_role;
grant all on public.shopper_profile_snapshots to service_role;
grant all on public.orders to service_role;
grant select on public.latest_shopper_profiles to service_role;
grant usage, select on all sequences in schema public to service_role;
