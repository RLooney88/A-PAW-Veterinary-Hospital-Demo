# Annapolis Veterinary & Wellness - Smart Site

## 1. Original Problem Statement
Rebuild annapolisvet.com as a **Smart Site** that tracks visitor intent (Signals) to dynamically swap content (Switches) in designated areas (Surfaces). Use PostgreSQL on Railway, JWT auth, Dribbble "Pet Care" template layout with Annapolis Vet brand colors.

## 2. Architecture
- **Backend**: FastAPI + SQLAlchemy async + Postgres (Railway). JWT admin auth + JWT client portal auth. SendGrid email (pending key). Chatbot via emergentintegrations (GPT-4o-mini). Webhook outbound API.
- **Frontend**: React 19 + React Router 7 + Tailwind + Shadcn/UI. SmartSiteProvider context manages session, signals, surfaces. Portal with separate client auth.
- **Data model**: users, visitor_sessions, signal_events, surfaces, switches, lead_submissions, webhook_configs, chatbot_config, chat_messages, clients, pets, client_pet_links, pet_contacts, pet_health_records, pet_appointments.

## 3. What's Implemented
- [x] Postgres schema & seed (Railway)
- [x] JWT admin auth + JWT client portal auth
- [x] Signal tracking + dynamic intent scoring (chat signals carry 8x weight)
- [x] 8 surfaces x switches CRUD
- [x] Dynamic Hero / Featured Care / Intent Selector / Appointment Intro / FAQ / Testimonials / Inline CTA
- [x] Lead submissions + intent summary + signal trail + outbound webhooks
- [x] Admin: Overview, Leads, Surfaces (text field editor), Sessions, Chatbot config
- [x] Chatbot (GPT-4o-mini): fires intent signals, admin-editable prompt/training/guardrails/model/key
- [x] Real Google reviews (21) rotating carousel, intent-specific
- [x] Canonical animal pages (/dogs, /cats, /critters)
- [x] Dynamic Services page: Dogs (16 services), Cats (16), Rabbits (15), Guinea Pigs (15) with images
- [x] Service detail pages with full descriptions and CTAs
- [x] Client Portal: login, pet dashboard, health records, vaccination history, appointment history
- [x] Health indicators (bloodwork/fecal/dental) with green/amber status + hover warnings
- [x] Dynamic inline CTA on Home, About, Services, ServiceDetail pages (with background images + navy gradient overlay, intent-specific images for Dogs/Cats/Critters)
- [x] Two-column FAQ with intent-specific switches
- [x] "Small & Exotic Pets" naming throughout
- [x] No em-dashes, no "tailoring/personalizing" language

## 4. Backlog

### P0 - before launch
- Add SENDGRID_API_KEY + verified sender
- Replace stock service images with custom generated ones
- Replace default JWT_SECRET & ADMIN_PASSWORD
- Point production domain + SSL

### P1 - near-term
- Service-level intent signal firing
- Admin management of service content
- Pet photo upload functionality
- Blog/content cluster with intent tagging
- CSV export of leads

### P2 - nice to have
- Appointment booking from portal
- Practice management system integration
- Multi-admin with roles
- Weighted decay on intent scores
- Frontend SSR/SSG for SEO

## 5. Key Pages
- `/` - Home (dynamic hero, featured care, intent selector, CTA, FAQs, testimonials, team, contact)
- `/services` - Dynamic services (tabs: Dogs/Cats/Rabbits/Guinea Pigs + urgent care)
- `/services/:slug` - Service detail
- `/dogs`, `/cats`, `/critters` - Canonical animal pages
- `/about` - About + dynamic CTA
- `/appointment` - Appointment request form
- `/portal/login` - Client portal login
- `/portal` - Pet dashboard
- `/portal/pets/:id` - Pet health detail
- `/admin/login` - Admin login
- `/admin` - Admin dashboard (overview, leads, surfaces, chatbot, sessions)

## Changelog
- 2026-06-04: Fixed P0 "Clear Intent" footer bug. `clearIntent` now forces `/sessions/init` to mint a brand-new session token (`existing_token: null` via `init({force:true})`), nulls React state, and wipes `avw_surface_v3_*` per-intent surface caches so old intent content can't repaint on navigation. Verified via curl (fresh session returns parent_intent=None) + screenshot (home stays neutral after Clear → nav → return).

