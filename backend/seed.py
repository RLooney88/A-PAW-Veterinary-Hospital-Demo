"""Idempotent seed:
    - admin user (from env ADMIN_EMAIL / ADMIN_PASSWORD)
    - core surfaces (home_hero, intent_selector, featured_care, proof, faq, appointment_intro, inline_cta)
    - default switches per parent intent / sub-intent
"""
from __future__ import annotations

import asyncio
import logging
import os

from sqlalchemy import select

from auth import hash_password
from database import AsyncSessionLocal, Base, engine
from models import Surface, Switch, User

logger = logging.getLogger(__name__)


# ---------- Surface specs ----------
HERO_DEFAULT = {
    "eyebrow": "Trusted Care for Every Paw",
    "headline": "Compassionate veterinary care for your whole family.",
    "subheadline": "Annapolis Veterinary & Wellness has been caring for Annapolis pets for years — wellness, surgery, dental, emergencies, and beyond.",
    "primary_cta_label": "Schedule a Visit",
    "primary_cta_href": "/appointment",
    "secondary_cta_label": "Call (410) 224-6624",
    "secondary_cta_href": "tel:+14102246624",
    "image_url": "https://cdcssl.ibsrv.net/ibimg/smb/1100x940_80/webmgr/02/s/r/banner-image-1100x940.png.webp",
    "badge": "Family-owned clinic in Annapolis, MD",
}

FEATURED_DEFAULT = {
    "heading": "Comprehensive services for every life stage.",
    "cards": [
        {"title": "Wellness Exams", "description": "Annual checkups that catch problems early.", "href": "/services/wellness-exams", "icon": "stethoscope"},
        {"title": "Vaccinations", "description": "Core & lifestyle vaccines on a schedule that fits your pet.", "href": "/services/vaccinations", "icon": "shield"},
        {"title": "Dental Care", "description": "Cleanings, extractions, and preventive dental health.", "href": "/services/dental-care", "icon": "tooth"},
        {"title": "Surgery", "description": "Spay/neuter plus advanced procedures performed onsite.", "href": "/services/surgery", "icon": "scissors"},
        {"title": "Laser Therapy", "description": "Non-invasive pain relief and faster recovery.", "href": "/services/laser-therapy", "icon": "sparkles"},
        {"title": "PRP & Regenerative", "description": "Cutting-edge regenerative treatments for joints & healing.", "href": "/services/prp-therapy", "icon": "activity"},
    ],
}

PROOF_DEFAULT = {
    "heading": "Families across Annapolis trust us with their pets.",
    "testimonials": [
        {
            "quote": "Dr. Hamilton's love, knowledge and respect for animals is unparalleled. She does not waste your money on unnecessary tests yet does everything she can to find the problem and get your pet healthy.",
            "author": "Long-time client",
            "tag": "Wellness",
        },
        {
            "quote": "If I could give Annapolis Veterinary & Wellness more stars, I would! From their receptionists to techs to doctors, they are all kind, attentive, understanding and knowledgeable.",
            "author": "First-time dog owner",
            "tag": "New Puppy",
        },
        {
            "quote": "Karen performed ACL surgery on my beagle. She is pretty much back to her normal self. Everyone is very friendly and professional.",
            "author": "Beagle mom",
            "tag": "Surgery",
        },
    ],
}

