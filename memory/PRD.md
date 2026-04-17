# Annapolis Veterinary & Wellness — Smart Site

## 1. Original Problem Statement
Rebuild annapolisvet.com as a **Smart Site** modelled after the Dribbble "Pet Care Veterinary Clinic" template, blended with Annapolis Vet brand assets (logo + team + clinic photos + hours + services).

A Smart Site is built on three primitives:
1. **Signals** — visitor interactions we track (page views, CTA clicks, form starts, intent selections, chat messages, FAQ opens).
2. **Surfaces** — page sections that swap content based on inferred intent (hero, intent selector, featured-care grid, testimonials, appointment intro, inline CTAs, FAQ).
3. **Switches** — admin-managed content rules (e.g. `intent=dogs + sub_intent=new_puppy → puppy hero`).

Admin backend must manage surfaces/switches, view lead submissions with intent summaries + full signal trails, and show analytics. External chat widget is embedded separately — the site exposes a `window.smartSite` JS API so the widget can push intent back.

## 2. Architecture
- **Backend**: FastAPI + SQLAlchemy async + **Postgres** (Railway in production; local Postgres in dev under supervisor). **No MongoDB. No emergentintegrations.** JWT admin auth (HS256, bcrypt passwords, 12-hour tokens). SendGrid email via the official `sendgrid` SDK (silently skipped if `SENDGRID_API_KEY` empty).
- **Frontend**: React 19 + React Router 7 + Tailwind + Shadcn/UI. Cabinet Grotesk (display) + Manrope (body) via Fontshare/Google Fonts. `SmartSiteProvider` React context manages anonymous session token, tracks signals, resolves surface content, and exposes `window.smartSite` globally. Recharts for admin analytics.
- **Data model**: `users`, `visitor_sessions` (JSONB intent_scores/sub_intent_scores), `signal_events` (append-only), `surfaces`, `switches`, `lead_submissions` (stores full `intent_summary` + `signal_trail` snapshot on submit).

## 3. Implementation Log

### 2026-02-17 — MVP complete
- Postgres 15 installed + supervisor-managed; DB `annapolisvet` seeded on app boot.
- 7 default surfaces: `home_hero`, `intent_selector`, `home_featured_care`, `home_proof`, `home_faq`, `appointment_intro`, `inline_cta`.
- Default switches per Dogs/Cats/Critters + sub-intents (new_puppy, new_kitten, senior, health_concerns, treatments).
- Public marketing site (Home, Services, Service Detail x 10, Appointment, About, 404) with real Annapolis Vet photos, hours (Mon 8-4 / Tue closed / Wed 12-7 / Thu 8-4 / Fri 8-3 / Sat 9-1 / Sun closed), address, phone.
- Dynamic Hero + Intent Selector + Featured Care + Testimonials + Team (5 real staff) + FAQ + Contact — all reactively re-render on intent change.
- `window.smartSite.{getSession,setIntent,trackSignal,clearIntent}` API for external chat widgets.
- Admin dashboard: Login, Overview (pie/bar charts), Leads (table + side sheet with intent summary + signal trail + status controls), Surfaces (accordion of surfaces -> switch editors with JSON content + rule dropdowns + priority + active toggle), Sessions (table + timeline).
- Lead-submission email via SendGrid — silently no-ops until `SENDGRID_API_KEY` is set.
- Testing agent: **backend 16/16 pass · frontend flows all green pass**.

### 2026-04-17 — Hero image fixes
- Replaced unrecognizable cat photo on `/cats` with a clear tabby cat portrait (green eyes, landscape orientation).
- Replaced dogs page hero (had a person) with a happy border collie, no people.
- Updated critters page with a better rabbit photo.
- Updated all 3 homepage hero switches in DB to use DIFFERENT animal photos from their respective pages (variety).
- Navbar dropdown opacity fix and em-dash cleanup carried over from previous session.

