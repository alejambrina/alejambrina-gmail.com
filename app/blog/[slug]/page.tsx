import { Card } from "@/components/ui/card"
import { getBlogPostBySlug } from "@/actions/properties"
import { Button } from "@/components/ui/button"
import { Home, Calendar, User, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPostDetailPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-techitoBackground text-techitoText p-6">
        <h1 className="text-4xl font-bold mb-4">Post no encontrado</h1>
        <p className="text-lg text-gray-600 mb-8">Lo sentimos, el artículo que buscas no existe.</p>
        <Link href="/blog">
          <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold">
            Volver al Blog
          </Button>
        </Link>
      </div>
    )
  }

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
            href="/precios"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            Precios
          </Link>
          <Link
            href="/preguntas"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            Preguntas
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium text-techitoText hover:text-techitoPurple transition-colors"
          >
            Contacto
          </Link>
        </nav>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-3xl mx-auto">
        <Link href="/blog" className="flex items-center text-techitoPurple hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" /> Volver al Blog
        </Link>

        <Card className="bg-white border border-techitoLightGray shadow-md p-6 md:p-8 rounded-lg">
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} layout="fill" objectFit="cover" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar className="h-4 w-4 mr-1" /> {post.date}
            <span className="mx-2">|</span>
            <User className="h-4 w-4 mr-1" /> {post.author}
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {/* Render content as markdown. For a real app, consider a markdown parser. */}
            <p>{post.content}</p>
          </div>
        </Card>
      </main>
    </div>
  )
}
