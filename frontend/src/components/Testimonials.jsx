import React from "react";
import { Quote } from "lucide-react";
import { useSurface } from "../hooks/useSurface";

export default function Testimonials() {
  const { content, loading } = useSurface("home_proof");
  if (loading || !content) return null;
  const items = content.testimonials || [];

  return (
    <section className="mt-24" data-testid="testimonials">
      <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">Pet-stimonials</div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-clinic-navy mt-3 max-w-2xl">
        {content.heading || "Families across Annapolis trust us with their pets."}
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((t, i) => {
          // Alternate tints so the section isn't all one color
          const tint =
            i % 3 === 0
              ? "bg-clinic-red text-sand-50 border-clinic-red/30"
              : i % 3 === 1
              ? "bg-clinic-peach text-clinic-navy border-clinic-peachDeep/70"
              : "bg-clinic-sage text-clinic-navy border-clinic-forest/15";
          const quoteColor = i % 3 === 0 ? "text-white/40" : "text-clinic-forest/30";
          const tagBg = i % 3 === 0 ? "bg-white/15 text-white" : "bg-white/80 text-clinic-forest";
          return (
            <article
              key={i}
              className={`relative overflow-hidden rounded-[1.5rem] p-7 border ${tint}`}
              data-testid={`testimonial-${i}`}
            >
              <Quote className={`absolute top-5 right-5 h-7 w-7 ${quoteColor}`} />
              <p className={`text-[15px] leading-relaxed font-medium ${i % 3 === 0 ? "text-white" : "text-clinic-navy"}`}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className={`text-sm font-semibold ${i % 3 === 0 ? "text-white" : "text-clinic-navy"}`}>
                  {t.author || "— Client"}
                </div>
                {t.tag && (
                  <span className={`text-[11px] uppercase tracking-widest font-bold rounded-full px-3 py-1 ${tagBg}`}>
                    {t.tag}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
