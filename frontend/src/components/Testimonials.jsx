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
        {items.map((t, i) => (
          <article
            key={i}
            className="bg-clinic-sage/40 rounded-[1.5rem] p-7 border border-clinic-forest/10 relative overflow-hidden"
            data-testid={`testimonial-${i}`}
          >
            <Quote className="absolute top-5 right-5 h-6 w-6 text-clinic-forest/30" />
            <p className="text-clinic-navy text-[15px] leading-relaxed font-medium">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm font-semibold text-clinic-navy">{t.author || "— Client"}</div>
              {t.tag && (
                <span className="text-[11px] uppercase tracking-widest font-bold text-clinic-forest bg-white/80 rounded-full px-3 py-1">
                  {t.tag}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
