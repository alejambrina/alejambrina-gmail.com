"use server"

import fs from "fs/promises"
import path from "path"

interface Property {
  id: string
  image: string
  title: string
  location: string
  priceUSD: string
  priceARS: string
  creditEligible: boolean
  description?: string // Added for detail page
  features?: string[] // Added for detail page
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
  try {
    // unified data file holds both properties and blogPosts
    const filePath = path.join(process.cwd(), "data", "data.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data: { properties: Property[]; blogPosts: BlogPost[] } = JSON.parse(fileContents)
    return data.properties
  } catch (error) {
    console.error("Error reading properties data:", error)
    return []
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // unified data file holds both properties and blogPosts
    const filePath = path.join(process.cwd(), "data", "data.json")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data: { properties: Property[]; blogPosts: BlogPost[] } = JSON.parse(fileContents)
    return data.properties.find((property) => property.id === id) || null
  } catch (error) {
    console.error(`Error reading property with ID ${id}:`, error)
    return null
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // unified data file holds both properties and blogPosts
    const filePath = path.join(process.cwd(), "data", "data.json") // Using same JSON for simplicity
    const fileContents = await fs.readFile(filePath, "utf8")
    const data: { properties: Property[]; blogPosts: BlogPost[] } = JSON.parse(fileContents)
    return data.blogPosts
  } catch (error) {
    console.error("Error reading blog posts data:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // unified data file holds both properties and blogPosts
    const filePath = path.join(process.cwd(), "data", "data.json") // Using same JSON for simplicity
    const fileContents = await fs.readFile(filePath, "utf8")
    const data: { properties: Property[]; blogPosts: BlogPost[] } = JSON.parse(fileContents)
    return data.blogPosts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error(`Error reading blog post with slug ${slug}:`, error)
    return null
  }
}
