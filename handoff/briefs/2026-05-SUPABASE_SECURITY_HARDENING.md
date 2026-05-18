> ✓ **SHIPPED** — 2026-05-18, folded into PR #12 (Trip Designer
> Phases 1–4) via an early commit; the migration applied alongside
> the itineraries schema.
> See `handoff/CHANGELOG.md` for the session-level summary.

# Supabase security hardening

Four discrete fixes triggered by the Supabase security advisor. All
ship in a single migration. Two are unambiguous; two need a quick
audit before deciding the right shape (analytics tables, contact
messages policy).

Six other advisor warnings are documented as out-of-scope here with
reasoning — don't accidentally fix them, they're either by-design
or platform-level operations Dom handles separately.

## Branch

```bash
git checkout main
git pull
git checkout -b feature/supabase-security-hardening
```

## Migration filename

`supabase/migrations/20260517_security_hardening.sql` (or use today's
date — match the existing date-prefixed convention).

---

## Fix 1 — Drop overly permissive bucket SELECT policies

**The problem:** the broad SELECT policies on `storage.objects` for
`listing-media` and `article-assets` allow anyone to enumerate every
file in the buckets via `/storage/v1/object/list/<bucket>`. Public
URL access via `/storage/v1/object/public/<bucket>/<path>` does
**not** depend on these policies — it bypasses RLS at the bucket
level for buckets flagged "public".

