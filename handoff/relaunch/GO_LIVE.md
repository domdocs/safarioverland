# Go-live checklist — self-drive relaunch

The social calendar starts **Monday 16 November 2026**, so the site needs to be live by the end of **Friday 13 November**. Work through this in order.

## Before merging

1. Review the site locally at http://localhost:3000 (see REVIEW_GUIDE.md), including the route prices in `ROUTE_COSTING.md`.
2. Push the branch `feat/self-drive-relaunch` and open a PR against `main` (CLAUDE.md rule 7: no merge without the PR). Check the Vercel preview, especially the video heroes and the route maps.
3. Fix the www certificate in Vercel (independent of the PR, do it any time): Project → Settings → Domains → add `www.safarioverland.com` as a 308 redirect to `safarioverland.com`. Then check that `curl -I https://www.safarioverland.com/` returns 308.

## Merge, then the database (same day)

4. Merge the PR.
5. Apply the briefs migration (CLAUDE.md rule 8):

   ```bash
   supabase migration list
   ```

   ```bash
   supabase db push
   ```

   It adds the self-drive brief fields and the ad-tracking columns. It also fixes the `budget_tier = 'discuss'` constraint (D-17). Before pushing, confirm the constraint's name on the remote:

   ```sql
   SELECT conname FROM pg_constraint WHERE conrelid = 'briefs'::regclass AND contype = 'c';
   ```

6. Retire Linkwasha and Somalisa from the collection (D-44). Rows are never deleted, only rejected (LISTINGS_AUDIT.md):

   ```sql
   UPDATE directory_listings
   SET status = 'rejected'
   WHERE listing_name IN ('Linkwasha Camp', 'Somalisa Camp');
   ```

   Check that it affected exactly 2 rows.

7. Update "The collection" description if it still reads "across Africa … exclusive private reserves" (D-50). Find where it's stored first (a `categories` table or a settings row); the replacement text is: *Camps and lodges in southern Africa we'd send a friend to, chosen for what they give you at the end of a day's drive.*

## Check production (not the preview)

8. Redirects: `/destinations`, `/destinations/east-africa`, `/destinations/west-africa`, `/destinations/north-africa`, `/community` and the deleted Field Notes each land on a live page.
9. `/sitemap.xml` lists `/routes`, the three routes, the three `/self-drive/*` pages and the self-drive Field Notes, and none of the deleted pages.
10. Send one real test brief through `/plan` and check that the self-drive answers appear in the admin and the planner email.
11. Load the site with `?gclid=TEST` and submit a test brief. Check that the click ID is saved with it, then delete that test brief.

## After launch

12. Write the CHANGELOG entry.
13. Start the Google Ads campaign (US$500 a month; see marketing/PAID_SEARCH_PLAN.md).
14. Post week 1 from marketing/SOCIAL_RELAUNCH.md, starting Monday 16 November.
15. Still open: the email footer postal address, the reply-to inbox, and the consent wording for follow-up emails (D-35).
