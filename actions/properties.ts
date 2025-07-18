"use server"

// ✅ Next.js no permite módulos nativos de Node.
//    Importamos el JSON estático para usarlo en el browser y en el edge.
import dataJson from "@/data/data.json"

// Add new fields to the Property interface
interface Property {
  id: string
  image: string
  images?: string[] // Added images array
  title: string
  location: string
  priceUSD: string
  priceARS: string
  priceUVA: string // New field for UVA price
  creditEligible: boolean
  description?: string
  features?: string[]
  coveredArea?: number // New field
  uncoveredArea?: number // New field
  expenses?: string // New field
  rooms?: number // New field
  bathrooms?: number // New field
  garages?: number // New field
}

interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  image: string
  excerpt: string
  content: string
}

export async function getProperties(page = 1, filters?: any): Promise<Property[]> {
  // Simulate API delay for realistic loading states
  await new Promise((resolve) => setTimeout(resolve, 100))

  let properties = [...dataJson.properties]

  // Apply filters if provided
  if (filters) {
    if (filters.location) {
      properties = properties.filter(
        (p) =>
          p.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.title.toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    if (filters.minPrice || filters.maxPrice) {
      properties = properties.filter((p) => {
        const price = Number.parseInt(p.priceUSD.replace(/[.,]/g, ""))
        return price >= (filters.minPrice || 0) && price <= (filters.maxPrice || 999999)
      })
    }

    if (filters.rooms && filters.rooms !== "any") {
      if (filters.rooms === "4+") {
        properties = properties.filter((p) => (p.rooms || 0) >= 4)
      } else {
        properties = properties.filter((p) => p.rooms === Number.parseInt(filters.rooms))
      }
    }

    if (filters.creditEligible !== null) {
      properties = properties.filter((p) => p.creditEligible === filters.creditEligible)
    }
  }

  // Pagination
  const ITEMS_PER_PAGE = 12
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return properties.slice(startIndex, endIndex)
}

export async function getPropertyById(id: string): Promise<Property | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))

  return dataJson.properties.find((p) => p.id === id) ?? null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return dataJson.blogPosts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return dataJson.blogPosts.find((p) => p.slug === slug) ?? null
}

// New function for search suggestions
export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!query.trim()) return []

  const properties = dataJson.properties
  const suggestions = new Set<string>()

  properties.forEach((property) => {
    // Add location suggestions
    if (property.location.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(property.location.split(", ")[0])
    }

    // Add title suggestions
    if (property.title.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(property.title)
    }
  })

  return Array.from(suggestions).slice(0, 5)
}
