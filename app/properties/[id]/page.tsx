import { getPropertyById } from "@/actions/properties"
import Header from "@/components/header"
import ImageCarousel from "@/components/image-carousel"
import { notFound } from "next/navigation"
import { MapPin, Bed, Bath, Car, Square, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface PropertyDetailPageProps {
  params: { id: string }
}

/* SEO -------------------------------------------------------------------- */
export async function generateMetadata({ params }: PropertyDetailPageProps) {
  const property = await getPropertyById(params.id)

  if (!property) {
    return {
      title: "Propiedad no encontrada | Techito",
      description: "La propiedad que buscas no está disponible.",
    }
  }

  return {
    title: `${property.title} | Techito`,
    description: property.description ?? `${property.title} en ${property.location}`,
    openGraph: {
      images: [property.image],
    },
  }
}

/* Page ------------------------------------------------------------------- */
export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = await getPropertyById(params.id)

  if (!property) notFound()

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      <Header />

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full space-y-6">
        {/* Images */}
        <ImageCarousel images={property.images ?? [property.image]} alt={property.title} className="h-72 md:h-96" />

        {/* Info card */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" /> {property.location}
            </p>

            <div className="flex flex-wrap gap-6 text-lg font-semibold">
              <span>USD {property.priceUSD}</span>
              {property.priceUVA && <span>UVA {property.priceUVA}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {property.coveredArea && (
                <p className="flex items-center gap-1">
                  <Square className="h-4 w-4" /> {property.coveredArea} m² cub.
                </p>
              )}
              {property.uncoveredArea && (
                <p className="flex items-center gap-1">
                  <Square className="h-4 w-4" /> {property.uncoveredArea} m² desc.
                </p>
              )}
              {property.rooms !== undefined && (
                <p className="flex items-center gap-1">
                  <Bed className="h-4 w-4" /> {property.rooms} amb.
                </p>
              )}
              {property.bathrooms !== undefined && (
                <p className="flex items-center gap-1">
                  <Bath className="h-4 w-4" /> {property.bathrooms} baños
                </p>
              )}
              {property.garages !== undefined && (
                <p className="flex items-center gap-1">
                  <Car className="h-4 w-4" /> {property.garages} coch.
                </p>
              )}
              {property.expenses && (
                <p className="flex items-center gap-1">
                  <Wallet className="h-4 w-4" /> Expensas: {property.expenses}
                </p>
              )}
            </div>

            {property.description && <p className="text-gray-700 leading-relaxed">{property.description}</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
