# Security and production-readiness plan

Status: Draft for implementation
Date: 29 September 2026
Baseline: `master` at `ad3b794`, after the Next.js deployment fix

## Objective

Make the public contact and event registration forms reliable in production, protect submissions and prayer requests, and secure the admin portal before expanding it into a CMS. This document proposes work; it does not change application behavior or production configuration.

## Verified baseline and gaps

- Next.js and `eslint-config-next` were upgraded to 15.5.26. The production build and Vercel preview passed, and PR #2 was merged. Production functionality still needs verification after environment changes.
- Form validation and submission storage run on the server. The supplied SQL enables RLS and revokes access from `anon` and `authenticated`. This is the intended configuration, not proof of the live database's permissions.
- The admin API checks authentication, but its cookie is a deterministic value derived from `ADMIN_PASSWORD`. The browser's 12-hour cookie lifetime is not enforced by the server, and logout does not revoke a copied cookie.
- Login and public form endpoints have no application-level rate limiting. Vercel firewall configuration has not been audited.
- `GET /api/audio-proxy` checks an allowlist, but `HEAD` accepts arbitrary URLs and follows redirects. GET redirect handling has no explicit hop limit and buffers entire files.
- The dashboard fetches only the latest 500 submissions. Its counts and search cover that subset.
- A production-dependency audit of the patched lockfile reported eight findings: six high, one moderate, and one low. Several involve build tooling. These require reachability review; severity counts alone do not establish a runtime exploit.
- At the last Vercel settings check, `ADMIN_PASSWORD` and `SUPABASE_URL` had just been added for Production and Preview; `SUPABASE_SECRET_KEY` was absent. Recheck before making changes because settings may have changed since then.

## Delivery sequence

| Step | Priority | Deliverable | Depends on |
| --- | --- | --- | --- |
| 1 | P0 | Correct production configuration and verified database restrictions | Existing Supabase project and Vercel access |
| 2 | P0 | Restricted, bounded audio proxy | None |
| 3 | P0 | Expiring, revocable admin sessions | Database migration from step 1 |
| 4 | P0 | Login and form abuse controls | Shared rate-limit storage |
| 5 | P1 | Reliable submissions, failure handling, and complete dashboard pagination | Steps 1 and 3 |
| 6 | P1 | Dependency remediation, CI, monitoring, and release verification | Steps 2–5 |
| 7 | P2 | Individual admin accounts, MFA, and CMS permissions | Before multiple editors or CMS publishing |

P0 items block production-readiness sign-off. P1 items complete the reliability work. Deliver each step as a focused PR with its validation results; the planning branch does not authorize merging implementation PRs or changing production.

## 1. Production configuration and data access

**Work**