FAQ_DEFAULT = {
    "heading": "Answers that help you help your pet.",
    "items": [
        {
            "q": "My new puppy needs vaccines — how soon should we come in?",
            "a": "As early as 6–8 weeks for the first puppy visit. We'll design a vaccine schedule based on your puppy's age and lifestyle and talk through spay/neuter timing, house-training, and nutrition.",
            "intent": "dogs", "sub_intent": "new_puppy",
        },
        {
            "q": "My cat stopped eating or is hiding — should I be worried?",
            "a": "Cats hide illness well, so sudden changes in appetite, behavior, or litter-box habits deserve a same-day call. We'll triage over the phone and get you in quickly if needed.",
            "intent": "cats", "sub_intent": "health_concerns",
        },
        {
            "q": "My senior dog is slowing down — can you help with arthritis or pain?",
            "a": "Yes — we combine laser therapy, joint support, multimodal pain management, and PRP/regenerative medicine to keep older dogs comfortable and mobile. Senior consults include a tailored quality-of-life plan.",
            "intent": "dogs", "sub_intent": "senior",
        },
        {
            "q": "Do you see exotic pets — rabbits, reptiles, birds, or small mammals?",
            "a": "We see select non-dog, non-cat pets. Call us first and we'll be honest about whether we're the right clinic for your species, or refer you to a specialist we trust.",
            "intent": "critters", "sub_intent": "husbandry",
        },
        {
            "q": "Do you perform spay/neuter surgery — and at what age?",
            "a": "Yes, on site. Recommended age varies by species, breed, and size — we'll talk through the ideal timing for your pet at their wellness visit.",
            "sub_intent": "treatments",
        },
        {
            "q": "My dog's breath is bad and there's plaque — do you do dental cleanings?",
            "a": "Yes. We perform full anesthetic dental cleanings with digital dental X-rays and extractions when needed. Dental disease is one of the most under-treated issues we see in dogs.",
            "intent": "dogs", "sub_intent": "treatments",
        },
        {
            "q": "How often should my indoor cat get wellness exams and vaccines?",
            "a": "Annual wellness for adult cats, twice-yearly for seniors. Even indoor cats need core vaccines and screening — many feline illnesses are silent until they're serious.",
            "intent": "cats", "sub_intent": "wellness",
        },
        {
            "q": "Do you offer laser therapy or PRP / regenerative medicine?",
            "a": "Yes — Class IV laser therapy for pain, inflammation, and healing, and Platelet-Rich Plasma (PRP) for joints, soft-tissue injuries, and chronic pain where medications aren't enough.",
            "sub_intent": "treatments",
        },
        {
            "q": "Something seems wrong with my pet right now — can I come in today?",
            "a": "Call us. During business hours we triage most urgent concerns same-day. For true emergencies after hours we'll direct you to the nearest 24/7 ER so your pet gets care fast.",
            "sub_intent": "health_concerns",
        },
        {
            "q": "Do you take new patients, and what happens at the first visit?",
            "a": "Yes — we love meeting new families. First visits are roughly 45 minutes: full exam, health history, lifestyle chat, and a custom care plan. Bring any previous records you have.",
            "sub_intent": "wellness",
        },
    ],
}

APPOINTMENT_INTRO_DEFAULT = {
    "eyebrow": "Request a visit",
    "headline": "Let's get your pet on the schedule.",
    "subheadline": "Tell us a little about your pet and we'll follow up to confirm a time that works.",
    "reassurance": "Same-week appointments typical. For urgent concerns, please call (410) 224-6624.",
}

INTENT_SELECTOR_DEFAULT = {
    "heading": "Who are we caring for today?",
    "subheading": "Tap your pet type and we'll tailor the site around their needs.",
    "cards": [
        {"intent": "dogs", "title": "Dogs", "description": "Puppies, adults, seniors — we've got you.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1000x563_80/webmgr/02/s/r/shutterstock_2225178095_16x9.jpg.webp"},
        {"intent": "cats", "title": "Cats", "description": "Gentle, low-stress feline medicine.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/720x960_80/webmgr/02/s/r/51361429_2235127750060442_2837072696418762752_n.jpg.webp"},
        {"intent": "critters", "title": "Other Critters", "description": "Exotics, small mammals & more — let's see if we're a fit.", "image": "https://images.unsplash.com/photo-1555634819-ce681c6e258c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxwZXQlMjBidW5ueSUyMHJhYmJpdCUyMGd1aW5lYSUyMHBpZ3xlbnwwfHx8fDE3NzY0NDk2NTl8MA&ixlib=rb-4.1.0&q=85"},
    ],
}

INLINE_CTA_DEFAULT = {
    "headline": "Ready when you are.",
    "body": "Tell us about your pet and we'll take it from here.",
    "primary_cta_label": "Request an appointment",
    "primary_cta_href": "/appointment",
}

