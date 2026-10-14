-- Migration: switch profile sync to append-only snapshots.
-- (Fixes: RLS blocks ON CONFLICT upserts when reads are denied.)

drop table if exists public.shopper_profiles;

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

grant insert on public.shopper_profile_snapshots to anon;

create or replace view public.latest_shopper_profiles as
  select distinct on (email) email, profile, updated_at
  from public.shopper_profile_snapshots
  order by email, updated_at desc;
