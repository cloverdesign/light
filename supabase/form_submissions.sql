create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'event_registration')),
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.form_submissions enable row level security;

-- The site writes and reads submissions only through server routes using the
-- Supabase service role key. Do not add public or anon policies for this table.
revoke all on public.form_submissions from anon, authenticated;
grant all on public.form_submissions to service_role;

create index if not exists form_submissions_created_at_idx
  on public.form_submissions (created_at desc);

-- Each event registration carries a ticket code that the gate scanner looks up.
create unique index if not exists form_submissions_ticket_code_idx
  on public.form_submissions ((data->>'ticketCode'))
  where type = 'event_registration';

-- Ticket delivery and gate check-in. Kept as columns (not in `data`) so check-in
-- can be a single conditional update.
alter table public.form_submissions
  add column if not exists ticket_emailed_at timestamptz,
  add column if not exists checked_in_at timestamptz;