SURFACES = [
    {"slug": "home_hero", "name": "Home Hero", "page": "home",
     "description": "Main hero on the homepage — swaps copy + image per intent.",
     "default_content": HERO_DEFAULT},
    {"slug": "intent_selector", "name": "Parent-Intent Selector", "page": "home",
     "description": "Three big pet-type cards that set intent explicitly.",
     "default_content": INTENT_SELECTOR_DEFAULT},
    {"slug": "home_featured_care", "name": "Featured Care Grid", "page": "home",
     "description": "Reorders / swaps featured services based on intent.",
     "default_content": FEATURED_DEFAULT},
    {"slug": "home_proof", "name": "Proof / Testimonials", "page": "home",
     "description": "Testimonials emphasised by intent.",
     "default_content": PROOF_DEFAULT},
    {"slug": "home_faq", "name": "Home FAQ", "page": "home",
     "description": "FAQ content swapped per intent.",
     "default_content": FAQ_DEFAULT},
    {"slug": "appointment_intro", "name": "Appointment Intro", "page": "appointment",
     "description": "Copy above the appointment form — echoes intent back.",
     "default_content": APPOINTMENT_INTRO_DEFAULT},
    {"slug": "inline_cta", "name": "Inline CTA (condition/service pages)", "page": "service",
     "description": "Inline CTA block shown on service/condition pages.",
     "default_content": INLINE_CTA_DEFAULT},
]


# ---------- Switch specs (keyed by surface slug) ----------
HERO_SWITCHES = [
    {
        "name": "Dogs — Default",
        "rule": {"intent": "dogs"},
        "priority": 100,
        "content": {
            **HERO_DEFAULT,
            "eyebrow": "Caring for Annapolis Dogs",
            "headline": "Tails wag when you walk in the door.",
            "subheadline": "From first-puppy visits to senior care, we treat every dog like family.",
            "image_url": "https://cdcssl.ibsrv.net/ibimg/smb/1000x563_80/webmgr/02/s/r/shutterstock_2225178095_16x9.jpg.webp",
            "primary_cta_label": "Book a Dog Visit",
        },
    },
    {
        "name": "Dogs → New Puppy",
        "rule": {"intent": "dogs", "sub_intent": "new_puppy"},
        "priority": 50,
        "content": {
            **HERO_DEFAULT,
            "eyebrow": "New Puppy? Congrats!",
            "headline": "A strong start for your new best friend.",
            "subheadline": "Vaccine schedules, spay/neuter timing and early preventive care — all in one friendly visit.",
            "image_url": "https://images.unsplash.com/photo-1767101607738-c93754ce5220?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwzfHxjdXRlJTIwcHVwcHklMjBkb2clMjBmYWNlfGVufDB8fHx8MTc3NjQ0OTY1OXww&ixlib=rb-4.1.0&q=85",
            "primary_cta_label": "Book Puppy's First Visit",
        },
    },
    {
        "name": "Dogs → Senior Care",
        "rule": {"intent": "dogs", "sub_intent": "senior"},
        "priority": 50,
        "content": {
            **HERO_DEFAULT,
            "eyebrow": "Senior Dog Care",
            "headline": "Comfort, mobility, and quality of life.",
            "subheadline": "Laser therapy, arthritis support, and chronic-condition monitoring for older dogs.",
            "image_url": "https://cdcssl.ibsrv.net/ibimg/smb/1761x1293_80/webmgr/02/s/r/screen-shot-2019-06-21-at-91523-pm.png.webp",
            "primary_cta_label": "Senior Wellness Consult",
        },
    },
    {
        "name": "Cats — Default",
        "rule": {"intent": "cats"},
        "priority": 100,
        "content": {
            **HERO_DEFAULT,
            "eyebrow": "Gentle Feline Medicine",
            "headline": "Calm, low-stress care your cat will tolerate.",
            "subheadline": "We go slow, we listen, and we put comfort first.",
            "image_url": "https://cdcssl.ibsrv.net/ibimg/smb/720x960_80/webmgr/02/s/r/51361429_2235127750060442_2837072696418762752_n.jpg.webp",
            "primary_cta_label": "Book a Cat Visit",
        },
    },
    {
        "name": "Cats → New Kitten",
        "rule": {"intent": "cats", "sub_intent": "new_kitten"},
        "priority": 50,
        "content": {
            **HERO_DEFAULT,
            "eyebrow": "New Kitten? Welcome!",
            "headline": "The healthiest start for your new kitten.",
            "subheadline": "Kitten vaccines, spay/neuter timing, and gentle first visits.",
            "image_url": "https://images.unsplash.com/photo-1759564795768-4d6b43846406?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxjdXRlJTIwa2l0dGVuJTIwbG9va2luZyUyMHVwfGVufDB8fHx8MTc3NjQ0OTY1OXww&ixlib=rb-4.1.0&q=85",
            "primary_cta_label": "Book Kitten's First Visit",
        },
    },
    {
        "name": "Critters — Default",
        "rule": {"intent": "critters"},
        "priority": 100,
        "content": {
            **HERO_DEFAULT,
            "eyebrow": "Other Critters Welcome",
            "headline": "Gentle, species-appropriate care beyond dogs & cats.",
            "subheadline": "Let's talk about your pet and see if we're the right fit for their needs.",
            "image_url": "https://images.unsplash.com/photo-1555634819-ce681c6e258c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxwZXQlMjBidW5ueSUyMHJhYmJpdCUyMGd1aW5lYSUyMHBpZ3xlbnwwfHx8fDE3NzY0NDk2NTl8MA&ixlib=rb-4.1.0&q=85",
            "primary_cta_label": "Contact the Clinic",
            "primary_cta_href": "/appointment",
        },
    },
    {
        "name": "Health Concerns (any species)",
        "rule": {"sub_intent": "health_concerns"},
        "priority": 40,
        "content": {
            **HERO_DEFAULT,
            "eyebrow": "Worried About Your Pet?",
            "headline": "Let's figure this out together.",
            "subheadline": "Describe what's going on and we'll guide you to the next best step — today.",
            "primary_cta_label": "Request an Urgent Visit",
            "secondary_cta_label": "Call (410) 224-6624",
        },
    },
]


