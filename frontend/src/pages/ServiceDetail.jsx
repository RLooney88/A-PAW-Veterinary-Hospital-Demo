import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useSmartSite } from "../context/SmartSiteContext";
import { useSurface } from "../hooks/useSurface";
import { SERVICES } from "./Services";

const SERVICE_CONTENT = {
  "wellness-exams": {
    eyebrow: "Preventive Care",
    h1: "Annual wellness exams that catch things early.",
    body: "A thorough nose-to-tail exam, a chat about lifestyle, and a custom preventive plan. We screen for dental, ortho, GI, skin, and behavior changes and adjust care as your pet ages.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/1761x1293_80/webmgr/02/s/r/screen-shot-2019-06-21-at-91523-pm.png.webp",
  },
  vaccinations: {
    eyebrow: "Vaccines",
    h1: "Core & lifestyle vaccines — scheduled around your pet.",
    body: "Puppy/kitten series, boosters, and lifestyle vaccines (bordetella, leptospirosis, lyme). We plan a cadence that's appropriate for your pet's age, lifestyle, and exposure.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/1000x563_80/webmgr/02/s/r/shutterstock_2225178095_16x9.jpg.webp",
  },
  "dental-care": {
    eyebrow: "Dentistry",
    h1: "Dental cleanings, extractions, and ongoing oral health.",
    body: "Dental disease is the most common health problem we see and the most under-treated. We perform full-mouth digital imaging, scaling, and extractions when needed — all under safe, monitored anesthesia.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/1546x1295_80/webmgr/02/s/r/screen-shot-2019-06-21-at-92223-pm.png.webp",
  },
  surgery: {
    eyebrow: "Surgery",
    h1: "Spay/neuter plus advanced surgical procedures.",
    body: "From routine spay/neuter and mass removals to ACL repair and abdominal surgery — we use modern monitoring and multi-modal pain management to keep your pet safe and comfortable.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/1152x1152_80/webmgr/02/s/r/13116461_1728398937399995_1801395013260039740_o.jpg.webp",
  },
  "laser-therapy": {
    eyebrow: "Laser Therapy",
    h1: "Drug-free pain relief & faster recovery.",
    body: "Class IV therapeutic laser helps with arthritis, post-op recovery, and soft tissue injuries — without drug side effects. Quiet, warm, and usually enjoyed by most pets.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/1761x1293_80/webmgr/02/s/r/screen-shot-2019-06-21-at-91523-pm.png.webp",
  },
  "prp-therapy": {
    eyebrow: "Regenerative Medicine",
    h1: "PRP & regenerative options for joints and healing.",
    body: "Platelet Rich Plasma (PRP) and regenerative medicine can help older joints, soft tissue injuries, and chronic pain where traditional meds fall short.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/3000x2000_80/webmgr/02/s/r/IMG1369.jpg.webp",
  },
  "parasite-prevention": {
    eyebrow: "Parasite Prevention",
    h1: "Year-round protection from fleas, ticks & heartworm.",
    body: "We recommend consistent year-round prevention for every pet in Maryland. We'll help you choose between chews, topicals, and combo products.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/1000x563_80/webmgr/02/s/r/shutterstock_2225178095_16x9.jpg.webp",
  },
  microchipping: {
    eyebrow: "Microchipping",
    h1: "A grain-of-rice ID that lasts a lifetime.",
    body: "Quick, low-stress implant at any wellness visit. We'll also help you register and keep contact info current.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/720x960_80/webmgr/02/s/r/51361429_2235127750060442_2837072696418762752_n.jpg.webp",
  },
  "senior-care": {
    eyebrow: "Senior Pet Care",
    h1: "Comfort, mobility, and quality-of-life support.",
    body: "For senior pets, we focus on pain management, mobility, chronic-condition monitoring, and gentle diagnostics — tailored to what matters most for your family.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/1546x1295_80/webmgr/02/s/r/screen-shot-2019-06-21-at-92223-pm.png.webp",
  },
  "emergency-care": {
    eyebrow: "Emergency & Urgent",
    h1: "Worried now? Call us first — we'll triage and guide.",
    body: "During business hours we'll triage most urgent concerns. After hours we'll direct you to the nearest 24/7 emergency hospital so your pet gets care fast.",
    img: "https://cdcssl.ibsrv.net/ibimg/smb/3000x2000_80/webmgr/02/s/r/IMG1369.jpg.webp",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  const { track, parentIntent } = useSmartSite();
  const { content: cta } = useSurface("inline_cta");

  useEffect(() => {
    if (!service) return;
    // Record strong sub-intent signal based on service category
    track({
      signalType: "page_view",
      pagePath: `/services/${slug}`,
      label: `service:${slug}`,
      subIntent: service.intent_hint,
      strength: 2,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center" data-testid="service-not-found">
        <h1 className="font-display text-4xl font-bold text-clinic-navy">Service not found</h1>
        <Link to="/services" className="mt-6 inline-flex text-clinic-forest font-bold">
          ← Back to services
        </Link>
      </div>
    );
  }

  const copy = SERVICE_CONTENT[slug] || {};

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12" data-testid={`service-page-${slug}`}>
      <Link to="/services" className="text-sm font-bold text-clinic-forest hover:text-clinic-navy">
        ← All services
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7">
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">
            {copy.eyebrow || service.title}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-clinic-navy mt-3 leading-[1.02]">
            {copy.h1 || service.title}
          </h1>
          <p className="mt-6 text-lg text-clinic-mist leading-relaxed max-w-2xl">
            {copy.body || service.blurb}
          </p>

          <div className="mt-10 bg-white rounded-[1.5rem] p-8 border border-sand-300/60">
            <div className="font-display font-bold text-xl text-clinic-navy">
              {cta?.headline || "Ready when you are."}
            </div>
            <p className="mt-2 text-clinic-mist">{cta?.body || "Tell us about your pet and we'll take it from here."}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={cta?.primary_cta_href || "/appointment"}
                onClick={() =>
                  track({ signalType: "cta_click", label: `service_inline:${slug}`, subIntent: service.intent_hint, strength: 2 })
                }
                className="inline-flex items-center gap-2 bg-clinic-clay hover:bg-clinic-clay-hover text-white rounded-full px-6 py-3 font-semibold"
                data-testid={`service-inline-cta-${slug}`}
              >
                {cta?.primary_cta_label || "Request an appointment"} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+14102246624"
                className="inline-flex items-center gap-2 border border-clinic-navy/15 hover:border-clinic-navy/40 text-clinic-navy rounded-full px-6 py-3 font-semibold"
              >
                <Phone className="h-4 w-4" /> (410) 224-6624
              </a>
            </div>
            {parentIntent && (
              <div className="mt-5 text-[11px] uppercase tracking-widest text-clinic-mist">
                Personalised for: <span className="text-clinic-navy font-bold">{parentIntent}</span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-[2rem] overflow-hidden bg-sand-200 min-h-[360px]">
          {copy.img && <img src={copy.img} alt={service.title} className="h-full w-full object-cover" />}
        </div>
      </div>
    </div>
  );
}
