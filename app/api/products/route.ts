import { type NextRequest, NextResponse } from "next/server"
import dataJson from "@/data/data.json"

type Property = (typeof dataJson.properties)[number]

interface Product {
  id: number
  name: string
  category: string
  price: number
  quantity: number
}

/**
 * Mapea una propiedad de ejemplo a la estructura Product
 */
function mapToProduct(property: Property, idx: number): Product {
  return {
    id: idx + 1,
    name: property.title,
    category: property.location.split(",")[0],
    price: Number(property.priceUSD.replace(/[.,]/g, "")),
    quantity: Math.floor(Math.random() * 50) + 1,
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page") || 1)
  const pageSize = Number(searchParams.get("pageSize") || 10)
  const search = (searchParams.get("search") || "").toLowerCase()
  const category = (searchParams.get("category") || "").toLowerCase()

  // Convertir todas las propiedades mock a Products
  let products = dataJson.properties.map(mapToProduct)

  // Filtro por búsqueda
  if (search) {
    products = products.filter(
      (p) => p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search),
    )
  }

  // Filtro por categoría
  if (category) {
    products = products.filter((p) => p.category.toLowerCase() === category)
  }

  const totalCount = products.length

  // Paginación
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginated = products.slice(start, end)

  return NextResponse.json({ products: paginated, totalCount })
}