## 4. Users / Personas
- **Pet owner (primary visitor)** — wants to quickly find relevant care for their pet (dog/cat/critter) and book or call.
- **Clinic owner / admin** — needs to manage dynamic content without code, see leads with context, and understand visitor behavior.
- **External chat widget vendor** — reads/writes intent via `window.smartSite.*`.

## 5. Core Requirements (static)
- Signal -> intent -> surface -> switch resolution (verified).
- Admin CRUD for surfaces + switches; JWT-protected.
- Lead submission stores full intent snapshot (already implemented).
- No Emergent-specific dependencies at runtime; Postgres-backed.

## 6. What's Implemented
- [x] Postgres schema & seed
- [x] JWT admin auth
- [x] Signal tracking + intent scoring engine
- [x] 7 surfaces x switches CRUD
- [x] Dynamic Hero / Featured Care / Intent Selector / Appointment Intro / FAQ / Testimonials surfaces
- [x] Lead submissions + intent summary + signal trail
- [x] SendGrid email (ready; needs API key)
- [x] Admin overview analytics (Recharts)
- [x] Admin leads panel with signal timeline
- [x] Admin surfaces/switches visual editor
- [x] Admin sessions list + event timeline
- [x] `window.smartSite` global API for external chat widget
- [x] Real Annapolis Vet logo, team photos, clinic photos, hours, address, phone
- [x] Canonical animal pages (/dogs, /cats, /critters) with distinct hero images
- [x] Homepage hero switches with variety (different photos from pages)
- [x] No-people animal photos across all pages
- [x] Navbar dropdown solid white background (readable)
- [x] Em-dash cleanup across all text

## 7. Backlog (prioritised)

### P0 — before launch
- Add `SENDGRID_API_KEY` + verified sender; test real email.
- Embed external chat widget `<script>` in `public/index.html`; confirm `window.smartSite.setIntent()` round-trips.
- Replace default JWT_SECRET & ADMIN_PASSWORD (both in `backend/.env`).
- Point production domain + SSL.

### P1 — near-term
- Switch-level A/B testing (randomly pick between 2 switches with equal priority; log which was served).
- Per-surface preview in admin (see what each switch looks like without leaving admin).
- CSV export of leads.
- Per-page inline CTA surface (currently one shared surface — allow per-service overrides).
- Blog / content cluster with intent tagging (articles contribute signal weight).

### P2 — nice to have
- Weighted decay on intent scores over time (recent signals count more).
- Multi-admin with roles.
- Audit log of switch/surface changes.
- Frontend SSR/SSG build for SEO.
- Shadcn-style content block types (not raw JSON) in switch editor for less-technical admins.

## 8. Deployment Notes (Railway)
- Spin up a Postgres service -> copy `DATABASE_URL` into the backend service env.
- Backend service: `uvicorn server:app --host 0.0.0.0 --port $PORT`; set `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`, `CORS_ORIGINS` (comma-sep list of your domains).
- Frontend: set `REACT_APP_BACKEND_URL` -> `https://<backend-service>.up.railway.app` and deploy static build.
- First boot auto-runs `seed.py` (idempotent) and creates admin + surfaces + switches.

## 9. Handy API Reference
Public:
- `POST /api/sessions/init` -> `{ session_token, ... }`
- `POST /api/signals/track` -> updated session
- `GET  /api/surfaces/{slug}/content?session_token=...` -> switched content
- `POST /api/leads` -> creates lead with full intent summary

Admin (Bearer JWT):
- `POST /api/admin/login` / `GET /api/admin/me`
- `GET/POST/PATCH/DELETE /api/admin/surfaces`
- `POST/PATCH/DELETE /api/admin/switches`
- `GET/PATCH /api/admin/leads`
- `GET /api/admin/sessions` / `GET /api/admin/sessions/{id}/events`
- `GET /api/admin/analytics/overview`

## 10. Text Rules
- NO em-dashes anywhere on the site. Use commas, colons, or standard hyphens.
- NO user-facing text mentioning "tailoring", "personalizing", or "Smart site". The dynamic functionality is invisible to visitors.
