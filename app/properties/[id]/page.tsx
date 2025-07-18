"use client"

import { useProperty } from "@/hooks/use-property"
import { useAnalytics } from "@/hooks/use-analytics"
import Header from "@/components/header"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { Metadata } from "next"

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  try {
    const property = await getPropertyById(params.id)

    if (!property) {
      return {
        title: "Propiedad no encontrada | Techito",
        description: "La propiedad que buscas no está disponible.",
      }
    }

    return {
      title: `${property.title} - ${property.location} | Techito`,
      description:
        property.description || `${property.title} en ${property.location}. Precio: USD ${property.priceUSD}`,
      openGraph: {
        title: property.title,
        description: property.description || `${property.title} en ${property.location}`,
        images: [property.image],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: property.title,
        description: property.description || `${property.title} en ${property.location}`,
        images: [property.image],
      },
    }
  } catch (error) {
    return {
      title: "Error | Techito",
      description: "Ocurrió un error al cargar la propiedad.",
    }
  }
}

function PropertyDetailContent({ params }: PropertyDetailPageProps) {
  const { data: property, isLoading, error } = useProperty(params.id)
  const { trackPropertyView, trackContactClick } = useAnalytics()

  useEffect(() => {
    if (property) {
      trackPropertyView(property.id, property.title)
    }
  }, [property, trackPropertyView])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
        <Header />
        <main className="flex-1 p-6 md:p-10 max-w-md mx-auto">
          <Skeleton className="h-64 w-full rounded-lg mb-6" />
          <div className="bg-white p-6 rounded-lg shadow-md border border-techitoLightGray space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="grid grid-cols-1 gap-3 pt-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1\
