import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSmartSite } from "../context/SmartSiteContext";

export const SERVICES = [
  { slug: "wellness-exams", title: "Wellness Exams", blurb: "Annual checkups that catch problems early.", intent_hint: "wellness" },
  { slug: "vaccinations", title: "Vaccinations", blurb: "Core & lifestyle vaccines tailored to your pet.", intent_hint: "wellness" },
  { slug: "dental-care", title: "Dental Care", blurb: "Cleanings, extractions, and long-term dental health.", intent_hint: "treatments" },
  { slug: "surgery", title: "Surgery & Spay/Neuter", blurb: "Safe, modern surgical protocols performed onsite.", intent_hint: "treatments" },
  { slug: "laser-therapy", title: "Laser Therapy", blurb: "Drug-free pain relief and faster healing.", intent_hint: "senior" },
  { slug: "prp-therapy", title: "PRP & Regenerative Medicine", blurb: "Regenerative treatments for joints, tendons, and healing.", intent_hint: "senior" },
  { slug: "parasite-prevention", title: "Parasite Prevention", blurb: "Fleas, ticks, heartworm — year-round protection.", intent_hint: "wellness" },
  { slug: "microchipping", title: "Microchipping", blurb: "Permanent ID in case your pet slips out.", intent_hint: "wellness" },
  { slug: "senior-care", title: "Senior Pet Care", blurb: "Comfort, mobility and quality-of-life support.", intent_hint: "senior" },
  { slug: "emergency-care", title: "Emergency & Urgent", blurb: "Triage during business hours; guidance after hours.", intent_hint: "health_concerns" },
];

export default function Services() {
  const { track } = useSmartSite();
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12" data-testid="services-page">
      <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">
        What we do
      </div>
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-clinic-navy mt-3 max-w-3xl leading-[1.02]">
        Care that grows with your pet&mdash;from first visits to senior years.
      </h1>
      <p className="mt-5 text-clinic-mist max-w-2xl text-lg">
        From preventive care to advanced surgery and regenerative medicine, every service is delivered
        calmly, thoughtfully, and in-house.
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            onClick={() =>
              track({
                signalType: "cta_click",
                label: `service:${s.slug}`,
                subIntent: s.intent_hint,
                strength: 2,
              })
            }
            className="group bg-white rounded-[1.5rem] p-7 border border-sand-300/60 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_22px_42px_rgba(0,0,0,0.08)]"
            data-testid={`service-card-${s.slug}`}
          >
            <div className="font-display font-bold text-xl text-clinic-navy">{s.title}</div>
            <p className="mt-2 text-sm text-clinic-mist leading-relaxed">{s.blurb}</p>
            <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-clinic-forest group-hover:text-clinic-clay">
              Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
