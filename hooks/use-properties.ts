"use client"

import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { getProperties, getPropertyById } from "@/actions/properties"

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })
}

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export const useInfiniteProperties = (filters: any) => {
  return useInfiniteQuery({
    queryKey: ["properties", "infinite", filters],
    queryFn: ({ pageParam = 1 }) => getProperties(pageParam, filters),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 12 ? pages.length + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  })
}
