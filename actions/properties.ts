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

export async function getProperties(): Promise<Property[]> {
  return dataJson.properties
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return dataJson.properties.find((p) => p.id === id) ?? null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return dataJson.blogPosts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return dataJson.blogPosts.find((p) => p.slug === slug) ?? null
}
