"use client"

import { getProperties } from "@/actions/properties"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Square, Bed, Bath, Car, Wallet, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default async function CompraPage() {
  const properties = await getProperties()

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      <Header />

      <main className="flex-1 p-6 md:p-10">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Encuentra tu <span className="text-techitoPurple">techito ideal</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre las mejores oportunidades del mercado inmobiliario. Propiedades seleccionadas con los precios más
            competitivos.
          </p>

          {/* Search Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-techitoLightGray mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Button variant="outline" className="justify-start bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                Ubicación
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <Bed className="h-4 w-4 mr-2" />
                Ambientes
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <Square className="h-4 w-4 mr-2" />
                Superficie
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                Precio máx.
              </Button>
            </div>
            <Button className="w-full md:w-auto bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 px-8 rounded-md shadow-md">
              Buscar propiedades
            </Button>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-techitoPurple" />
              <h2 className="text-2xl font-bold">Propiedades disponibles</h2>
              <span className="bg-techitoPurple/10 text-techitoPurple px-3 py-1 rounded-full text-sm font-medium">
                {properties.length} propiedades
              </span>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm">
                Ordenar por precio
              </Button>
              <Button variant="outline" size="sm">
                Filtros
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link href={`/properties/${property.id}`} key={property.id}>
                <Card className="bg-white border border-techitoLightGray shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={property.image || "/placeholder.svg?height=192&width=384&text=🏠&bg=f3f4f6&color=6b7280"}
                      alt={property.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-300"
                      priority={false}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-techitoPurple text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        35% bajo promedio
                      </span>
                    </div>
                    {property.creditEligible && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-techitoGreen text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Apto crédito
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {property.location}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <p className="font-bold text-xl text-techitoPurple">USD {property.priceUSD}</p>
                        {property.priceUVA && <p className="text-sm text-gray-600">UVA {property.priceUVA}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                      {property.coveredArea && (
                        <p className="flex items-center gap-1">
                          <Square className="h-4 w-4 text-gray-400" />
                          {property.coveredArea} m²
                        </p>
                      )}
                      {property.rooms !== undefined && (
                        <p className="flex items-center gap-1">
                          <Bed className="h-4 w-4 text-gray-400" />
                          {property.rooms} amb.
                        </p>
                      )}
                      {property.bathrooms !== undefined && (
                        <p className="flex items-center gap-1">
                          <Bath className="h-4 w-4 text-gray-400" />
                          {property.bathrooms} baños
                        </p>
                      )}
                      {property.garages !== undefined && property.garages > 0 && (
                        <p className="flex items-center gap-1">
                          <Car className="h-4 w-4 text-gray-400" />
                          {property.garages} coch.
                        </p>
                      )}
                      {property.expenses && (
                        <p className="flex items-center gap-1 col-span-2">
                          <Wallet className="h-4 w-4 text-gray-400" />
                          Expensas: {property.expenses}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-techitoPurple hover:bg-techitoPurple/90 text-white"
                        onClick={(e) => {
                          e.preventDefault()
                          // Handle contact action
                        }}
                      >
                        Contactar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-techitoPurple text-techitoPurple hover:bg-techitoPurple/10 bg-transparent"
                        onClick={(e) => {
                          e.preventDefault()
                          // Handle favorite action
                        }}
                      >
                        Favorito
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More Section */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-techitoPurple text-techitoPurple hover:bg-techitoPurple/10 bg-transparent"
            >
              Cargar más propiedades
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Mostrando {properties.length} de {properties.length} propiedades disponibles
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center mt-16 bg-white rounded-lg shadow-md p-8 border border-techitoLightGray">
          <h2 className="text-3xl font-bold mb-4">¿No encontraste lo que buscabas?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Configurá alertas personalizadas y te notificaremos cuando aparezcan nuevas oportunidades que coincidan con
            tus criterios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 px-8 rounded-md shadow-md">
              Crear alerta
            </Button>
            <Button
              variant="outline"
              className="border-techitoPurple text-techitoPurple hover:bg-techitoPurple/10 py-3 px-8 rounded-md bg-transparent"
            >
              Hablar con un asesor
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
