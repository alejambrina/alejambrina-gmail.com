import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getProperties } from "@/actions/properties"
import Image from "next/image" // Import Image component

export default async function HomePage() {
  // ensure we always work with an array to avoid runtime errors
  const featuredProperties = ((await getProperties()) ?? []).slice(0, 2)

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-techitoLightGray">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-techitoPurple" />
          <span className="text-xl font-bold">Techito</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/como-funciona"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            ¿Cómo funciona?
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/cotizador"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            Cotizador
          </Link>
          <Link
            href="/oportunidades"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            Oportunidades
          </Link>
        </nav>
      </header>

      <main className="flex-1 p-6 md:p-10">
        {/* Hero Search Section */}
        <section className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Encontrá tu techito ideal</h1>
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4 border border-techitoLightGray">
            <div className="grid grid-cols-3 gap-2">
              <Button className="bg-techitoLightGray text-techitoText hover:bg-techitoLightGray/80">Barrio</Button>
              <Button className="bg-techitoLightGray text-techitoText hover:bg-techitoLightGray/80">Ambientes</Button>
              <Button className="bg-techitoLightGray text-techitoText hover:bg-techitoLightGray/80">Precio máx.</Button>
            </div>
            <Button className="w-full bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 rounded-md shadow-md">
              Buscar
            </Button>
          </div>
        </section>

        {/* Featured Deals Section */}
        <section className="max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Home className="h-6 w-6 text-techitoPurple" /> Gangas destacadas:
          </h2>
          <div className="space-y-4">
            {featuredProperties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id}>
                <Card className="bg-white border border-techitoLightGray shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Replaced Home icon with Image */}
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{property.title.split(" en ")[0]}</p>
                        <p className="text-sm text-gray-500">{property.location}</p>
                        <p className="text-sm text-techitoGreen font-medium">
                          {property.creditEligible ? "Apta crédito" : "No apta crédito"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Simplified Footer Links */}
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
