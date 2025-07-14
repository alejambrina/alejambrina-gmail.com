import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// Add new imports for icons
import { Sparkles, MapPin, DollarSign, Square, Bed, Bath, Car, Wallet } from "lucide-react"
import Link from "next/link"
import { getProperties } from "@/actions/properties"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default async function HomePage() {
  const featuredProperties = ((await getProperties()) ?? []).slice(0, 2)

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      <Header />

      <main className="flex-1 p-6 md:p-10">
        {/* Hero Search Section */}
        <section className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            La manera más <span className="">inteligente</span> de comprar tu{" "}
            <span className="text-techitoPurple">primera propiedad</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Techito compara miles de propiedades y te muestra solo las oportunidades mas baratas del mercado. ¡Comprá
            mejor, sin pagar de más!
          </p>
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4 border border-techitoLightGray">
            <div className="grid grid-cols-3 gap-2">
              <Button className="bg-techitoLightGray text-techitoText hover:bg-techitoLightGray/80">Barrio</Button>
              <Button className="bg-techitoLightGray text-techitoText hover:bg-techitoLightGray/80">Ambientes</Button>
              <Button className="bg-techitoLightGray text-techitoText hover:bg-techitoLightGray/80">Precio máx.</Button>
            </div>
            <Button className="w-full bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 rounded-md shadow-md">
              Buscar oportunidades
            </Button>
          </div>
        </section>

        {/* Featured Deals Section */}
        <section className="max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-techitoPurple" /> Oportunidades destacadas
          </h2>
          <div className="space-y-4">
            {featuredProperties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id}>
                <Card className="bg-white border border-techitoLightGray shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                  <div className="relative w-full h-40">
                    {" "}
                    {/* Adjusted height for image */} {/* Increased height for image */}
                    <Image
                      src={property.image || "/placeholder.svg?height=192&width=384&text=🏠&bg=f3f4f6&color=6b7280"}
                      alt={property.title}
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col gap-2">
                    {" "}
                    {/* Changed to flex-col */}
                    <h3 className="font-semibold text-xl">{property.title}</h3> {/* Larger title */}
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" /> {property.location}
                    </p>
                    <div className="flex items-center gap-8 w-full">
                      <p className="font-bold text-lg flex items-center gap-1">
                        <DollarSign className="h-5 w-5 text-techitoGreen" /> USD {property.priceUSD}
                      </p>
                      {property.priceUVA && (
                        <p className="font-bold text-lg flex items-center gap-1">
                          <Wallet className="h-5 w-5 text-techitoPurple" /> UVA {property.priceUVA}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {property.coveredArea && (
                        <p className="flex items-center gap-1">
                          <Square className="h-4 w-4 text-gray-400" /> {property.coveredArea} m² cub.
                        </p>
                      )}
                      {property.uncoveredArea && (
                        <p className="flex items-center gap-1">
                          <Square className="h-4 w-4 text-gray-400" /> {property.uncoveredArea} m² desc.
                        </p>
                      )}
                      {property.rooms !== undefined && (
                        <p className="flex items-center gap-1">
                          <Bed className="h-4 w-4 text-gray-400" /> {property.rooms} amb.
                        </p>
                      )}
                      {property.bathrooms !== undefined && (
                        <p className="flex items-center gap-1">
                          <Bath className="h-4 w-4 text-gray-400" /> {property.bathrooms} baños
                        </p>
                      )}
                      {property.garages !== undefined && (
                        <p className="flex items-center gap-1">
                          <Car className="h-4 w-4 text-gray-400" /> {property.garages} coch.
                        </p>
                      )}
                      {property.expenses && (
                        <p className="flex items-center gap-1">
                          <Wallet className="h-4 w-4 text-gray-400" /> Expensas: {property.expenses}
                        </p>
                      )}
                    </div>
                    <span className="bg-techitoPurple text-white text-xs font-semibold px-2.5 py-1 rounded-full inline-block self-start mt-1">
                      35% debajo del promedio
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
