# Annapolis Veterinary & Wellness - Smart Site

## 1. Original Problem Statement
Rebuild annapolisvet.com as a **Smart Site** that tracks visitor intent (Signals) to dynamically swap content (Switches) in designated areas (Surfaces). Use PostgreSQL on Railway, JWT auth, Dribbble "Pet Care" template layout with Annapolis Vet brand colors.

## 2. Architecture
- **Backend**: FastAPI + SQLAlchemy async + Postgres (Railway). JWT admin auth. SendGrid email (pending key). Chatbot via emergentintegrations (GPT-4o-mini, Emergent Universal Key for demo).
- **Frontend**: React 19 + React Router 7 + Tailwind + Shadcn/UI. SmartSiteProvider context manages session, signals, surfaces.
- **Data model**: users, visitor_sessions, signal_events, surfaces, switches, lead_submissions, webhook_configs, chatbot_config, chat_messages.

## 3. What's Implemented
- [x] Postgres schema & seed (Railway)
- [x] JWT admin auth
- [x] Signal tracking + dynamic intent scoring (intent shifts with new signals)
- [x] 8 surfaces x switches CRUD (home_hero, intent_selector, sub_intent_prompt, home_featured_care, home_proof, home_faq, appointment_intro, inline_cta)
- [x] Dynamic Hero / Featured Care / Intent Selector / Appointment Intro / FAQ / Testimonials / Inline CTA surfaces
- [x] Lead submissions + intent summary + signal trail
- [x] Outbound webhook API (fires on lead creation with full browsing history)
- [x] SendGrid email (ready, needs API key)
- [x] Admin: Overview analytics, Leads panel, Surfaces/Switches editor (text fields), Sessions, Chatbot config
- [x] Chatbot: GPT-4o-mini, admin-editable prompt/training/guardrails, configurable provider/model/key
- [x] Real Google reviews (21) tagged by intent, rotating carousel (3 at a time)
- [x] Canonical animal pages (/dogs, /cats, /critters) with distinct hero images
- [x] "Small & Exotic Pets" naming (no "Other Critters")
- [x] Dynamic inline CTA on Home, About, Services pages
- [x] Two-column FAQ layout with intent-specific FAQ switches
- [x] Intent selector cards navigate to animal pages
- [x] Admin link in footer
- [x] No em-dashes, no "tailoring/personalizing" language

## 4. Backlog

### P0 - before launch
- Add SENDGRID_API_KEY + verified sender
- Replace demo chatbot with production chat widget (when ready)
- Replace default JWT_SECRET & ADMIN_PASSWORD
- Point production domain + SSL

### P1 - near-term
- Switch-level A/B testing
- Per-surface admin preview
- CSV export of leads
- Blog / content cluster with intent tagging

### P2 - nice to have
- Weighted decay on intent scores
- Multi-admin with roles
- Audit log
- Frontend SSR/SSG for SEO

## 5. API Reference
Public: POST /api/sessions/init, POST /api/signals/track, GET /api/surfaces/{slug}/content, POST /api/leads, POST /api/chat
Admin (Bearer JWT): /api/admin/login, /api/admin/me, /api/admin/surfaces, /api/admin/switches, /api/admin/leads, /api/admin/sessions, /api/admin/webhooks, /api/admin/chatbot-config, /api/admin/analytics/overview
