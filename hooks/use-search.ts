"use client"

import { useMemo } from "react"
import { useDeferredValue } from "react"
import Fuse from "fuse.js"

interface Property {
  id: string
  title: string
  location: string
  description?: string
  [key: string]: any
}

export const usePropertySearch = (properties: Property[], searchTerm: string) => {
  const deferredSearchTerm = useDeferredValue(searchTerm)

  const fuse = useMemo(
    () =>
      new Fuse(properties, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "location", weight: 0.3 },
          { name: "description", weight: 0.3 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [properties],
  )

  return useMemo(() => {
    if (!deferredSearchTerm.trim()) return properties

    const results = fuse.search(deferredSearchTerm)
    return results.map((result) => result.item)
  }, [fuse, deferredSearchTerm, properties])
}
