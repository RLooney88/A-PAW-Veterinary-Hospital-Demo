import React from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Bug,
  Cpu,
  Heart,
  Leaf,
  PawPrint,
  Scissors,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useSurface } from "../hooks/useSurface";
import { useSmartSite } from "../context/SmartSiteContext";

const ICONS = {
  stethoscope: Stethoscope,
  shield: Shield,
  tooth: Sparkles,
  scissors: Scissors,
  sparkles: Sparkles,
  activity: Activity,
  heart: Heart,
  cpu: Cpu,
  bug: Bug,
  leaf: Leaf,
};

export default function FeaturedCare() {
  const { content, loading, matched } = useSurface("home_featured_care");
  const { track } = useSmartSite();

  if (loading || !content) return null;
  const cards = content.cards || [];

  return (
    <section className="mt-24" data-testid="featured-care" data-matched-switch={matched || "default"}>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-forest">Featured Care</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-clinic-navy mt-3 max-w-2xl">
            {content.heading || "Comprehensive services for every life stage."}
          </h2>
        </div>
        <Link to="/services" className="text-sm font-bold text-clinic-red hover:text-clinic-red-hover underline underline-offset-4 decoration-2" data-testid="featured-view-all">
          View all services
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = ICONS[card.icon] || Stethoscope;
          // Rotate between four warm tints so the grid isn't just white cards
          const tints = [
            "bg-white border-sand-300/60",
            "bg-clinic-peach border-clinic-peachDeep/60",
            "bg-clinic-sage border-clinic-forest/15",
            "bg-clinic-red-soft border-clinic-red/20",
          ];
          const iconTints = [
            "bg-clinic-sage text-clinic-forest group-hover:bg-clinic-forest group-hover:text-white",
            "bg-white text-clinic-red group-hover:bg-clinic-red group-hover:text-white",
            "bg-white text-clinic-forest group-hover:bg-clinic-forest group-hover:text-white",
            "bg-white text-clinic-red group-hover:bg-clinic-red group-hover:text-white",
          ];
          return (
            <Link
              key={`${card.title}-${i}`}
              to={card.href || "/services"}
              onClick={() =>
                track({ signalType: "cta_click", label: `featured:${card.title}`, strength: 2 })
              }
              className={`group rounded-[1.5rem] p-7 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] ${tints[i % tints.length]}`}
              data-testid={`featured-card-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className={`h-12 w-12 rounded-2xl grid place-items-center mb-6 transition-colors ${iconTints[i % iconTints.length]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display font-bold text-xl text-clinic-navy">{card.title}</div>
              <p className="text-sm text-clinic-mist mt-2 leading-relaxed">{card.description}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-clinic-red group-hover:gap-2.5 transition-all">
                Learn more <PawPrint className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
