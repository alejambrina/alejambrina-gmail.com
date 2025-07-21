import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// Add new imports for icons
import { Sparkles, MapPin, Square, Bed, Bath, Car, Wallet, Home } from "lucide-react"
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

      <main className="flex-1">
        {/* Hero Banner Section - Similar to TasaTasa */}
        <section className="relative bg-gradient-to-br from-techitoPurple via-techitoGreen to-techitoPurple-light overflow-hidden">
          {/* Geometric shapes for visual interest */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  La manera más <span className="text-white/90">inteligente</span> de comprar tu{" "}
                  <span className="text-white">primera propiedad</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Techito compara miles de propiedades y te muestra solo las oportunidades más baratas del mercado.
                  ¡Comprá mejor, sin pagar de más!
                </p>
                <Link href="/compra">
                  <Button className="bg-white text-techitoPurple hover:bg-white/90 font-semibold py-4 px-8 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Home className="h-5 w-5 mr-2" />
                    Comenzar
                  </Button>
                </Link>
              </div>

              {/* Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-white rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src="/placeholder.svg?height=400&width=400&text=🏠&bg=f3f4f6&color=22c55e"
                      alt="Persona buscando propiedades"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/80 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="max-w-2xl mx-auto px-6 md:px-10 -mt-8 relative z-10">
          <div className="bg-white rounded-lg shadow-xl p-6 space-y-4 border border-techitoLightGray">
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
        <section className="max-w-2xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-techitoPurple" /> Oportunidades destacadas
          </h2>
          <div className="space-y-4">
            {featuredProperties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id}>
                <Card className="bg-white border border-techitoLightGray shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                  <div className="relative w-full h-40">
                    <Image
                      src={property.image || "/placeholder.svg?height=192&width=384&text=🏠&bg=f3f4f6&color=6b7280"}
                      alt={property.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority={true}
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col gap-2">
                    <h3 className="font-semibold text-xl">{property.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" /> {property.location}
                    </p>
                    <div className="flex items-center gap-8 w-full">
                      <p className="font-bold text-lg flex items-center gap-1">USD {property.priceUSD}</p>
                      {property.priceUVA && (
                        <p className="font-bold text-lg flex gap-1 items-center text-center mx-0 px-44">
                          UVA {property.priceUVA}
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
