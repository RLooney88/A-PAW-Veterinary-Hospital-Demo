import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Phone } from "lucide-react";
import TeamSection from "../components/TeamSection";
import ContactSection from "../components/ContactSection";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12" data-testid="about-page">
      <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">About the clinic</div>
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-clinic-navy mt-3 max-w-3xl leading-[1.02]">
        A calm, thorough, family-owned clinic in Annapolis.
      </h1>
      <p className="mt-6 text-lg text-clinic-mist max-w-2xl leading-relaxed">
        Dr. Karen Hamilton opened Annapolis Veterinary &amp; Wellness to practice medicine the way she
        always believed it should be practiced: unhurried, evidence-based, and deeply connected to
        the families she serves.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { n: "Years", v: "15+", tint: "bg-clinic-red text-sand-50", numColor: "text-white", labelColor: "text-clinic-amber" },
          { n: "Happy families", v: "5,000+", tint: "bg-clinic-peach border border-clinic-peachDeep/60", numColor: "text-clinic-navy", labelColor: "text-clinic-red" },
          { n: "Modalities onsite", v: "10", tint: "bg-clinic-sage border border-clinic-forest/15", numColor: "text-clinic-navy", labelColor: "text-clinic-forest" },
        ].map((s) => (
          <div key={s.n} className={`rounded-[1.5rem] p-7 ${s.tint}`}>
            <div className={`font-display text-4xl font-extrabold ${s.numColor}`}>{s.v}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mt-2 ${s.labelColor}`}>
              {s.n}
            </div>
          </div>
        ))}
      </div>

      <TeamSection />

      <section className="mt-24" data-testid="about-cta">
        <div className="bg-clinic-navy rounded-[2rem] p-10 lg:p-14 relative overflow-hidden grain">
          <div className="max-w-3xl relative z-10">
            <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-clinic-amber">
              Schedule a visit
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-sand-50 leading-[1.1]">
              Ready to meet us? We'd love to meet your pet.
            </h2>
            <p className="mt-4 text-lg text-sand-100/85 leading-relaxed max-w-xl">
              Whether it's a first visit or a second opinion, give us a call or request an appointment online. We'll take it from here.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 bg-clinic-red hover:bg-clinic-red-hover text-white rounded-full px-8 py-4 font-semibold shadow-xl shadow-clinic-red/30 transition-transform hover:-translate-y-0.5"
                data-testid="about-cta-primary"
              >
                <PawPrint className="h-4 w-4" />
                Request an appointment
              </Link>
              <a
                href="tel:+14102246624"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-sand-50 rounded-full px-7 py-4 font-semibold transition-colors"
                data-testid="about-cta-phone"
              >
                <Phone className="h-4 w-4" /> Call (410) 224-6624
              </a>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-clinic-red/20 blur-3xl" />
          <div className="absolute -left-10 -bottom-16 h-60 w-60 rounded-full bg-clinic-amber/15 blur-3xl" />
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
