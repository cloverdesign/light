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
