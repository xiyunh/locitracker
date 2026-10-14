-- With "Automatically expose new tables" disabled, service_role also needs
-- explicit privileges (it bypasses RLS, but not SQL grants).
grant usage on schema public to service_role;
grant all on public.shoppers to service_role;
grant all on public.preorders to service_role;
grant all on public.shopper_profile_snapshots to service_role;
grant all on public.orders to service_role;
grant select on public.latest_shopper_profiles to service_role;
grant usage, select on all sequences in schema public to service_role;
