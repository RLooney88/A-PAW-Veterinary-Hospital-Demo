import React, { useEffect, useState, useRef } from "react";
import { useSmartSite } from "../context/SmartSiteContext";

const CACHE_PREFIX = "avw_surface_";

function getCached(slug) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + slug);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function setCache(slug, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + slug, JSON.stringify(data));
  } catch { /* quota exceeded, ignore */ }
}

/**
 * Hook: fetch surface content whenever the session's parent/sub-intent changes.
 * Uses stale-while-revalidate: renders cached content instantly, updates from API in background.
 */
export function useSurface(slug) {
  const { getSurfaceContent, parentIntent, subIntent, ready } = useSmartSite();
  const cached = useRef(getCached(slug));

  const [state, setState] = useState({
    content: cached.current?.content || null,
    matched: cached.current?.matched || null,
    inferredIntent: cached.current?.inferredIntent || null,
    loading: !cached.current,
  });

  const load = React.useCallback(async () => {
    // Only show loading spinner if we have no cached content
    if (!state.content) {
      setState((s) => ({ ...s, loading: true }));
    }
    try {
      const data = await getSurfaceContent(slug);
      const newState = {
        content: data.content,
        matched: data.matched_switch_name,
        inferredIntent: data.inferred_intent,
        loading: false,
      };
      setState(newState);
      setCache(slug, newState);
    } catch (e) {
      console.warn("surface load failed", slug, e);
      setState((s) => ({ ...s, loading: false }));
    }
  }, [slug, getSurfaceContent]);

  useEffect(() => {
    if (!ready) return;
    load();
  }, [ready, parentIntent, subIntent, load]);

  return { ...state, refetch: load };
}
