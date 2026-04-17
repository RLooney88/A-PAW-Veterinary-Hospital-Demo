/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { api } from "../lib/api";

const STORAGE_KEY = "avw_session_token";

const SmartSiteContext = createContext(null);

export function useSmartSite() {
  const ctx = useContext(SmartSiteContext);
  if (!ctx) throw new Error("useSmartSite must be used within SmartSiteProvider");
  return ctx;
}

const INTENT_LABELS = {
  dogs: "Dogs",
  cats: "Cats",
  critters: "Other Critters",
};

const SUB_INTENT_LABELS = {
  new_puppy: "New Puppy",
  new_kitten: "New Kitten",
  wellness: "Wellness & Preventive",
  health_concerns: "Health Concerns",
  senior: "Senior Care",
  treatments: "Specific Treatments",
  husbandry: "Habitat / Husbandry",
};

export function SmartSiteProvider({ children }) {
  const [sessionToken, setSessionToken] = useState(() => localStorage.getItem(STORAGE_KEY) || null);
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const initRef = useRef(false);

  const init = useCallback(async () => {
    if (initRef.current) return;
    initRef.current = true;
    try {
      const { data } = await api.post("/sessions/init", {
        existing_token: sessionToken,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
      setSessionToken(data.session_token);
      localStorage.setItem(STORAGE_KEY, data.session_token);
      setSession(data);
    } catch (e) {
      console.warn("Smart site session init failed", e);
    } finally {
      setReady(true);
    }
  }, [sessionToken]);

  useEffect(() => {
    init();
  }, []);

  const track = useCallback(
    async ({ signalType, pagePath, label, intent, subIntent, strength = 1, meta = {} }) => {
      if (!sessionToken) return null;
      try {
        const { data } = await api.post("/signals/track", {
          session_token: sessionToken,
          signal_type: signalType,
          page_path: pagePath ?? window.location.pathname,
          label: label ?? null,
          intent: intent ?? null,
          sub_intent: subIntent ?? null,
          strength,
          meta,
        });
        setSession(data);
        return data;
      } catch (e) {
        console.warn("track failed", e);
        return null;
      }
    },
    [sessionToken]
  );

  const setIntent = useCallback(
    (intent, subIntent = null, { label = "intent_select_manual" } = {}) =>
      track({
        signalType: subIntent ? "sub_intent_select" : "intent_select",
        intent,
        subIntent,
        label,
        strength: 2,
      }),
    [track]
  );

  const clearIntent = useCallback(() => {
    // soft-clear: we can't subtract on the server without a new endpoint;
    // instead we reset session (fresh token).
    localStorage.removeItem(STORAGE_KEY);
    setSessionToken(null);
    setSession(null);
    initRef.current = false;
    init();
  }, [init]);

  const getSurfaceContent = useCallback(
    async (slug) => {
      const { data } = await api.get(`/surfaces/${slug}/content`, {
        params: sessionToken ? { session_token: sessionToken } : {},
      });
      return data;
    },
    [sessionToken]
  );

  // Track page views automatically on route change
  useEffect(() => {
    if (!ready || !sessionToken) return;
    track({ signalType: "page_view", pagePath: window.location.pathname });
  }, [ready, sessionToken]);

  // Expose a global API for external chat widget
  useEffect(() => {
    window.smartSite = {
      getSession: () => session,
      getSessionToken: () => sessionToken,
      setIntent: (intent, subIntent) => setIntent(intent, subIntent, { label: "chat_intent" }),
      trackSignal: (payload) =>
        track({
          signalType: payload.signalType || "chat_intent",
          intent: payload.intent,
          subIntent: payload.subIntent,
          label: payload.label || "chat",
          meta: payload.meta || {},
          strength: payload.strength || 2,
        }),
      clearIntent,
    };
    return () => {
      try {
        delete window.smartSite;
      } catch {
        window.smartSite = undefined;
      }
    };
  }, [session, sessionToken, setIntent, track, clearIntent]);

  const value = useMemo(
    () => ({
      ready,
      sessionToken,
      session,
      parentIntent: session?.parent_intent || null,
      subIntent: session?.sub_intent || null,
      intentLabel: session?.parent_intent ? INTENT_LABELS[session.parent_intent] : null,
      subIntentLabel: session?.sub_intent ? SUB_INTENT_LABELS[session.sub_intent] : null,
      track,
      setIntent,
      clearIntent,
      getSurfaceContent,
    }),
    [ready, sessionToken, session, track, setIntent, clearIntent, getSurfaceContent]
  );

  return <SmartSiteContext.Provider value={value}>{children}</SmartSiteContext.Provider>;
}

export { INTENT_LABELS, SUB_INTENT_LABELS };
