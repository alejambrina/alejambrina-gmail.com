import { getBlogPosts } from "@/actions/properties"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Calendar, User, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Import Button

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      {/* Header (re-using the main header structure) */}
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

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">Nuestro Blog</h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          Consejos, noticias y análisis para ayudarte a encontrar tu techito ideal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="bg-white border border-techitoLightGray shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} layout="fill" objectFit="cover" />
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 leading-tight">{post.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" /> {post.date}
                    <span className="mx-2">|</span>
                    <User className="h-4 w-4 mr-1" /> {post.author}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
                  <Button variant="ghost" className="mt-auto self-start text-techitoPurple hover:bg-techitoPurple/10">
                    Leer más <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
