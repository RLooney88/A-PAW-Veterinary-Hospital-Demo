import React from "react";
import { PawPrint, X } from "lucide-react";
import { useSmartSite } from "../context/SmartSiteContext";

export default function IntentChip({ "data-testid": dataTestId = "intent-chip" }) {
  const { intentLabel, subIntentLabel, clearIntent, parentIntent } = useSmartSite();

  if (!parentIntent) return null;

  return (
    <div
      className="inline-flex items-center gap-2 bg-clinic-red text-white rounded-full pl-3 pr-1 py-1 text-xs font-semibold shadow-lg shadow-clinic-red/25 animate-fade-up"
      data-testid={dataTestId}
    >
      <PawPrint className="h-3.5 w-3.5 text-white/90" />
      <span className="hidden sm:inline text-white/75 font-medium">Showing for:</span>
      <span className="text-white font-bold" data-testid="intent-chip-label">
        {intentLabel}
        {subIntentLabel ? (
          <span className="text-white/75 font-medium"> · {subIntentLabel}</span>
        ) : null}
      </span>
      <button
        onClick={() => clearIntent()}
        className="p-1 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
        aria-label="Reset personalisation"
        data-testid="intent-chip-clear"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
