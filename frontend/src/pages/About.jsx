import React from "react";
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
        always believed it should be practiced &mdash; unhurried, evidence-based, and deeply connected to
        the families she serves.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { n: "Years", v: "15+" },
          { n: "Happy families", v: "5,000+" },
          { n: "Modalities onsite", v: "10" },
        ].map((s) => (
          <div key={s.n} className="bg-white rounded-[1.5rem] p-7 border border-sand-300/60">
            <div className="font-display text-4xl font-extrabold text-clinic-navy">{s.v}</div>
            <div className="text-xs uppercase tracking-widest text-clinic-forest font-semibold mt-2">
              {s.n}
            </div>
          </div>
        ))}
      </div>

      <TeamSection />
      <ContactSection />
    </div>
  );
}
