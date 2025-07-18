"use client"

import { useCallback } from "react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, parameters)
    }
  }, [])

  const trackPropertyView = useCallback(
    (propertyId: string, propertyTitle: string) => {
      trackEvent("property_view", {
        property_id: propertyId,
        property_title: propertyTitle,
        event_category: "engagement",
      })
    },
    [trackEvent],
  )

  const trackFilterUsage = useCallback(
    (filterType: string, filterValue: string) => {
      trackEvent("filter_used", {
        filter_type: filterType,
        filter_value: filterValue,
        event_category: "search",
      })
    },
    [trackEvent],
  )

  const trackContactClick = useCallback(
    (propertyId: string, contactMethod: string) => {
      trackEvent("contact_property", {
        property_id: propertyId,
        contact_method: contactMethod,
        event_category: "conversion",
      })
    },
    [trackEvent],
  )

  const trackSearchQuery = useCallback(
    (query: string, resultsCount: number) => {
      trackEvent("search", {
        search_term: query,
        results_count: resultsCount,
        event_category: "search",
      })
    },
    [trackEvent],
  )

  return {
    trackEvent,
    trackPropertyView,
    trackFilterUsage,
    trackContactClick,
    trackSearchQuery,
  }
}
