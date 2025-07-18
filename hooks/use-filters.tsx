"use client"

import { useCallback, useMemo, useState } from "react"

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

const INITIAL_FILTERS: Filters = {
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
 * Shallow-compare two Filters objects.
 * Returns true only if they differ.
 */
function filtersChanged(a: Filters, b: Filters) {
  for (const key in a) {
    // @ts-expect-error – runtime compare
    if (a[key] !== b[key]) return true
  }
  return false
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)

  /**
   * Update one or more filter fields.
   * State updates are skipped if nothing actually changed,
   * preventing the infinite re-render loop that triggered
   * the “Maximum update depth exceeded” error.
   */
  const updateFilters = useCallback((changes: Partial<Filters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...changes }
      return filtersChanged(prev, next) ? next : prev
    })
  }, [])

  const clearFilters = useCallback(() => setFilters(INITIAL_FILTERS), [])

  const getActiveFiltersCount = useCallback(() => {
    let count = 0
    if (filters.location) count++
    if (filters.minPrice > 0 || filters.maxPrice < 500_000) count++
    if (filters.rooms) count++
    if (filters.minArea > 0 || filters.maxArea < 300) count++
    if (filters.creditEligible !== null) count++
    return count
  }, [filters])

  /**
   * Memoise the returned helpers so their identity
   * stays stable between renders.
   */
  return useMemo(
    () => ({ filters, updateFilters, clearFilters, getActiveFiltersCount }),
    [filters, updateFilters, clearFilters, getActiveFiltersCount],
  )
}
