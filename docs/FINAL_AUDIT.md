# Zanth school website — development audit

## Scope
Public school website and a single protected administration area. No student, teacher or parent portals. No school ERP expansion. Preserve the existing public theme and homepage hero design. Deployment is explicitly prohibited until approval.

## Verified from GitHub source
- Existing public routes include homepage, contact, admissions, news, announcements, academics, and FAQ.
- News and announcements index/detail routes query published Supabase records.
- Admin login and protected overview source exists; admin profile route added.
- Generic admin content forms and listings exist for several CMS tables, but the configured fields and permission names have not been checked against the actual Supabase schema.
- Contact form and admissions inquiry form remain previews; they do not submit records. Do not describe them as operational.
- The live school Supabase project is not connected to this development session. Prior user-provided verification: 38 public tables and all 38 with RLS enabled. This is not proof that policies grant intended access.
- Password recovery screens exist, but callback/token exchange, email configuration, rate limiting, and real-user verification are not complete.
- Public pages other than news/announcements still contain preview/static data.

## Critical blockers before completion
1. Obtain a read-only schema export or SQL-editor results (tables, columns, policies, triggers, role/permission rows) from the user's school project; do not assume guessed columns are correct.
2. Verify seeded permission names and secure server authorization, including read/write/publish distinctions and RLS.
3. Build safe server-side contact and admissions submissions with anti-abuse controls, and replace preview UI only after successful database integration.
4. Complete all CMS modules with field-specific validation, publish/unpublish, file upload, delete confirmation, search/filter/pagination and actual public-page integration.
5. Fix password recovery callback and auth session refresh flow. Do not claim login works without an authorized test account.
6. Install dependencies and regenerate the lockfile; run typecheck, lint and production build.
7. Test mobile layouts, accessibility, SEO, RLS, uploads and error paths in a development environment.
8. Confirm school name, official contact information and policies before publishing.
9. Prepare deployment checklist and await explicit approval. Do not deploy.

## Testing evidence
GitHub file reads and successful commits are confirmed. No local TypeScript, ESLint, production build, database integration or real login tests have been run in this session.

## Admin account setup (deferred)
Create a Supabase Auth user using the dashboard, then grant the verified Auth UUID an active owner/admin role using the approved schema. Configure Supabase publishable URL/key in the development environment and allowed redirect URLs for password recovery. Verify login, authorization and logout in a nonproduction environment before deployment. Never use a service-role key in client code.
