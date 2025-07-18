"use client"

import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/theme-provider"

/**
 * App-wide providers:
 * 1. React-Query (TanStack Query)
 * 2. shadcn/ui ThemeProvider
 *
 * NOTE: **No more `@v0/hooks/use-filters` import here.**
 */
const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
