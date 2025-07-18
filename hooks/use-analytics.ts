"use client"

import { useCallback } from "react"

export function useAnalytics() {
  const trackFilterUsage = useCallback((filterType: string, value: string) => {
    // Analytics tracking implementation
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "filter_used", {
        event_category: "property_search",
        event_label: filterType,
        value: value,
      })
    }
  }, [])

  const trackSearchQuery = useCallback((query: string, resultCount: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search", {
        search_term: query,
        event_category: "property_search",
        custom_parameters: {
          result_count: resultCount,
        },
      })
    }
  }, [])

  const trackContactClick = useCallback((propertyId: string, source: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "contact_property", {
        event_category: "property_interaction",
        event_label: source,
        value: propertyId,
      })
    }
  }, [])

  return { trackFilterUsage, trackSearchQuery, trackContactClick }
}
