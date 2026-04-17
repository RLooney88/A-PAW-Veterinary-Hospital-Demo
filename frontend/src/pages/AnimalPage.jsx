import React, { useEffect, useMemo } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useSmartSite } from "../context/SmartSiteContext";
import { SERVICES } from "./Services";

/**
 * Per-animal landing page. URL → intent map:
 *   /dogs     → dogs
 *   /cats     → cats
 *   /critters → critters
 *
 * Each page scopes the service grid to what's most relevant for the animal
 * and reinforces the intent signal on mount.
 */

const ANIMALS = {
  dogs: {
    slug: "dogs",
    title: "Dogs",
    hero_headline: "Care that keeps their tail wagging.",
    hero_eyebrow: "Annapolis Dogs",
    hero_copy:
      "From first-puppy visits to senior comfort, we treat every dog with the calm, thoughtful care you'd give a member of the family.",
    image:
      "https://cdcssl.ibsrv.net/ibimg/smb/1000x563_80/webmgr/02/s/r/shutterstock_2225178095_16x9.jpg.webp",
    // Ordered list of service slugs most relevant for dogs
    services: [
      "wellness-exams",
      "vaccinations",
      "dental-care",
      "surgery",
      "parasite-prevention",
      "laser-therapy",
      "prp-therapy",
      "microchipping",
      "senior-care",
      "emergency-care",
    ],
    highlights: [
      { title: "Puppy Starter Visits", body: "Vaccine series, spay/neuter timing, and early preventive care — all in one friendly visit." },
      { title: "Laser Therapy for Arthritis", body: "Drug-free pain relief for stiff, aging joints." },
      { title: "In-house Surgery", body: "From spay/neuter to ACL repair, performed with modern monitoring onsite." },
    ],
  },
  cats: {
    slug: "cats",
    title: "Cats",
    hero_headline: "Gentle, low-stress feline medicine.",
    hero_eyebrow: "Annapolis Cats",
    hero_copy:
      "We take cats at their pace — quiet rooms, slow hands, and a team that listens. Feline wellness, dental, senior, and specific treatments all in one place.",
    image:
      "https://cdcssl.ibsrv.net/ibimg/smb/720x960_80/webmgr/02/s/r/51361429_2235127750060442_2837072696418762752_n.jpg.webp",
    services: [
      "wellness-exams",
      "vaccinations",
      "dental-care",
      "senior-care",
      "surgery",
      "laser-therapy",
      "microchipping",
      "parasite-prevention",
      "emergency-care",
    ],
    highlights: [
      { title: "Feline-friendly handling", body: "Quiet exam rooms and a calm approach to keep stress low." },
      { title: "Dental — often overlooked", body: "Cats hide pain. We screen, clean, and extract when needed." },
      { title: "Senior cat support", body: "Chronic-condition monitoring, kidney care, and quality-of-life conversations." },
    ],
  },
  critters: {
    slug: "critters",
    title: "Other Critters",
    hero_headline: "Non-dog, non-cat pets welcome.",
    hero_eyebrow: "Other Critters",
    hero_copy:
      "Exotics, small mammals and the occasional unexpected friend. Let's chat about your pet and confirm whether we're the right fit for their species-specific care.",
    image:
      "https://images.unsplash.com/photo-1555634819-ce681c6e258c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxwZXQlMjBidW5ueSUyMHJhYmJpdCUyMGd1aW5lYSUyMHBpZ3xlbnwwfHx8fDE3NzY0NDk2NTl8MA&ixlib=rb-4.1.0&q=85",
    services: [
      "wellness-exams",
      "parasite-prevention",
      "microchipping",
      "emergency-care",
    ],
    highlights: [
      { title: "Fit-first consults", body: "Short conversation with our team to confirm if we're the right home for your critter." },
      { title: "Husbandry & nutrition support", body: "Environment, feeding, and general care practices." },
      { title: "Honest referrals", body: "If your species needs a specialist, we'll help you find one." },
    ],
  },
};

const SLUG_ALIASES = {
  dog: "dogs",
  cat: "cats",
  critter: "critters",
  "other-critters": "critters",
};

