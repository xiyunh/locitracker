-- Badges earned by app users, and the counters behind the ones that
-- cannot be re-derived from the tags/sightings tables.
-- Run in the Supabase SQL editor (project qryqhtvrjunlayoslqbn) after
-- migration-app-tags.sql. "Automatically expose new tables" is OFF on
-- this project, so the grants below are required.

create table if not exists public.badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_key text not null,
  awarded_at timestamptz not null default now(),
  displayed boolean not null default false,
  display_order smallint,
  primary key (user_id, badge_key)
);

alter table public.badges enable row level security;
grant select, insert, update, delete on public.badges to authenticated;
grant all on public.badges to service_role;

drop policy if exists "Users manage their own badges" on public.badges;
create policy "Users manage their own badges"
on public.badges for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Radar finds, late-night finds and lost-tag reunions happen on the
-- phone and leave no other trace, so they are kept here. sightings /
-- places mirror the local counters so a reinstall restores progress.
create table if not exists public.badge_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  finds integer not null default 0,
  night_finds integer not null default 0,
  reunions integer not null default 0,
  sightings integer not null default 0,
  places integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.badge_stats enable row level security;
grant select, insert, update, delete on public.badge_stats to authenticated;
grant all on public.badge_stats to service_role;

drop policy if exists "Users manage their own badge stats" on public.badge_stats;
create policy "Users manage their own badge stats"
on public.badge_stats for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Badge keys the app knows (kept here for reference / dashboard filters):
-- first, gem, path, storm, map, pin, name, star, lost, found, hound, owl,
-- reunited, week, season.
