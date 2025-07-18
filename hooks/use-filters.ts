"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export interface Filters {
  location: string
  minPrice: number
  maxPrice: number
  rooms: string
  minArea: number
  maxArea: number
  creditEligible: boolean | null
  sortBy: string
}

export const DEFAULT_FILTERS: Filters = {
  location: "",
  minPrice: 0,
  maxPrice: 500_000,
  rooms: "",
  minArea: 0,
  maxArea: 300,
  creditEligible: null,
  sortBy: "price-asc",
}

/**
 * Centralised filter hook for /compra and any other pages that need
 * URL-synced filters. Keeps helpers stable to avoid re-render loops.
 */
export function useFilters() {
  const router = useRouter()
  const search = useSearchParams()

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  /* -------------------------------------------------------------
   * Initialise from URL   →  local state
   * or from localStorage  →  local state (if URL is clean)
   * ----------------------------------------------------------- */
  useEffect(() => {
    const urlFilters: Partial<Filters> = {
      location: search.get("location") ?? "",
      minPrice: Number(search.get("minPrice") ?? 0),
      maxPrice: Number(search.get("maxPrice") ?? 500_000),
      rooms: search.get("rooms") ?? "",
      minArea: Number(search.get("minArea") ?? 0),
      maxArea: Number(search.get("maxArea") ?? 300),
      creditEligible:
        search.get("creditEligible") === "true" ? true : search.get("creditEligible") === "false" ? false : null,
      sortBy: search.get("sortBy") ?? "price-asc",
    }

    const saved = localStorage.getItem("techito-filters")
    const initial = saved && !search.toString() ? JSON.parse(saved) : {}

    setFilters({ ...DEFAULT_FILTERS, ...urlFilters, ...initial })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once

  /* -------------------------------------------------------------
   * Update helpers
   * ----------------------------------------------------------- */

  const updateFilters = useCallback(
    (patch: Partial<Filters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch }

        // Sync URL (only changed values)
        const params = new URLSearchParams()
        Object.entries(next).forEach(([k, v]) => {
          const def = DEFAULT_FILTERS[k as keyof Filters]
          if (v !== def && v !== "" && v !== null) params.set(k, String(v))
        })

        router.push(params.toString() ? `?${params}` : window.location.pathname, {
          scroll: false,
        })

        // Persist in localStorage
        localStorage.setItem("techito-filters", JSON.stringify(next))

        return next
      })
    },
    [router],
  )

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    router.push(window.location.pathname, { scroll: false })
    localStorage.removeItem("techito-filters")
  }, [router])

  const getActiveFiltersCount = useCallback(() => {
    let n = 0
    if (filters.location) n++
    if (filters.minPrice > 0 || filters.maxPrice < 500_000) n++
    if (filters.rooms) n++
    if (filters.minArea > 0 || filters.maxArea < 300) n++
    if (filters.creditEligible !== null) n++
    return n
  }, [filters])

  return { filters, updateFilters, clearFilters, getActiveFiltersCount }
}