FEATURED_SWITCHES = [
    {
        "name": "Dogs — Featured",
        "rule": {"intent": "dogs"},
        "priority": 100,
        "content": {
            "heading": "Popular care for dogs.",
            "cards": [
                {"title": "Puppy & Dog Vaccinations", "description": "Core + lifestyle on a flexible schedule.", "href": "/services/vaccinations", "icon": "shield"},
                {"title": "Dental Care", "description": "Cleanings, extractions, and plaque prevention.", "href": "/services/dental-care", "icon": "tooth"},
                {"title": "Laser Therapy", "description": "Drug-free pain relief for arthritis and recovery.", "href": "/services/laser-therapy", "icon": "sparkles"},
                {"title": "Spay / Neuter", "description": "Safe, modern protocols — on site.", "href": "/services/surgery", "icon": "scissors"},
                {"title": "PRP & Regenerative", "description": "Regenerative medicine for joints & healing.", "href": "/services/prp-therapy", "icon": "activity"},
                {"title": "Parasite Prevention", "description": "Flea, tick and heartworm protection year-round.", "href": "/services/parasite-prevention", "icon": "bug"},
            ],
        },
    },
    {
        "name": "Cats — Featured",
        "rule": {"intent": "cats"},
        "priority": 100,
        "content": {
            "heading": "Popular care for cats.",
            "cards": [
                {"title": "Cat Vaccinations", "description": "Core feline vaccines tailored to lifestyle.", "href": "/services/vaccinations", "icon": "shield"},
                {"title": "Feline Dental Care", "description": "Often overlooked — and critical for cats.", "href": "/services/dental-care", "icon": "tooth"},
                {"title": "Senior Cat Care", "description": "Chronic-condition monitoring and quality-of-life support.", "href": "/services/senior-care", "icon": "heart"},
                {"title": "Spay / Neuter", "description": "Gentle, modern feline protocols.", "href": "/services/surgery", "icon": "scissors"},
                {"title": "Laser Therapy", "description": "Comfort for aging joints and healing.", "href": "/services/laser-therapy", "icon": "sparkles"},
                {"title": "Microchipping", "description": "Permanent ID in case they slip out.", "href": "/services/microchipping", "icon": "cpu"},
            ],
        },
    },
    {
        "name": "Critters — Featured",
        "rule": {"intent": "critters"},
        "priority": 100,
        "content": {
            "heading": "How we help non-dog, non-cat pets.",
            "cards": [
                {"title": "First-visit consults", "description": "Let's talk about your pet and see if we're a fit.", "href": "/appointment", "icon": "stethoscope"},
                {"title": "Wellness & husbandry", "description": "Environment, nutrition, and preventive care basics.", "href": "/services/wellness-exams", "icon": "leaf"},
                {"title": "Species-specific diagnostics", "description": "In-house lab & imaging where appropriate.", "href": "/services/wellness-exams", "icon": "activity"},
            ],
        },
    },
    {
        "name": "Senior emphasis",
        "rule": {"sub_intent": "senior"},
        "priority": 40,
        "content": {
            "heading": "Comfort & mobility for senior pets.",
            "cards": [
                {"title": "Laser Therapy", "description": "Drug-free pain relief for stiff, aging joints.", "href": "/services/laser-therapy", "icon": "sparkles"},
                {"title": "PRP & Regenerative Medicine", "description": "Cutting-edge regenerative options.", "href": "/services/prp-therapy", "icon": "activity"},
                {"title": "Chronic-condition Monitoring", "description": "Bloodwork & imaging tailored to aging pets.", "href": "/services/wellness-exams", "icon": "heart"},
            ],
        },
    },
]

