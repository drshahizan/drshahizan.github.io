# Day 5 Supabase Homestay Starter and Reference App

A starter and runnable reference app for the Mersing Coastal Homestay capstone. Use the code to inspect the expected visitor and manager flows, then adapt it step by step during the exercise. It is designed for a dedicated training project and fictional data only.

## What is included

- `index.html` — package cards, a visitor enquiry form and a manager sign-in/list.
- `assets/css/app.css` — responsive starter styles.
- `assets/js/config.js` — placeholders for the project URL and publishable key.
- `assets/js/app.js` — form submission and manager CRUD actions.
- `supabase/setup.sql` — table, constraints, grants and example RLS policies.
- `supabase/seed-bookings.sql` — 12 synthetic practice booking records.

## Lecturer setup

1. Create a separate Supabase project for the workshop. Do not use a production project.
2. Run `supabase/setup.sql` in the SQL Editor.
3. Run `supabase/seed-bookings.sql` to add the fictional rows.
4. Create one or more manager test users. Using a trusted server-side/admin method, assign the `app_metadata` claim `role: homestay_manager` to each manager. Do not put an admin or secret key in this folder or browser code. Ask the Supabase administrator to review the SQL and access flow before class.
5. Give participants a practice manager login through the class-approved private channel. Disable unrestricted sign-ups for this training project.
6. Copy the project URL and publishable key into `assets/js/config.js`. The publishable key is intended for browser use only together with the RLS rules. Never use a secret key in this app.
7. Host the starter on a temporary class site or run it with a local static server. Do not open `index.html` directly as a `file://` URL.

## Participant run-through

1. Open the page. The package cards and enquiry form are public.
2. Submit one fictional request using a future check-in date, package, guest count and country. The reference app inserts a `Pending` request; it does not ask for a guest name, phone number or payment details.
3. Sign in using the manager test account supplied by the lecturer.
4. Review requests, change one status, then remove a test row after the confirmation prompt.
5. Sign out and explain which actions are available to a visitor and to a manager.

## RLS design in this training template

- A signed-out visitor can insert a limited website enquiry only. The table constraints restrict allowed package, guest count, country, channel and status values. Visitors cannot read, update or delete rows.
- A signed-in user can manage rows only when a trusted `app_metadata.role` claim equals `homestay_manager`.
- The lecturer must control manager account creation and protect the training project. Do not use this classroom policy with real guest data or treat it as a production booking system. Production use needs a reviewed threat model, abuse protection, privacy controls, monitoring and deployment review.

The 6,000-row visitor-session CSV from Day 4 is for analytics. It is not a booking file and is not imported here.
