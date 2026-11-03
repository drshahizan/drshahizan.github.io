-- Mersing Coastal Homestay: classroom-only Supabase schema and access rules.
-- Use a separate training project and fictional records only.

begin;

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  check_in_date date not null,
  package_type text not null check (package_type in ('Coastal Rest', 'Island Explorer', 'Family Escape')),
  guest_count integer not null check (guest_count between 1 and 12),
  visitor_country text not null check (visitor_country in ('Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Brunei', 'China', 'India', 'Australia', 'Japan', 'South Korea', 'United Kingdom', 'Saudi Arabia', 'Germany')),
  channel text not null default 'Website' check (channel in ('Website', 'Social media', 'Referral', 'Travel platform', 'Walk-in')),
  booking_status text not null default 'Pending' check (booking_status in ('Pending', 'Confirmed', 'Cancelled')),
  booking_value_rm numeric(10,2) check (booking_value_rm is null or booking_value_rm >= 0)
);

alter table public.booking_requests enable row level security;

-- Start from no table API privileges, then grant only the operations this exercise needs.
grant usage on schema public to anon, authenticated;
revoke all on table public.booking_requests from anon, authenticated;
grant insert on table public.booking_requests to anon;
grant select, insert, update, delete on table public.booking_requests to authenticated;

drop policy if exists "Visitors submit pending website enquiries" on public.booking_requests;
create policy "Visitors submit pending website enquiries"
  on public.booking_requests for insert to anon
  with check (
    booking_status = 'Pending'
    and booking_value_rm is null
    and channel = 'Website'
  );

drop policy if exists "Assigned homestay managers manage training rows" on public.booking_requests;
create policy "Assigned homestay managers manage training rows"
  on public.booking_requests for all to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'homestay_manager')
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'homestay_manager');

commit;
