import React from "react";
import { Sparkles, X } from "lucide-react";
import { useSmartSite } from "../context/SmartSiteContext";

export default function IntentChip({ "data-testid": dataTestId = "intent-chip" }) {
  const { intentLabel, subIntentLabel, clearIntent, parentIntent } = useSmartSite();

  if (!parentIntent) return null;

  return (
    <div
      className="inline-flex items-center gap-2 bg-white border border-clinic-forest/25 text-clinic-navy rounded-full pl-3 pr-1 py-1 text-xs font-semibold shadow-sm animate-fade-up"
      data-testid={dataTestId}
    >
      <Sparkles className="h-3.5 w-3.5 text-clinic-forest" />
      <span className="hidden sm:inline text-clinic-mist font-medium">Showing for:</span>
      <span className="text-clinic-navy font-bold" data-testid="intent-chip-label">
        {intentLabel}
        {subIntentLabel ? (
          <span className="text-clinic-mist font-medium"> · {subIntentLabel}</span>
        ) : null}
      </span>
      <button
        onClick={() => clearIntent()}
        className="p-1 rounded-full hover:bg-sand-200 text-clinic-mist hover:text-clinic-navy transition-colors"
        aria-label="Reset personalisation"
        data-testid="intent-chip-clear"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
