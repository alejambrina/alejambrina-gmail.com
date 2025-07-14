import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, DollarSign, Handshake, Key } from "lucide-react"
import Link from "next/link"

export default function ComoFuncionaPage() {
  const steps = [
    {
      icon: Search,
      title: "1. Buscamos las mejores oportunidades",
      description:
        "Nuestros algoritmos rastrean miles de propiedades en el mercado para identificar aquellas con el mayor potencial de ahorro. No te mostramos todo, solo lo que realmente vale la pena.",
    },
    {
      icon: DollarSign,
      title: "2. Analizamos el valor real",
      description:
        "Comparamos cada propiedad con datos históricos y de mercado para determinar su valor justo. Así, podemos calcular el porcentaje de ahorro real que obtendrías.",
    },
    {
      icon: Handshake,
      title: "3. Te conectamos con el vendedor",
      description:
        "Una vez que encuentres una propiedad que te interese, te facilitamos el contacto directo con el vendedor o su representante, sin intermediarios innecesarios.",
    },
    {
      icon: Key,
      title: "4. Acompañamiento hasta la compra",
      description:
        "Te brindamos herramientas y asesoramiento para que puedas negociar el mejor precio y te acompañamos en cada etapa del proceso, desde la visita hasta la firma.",
    },
  ]

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      {/* Header */}
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
        </nav>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">¿Cómo funciona Techito?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simplificamos el proceso de compra de propiedades para que encuentres tu hogar ideal al mejor precio.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white border border-techitoLightGray shadow-md rounded-lg">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                  <step.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-4 text-gray-700">
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="text-center mt-12 md:mt-16">
          <h2 className="text-2xl font-bold mb-4">¿Listo para encontrar tu techito ideal?</h2>
          <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 px-8 rounded-md shadow-md">
            Explorar Oportunidades
          </Button>
        </section>
      </main>
    </div>
  )
}
