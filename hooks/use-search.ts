"use client"

import { useMemo } from "react"
import Fuse from "fuse.js"

interface Property {
  id: string
  title: string
  location: string
  description?: string
}

export function usePropertySearch(properties: Property[], searchTerm: string) {
  const fuse = useMemo(() => {
    return new Fuse(properties, {
      keys: ["title", "location", "description"],
      threshold: 0.3,
      includeScore: true,
    })
  }, [properties])

  return useMemo(() => {
    if (!searchTerm.trim()) return properties

    const results = fuse.search(searchTerm)
    return results.map((result) => result.item)
  }, [fuse, searchTerm, properties])
}
