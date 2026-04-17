import React from "react";
import { MessageCircle } from "lucide-react";

/**
 * Slot for an externally-embedded chat widget.
 * Drop the third-party <script> on index.html or here. The widget can call
 *   window.smartSite.setIntent('dogs', 'new_puppy')
 *   window.smartSite.trackSignal({ signalType: 'chat_intent', intent: 'cats', label: 'asked about dental' })
 * to push intent back to this site.
 */
export default function ChatWidgetSlot() {
  return (
    <div
      id="chat-widget-slot"
      data-testid="chat-widget-slot"
      className="fixed bottom-6 right-6 z-30"
      data-chat-embed="annapolis-vet"
    >
      {/* Visual placeholder — replace with external widget script when available. */}
      <div className="hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md border border-sand-300/70 rounded-full pl-3 pr-4 py-2 shadow-lg text-xs text-clinic-navy font-semibold">
        <span className="h-2 w-2 rounded-full bg-clinic-forest animate-soft-pulse" />
        <MessageCircle className="h-4 w-4 text-clinic-forest" />
        Chat embed goes here
      </div>
    </div>
  );
}
