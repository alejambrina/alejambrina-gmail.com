"use client"

import { useQuery } from "@tanstack/react-query"
import { getProperties } from "@/actions/properties"

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: () => getProperties(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}
