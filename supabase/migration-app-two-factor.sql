-- Two-factor sign-in by email or text-message code (app-enforced).
-- Run in the Supabase SQL editor after the app's profiles table exists.
-- Email codes use the "Magic Link" email template: it must contain
-- {{ .Token }} so the message carries the 6-digit code.
-- Text-message codes need Authentication > Providers > Phone enabled
-- with an SMS provider (Twilio) configured.

alter table public.profiles
  add column if not exists two_factor text not null default 'off'
    check (two_factor in ('off', 'email', 'sms')),
  add column if not exists two_factor_phone text;

-- Users read and change only their own row (no-ops if already present).
alter table public.profiles enable row level security;
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

drop policy if exists "Users manage their own profile" on public.profiles;
create policy "Users manage their own profile"
on public.profiles for all to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