export default function AnimalPage() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, "").split("/")[0];
  const key = SLUG_ALIASES[slug] || slug;
  const animal = ANIMALS[key];
  const { setIntent, track, parentIntent } = useSmartSite();

  // Reinforce the intent on mount (acts as a strong signal and also handles
  // direct navigation — e.g. a search engine sending someone straight to /dogs).
  useEffect(() => {
    if (!animal) return;
    if (parentIntent !== animal.slug) {
      setIntent(animal.slug, null, { label: `animal_page:${animal.slug}` });
    } else {
      track({
        signalType: "page_view",
        label: `animal_page:${animal.slug}`,
        intent: animal.slug,
        strength: 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const scopedServices = useMemo(
    () => (animal ? animal.services.map((sl) => SERVICES.find((s) => s.slug === sl)).filter(Boolean) : []),
    [animal]
  );

  if (!animal) return <Navigate to="/404" replace />;

  return (
    <div data-testid={`animal-page-${animal.slug}`}>
      {/* Full-bleed hero scoped to this animal */}
      <section className="relative w-full min-h-[78vh] overflow-hidden">
        <img
          key={animal.image}
          src={animal.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-clinic-navy/85 via-clinic-navy/55 to-clinic-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-clinic-ink/75 via-transparent to-transparent" />
        <div className="absolute inset-0 grain pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 h-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 lg:pt-40 pb-16">
            <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-clinic-amber">
              {animal.hero_eyebrow}
            </div>
            <h1
              className="mt-4 font-display text-5xl sm:text-6xl lg:text-[80px] leading-[1.02] font-extrabold tracking-tight text-sand-50 max-w-3xl"
              data-testid="animal-hero-headline"
            >
              {animal.hero_headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg lg:text-xl text-sand-100/90 leading-relaxed">
              {animal.hero_copy}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/appointment"
                onClick={() =>
                  track({
                    signalType: "cta_click",
                    label: `animal_cta:${animal.slug}`,
                    intent: animal.slug,
                    strength: 2,
                  })
                }
                className="inline-flex items-center gap-2 bg-clinic-clay hover:bg-clinic-clay-hover text-white rounded-full px-8 py-4 font-semibold shadow-xl shadow-clinic-clay/30 transition-transform hover:-translate-y-0.5"
                data-testid={`animal-cta-${animal.slug}`}
              >
                Request a {animal.title.replace(/s$/, "").toLowerCase()} visit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+14102246624"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-sand-50 rounded-full px-7 py-4 font-semibold transition-colors"
              >
                <Phone className="h-4 w-4" /> Call (410) 224-6624
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Highlights */}
        <section className="mt-20 grid gap-5 md:grid-cols-3" data-testid="animal-highlights">
          {animal.highlights.map((h, i) => (
            <article key={i} className="bg-white rounded-[1.5rem] p-7 border border-sand-300/60">
              <div className="text-[11px] uppercase tracking-widest font-bold text-clinic-forest">
                {`0${i + 1}`.slice(-2)}
              </div>
              <div className="mt-3 font-display font-bold text-xl text-clinic-navy">{h.title}</div>
              <p className="mt-2 text-sm text-clinic-mist leading-relaxed">{h.body}</p>
            </article>
          ))}
        </section>

        {/* Scoped services */}
        <section className="mt-20" data-testid="animal-services">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">
                Services for {animal.title}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-clinic-navy mt-3 max-w-2xl">
                Everything we commonly do for {animal.title.toLowerCase()}.
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-bold text-clinic-forest hover:text-clinic-navy"
            >
              See all services →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scopedServices.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                onClick={() =>
                  track({
                    signalType: "cta_click",
                    label: `animal_service:${animal.slug}:${s.slug}`,
                    intent: animal.slug,
                    subIntent: s.intent_hint,
                    strength: 2,
                  })
                }
                className="group bg-white rounded-[1.5rem] p-7 border border-sand-300/60 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_22px_42px_rgba(0,0,0,0.08)]"
                data-testid={`animal-service-card-${s.slug}`}
              >
                <div className="font-display font-bold text-xl text-clinic-navy">{s.title}</div>
                <p className="mt-2 text-sm text-clinic-mist leading-relaxed">{s.blurb}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-clinic-forest group-hover:text-clinic-clay">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-link to other animals */}
        <section className="mt-20" data-testid="animal-crosslinks">
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">
            Different pet?
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-clinic-navy mt-2">
            Tailor the site for them too.
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(ANIMALS)
              .filter((a) => a.slug !== animal.slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  to={`/${a.slug}`}
                  className="group relative rounded-[1.5rem] overflow-hidden h-40 block"
                  data-testid={`animal-crosslink-${a.slug}`}
                >
                  <img src={a.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-clinic-navy/80 via-clinic-navy/40 to-transparent" />
                  <div className="relative z-10 h-full flex items-end p-5 text-sand-50">
                    <div>
                      <div className="text-xs uppercase tracking-[0.22em] font-bold text-clinic-amber">{a.hero_eyebrow}</div>
                      <div className="font-display text-xl font-bold mt-1">See care for {a.title}</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export { ANIMALS };
