"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Product {
  id: number
  name: string
  price: number
  category: string
  quantity: number
}

interface Filters {
  search?: string
  category?: string
}

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Toys & Games",
  "Automotive",
  "Health & Household",
]

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [filters, setFilters] = useState<Filters>({})
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (filters.search) {
      params.set("search", filters.search)
    } else {
      params.delete("search")
    }
    if (filters.category) {
      params.set("category", filters.category)
    } else {
      params.delete("category")
    }
    params.set("page", page.toString())
    params.set("pageSize", pageSize.toString())

    router.push(`/compra?${params.toString()}`)
  }, [filters, page, pageSize, router, searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `/api/products?page=${page}&pageSize=${pageSize}`
        if (filters.search) {
          url += `&search=${filters.search}`
        }
        if (filters.category) {
          url += `&category=${filters.category}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setProducts(data.products)
        setTotalCount(data.totalCount)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        toast({
          title: "Error!",
          description: "Failed to fetch products. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }

    fetchData()
  }, [page, pageSize, filters, toast])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
    setPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setFilters({ ...filters, category: value })
    setPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(1)
  }

  const pageCount = Math.ceil(totalCount / pageSize)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Product Listing</h1>

      <Card className="mb-5">
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div>
            <Label htmlFor="search">Search:</Label>
            <div className="relative">
              <Input
                type="search"
                id="search"
                placeholder="Search products..."
                value={filters.search || ""}
                onChange={handleSearchChange}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category:</Label>
            <Select onValueChange={handleCategoryChange} defaultValue={filters.category || "All Categories"}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pageSize">Page Size:</Label>
            <Select onValueChange={(value) => handlePageSizeChange(Number(value))} defaultValue={pageSize.toString()}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select page size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/compra?page=${page > 1 ? page - 1 : 1}`}
              onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
            />
          </PaginationItem>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink href={`/compra?page=${p}`} onClick={() => handlePageChange(p)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={`/compra?page=${page < pageCount ? page + 1 : pageCount}`}
              onClick={() => handlePageChange(page < pageCount ? page + 1 : pageCount)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