**The fix:** drop the policies. Verify before merging that the
buckets are flagged as public at the bucket level (they should be,
based on PR #5 setup) — if for some reason a bucket isn't public-
flagged, dropping the SELECT policy would break image rendering on
the public site.

### Migration

```sql
-- Drop overly permissive listing policies on public buckets.
-- Public bucket URL access continues to work via the
-- /object/public/<bucket>/<path> endpoint, which bypasses RLS.
-- Dropping these policies only removes the ability to LIST
-- bucket contents anonymously.

DROP POLICY IF EXISTS "public can read listing media" ON storage.objects;
DROP POLICY IF EXISTS "SOv1 n4bupm_0" ON storage.objects;
```

### Pre-flight check

Before applying the migration, verify both buckets are flagged public
in Supabase Studio:

- Storage → `listing-media` → Settings → Public: should be **ON**
- Storage → `article-assets` → Settings → Public: should be **ON**

If either is OFF, do not drop its policy without also flagging the
bucket public. The policy and the public-flag are alternative ways
to allow URL access; we need at least one.

### Post-flight verification

After applying:

1. From an incognito browser, hit a known image URL from each bucket
   — e.g. `https://<project>.supabase.co/storage/v1/object/public/listing-media/<some-listing-id>/hero/<file>.webp`
   Should load normally.
2. Hit the list endpoint from incognito — e.g.
   `https://<project>.supabase.co/storage/v1/object/list/listing-media`
   Should return 401 / empty / forbidden depending on Supabase's
   behaviour. The key thing: anonymous enumeration of bucket
   contents must fail.
3. Confirm the public listing pages on the live site still render
   their photography correctly — same images, same URLs.

---

## Fix 2 — Pin function search_path

**The problem:** `update_updated_at_column` and
`mint_reference_for_year` are defined without an explicit
`search_path`, which leaves them mildly vulnerable to a
search-path-based attack if a privileged role could be persuaded
to call them with a malicious search_path. Defence-in-depth, not
an active exploit.

**The fix:** one `ALTER FUNCTION` per function to pin the path.

### Migration

```sql
-- Pin search_path on internal helper functions to avoid the
-- function_search_path_mutable advisor warning.
ALTER FUNCTION public.update_updated_at_column()
  SET search_path = pg_catalog, public;

ALTER FUNCTION public.mint_reference_for_year(integer)
  SET search_path = pg_catalog, public;
```

No application impact. The functions continue to work identically.

---

## Fix 3 — Audit and (probably) drop analytics tables

**The problem:** `analytics` and `analytics_events` tables have
unrestricted INSERT policies for `anon`. This may have been by
design for an earlier custom-analytics pipeline. Since PR #9
shipped Vercel Analytics as the canonical analytics solution,
these tables may be dead code.

**The audit:** before deciding, check whether anything in the
codebase still writes to these tables.

```bash
rg "from\.?\(['\"]analytics" app/ lib/ --type ts --type tsx
rg "into\.?\(['\"]analytics" app/ lib/ --type ts --type tsx
rg "supabase.*\.from\(['\"]analytics" app/ lib/ --type ts --type tsx
```

Two outcomes:

### If grep returns no application code references

The tables are dead. Drop them and the policies go with them.

```sql
DROP TABLE IF EXISTS analytics_events;
DROP TABLE IF EXISTS analytics;
```

### If grep returns active references

The tables are still in use somewhere — perhaps a legacy event-
logging path that wasn't fully migrated to Vercel Analytics. In
that case:

1. Leave the tables and policies as-is for now (the anon INSERT
   warning is acceptable for analytics use cases — the design is
   intentional, the warning is a false-positive)
2. Document the situation in this brief's PR description
3. Flag a follow-up to either migrate the remaining writes to
   Vercel Analytics or accept the warning permanently

---

## Fix 4 — Resolve contact_messages INSERT policy

**The problem:** the policy named `"Service role can insert contact
messages"` is actually granted to role `-` (PUBLIC), not service
role. Either the name is wrong or the scope is wrong. The right
shape depends on how `/api/contact/route.ts` actually inserts.

**The audit:** check which Supabase client the contact endpoint uses.

```bash
rg "from\(['\"]contact_messages" app/api/contact/ lib/
cat app/api/contact/route.ts | head -50
```

Look for whether it imports `getSupabaseServerClient` (uses service
role key) or the regular `createClient` from `@supabase/supabase-js`
(uses anon key).

Two outcomes:

### If the route uses the service role (server-side client)

The policy should be restricted to service role only. The anon INSERT
capability is unnecessary and unsafe.

```sql
DROP POLICY IF EXISTS "Service role can insert contact messages" ON contact_messages;
CREATE POLICY "service role can insert contact messages"
  ON contact_messages FOR INSERT
  TO service_role
  WITH CHECK (true);
```

### If the route uses anon (client-side write)

The policy is correct in intent (anon needs to insert) but
misnamed. Rename it for clarity and tighten the WITH CHECK if
possible (e.g. require basic field validation at the policy
level, though zod in the route handler is the primary defence).

```sql
DROP POLICY IF EXISTS "Service role can insert contact messages" ON contact_messages;
CREATE POLICY "anyone can submit a contact message"
  ON contact_messages FOR INSERT
  WITH CHECK (
    char_length(name) > 0
    AND char_length(email) > 0
    AND char_length(message) > 0
  );
```

(Replace field names with the actual columns on `contact_messages`.)

**Default recommendation:** the contact form pattern in this codebase
routes through server-side API endpoints (see how `/api/contact/`,
`/api/admin/listings/import/`, etc. work). So the route is almost
certainly using service role. The policy should be restricted —
take the first outcome.

---

## Out of scope (don't touch)

Six other warnings the advisor flagged are deliberately not in this
brief. Documented for clarity:

### `briefs` INSERT for public — by design

The `/plan` flow accepts brief submissions from anonymous visitors.
That's the entire product. The "anyone can submit a brief" RLS
policy is correct. Don't change it.

### `auth_leaked_password_protection` — not applicable

The site uses HTTP Basic Auth for admin (via middleware). No
Supabase Auth user accounts exist. The warning only matters if
Supabase Auth is wired up for end-user accounts in future. Leave
disabled until that changes.

### `auth_insufficient_mfa_options` — not applicable

Same reasoning. We're not using Supabase Auth.

### `vulnerable_postgres_version` — Dom handles in Supabase Studio

Postgres 15.8.1 has patches available. The upgrade is a one-click
operation in Supabase Studio (Settings → Infrastructure → Upgrade
Project), not a migration. Dom schedules and runs this himself
during a quiet moment — it takes about 10 minutes and the project
goes briefly offline.

---

## Migration template

Combine all the SQL fixes into a single migration. Order matters —
audits inform conditional pieces.

```sql
-- 20260517_security_hardening.sql
--
-- Address security advisor warnings:
-- 1. Drop overly permissive bucket SELECT policies
--    (public_bucket_allows_listing)
-- 2. Pin search_path on helper functions
--    (function_search_path_mutable)
-- 3. Drop dead analytics tables OR leave with documentation
--    (rls_policy_always_true on analytics / analytics_events)
-- 4. Rename or restrict contact_messages INSERT policy
--    (rls_policy_always_true on contact_messages)
--
-- See handoff/briefs/2026-05-SUPABASE_SECURITY_HARDENING.md

-- 1. Bucket SELECT policies
DROP POLICY IF EXISTS "public can read listing media" ON storage.objects;
DROP POLICY IF EXISTS "SOv1 n4bupm_0" ON storage.objects;

-- 2. Function search_path
ALTER FUNCTION public.update_updated_at_column()
  SET search_path = pg_catalog, public;
ALTER FUNCTION public.mint_reference_for_year(integer)
  SET search_path = pg_catalog, public;

-- 3. Analytics tables — conditional on audit. Pick one branch:
--
-- Branch A (no code references — drop):
-- DROP TABLE IF EXISTS analytics_events;
-- DROP TABLE IF EXISTS analytics;
--
-- Branch B (still in use — leave with documentation in PR description)

-- 4. contact_messages policy — conditional on audit. Pick one branch:
--
-- Branch A (route uses service role — restrict):
-- DROP POLICY IF EXISTS "Service role can insert contact messages" ON contact_messages;
-- CREATE POLICY "service role can insert contact messages"
--   ON contact_messages FOR INSERT
--   TO service_role
--   WITH CHECK (true);
--
-- Branch B (route uses anon — rename + tighten):
-- DROP POLICY IF EXISTS "Service role can insert contact messages" ON contact_messages;
-- CREATE POLICY "anyone can submit a contact message"
--   ON contact_messages FOR INSERT
--   WITH CHECK (...);
```

---

## Verify

After applying the migration:

1. **Bucket access:** public image URLs still load in incognito.
   Anonymous list endpoints return 401/empty.
2. **Function calls:** create a new itinerary (exercises
   `mint_reference_for_year`), edit any record (exercises
   `update_updated_at_column`) — both should still work.
3. **Analytics tables:** if dropped, no tests fail; if left, no
   behavioural change. Either way, verify the site analytics on
   Vercel are unaffected (Vercel Analytics is independent of
   these tables).
4. **Contact form:** submit a test message via the public contact
   form. Should land in `contact_messages` and trigger the
   notification email.
5. **Supabase security advisor:** re-run after deployment. Five
   warnings should drop off (two bucket, two function, one
   contact_messages). Up to two may remain if analytics tables
   are kept by design (document in PR).

## Tests

- No new unit tests required — these are infrastructure changes.
- Verify existing tests still pass: `pnpm test` and `pnpm test:unit`.
- Add a manual smoke-test note to the PR description for the four
  verifications above.

## Done means

- Migration ships and applies cleanly
- Bucket SELECT policies dropped; public image URLs continue to work
- Function search_paths pinned
- Analytics tables either dropped (preferred, if dead) or
  documented as kept-by-design
- contact_messages policy correctly scoped to its actual use case
- Security advisor re-run; five of the seven SQL-fixable warnings
  drop off (assuming analytics gets dropped — four if kept)
- PR description references this brief and notes the audit outcomes
  for items 3 and 4 (which branch was taken and why)
