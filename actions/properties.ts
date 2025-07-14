"use server"

// ✅ next-lite no permite módulos nativos de Node.
//    Importamos el JSON estático para usarlo en el browser y en el edge.
import dataJson from "@/data/data.json"

interface Property {
  id: string
  image: string
  title: string
  location: string
  priceUSD: string
  priceARS: string
  creditEligible: boolean
  description?: string
  features?: string[]
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
