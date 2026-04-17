import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useSurface } from "../hooks/useSurface";
import { useSmartSite } from "../context/SmartSiteContext";

export default function FAQSection() {
  const { content, loading } = useSurface("home_faq");
  const { track } = useSmartSite();
  if (loading || !content) return null;
  const items = content.items || [];

  return (
    <section className="mt-24 grid gap-12 lg:grid-cols-5 items-start" data-testid="faq-section">
      <div className="lg:col-span-2 bg-clinic-peach rounded-[2rem] p-10 border border-clinic-peachDeep/60 relative overflow-hidden">
        <div className="text-xs uppercase tracking-[0.22em] font-semibold text-clinic-red">FAQ</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-clinic-navy mt-3">
          {content.heading || "Frequently asked questions"}
        </h2>
        <p className="mt-4 text-clinic-navy/70 max-w-md">
          If you don&rsquo;t see what you&rsquo;re looking for, give us a call. We&rsquo;re happy to walk you through it.
        </p>
        <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-clinic-red/10 blur-3xl" />
      </div>

      <div className="lg:col-span-3">
        <Accordion type="single" collapsible>
          {items.map((it, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-sand-300/70"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger
                className="text-left font-display font-bold text-lg text-clinic-navy py-5"
                onClick={() => track({ signalType: "faq_open", label: it.q })}
              >
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-clinic-mist pb-5">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
