"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface Filters {
  location: string
  minPrice: number
  maxPrice: number
  rooms: string
  minArea: number
  maxArea: number
  creditEligible: boolean | null
  sortBy: string
}

const defaultFilters: Filters = {
  location: "",
  minPrice: 0,
  maxPrice: 500000,
  rooms: "",
  minArea: 0,
  maxArea: 300,
  creditEligible: null,
  sortBy: "price-asc",
}

export const useFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  // Load filters from URL on mount
  useEffect(() => {
    const urlFilters = {
      location: searchParams.get("location") || "",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 500000,
      rooms: searchParams.get("rooms") || "",
      minArea: Number(searchParams.get("minArea")) || 0,
      maxArea: Number(searchParams.get("maxArea")) || 300,
      creditEligible:
        searchParams.get("creditEligible") === "true"
          ? true
          : searchParams.get("creditEligible") === "false"
            ? false
            : null,
      sortBy: searchParams.get("sortBy") || "price-asc",
    }

    // Load from localStorage as fallback
    const savedFilters = localStorage.getItem("techito-filters")
    if (savedFilters && !searchParams.toString()) {
      const parsed = JSON.parse(savedFilters)
      setFilters({ ...defaultFilters, ...parsed })
    } else {
      setFilters({ ...defaultFilters, ...urlFilters })
    }
  }, [searchParams])

  const updateFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      const updatedFilters = { ...filters, ...newFilters }
      setFilters(updatedFilters)

      // Update URL
      const params = new URLSearchParams()
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value !== null && value !== "" && value !== defaultFilters[key as keyof Filters]) {
          params.set(key, String(value))
        }
      })

      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
      router.push(newUrl, { scroll: false })

      // Save to localStorage
      localStorage.setItem("techito-filters", JSON.stringify(updatedFilters))
    },
    [filters, router],
  )

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters)
    router.push(window.location.pathname, { scroll: false })
    localStorage.removeItem("techito-filters")
  }, [router])

  const getActiveFiltersCount = useCallback(() => {
    let count = 0
    if (filters.location) count++
    if (filters.minPrice > 0 || filters.maxPrice < 500000) count++
    if (filters.rooms) count++
    if (filters.minArea > 0 || filters.maxArea < 300) count++
    if (filters.creditEligible !== null) count++
    return count
  }, [filters])

  return {
    filters,
    updateFilters,
    clearFilters,
    getActiveFiltersCount,
  }
}
