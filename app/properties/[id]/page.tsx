"use client" // Make this a client component to use useState

import { getPropertyById } from "@/actions/properties"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Circle } from "lucide-react" // Added Circle for dots
import Image from "next/image"
import Link from "next/link"
import { GoogleMapsEmbed } from "@next/third-parties/google"
import Header from "@/components/header"
import { Home } from "lucide-react"
import { useState, useEffect } from "react" // Import useState and useEffect

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const [property, setProperty] = useState<any>(null) // Use any for now, or define Property type
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchProperty = async () => {
      const fetchedProperty = await getPropertyById(params.id)
      setProperty(fetchedProperty)
    }
    fetchProperty()
  }, [params.id])

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-techitoBackground text-techitoText p-6">
        <h1 className="text-4xl font-bold mb-4">Cargando propiedad...</h1>
        <p className="text-lg text-gray-600 mb-8">Por favor, espera un momento.</p>
      </div>
    )
  }

  const images = property.images || [property.image] // Use images array, fallback to single image

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Dummy data for "Otras oportunidades cerca"
  const otherOpportunities = [
    { id: "other1", title: "Aurontonyas", percentage: "16% mejor oferta" },
    { id: "other2", title: "Las Cañitas 500", percentage: "10% bajo promedio" },
  ]

  const mapQuery = `${property.location}, Argentina`.replace(/ /g, "+")

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1 p-6 md:p-10 max-w-md mx-auto">
        {/* Property Image Carousel */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6 shadow-md border border-techitoLightGray">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            priority={currentImageIndex === 0} // Prioritize the first image
          />
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-techitoPurple rounded-full"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-techitoPurple rounded-full"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, index) => (
                  <Circle
                    key={index}
                    className={`h-2 w-2 ${
                      index === currentImageIndex ? "text-techitoPurple" : "text-gray-300"
                    } fill-current`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Property Details */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-techitoLightGray space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{property.title.split(" en ")[0]}</h1>
          <p className="text-gray-600 text-lg">
            USD {property.priceUSD} - ARS {property.priceARS}
          </p>

          <div className="flex items-center gap-2">
            <span className="bg-techitoPurple text-white text-sm font-semibold px-3 py-1.5 rounded-full">
              35% bajo promedio
            </span>
            <span className="text-gray-600 text-sm">
              {property.features?.[2] || "N/A"} - {property.features?.[0] || "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4 border-t border-techitoLightGray">
            <Button className="w-full bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 rounded-md shadow-md">
              Contactar
            </Button>
            <Button className="w-full bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 rounded-md shadow-md">
              Comparar
            </Button>
            <Button
              variant="ghost"
              className="w-full text-techitoPurple hover:bg-techitoPurple/10 flex items-center justify-between"
            >
              Ver en mapa <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="w-full text-techitoPurple hover:bg-techitoPurple/10 flex items-center justify-between"
            >
              Pedir más info <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Other Opportunities Section */}
        <section className="mt-8 bg-white p-6 rounded-lg shadow-md border border-techitoLightGray">
          <h2 className="text-xl font-bold mb-4">Otras oportunidades cerca</h2>
          <div className="space-y-4">
            {otherOpportunities.map((opportunity) => (
              <Link href={`/properties/${opportunity.id}`} key={opportunity.id}>
                <div className="flex items-center justify-between p-3 rounded-md hover:bg-techitoBackground transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-techitoPurple" />
                    <div>
                      <p className="font-semibold">{opportunity.title}</p>
                      <p className="text-sm text-techitoGreen font-medium">{opportunity.percentage}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full text-techitoPurple hover:bg-techitoPurple/10 flex items-center justify-between mt-4"
          >
            Ver en mapa <ChevronRight className="h-4 w-4" />
          </Button>
        </section>

        {/* Map Placeholder */}
        <div className="space-y-2 mt-8">
          <h2 className="text-2xl font-semibold text-techitoText">Ubicación en el mapa</h2>
          <div className="rounded-lg overflow-hidden border border-techitoLightGray">
            <GoogleMapsEmbed
              apiKey="YOUR_GOOGLE_MAPS_API_KEY"
              height={300}
              width="100%"
              mode="place"
              q={mapQuery}
              loading="lazy"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
