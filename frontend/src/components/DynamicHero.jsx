import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useSurface } from "../hooks/useSurface";

export default function DynamicHero() {
  const { content, matched, loading } = useSurface("home_hero");
  if (loading || !content) {
    return <div className="h-[70vh] animate-pulse bg-sand-200/60 rounded-[2rem]" data-testid="hero-skeleton" />;
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
    badge,
  } = content;

  return (
    <section
      className="relative grid gap-8 lg:grid-cols-12 items-stretch"
      data-testid="dynamic-hero"
      data-matched-switch={matched || "default"}
    >
      <div className="lg:col-span-7 bg-clinic-navy text-sand-50 rounded-[2rem] p-10 lg:p-14 relative overflow-hidden grain">
        <div className="relative z-10 animate-fade-up">
          {eyebrow && (
            <span
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-clinic-amber mb-6"
              data-testid="hero-eyebrow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-clinic-amber" /> {eyebrow}
            </span>
          )}
          <h1
            className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] font-extrabold tracking-tight"
            data-testid="hero-headline"
          >
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-6 max-w-xl text-lg lg:text-xl text-sand-100/85 leading-relaxed" data-testid="hero-subheadline">
              {subheadline}
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to={primary_cta_href || "/appointment"}
              className="inline-flex items-center gap-2 bg-clinic-clay hover:bg-clinic-clay-hover text-white rounded-full px-7 py-4 font-semibold shadow-lg shadow-clinic-clay/25 transition-transform hover:-translate-y-0.5"
              data-testid="hero-primary-cta"
            >
              {primary_cta_label || "Schedule a Visit"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={secondary_cta_href || "tel:+14102246624"}
              className="inline-flex items-center gap-2 border border-sand-100/30 hover:border-sand-100/60 text-sand-50 rounded-full px-6 py-4 font-semibold transition-colors"
              data-testid="hero-secondary-cta"
            >
              <Phone className="h-4 w-4" /> {secondary_cta_label || "Call (410) 224-6624"}
            </a>
          </div>
          {badge && (
            <div className="mt-10 inline-flex items-center gap-2 text-xs text-sand-100/70 border border-white/15 rounded-full px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-clinic-amber animate-soft-pulse" />
              {badge}
            </div>
          )}
        </div>
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-clinic-forest/30 blur-3xl" />
        <div className="absolute -left-10 -bottom-20 h-72 w-72 rounded-full bg-clinic-clay/20 blur-3xl" />
      </div>

      <div className="lg:col-span-5 relative rounded-[2rem] overflow-hidden min-h-[380px] lg:min-h-[560px] bg-sand-200">
        {image_url && (
          <img
            src={image_url}
            alt="Caring for pets at Annapolis Vet"
            className="absolute inset-0 h-full w-full object-cover"
            data-testid="hero-image"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-clinic-navy/60 via-transparent to-transparent" />
        <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-clinic-forest font-semibold">Open today</div>
            <div className="text-sm font-semibold text-clinic-navy">See weekly hours in footer</div>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-clinic-navy bg-sand-100 hover:bg-clinic-sage rounded-full px-4 py-2 transition-colors"
            data-testid="hero-explore-services"
          >
            Explore services →
          </Link>
        </div>
      </div>
    </section>
  );
}
