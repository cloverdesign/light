This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Forms and admin inbox

The contact form and event registration form save submissions to the `form_submissions` table in Supabase. Run [`supabase/form_submissions.sql`](supabase/form_submissions.sql) in the Supabase SQL Editor, then set these server-side environment variables in `.env.local` and in the deployment environment:

```text
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SECRET_KEY=<sb_secret_...>
ADMIN_PASSWORD=<long-unique-password>
ADMIN_HOSTNAME=admin.example.com
```

Keep the secret key private; it must not use a `NEXT_PUBLIC_` variable. Point the `admin.example.com` DNS record at the same deployment as the main site. The admin inbox then opens at `https://admin.example.com/` (or `/admin` on the main domain). Admin sessions expire after 12 hours.

Event registrations are at `/events/register`. Shared event details live in `lib/events.ts`, and the e-card is in `public/events/ignite-con-2026.jpeg`. Both the homepage and registration page use these details. New registrations store the event ID and name with the response; the existing JSON submission table needs no additional migration.

### Ticket emails

Each event registration gets a ticket code (e.g. `TKT-50E1-E8C3`), and the registrant is emailed a ticket with a QR code of that code through [Resend](https://resend.com). Verify your sending domain in Resend, then set:

```text
RESEND_API_KEY=<re_...>
TICKET_EMAIL_FROM=Lighthouse <tickets@your-verified-domain>
```

**Re-run [`supabase/form_submissions.sql`](supabase/form_submissions.sql) before deploying.** It adds the `ticket_emailed_at` and `checked_in_at` columns and a unique ticket-code index; the admin dashboard and scanner need them. If the email fails, the registration is still saved and the ticket code is shown on the confirmation screen.

In the admin dashboard, each registration shows its ticket status with a **Send ticket** / **Resend ticket** button, and **Send all tickets** emails everyone who hasn't received one yet (for example, people who registered before Resend was set up). Registrations from before tickets existed are given a ticket code when their email is sent.

### Gate scanner

`/admin/scanner` (linked from the dashboard sidebar) checks tickets in at the entrance, using the same admin password. It scans QR codes with the phone camera (the site must be served over HTTPS, as it is on Vercel), accepts typed codes, and has an express walk-in registration that checks the person in immediately. Each ticket can be checked in once, even when several gates scan it at the same moment. Only tickets for the current event (`igniteEvent.id` in `lib/events.ts`) are accepted.

### Exporting and importing registrations

**Export registrations** downloads every event registration as a CSV that opens in Excel or Google Sheets. Contact messages are not included. **Import registrations** accepts a CSV with the same column headers (comma- or semicolon-separated); only **Full name** plus an email address or phone number are required. The import shows a preview first, adds rows to the current event, and skips people who are already registered (same ticket code, or same name with the same email or phone), so importing the same file twice is safe.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
