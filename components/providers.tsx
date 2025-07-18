"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/toaster"
import { useFilters } from "@/hooks/use-filters" // Updated import

interface ProvidersProps {
  children: React.ReactNode
  session?: any
  dehydratedState?: any
}

const queryClient = new QueryClient()

export function Providers({ children, session, dehydratedState }: ProvidersProps) {
  useFilters() // Initialize the filter context

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration dehydratedState={dehydratedState}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </SessionProvider>
  )
}
