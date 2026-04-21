import React, { useEffect, useState, useRef } from "react";
import { useSmartSite } from "../context/SmartSiteContext";

const CACHE_PREFIX = "avw_surface_v3_";

// Cache key is namespaced by the visitor's current intent so repeat visitors
// paint the same content they last saw for that intent, not a stale default.
function cacheKey(slug, parentIntent, subIntent) {
  return `${CACHE_PREFIX}${slug}__${parentIntent || "none"}__${subIntent || "none"}`;
}

function getCached(slug, parentIntent, subIntent) {
  try {
    const raw = localStorage.getItem(cacheKey(slug, parentIntent, subIntent));
    if (raw) return JSON.parse(raw);
    return null;
  } catch {
    return null;
  }
}

function setCache(slug, parentIntent, subIntent, data) {
  try {
    localStorage.setItem(cacheKey(slug, parentIntent, subIntent), JSON.stringify(data));
  } catch {
    /* quota exceeded, ignore */
  }
}

/**
 * Hook: fetch surface content whenever the session's parent/sub-intent changes.
 * Uses stale-while-revalidate: renders cached content instantly, updates from API in background.
 * Cache is keyed per-intent so returning visitors never see a flash of default content.
 */
export function useSurface(slug) {
  const { getSurfaceContent, parentIntent, subIntent, ready } = useSmartSite();

  // Seed state synchronously from the intent-matched cache. Because the context
  // hydrates parent_intent from a localStorage snapshot on mount, this runs
  // with the real intent even before /sessions/init completes.
  const initial = useRef(getCached(slug, parentIntent, subIntent));
  const [state, setState] = useState({
    content: initial.current?.content || null,
    matched: initial.current?.matched || null,
    inferredIntent: initial.current?.inferredIntent || null,
    loading: !initial.current,
  });

  const load = React.useCallback(async () => {
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
      // Cache under the intent the server actually matched against, not just
      // the local snapshot, so the next paint is perfectly aligned.
      setCache(slug, data.inferred_intent || parentIntent, subIntent, newState);
    } catch (e) {
      console.warn("surface load failed", slug, e);
      setState((s) => ({ ...s, loading: false }));
    }
  }, [slug, getSurfaceContent, parentIntent, subIntent]);

  useEffect(() => {
    if (!ready) return;
    load();
  }, [ready, parentIntent, subIntent, load]);

  return { ...state, refetch: load };
}