- Verify `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and the current `ADMIN_PASSWORD` in Vercel Production. Keep credentials server-only and out of logs, repository files, and client bundles.
- Use separate test credentials and a test database for previews that receive test submissions. Document the scopes of Production, Preview, and local variables.
- Verify the actual grants, RLS status, and policies on `form_submissions`. The service key bypasses RLS, so every application endpoint using it must enforce its own authorization and validation.
- Configure the intended admin domain, DNS, TLS, `ADMIN_HOSTNAME`, and public-site link. `/admin` on the main domain must have the same access controls; the subdomain is not an authorization boundary.
- Add an environment-variable example containing placeholders only. Document configuration errors and the need for a new deployment after changing Vercel variables.

**Acceptance**

- A fresh deployment can save a clearly labelled test submission and display it after admin login.
- Anonymous and ordinary non-admin access cannot read or write submissions directly through the Supabase API. Run these checks against a test environment without retrieving real submissions.
- Unauthenticated requests to `/api/admin/submissions` return 401 on both supported hosts.
- Required production settings are verified by presence and behavior without displaying their values.

## 2. Audio proxy restrictions

**Files:** `app/api/audio-proxy/route.ts` and a shared URL-validation helper.

**Work**

- Apply the same validation to GET and HEAD. Allow HTTPS and explicitly approved audio hosts; reject embedded credentials, unexpected ports, IP literals, and unsupported schemes.
- Inventory actual podcast/CDN redirect destinations from known episode fixtures. Extend the allowlist only for required trusted hosts.
- Validate every redirect target before fetching, with a maximum of three hops and an upstream timeout. Avoid recursive request URL string replacement.
- Stream audio with a bounded transfer policy. Forward range requests and preserve valid 206 responses, or stop advertising range support until it works.
- Return generic upstream errors without exposing internal exception details.

**Acceptance**

- Mocked GET and HEAD tests prove disallowed URLs and redirects never reach the fetch function. Do not probe private infrastructure to demonstrate the issue.
- Redirect loops, slow responses, and oversized transfers terminate predictably.
- A real known episode plays and seeks correctly on desktop and mobile.

## 3. Admin session security

**Decision:** Harden the existing shared-password login as a transitional solution. Replace it with individual identities before introducing multiple CMS editors; do not build a bespoke user-account system.

**Files:** `app/api/admin/login/route.ts`, `app/api/admin/submissions/route.ts`, `app/admin/page.tsx`, a shared server-only session module, and a Supabase migration.

**Work**

- Replace deterministic password-derived tokens with cryptographically random opaque tokens. Store only their hashes in a server-only `admin_sessions` table with creation, expiry, and revocation timestamps.
- Enforce a 12-hour absolute expiry on the server for every protected request. Logout revokes the session before clearing its cookie; old deterministic cookies become invalid at rollout.
- Provide a documented revoke-all operation for password rotation or suspected compromise. Rotation must not leave existing sessions usable.
- Preserve `HttpOnly`, production `Secure`, and a host-only cookie scope. Explicitly return `Cache-Control: private, no-store` for authentication and submission responses.
- Centralize authorization so future admin routes cannot accidentally skip it. Check trusted origins on state-changing authenticated requests.
- Handle logout failures visibly and clear sensitive UI state when a session expires.
- Correct the README's current claim that sessions already expire after 12 hours.

**Acceptance**

- Valid credentials work; invalid, missing, malformed, and oversized credentials fail safely.
- A copied session cookie fails after logout, expiry, and revoke-all. Tests control time instead of waiting 12 hours.
- Session storage is inaccessible to public database roles, and raw tokens never appear in database rows or logs.
- Direct API requests cannot bypass authorization by changing hostnames, paths, or middleware headers.

## 4. Abuse controls and request validation

**Work**

- Add atomic, shared rate limits that work across serverless instances. Use a managed limiter or a Supabase-backed counter; do not rely on process memory.
- Start with a proposed limit of five failed login attempts per trusted client IP per 15 minutes and ten form submissions per IP per ten minutes. Tune with observed traffic, including multiple attendees sharing campus Wi-Fi. Avoid a global lockout that one visitor can trigger.
- Return 429 with `Retry-After`. Define outage behavior: login fails closed; forms return a retryable failure without silently discarding data.
- Accept JSON objects only, enforce an actual byte limit while reading the request body (initially 32 KiB), and return 400/413/415 for invalid data, excessive size, or unsupported media types.
- Retain server-side choice validation and conditional campus/prayer requirements. Reject excessive field lengths instead of silently truncating submissions.
- Add a honeypot as a low-friction spam signal. Add a server-verified bot challenge if spam warrants it, with an accessible failure/retry flow.

**Acceptance**

- Concurrent requests cannot bypass rate limits. Client-supplied forwarding headers cannot select an arbitrary rate-limit identity.
- Missing fields, invalid choices, `null`, arrays, invalid JSON, and oversized bodies produce controlled responses.
- Rejected requests never write a submission. Network failures preserve the visitor's input.

## 5. Submission and dashboard reliability

**Work**

- Add submission idempotency: generate one random request ID per submission attempt, reuse it on retries, and enforce uniqueness atomically in the database. Return the original success for a completed retry; reject mismatched payload reuse.
- Do not use email uniqueness to block legitimate registrations for family members or multiple events.
- Add bounded Supabase request timeouts and actionable UI retry states. A successful save followed by a lost response must not create a second registration on retry.
- Replace the 500-row cap with server-side pagination and filtering, a stable ordering using creation time plus ID, and accurate aggregate counts. Return summaries for lists and fetch prayer-request details only when needed.
- Verify keyboard navigation, conditional fields, pending states, mobile layout, refresh, login expiry, and logout.

**Acceptance**

- Simultaneous retries create exactly one stored submission, while a new registration request creates a separate one.
- More than 500 seeded test submissions remain searchable and accessible; totals represent the full matching dataset.
- Contact and event forms each pass browser-to-database-to-dashboard tests, including failure and retry paths.

## 6. Dependencies, CI, monitoring, and release gates

**Work**

- Review the remaining audit findings by dependency path, affected input, and runtime/build exposure. Apply targeted compatible upgrades; do not run an unreviewed force-upgrade or major Next.js migration.
- Add a working ESLint command, TypeScript checks, regression tests, and a production build to CI. Resolve the current build-time lint bypass and establish a passing baseline.
- Add security headers appropriate to the site. Test a Content Security Policy in report-only mode before enforcement, accounting for YouTube, fonts, audio, and donation flows.
- Record structured error codes and request IDs for failed saves, upstream timeouts, denied admin access, and rate-limit events. Do not log passwords, tokens, contact details, or prayer text.
- Add deployment/availability alerts and confirm the Supabase backup arrangement. Document and test a restore procedure with synthetic data.
- Add a plain-language data-use notice and an agreed retention/deletion process, including who may read prayer requests. Do not promise automatic deletion or confidentiality controls that are not implemented.

**Release gate**

- [ ] Clean install, lint, type checks, focused security/reliability tests, and production build pass in CI.
- [ ] Vercel preview passes with test-only data and credentials.
- [ ] Production environment, DNS/TLS, and database permissions are verified.
- [ ] Both forms save successfully and appear in the authenticated admin dashboard.
- [ ] Anonymous reads fail; session expiry, logout revocation, and rate limits pass.
- [ ] Audio playback/seeking, live embeds, and donation navigation still work; no real payment is needed for the smoke test.
- [ ] Monitoring receives a controlled test error without personal data.
- [ ] Labelled production smoke-test records are removed through an authorized, targeted cleanup.
- [ ] The release records the commit, deployment URL, checks, and rollback owner.

Use additive migrations and keep earlier submissions compatible. Do not roll back to the vulnerable Next.js release or restore permanent admin tokens. If the authentication rollout fails, disable admin access while correcting it rather than bypassing authorization.

## 7. Individual accounts before the CMS expands

- Replace the shared password with Supabase Auth, invitation-only admin accounts, and MFA.
- Maintain an explicit server-checked admin role or allowlist. Being a signed-in Supabase user must not grant access to submissions.
- Define separate permissions for submissions, prayer requests, content editing, and publishing as those capabilities are introduced.
- Preserve expiry and revocation guarantees during migration. Provider logout alone must not be assumed to invalidate every already-issued access token immediately.
- Add account recovery, individual access removal, and an audit history of sensitive reads and content changes.
- Acceptance: an ordinary authenticated user is denied; a revoked administrator loses access; MFA is enforced for protected operations; recovery is tested.

## Operational decisions to settle during implementation

| Decision | Proposed default |
| --- | --- |
| Initial admin audience | A small trusted team on transitional shared-password access; individual accounts before multiple CMS editors |
| Preview data | Separate test database and credentials |
| Bot protection | Distributed rate limits and a honeypot first; challenge if needed |
| Monitoring recipient and backup owner | Named site maintainer, to be supplied |
| Prayer-request access and retention | Explicitly agreed with the Lighthouse team before implementing access separation or automatic deletion |

Emails, bulk exports, content publishing, and a full CMS are outside this implementation plan's immediate scope.

## References

- [Deployment fix, PR #2](https://github.com/cloverdesign/light/pull/2)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [OWASP session management guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
