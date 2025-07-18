import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Fallback UI for /compra while React
 * resolves the client-side search params.
 * This satisfies the Next.js 15 requirement
 * that useSearchParams be rendered inside
 * a Suspense boundary.
 */
export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Product Listing</h1>

      {/* Search / filter skeleton */}
      <Card className="mb-5">
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </CardContent>
      </Card>

      {/* Table skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  )
}
