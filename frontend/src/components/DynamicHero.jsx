import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Phone } from "lucide-react";
import { useSurface } from "../hooks/useSurface";
import { useSmartSite } from "../context/SmartSiteContext";
import AnimalButtons from "./AnimalButtons";

/**
 * Full-bleed, viewport-filling hero. Content is resolved server-side from
 * the `home_hero` surface and swapped via admin-managed switches.
 */
export default function DynamicHero() {
  const { content, matched, loading, inferredIntent } = useSurface("home_hero");
  const { parentIntent } = useSmartSite();

  if (loading || !content) {
    return (
      <section
        className="relative h-[92vh] min-h-[640px] animate-pulse bg-sand-200"
        data-testid="hero-skeleton"
      />
    );
  }

  const {
    eyebrow,
    headline,
    subheadline,
    primary_cta_label,
    primary_cta_href,
    secondary_cta_label,
    secondary_cta_href,
    image_url,
  } = content;

  return (
    <section
      className="relative w-full h-[92vh] min-h-[640px] overflow-hidden"
      data-testid="dynamic-hero"
      data-matched-switch={matched || "default"}
      data-inferred-intent={inferredIntent || "none"}
    >
      {/* Background image, cross-fades when intent changes via key */}
      <img
        key={image_url}
        src={image_url}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover animate-[fade-up_0.9s_ease-out_both]"
        data-testid="hero-image"
      />

      {/* Dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-clinic-navy/85 via-clinic-navy/55 to-clinic-navy/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-clinic-ink/80 via-transparent to-transparent" />
      {/* Subtle grain */}
      <div className="absolute inset-0 grain pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex flex-col justify-end pb-20 lg:pb-28">
          <div className="max-w-3xl animate-fade-up">
            {eyebrow && (
              <div className="mb-6" data-testid="hero-eyebrow-row">
                <span
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-bold text-sand-50/90"
                  data-testid="hero-eyebrow"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-clinic-red" /> {eyebrow}
                </span>
              </div>
            )}

            <h1
              className="font-display text-5xl sm:text-6xl lg:text-[88px] leading-[0.98] font-extrabold tracking-tight text-sand-50"
              data-testid="hero-headline"
            >
              {headline}
            </h1>

            {subheadline && (
              <p
                className="mt-6 max-w-xl text-lg lg:text-xl text-sand-100/90 leading-relaxed"
                data-testid="hero-subheadline"
              >
                {subheadline}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {!parentIntent ? (
                <AnimalButtons variant="hero" />
              ) : (
                <>
                  <Link
                    to={primary_cta_href || "/appointment"}
                    className="inline-flex items-center gap-2 bg-clinic-red hover:bg-clinic-red-hover text-white rounded-full px-8 py-4 font-semibold shadow-xl shadow-clinic-red/30 transition-transform hover:-translate-y-0.5"
                    data-testid="hero-primary-cta"
                  >
                    <PawPrint className="h-4 w-4" />
                    {primary_cta_label || "Schedule a Visit"}
                  </Link>
                  <a
                    href={secondary_cta_href || "tel:+14102246624"}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-sand-50 rounded-full px-7 py-4 font-semibold transition-colors"
                    data-testid="hero-secondary-cta"
                  >
                    <Phone className="h-4 w-4" /> {secondary_cta_label || "Call (410) 224-6624"}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
