import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Percent, MapPin, DollarSign } from "lucide-react" // Changed FlameIcon to Percent
import Link from "next/link"
import { getProperties } from "@/actions/properties"
import Image from "next/image"
import Header from "@/components/header"

export default async function HomePage() {
  const featuredProperties = ((await getProperties()) ?? []).slice(0, 2)

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      <Header />

      <main className="flex-1 p-6 md:p-10">
        {/* Hero Search Section */}
        <section className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            La manera más inteligente de comprar tu primera propiedad
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
            <Percent className="h-6 w-6 text-techitoPurple" /> Oportunidades destacadas
          </h2>
          <div className="space-y-4">
            {featuredProperties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id}>
                <Card className="bg-white border border-techitoLightGray shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                  <div className="relative w-full h-48">
                    {" "}
                    {/* Increased height for image */}
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
                    <p className="font-bold text-lg flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-techitoGreen" /> USD {property.priceUSD}
                    </p>
                    <span className="bg-techitoPurple text-white text-xs font-semibold px-2.5 py-1 rounded-full inline-block self-start mt-1">
                      {property.id === "prop1" ? "30% debajo del promedio" : "35% bajo mercado"}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Simplified Footer Links (keeping the original footer links as they are not in the image) */}
        <section className="max-w-2xl mx-auto text-center text-sm text-gray-600 space-x-4 mt-12">
          <Link href="#" className="hover:underline">
            Cómo funciona
          </Link>
          <Link href="#" className="hover:underline">
            Preguntas
          </Link>
          <Link href="#" className="hover:underline">
            Cotizador de propiedades
          </Link>
        </section>
      </main>
    </div>
  )
}
