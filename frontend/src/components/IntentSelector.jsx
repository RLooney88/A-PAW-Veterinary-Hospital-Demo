import React from "react";
import { useSurface } from "../hooks/useSurface";
import { useSmartSite } from "../context/SmartSiteContext";
import { PawPrint } from "lucide-react";

export default function IntentSelector() {
  const { content, loading } = useSurface("intent_selector");
  const { setIntent, parentIntent } = useSmartSite();

  if (loading || !content) return null;

  const cards = content.cards || [];

  const handleSelect = (card) => {
    if (card.sub_intent) {
      setIntent(card.intent || parentIntent, card.sub_intent, { label: `sub_intent:${card.sub_intent}` });
    } else if (card.intent) {
      setIntent(card.intent, null, { label: `intent:${card.intent}` });
    }
    window.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <section className="mt-20" data-testid="intent-selector">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-red">
            Find care fast
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-clinic-navy mt-3">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="text-clinic-mist mt-2 max-w-xl">{content.subheading}</p>
          )}
        </div>
      </div>

      <div className={`grid gap-5 ${cards.length > 3 ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-3"}`}>
        {cards.map((card, i) => (
          <button
            key={`${card.intent}-${card.sub_intent || "parent"}-${i}`}
            onClick={() => handleSelect(card)}
            className="group relative text-left bg-white border border-sand-300/60 rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)]"
            data-testid={`intent-card-${card.sub_intent || card.intent}`}
          >
            {card.image && (
              <div className="relative h-44 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-5">
              <div className="font-display font-bold text-clinic-navy text-lg">{card.title}</div>
              <p className="text-sm text-clinic-mist mt-1 line-clamp-2">{card.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clinic-red group-hover:text-clinic-red-hover transition-colors">
                Choose
                <PawPrint className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
