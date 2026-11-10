# Phase 13 audit — Zanth

## Scope
One public school website and one protected /admin dashboard. No ERP portals. No deployment.

| Feature | Status | Issue | Severity | Required fix | Verification |
|---|---|---|---|---|---|
| Homepage and hero | Existing static implementation | Not linked to CMS; must preserve design | High | Connect approved content safely | Screenshot comparison, published-data test |
| News/announcements | Supabase query code exists | Column names and RLS not verified | High | Verify actual schema and policies | DB read tests |
| Contact form | Preview-only | No secure write | High | Server-side validation, rate limiting and insert | Submission/abuse tests |
| Admission inquiry | Preview-only | No secure write | High | Approved minimal fields and insert | Submission test |
| Admin login | Code present | No real account/session test | High | Authorized dev-account test | Auth and expiry tests |
| Password reset | Callback added | Provider email and redirect configuration unverified | High | Configure and test provider | Recovery-link test |
| Admin CMS | Generic editor | Guessed field names, limited results, no delete/upload/search | High | Schema-specific editors and validation | CRUD, RLS, pagination tests |
| Admin permissions | Role-code precheck and RLS | Actual permission grants not verified | Critical | Inspect role grants and RLS | Negative authorization tests |
| Supabase schema | User previously reported 38 RLS-enabled tables | No live access or detailed schema evidence | High | Read-only schema inspection | SQL checks |
| Media/storage | Not integrated | No upload, replacement or policy verification | High | Secure media library | Storage policy tests |
| Public pages | Mostly preview/static | Not synchronized with CMS | High | Published-only data queries | Public/admin sync tests |
| Mobile/accessibility | Existing responsive classes | No viewport/a11y test evidence | Medium | Test/fix layouts | 320–1920px browser checks |
| SEO | robots disallow all, sitemap empty | Indexing disabled intentionally until approval | Medium | Generate public sitemap when approved | Robots/sitemap tests |
| Dependencies | package.json present | No package-lock.json found | Medium | Install and commit lockfile | npm ci |
| Production build | Not executed | Unknown compile state | Critical | Typecheck, lint, build | Recorded command output |

## Fixes in this commit
- Added recovery-code/token callback for authorized administrator accounts.
- Added explicit session check and disabled reset form until authenticated.
- Hardened admin save response to reject zero-row updates rather than displaying a false success.
- Added input length and numeric validation for generic content fields.

## Unverified and blocked
No local checkout or npm installation is available through the GitHub connector; the local container could not resolve github.com. The school Supabase project is not connected. No authenticated admin account is available. Therefore build, SQL, CRUD, storage, browser and end-to-end tests are **not passed**.

## Deployment
No deployment, DNS, hosting or production credentials changed.
