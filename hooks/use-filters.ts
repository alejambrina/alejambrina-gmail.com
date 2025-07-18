"use client"

/**
 * Centralised filter state for the site.
 * – URL-safe and localStorage-persisted
 * – Memoised helpers to avoid render loops
 */

import { useCallback, useEffect, useReducer } from "react"
import { useRouter, useSearchParams } from "next/navigation"

/* ------------------------------------------------------------------ */
/* Types & defaults                                                   */
/* ------------------------------------------------------------------ */
export interface Filters {
  location: string
  minPrice: number
  maxPrice: number
  rooms: "any" | "1" | "2" | "3" | "3+"
  minArea: number
  maxArea: number
  creditEligible: "any" | "true" | "false"
  sortBy: "price-asc" | "price-desc" | "area-asc" | "area-desc"
}

const DEFAULT_FILTERS: Filters = {
  location: "",
  minPrice: 0,
  maxPrice: 500_000,
  rooms: "any",
  minArea: 0,
  maxArea: 300,
  creditEligible: "any",
  sortBy: "price-asc",
}

/* ------------------------------------------------------------------ */
/* Reducer                                                            */
/* ------------------------------------------------------------------ */
type Action = { type: "update"; payload: Partial<Filters> } | { type: "replace"; payload: Filters } | { type: "clear" }

function reducer(state: Filters, action: Action): Filters {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload }
    case "replace":
      return action.payload
    case "clear":
      return DEFAULT_FILTERS
    default:
      return state
  }
}

/* ------------------------------------------------------------------ */
/* Hook                                                               */
/* ------------------------------------------------------------------ */
export function useFilters() {
  const router = useRouter()
  const search = useSearchParams()

  const [filters, dispatch] = useReducer(reducer, DEFAULT_FILTERS)

  /* -------- initialise from URL or localStorage (run once) -------- */
  useEffect(() => {
    let initial: Partial<Filters> = {}

    // 1) URL params
    if (search.size) {
      initial = {
        location: search.get("location") ?? "",
        minPrice: Number(search.get("minPrice") ?? 0),
        maxPrice: Number(search.get("maxPrice") ?? 500_000),
        rooms: (search.get("rooms") as Filters["rooms"]) ?? "any",
        minArea: Number(search.get("minArea") ?? 0),
        maxArea: Number(search.get("maxArea") ?? 300),
        creditEligible: (search.get("creditEligible") as Filters["creditEligible"]) ?? "any",
        sortBy: (search.get("sortBy") as Filters["sortBy"]) ?? "price-asc",
      }
    } else {
      // 2) localStorage fallback
      try {
        const saved = localStorage.getItem("techito:filters")
        if (saved) initial = JSON.parse(saved)
      } catch {
        /* ignore */
      }
    }

    dispatch({ type: "replace", payload: { ...DEFAULT_FILTERS, ...initial } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ← run only once

  /* ---------------- helper callbacks (stable identities) ---------- */
  const updateFilters = useCallback((payload: Partial<Filters>) => {
    dispatch({ type: "update", payload })
  }, [])

  const clearFilters = useCallback(() => dispatch({ type: "clear" }), [])

  const getActiveFiltersCount = useCallback(() => {
    let c = 0
    if (filters.location) c++
    if (filters.minPrice > 0 || filters.maxPrice < 500_000) c++
    if (filters.rooms !== "any") c++
    if (filters.minArea > 0 || filters.maxArea < 300) c++
    if (filters.creditEligible !== "any") c++
    return c
  }, [filters])

  /* ------------- persist to URL & localStorage on change ---------- */
  useEffect(() => {
    // localStorage
    try {
      localStorage.setItem("techito:filters", JSON.stringify(filters))
    } catch {
      /* ignore quota / SSR */
    }

    // URL (only non-default values)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== DEFAULT_FILTERS[k as keyof Filters]) params.set(k, String(v))
    })
    router.replace(params.size ? `?${params}` : window.location.pathname, { scroll: false })
  }, [filters, router])

  return { filters, updateFilters, clearFilters, getActiveFiltersCount }
}
