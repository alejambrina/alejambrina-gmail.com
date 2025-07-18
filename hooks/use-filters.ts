"use client"

import { useCallback, useReducer } from "react"

export interface Filters {
  location: string
  minPrice: number
  maxPrice: number
  rooms: "any" | "1" | "2" | "3" | "4" | "4+"
  minArea: number
  maxArea: number
  creditEligible: "any" | "true" | "false"
  sortBy: "price-asc" | "price-desc" | "area-desc" | "area-asc" | "rooms-desc"
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

type Action = { type: "update"; payload: Partial<Filters> } | { type: "clear" }

function reducer(state: Filters, action: Action): Filters {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload }
    case "clear":
      return { ...DEFAULT_FILTERS }
    default:
      return state
  }
}

export function useFilters() {
  const [filters, dispatch] = useReducer(reducer, DEFAULT_FILTERS)

  const updateFilters = useCallback((payload: Partial<Filters>) => dispatch({ type: "update", payload }), [])
  const clearFilters = useCallback(() => dispatch({ type: "clear" }), [])

  const getActiveFiltersCount = useCallback(() => {
    let count = 0
    if (filters.location) count++
    if (filters.minPrice > 0 || filters.maxPrice < 500_000) count++
    if (filters.rooms !== "any") count++
    if (filters.minArea > 0 || filters.maxArea < 300) count++
    if (filters.creditEligible !== "any") count++
    return count
  }, [filters])

  return { filters, updateFilters, clearFilters, getActiveFiltersCount }
}
