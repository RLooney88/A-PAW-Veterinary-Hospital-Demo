import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Phone } from "lucide-react";
import { useSurface } from "../hooks/useSurface";
import { useSmartSite } from "../context/SmartSiteContext";

export default function InlineCTA() {
  const { content, loading } = useSurface("inline_cta");
  const { track } = useSmartSite();

  if (loading || !content) return null;

  const { headline, body, primary_cta_label, primary_cta_href } = content;

  return (
    <section className="mt-24" data-testid="inline-cta">
      <div className="bg-clinic-navy rounded-[2rem] p-10 lg:p-14 relative overflow-hidden grain">
        <div className="max-w-3xl relative z-10">
          <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-clinic-amber">
            Schedule a visit
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-sand-50 leading-[1.1]">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-sand-100/85 leading-relaxed max-w-xl">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={primary_cta_href || "/appointment"}
              onClick={() => track({ signalType: "cta_click", label: "inline_cta:schedule" })}
              className="inline-flex items-center gap-2 bg-clinic-red hover:bg-clinic-red-hover text-white rounded-full px-8 py-4 font-semibold shadow-xl shadow-clinic-red/30 transition-transform hover:-translate-y-0.5"
              data-testid="inline-cta-primary"
            >
              <PawPrint className="h-4 w-4" />
              {primary_cta_label || "Request an appointment"}
            </Link>
            <a
              href="tel:+14102246624"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-sand-50 rounded-full px-7 py-4 font-semibold transition-colors"
              data-testid="inline-cta-phone"
            >
              <Phone className="h-4 w-4" /> Call (410) 224-6624
            </a>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-clinic-red/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-16 h-60 w-60 rounded-full bg-clinic-amber/15 blur-3xl" />
      </div>
    </section>
  );
}
