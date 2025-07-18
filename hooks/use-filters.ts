"use client"

/**
 * Centralised property-filters hook
 *
 * Keeps state changes predictable and prevents render loops by:
 * • useReducer – single state transition per dispatch
 * • memoised helpers – stable identities for Radix / child comps
 * • one-time side-effects – localStorage + URL sync only on meaningful change
 */

import { useReducer, useCallback, useEffect, useRef } from "react"

/* ------------------------------------------------------------------ */
/* Types & constants                                                  */
/* ------------------------------------------------------------------ */

type PriceRange = [number, number] | null

export interface FiltersState {
  price: PriceRange // ARS – null means “any”
  rooms: "any" | "1" | "2" | "3+"
  creditEligible: "any" | "yes" | "no"
  neighbourhoods: string[] // barrio slugs
}

const DEFAULT_FILTERS: FiltersState = {
  price: null,
  rooms: "any",
  creditEligible: "any",
  neighbourhoods: [],
}

/* ------------------------------------------------------------------ */
/* Reducer                                                            */
/* ------------------------------------------------------------------ */

type Action = { type: "update"; key: keyof FiltersState; value: FiltersState[keyof FiltersState] } | { type: "clear" }

function reducer(state: FiltersState, action: Action): FiltersState {
  switch (action.type) {
    case "update": {
      // Only change state when value is different
      if (state[action.key] === action.value) return state
      return { ...state, [action.key]: action.value }
    }
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
  const [filters, dispatch] = useReducer(reducer, DEFAULT_FILTERS)

  /* -------------------------------------------------------------- */
  /* Derived helpers                                                */
  /* -------------------------------------------------------------- */

  const updateFilters = useCallback(<K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    dispatch({ type: "update", key, value })
  }, [])

  const clearFilters = useCallback(() => dispatch({ type: "clear" }), [])

  const getActiveFiltersCount = useCallback(() => {
    let count = 0
    for (const key in filters) {
      const val = filters[key as keyof FiltersState]
      if (Array.isArray(val) ? val.length : val !== DEFAULT_FILTERS[key as keyof FiltersState]) count += 1
    }
    return count
  }, [filters])

  /* -------------------------------------------------------------- */
  /* Persist to localStorage & URL once per *real* change           */
  /* -------------------------------------------------------------- */

  const prevJson = useRef<string | null>(null)

  useEffect(() => {
    const json = JSON.stringify(filters)
    if (json === prevJson.current) return
    prevJson.current = json

    // 1) localStorage
    try {
      localStorage.setItem("techito:filters", json)
    } catch {
      /* ignore */
    }

    // 2) URL (without triggering extra React renders)
    const url = new URL(window.location.href)
    url.searchParams.set("filters", btoa(json))
    window.history.replaceState(null, "", url)
  }, [filters])

  return { filters, updateFilters, clearFilters, getActiveFiltersCount }
}
