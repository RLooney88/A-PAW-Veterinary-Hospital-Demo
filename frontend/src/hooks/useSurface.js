import React, { useEffect, useState } from "react";
import { useSmartSite } from "../context/SmartSiteContext";

/**
 * Hook: fetch surface content whenever the session's parent/sub-intent changes.
 * Returns { content, matched, inferredIntent, loading, refetch }.
 */
export function useSurface(slug) {
  const { getSurfaceContent, parentIntent, subIntent, ready } = useSmartSite();
  const [state, setState] = useState({
    content: null,
    matched: null,
    inferredIntent: null,
    loading: true,
  });

  const load = React.useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const data = await getSurfaceContent(slug);
      setState({
        content: data.content,
        matched: data.matched_switch_name,
        inferredIntent: data.inferred_intent,
        loading: false,
      });
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
