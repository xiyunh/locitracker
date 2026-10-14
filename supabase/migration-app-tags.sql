-- Loci mobile app: per-user tag registry and sighting history.
--
-- Follows the conventions of schema.sql: this project has "Automatically
-- expose new tables" DISABLED, so privileges are granted explicitly and
-- RLS restricts them further. Only signed-in users (authenticated role)
-- can touch these tables, and only their own rows. Safe to re-run.

-- Registered tags. One row per (user, BLE device). last_* columns are a
-- denormalized copy of the newest sighting so the app can pull the
-- registry + last-seen locations in one query.
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  ble_id text not null,
  label text not null,
  created_at timestamptz not null default now(),
  last_latitude double precision,
  last_longitude double precision,
  last_rssi integer,
  last_seen_at timestamptz,
  unique (user_id, ble_id)
);

alter table public.tags enable row level security;
grant select, insert, update, delete on public.tags to authenticated;

drop policy if exists "Users manage their own tags" on public.tags;
create policy "Users manage their own tags"
on public.tags for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Full sighting history (append-only from the app).
create table if not exists public.sightings (
  id bigint generated always as identity primary key,
  tag_id uuid not null references public.tags (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  latitude double precision not null,
  longitude double precision not null,
  rssi integer,
  seen_at timestamptz not null default now()
);

alter table public.sightings enable row level security;
grant select, insert, delete on public.sightings to authenticated;
grant usage, select on sequence public.sightings_id_seq to authenticated;

drop policy if exists "Users manage their own sightings" on public.sightings;
create policy "Users manage their own sightings"
on public.sightings for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists sightings_tag_seen_idx
  on public.sightings (tag_id, seen_at desc);
