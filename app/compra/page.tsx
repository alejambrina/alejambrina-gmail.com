"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MapPin, Square, Bed, Bath, Car, Wallet, Sparkles, Filter, X, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PropertySkeleton } from "@/components/ui/skeleton"
import ErrorBoundary, { PropertyErrorFallback } from "@/components/error-boundary"
import ImageCarousel from "@/components/image-carousel"
import { useProperties } from "@/hooks/use-properties"
import { useFilters } from "@/hooks/use-filters"
import { usePropertySearch } from "@/hooks/use-search"
import { useAnalytics } from "@/hooks/use-analytics"
import { useDebounce } from "use-debounce"

interface Property {
  id: string
  image: string
  images?: string[]
  title: string
  location: string
  priceUSD: string
  priceARS: string
  priceUVA?: string
  creditEligible: boolean
  description?: string
  features?: string[]
  coveredArea?: number
  uncoveredArea?: number
  expenses?: string
  rooms?: number
  bathrooms?: number
  garages?: number
}

function CompraPageContent() {
  const { data: properties = [], isLoading, error } = useProperties()
  const { filters, updateFilters, clearFilters, getActiveFiltersCount } = useFilters()
  const { trackFilterUsage, trackSearchQuery, trackContactClick } = useAnalytics()

  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Search functionality
  const searchResults = usePropertySearch(properties, debouncedSearchTerm)

  // Apply filters to search results
  const filteredProperties = searchResults.filter((property) => {
    // Filter by price range
    const price = Number.parseInt(property.priceUSD.replace(/[.,]/g, ""))
    if (price < filters.minPrice || price > filters.maxPrice) return false

    // Filter by rooms
    if (filters.rooms && filters.rooms !== "any") {
      if (filters.rooms === "4+") {
        if ((property.rooms || 0) < 4) return false
      } else {
        if (property.rooms !== Number.parseInt(filters.rooms)) return false
      }
    }

    // Filter by area
    const area = property.coveredArea || 0
    if (area < filters.minArea || area > filters.maxArea) return false

    // Filter by credit eligibility
    if (filters.creditEligible !== "any") {
      const expected = filters.creditEligible === "true"
      if (property.creditEligible !== expected) return false
    }

    return true
  })

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = Number.parseInt(a.priceUSD.replace(/[.,]/g, ""))
    const priceB = Number.parseInt(b.priceUSD.replace(/[.,]/g, ""))
    const areaA = a.coveredArea || 0
    const areaB = b.coveredArea || 0

    switch (filters.sortBy) {
      case "price-asc":
        return priceA - priceB
      case "price-desc":
        return priceB - priceA
      case "area-desc":
        return areaB - areaA
      case "area-asc":
        return areaA - areaB
      case "rooms-desc":
        return (b.rooms || 0) - (a.rooms || 0)
      default:
        return 0
    }
  })

  // Track search queries
  useEffect(() => {
    if (debouncedSearchTerm) {
      trackSearchQuery(debouncedSearchTerm, searchResults.length)
    }
  }, [debouncedSearchTerm, searchResults.length, trackSearchQuery])

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("techito-favorites")
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId)
    } else {
      newFavorites.add(propertyId)
    }
    setFavorites(newFavorites)
    localStorage.setItem("techito-favorites", JSON.stringify(Array.from(newFavorites)))
  }

  const handleContactClick = (propertyId: string) => {
    trackContactClick(propertyId, "contact_button")
    // Here you would implement the actual contact functionality
  }

  if (error) {
    return (
      <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <PropertyErrorFallback />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      <Header />

      <main className="flex-1 p-6 md:p-10 pb-20 md:pb-10">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Encuentra tu <span className="text-techitoPurple">techito ideal</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre las mejores oportunidades del mercado inmobiliario. Propiedades seleccionadas con los precios más
            competitivos.
          </p>

          {/* Quick Search */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-techitoLightGray mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Input
                  placeholder="Buscar por ubicación o título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <MapPin className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <Select
                value={filters.rooms}
                onValueChange={(value) => {
                  updateFilters({ rooms: value })
                  trackFilterUsage("rooms", value)
                }}
              >
                <SelectTrigger>
                  <Bed className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Ambientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Cualquier cantidad</SelectItem>
                  <SelectItem value="1">1 ambiente</SelectItem>
                  <SelectItem value="2">2 ambientes</SelectItem>
                  <SelectItem value="3">3 ambientes</SelectItem>
                  <SelectItem value="4">4 ambientes</SelectItem>
                  <SelectItem value="4+">4+ ambientes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="area-desc">Superficie: mayor a menor</SelectItem>
                  <SelectItem value="area-asc">Superficie: menor a mayor</SelectItem>
                  <SelectItem value="rooms-desc">Más ambientes primero</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filtros avanzados
                {getActiveFiltersCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-techitoPurple text-white text-xs px-1.5 py-0.5">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-techitoLightGray mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filtros avanzados</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Limpiar filtros
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Rango de precio (USD)</label>
                  <div className="px-2">
                    <Slider
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={([min, max]) => {
                        updateFilters({ minPrice: min, maxPrice: max })
                        trackFilterUsage("price_range", `${min}-${max}`)
                      }}
                      max={500000}
                      min={0}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>USD {filters.minPrice.toLocaleString()}</span>
                    <span>USD {filters.maxPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Area Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Superficie (m²)</label>
                  <div className="px-2">
                    <Slider
                      value={[filters.minArea, filters.maxArea]}
                      onValueChange={([min, max]) => {
                        updateFilters({ minArea: min, maxArea: max })
                        trackFilterUsage("area_range", `${min}-${max}`)
                      }}
                      max={300}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{filters.minArea} m²</span>
                    <span>{filters.maxArea} m²</span>
                  </div>
                </div>

                {/* Credit Eligibility */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Elegibilidad crediticia</label>
                  <Select
                    value={filters.creditEligible}
                    onValueChange={(value) => {
                      updateFilters({ creditEligible: value })
                      trackFilterUsage("credit_eligible", value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquiera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Cualquiera</SelectItem>
                      <SelectItem value="true">Apto para crédito</SelectItem>
                      <SelectItem value="false">Solo contado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Results Section */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-techitoPurple" />
              <h2 className="text-2xl font-bold">Propiedades disponibles</h2>
              <span className="bg-techitoPurple/10 text-techitoPurple px-3 py-1 rounded-full text-sm font-medium">
                {sortedProperties.length} {sortedProperties.length === 1 ? "propiedad" : "propiedades"}
              </span>
            </div>
          </div>

          {/* Active Filters Display */}
          {(getActiveFiltersCount() > 0 || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {searchTerm && (
                <Badge variant="secondary" className="bg-techitoPurple/10 text-techitoPurple">
                  Búsqueda: {searchTerm}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}
              {filters.rooms && (
                <Badge variant="secondary" className="bg-techitoPurple/10 text-techitoPurple">
                  {filters.rooms === "4+" ? "4+ ambientes" : `${filters.rooms} ambientes`}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ rooms: "" })} />
                </Badge>
              )}
              {(filters.minPrice > 0 || filters.maxPrice < 500000) && (
                <Badge variant="secondary" className="bg-techitoPurple/10 text-techitoPurple">
                  USD {filters.minPrice.toLocaleString()} - {filters.maxPrice.toLocaleString()}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => updateFilters({ minPrice: 0, maxPrice: 500000 })}
                  />
                </Badge>
              )}
              {filters.creditEligible !== "any" && (
                <Badge variant="secondary" className="bg-techitoPurple/10 text-techitoPurple">
                  {filters.creditEligible ? "Apto crédito" : "Solo contado"}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => updateFilters({ creditEligible: "any" })} />
                </Badge>
              )}
            </div>
          )}

          {/* Properties Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : sortedProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron propiedades</h3>
              <p className="text-gray-600 mb-6">Intenta ajustar tus filtros de búsqueda para ver más resultados.</p>
              <Button onClick={clearFilters} className="bg-techitoPurple hover:bg-techitoPurple/90 text-white">
                Limpiar todos los filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProperties.map((property, index) => (
                <ErrorBoundary key={property.id} fallback={<PropertyErrorFallback />}>
                  <Card className="bg-white border border-techitoLightGray shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group">
                    <Link href={`/properties/${property.id}`}>
                      <div className="relative w-full h-48 overflow-hidden">
                        {property.images && property.images.length > 1 ? (
                          <ImageCarousel images={property.images} alt={property.title} className="h-full" />
                        ) : (
                          <Image
                            src={
                              property.image || "/placeholder.svg?height=192&width=384&text=🏠&bg=f3f4f6&color=6b7280"
                            }
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            priority={index < 6}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
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
                    </Link>

                    <CardContent className="p-4">
                      <Link href={`/properties/${property.id}`}>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-techitoPurple transition-colors">
                          {property.title}
                        </h3>
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
                      </Link>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-techitoPurple hover:bg-techitoPurple/90 text-white"
                          onClick={(e) => {
                            e.preventDefault()
                            handleContactClick(property.id)
                          }}
                        >
                          Contactar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`border-techitoPurple hover:bg-techitoPurple/10 bg-transparent ${
                            favorites.has(property.id) ? "text-red-500 border-red-500" : "text-techitoPurple"
                          }`}
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(property.id)
                          }}
                        >
                          <Heart className={`h-4 w-4 ${favorites.has(property.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ErrorBoundary>
              ))}
            </div>
          )}

          {/* CTA Section */}
          {sortedProperties.length > 0 && (
            <section className="text-center mt-16 bg-white rounded-lg shadow-md p-8 border border-techitoLightGray">
              <h2 className="text-3xl font-bold mb-4">¿No encontraste lo que buscabas?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Configurá alertas personalizadas y te notificaremos cuando aparezcan nuevas oportunidades que coincidan
                con tus criterios.
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
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function CompraPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-techitoPurple mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Cargando propiedades...</p>
            </div>
          </main>
        </div>
      }
    >
      <CompraPageContent />
    </Suspense>
  )
}