INTENT_SELECTOR_SWITCHES = [
    {
        "name": "Dogs selected — nudge sub-intent",
        "rule": {"intent": "dogs"},
        "priority": 100,
        "content": {
            "heading": "What are we helping your dog with?",
            "subheading": "Tap what fits best — the site will adjust.",
            "cards": [
                {"intent": "dogs", "sub_intent": "new_puppy", "title": "New Puppy", "description": "First visits, vaccines, spay/neuter timing.", "image": "https://images.unsplash.com/photo-1767101607738-c93754ce5220?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwzfHxjdXRlJTIwcHVwcHklMjBkb2clMjBmYWNlfGVufDB8fHx8MTc3NjQ0OTY1OXww&ixlib=rb-4.1.0&q=85"},
                {"intent": "dogs", "sub_intent": "wellness", "title": "Wellness & Preventive", "description": "Annual exams, vaccines, parasite prevention.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1000x563_80/webmgr/02/s/r/shutterstock_2225178095_16x9.jpg.webp"},
                {"intent": "dogs", "sub_intent": "health_concerns", "title": "Something's Wrong", "description": "Describe symptoms — we'll guide you.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1761x1293_80/webmgr/02/s/r/screen-shot-2019-06-21-at-91523-pm.png.webp"},
                {"intent": "dogs", "sub_intent": "senior", "title": "Senior Dog Care", "description": "Mobility, arthritis and quality-of-life support.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1546x1295_80/webmgr/02/s/r/screen-shot-2019-06-21-at-92223-pm.png.webp"},
                {"intent": "dogs", "sub_intent": "treatments", "title": "Specific Treatments", "description": "Dental, surgery, laser, PRP.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1152x1152_80/webmgr/02/s/r/13116461_1728398937399995_1801395013260039740_o.jpg.webp"},
            ],
        },
    },
    {
        "name": "Cats selected — nudge sub-intent",
        "rule": {"intent": "cats"},
        "priority": 100,
        "content": {
            "heading": "What are we helping your cat with?",
            "subheading": "Pick the closest fit — copy will update across the site.",
            "cards": [
                {"intent": "cats", "sub_intent": "new_kitten", "title": "New Kitten", "description": "First visits, vaccines, early preventive care.", "image": "https://images.unsplash.com/photo-1759564795768-4d6b43846406?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxjdXRlJTIwa2l0dGVuJTIwbG9va2luZyUyMHVwfGVufDB8fHx8MTc3NjQ0OTY1OXww&ixlib=rb-4.1.0&q=85"},
                {"intent": "cats", "sub_intent": "wellness", "title": "Wellness & Preventive", "description": "Gentle annual exams and vaccines.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/720x960_80/webmgr/02/s/r/51361429_2235127750060442_2837072696418762752_n.jpg.webp"},
                {"intent": "cats", "sub_intent": "health_concerns", "title": "Something's Wrong", "description": "Hiding, not eating, vomiting — let's triage.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1761x1293_80/webmgr/02/s/r/screen-shot-2019-06-21-at-91523-pm.png.webp"},
                {"intent": "cats", "sub_intent": "senior", "title": "Senior Cat Care", "description": "Aging support and chronic-condition monitoring.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1546x1295_80/webmgr/02/s/r/screen-shot-2019-06-21-at-92223-pm.png.webp"},
                {"intent": "cats", "sub_intent": "treatments", "title": "Specific Treatments", "description": "Dental, surgery, laser, PRP.", "image": "https://cdcssl.ibsrv.net/ibimg/smb/1152x1152_80/webmgr/02/s/r/13116461_1728398937399995_1801395013260039740_o.jpg.webp"},
            ],
        },
    },
]

