-- Fictional rows for interface practice. These are not real customers or bookings.
insert into public.booking_requests
  (check_in_date, package_type, guest_count, visitor_country, channel, booking_status, booking_value_rm)
values
  ('2027-01-09', 'Coastal Rest', 2, 'Malaysia', 'Website', 'Pending', null),
  ('2027-01-16', 'Island Explorer', 4, 'Singapore', 'Travel platform', 'Confirmed', 580.00),
  ('2027-01-23', 'Family Escape', 5, 'Malaysia', 'Social media', 'Pending', null),
  ('2027-02-06', 'Coastal Rest', 2, 'Indonesia', 'Referral', 'Confirmed', 380.00),
  ('2027-02-13', 'Island Explorer', 3, 'Thailand', 'Website', 'Cancelled', null),
  ('2027-02-20', 'Family Escape', 6, 'Malaysia', 'Walk-in', 'Confirmed', 780.00),
  ('2027-03-05', 'Coastal Rest', 1, 'Brunei', 'Website', 'Pending', null),
  ('2027-03-12', 'Island Explorer', 4, 'China', 'Social media', 'Confirmed', 580.00),
  ('2027-03-19', 'Family Escape', 8, 'India', 'Travel platform', 'Pending', null),
  ('2027-04-02', 'Coastal Rest', 2, 'Australia', 'Referral', 'Confirmed', 380.00),
  ('2027-04-09', 'Island Explorer', 3, 'Japan', 'Website', 'Pending', null),
  ('2027-04-16', 'Family Escape', 7, 'Malaysia', 'Social media', 'Cancelled', null);
