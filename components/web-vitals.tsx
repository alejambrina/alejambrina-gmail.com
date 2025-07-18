"use client"

import { useEffect } from "react"
import { onCLS, onFID, onFCP, onLCP, onTTFB, type Metric } from "web-vitals"

export default function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: Metric) => {
      // Google Analytics 4 example – adjust to your analytics provider
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", metric.name, {
          value: Math.round(metric.value),
          event_category: "Web Vitals",
          non_interaction: true,
        })
      }
    }

    onCLS(sendToAnalytics)
    onFID(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [])

  return null
}
