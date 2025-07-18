"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                   Hook                                     */
/* -------------------------------------------------------------------------- */

/**
 * Global filter state shared across pages.
 * 1. Synchronises with the URL query-string
 * 2. Persists to localStorage (“techito-filters”)
 * 3. Provides helpers to update / clear filters and to count the active ones
 */
export function useFilters() {
  const router = useRouter()
  const search = useSearchParams()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  /* ---------------------- Initialise from URL / localStorage --------------- */
  useEffect(() => {
    // read URL params
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

    // read from localStorage (only if URL is empty)
    const saved = typeof window !== "undefined" ? localStorage.getItem("techito-filters") : null
    const initial = saved && !search.toString() ? JSON.parse(saved) : {}

    setFilters({ ...DEFAULT_FILTERS, ...urlFilters, ...initial })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  /* ------------------------------ Updaters --------------------------------- */

  const updateFilters = useCallback(
    (patch: Partial<Filters>) => {
      setFilters((prev) => {
        const next = { ...prev, ...patch }

        // build query-string (only non-default values)
        const params = new URLSearchParams()
        Object.entries(next).forEach(([key, value]) => {
          const def = DEFAULT_FILTERS[key as keyof Filters]
          if (value !== def && value !== "" && value !== null) {
            params.set(key, String(value))
          }
        })

        // push shallow-route change without scroll
        router.push(params.size ? `?${params.toString()}` : window.location.pathname, {
          scroll: false,
        })

        // persist to localStorage
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

  /* ------------------------------------------------------------------------ */

  return { filters, updateFilters, clearFilters, getActiveFiltersCount }
}