APPOINTMENT_INTRO_SWITCHES = [
    {
        "name": "Dogs intent",
        "rule": {"intent": "dogs"},
        "priority": 100,
        "content": {
            **APPOINTMENT_INTRO_DEFAULT,
            "eyebrow": "Request a dog visit",
            "headline": "Let's get your dog on the schedule.",
            "subheadline": "A few quick details and we'll follow up to confirm.",
        },
    },
    {
        "name": "Cats intent",
        "rule": {"intent": "cats"},
        "priority": 100,
        "content": {
            **APPOINTMENT_INTRO_DEFAULT,
            "eyebrow": "Request a cat visit",
            "headline": "Let's get your cat in for a gentle visit.",
            "subheadline": "Tell us a bit about your kitty and we'll take it from there.",
        },
    },
    {
        "name": "Critters intent",
        "rule": {"intent": "critters"},
        "priority": 100,
        "content": {
            **APPOINTMENT_INTRO_DEFAULT,
            "eyebrow": "Reach out",
            "headline": "Let's see if we're the right clinic for your pet.",
            "subheadline": "Tell us about your critter and we'll confirm what we can help with.",
            "reassurance": "We'll be upfront if we need to refer out for species-specific specialty care.",
        },
    },
    {
        "name": "Health concerns — urgency",
        "rule": {"sub_intent": "health_concerns"},
        "priority": 50,
        "content": {
            **APPOINTMENT_INTRO_DEFAULT,
            "eyebrow": "We're here to help",
            "headline": "Tell us what's going on.",
            "subheadline": "Describe symptoms and timing — we'll reach out quickly to guide you.",
            "reassurance": "If this is truly urgent, please call (410) 224-6624 right now.",
        },
    },
]

PROOF_SWITCHES = [
    {
        "name": "Surgery emphasis",
        "rule": {"sub_intent": "treatments"},
        "priority": 100,
        "content": {
            "heading": "Recovery stories from our families.",
            "testimonials": [
                {"quote": "Karen performed ACL surgery on my beagle. She is pretty much back to her normal self.", "author": "Beagle mom", "tag": "Surgery"},
                {"quote": "Heather and Lena did the follow-up laser treatment. Everyone is very friendly and professional.", "author": "Post-op client", "tag": "Laser Therapy"},
            ],
        },
    },
]

SWITCH_SPECS: dict[str, list[dict]] = {
    "home_hero": HERO_SWITCHES,
    "home_featured_care": FEATURED_SWITCHES,
    "intent_selector": INTENT_SELECTOR_SWITCHES,
    "appointment_intro": APPOINTMENT_INTRO_SWITCHES,
    "home_proof": PROOF_SWITCHES,
}


async def seed() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    admin_email = os.environ["ADMIN_EMAIL"]
    admin_password = os.environ["ADMIN_PASSWORD"]

    async with AsyncSessionLocal() as db:
        # --- Admin user ---
        res = await db.execute(select(User).where(User.email == admin_email))
        user = res.scalar_one_or_none()
        if not user:
            user = User(
                email=admin_email,
                password_hash=hash_password(admin_password),
                name="Annapolis Vet Admin",
                role="admin",
            )
            db.add(user)
            logger.info("Seeded admin user %s", admin_email)

        # --- Surfaces ---
        surface_by_slug: dict[str, Surface] = {}
        for spec in SURFACES:
            res = await db.execute(select(Surface).where(Surface.slug == spec["slug"]))
            existing = res.scalar_one_or_none()
            if existing:
                surface_by_slug[spec["slug"]] = existing
                continue
            s = Surface(**spec)
            db.add(s)
            await db.flush()
            surface_by_slug[spec["slug"]] = s
            logger.info("Seeded surface %s", spec["slug"])

        await db.flush()

        # --- Switches ---
        for slug, switch_list in SWITCH_SPECS.items():
            surface = surface_by_slug.get(slug)
            if not surface:
                continue
            for sw_spec in switch_list:
                res = await db.execute(
                    select(Switch).where(
                        Switch.surface_id == surface.id, Switch.name == sw_spec["name"]
                    )
                )
                existing = res.scalar_one_or_none()
                if existing:
                    continue
                sw = Switch(surface_id=surface.id, **sw_spec)
                db.add(sw)

        await db.commit()
        logger.info("Seed complete.")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(seed())
