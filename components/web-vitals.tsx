"use client"

import { useEffect } from "react"
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals"

export default function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: any) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", metric.name, {
          value: Math.round(metric.value),
          event_category: "Web Vitals",
          non_interaction: true,
        })
      }
    }

    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
  }, [])

  return null
}
