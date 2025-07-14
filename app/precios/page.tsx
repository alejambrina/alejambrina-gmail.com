import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Home, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PreciosPage() {
  const pricingPlans = [
    {
      name: "Básico",
      price: "Gratis",
      description: "Ideal para empezar a explorar el mercado.",
      features: ["Acceso a oportunidades destacadas", "Alertas de propiedades limitadas", "Soporte básico por email"],
      buttonText: "Empezar Gratis",
      highlight: false,
    },
    {
      name: "Premium",
      price: "USD 9.99/mes",
      description: "Para quienes buscan una ventaja competitiva.",
      features: [
        "Todo lo del plan Básico",
        "Acceso ilimitado a todas las oportunidades",
        "Alertas personalizadas en tiempo real",
        "Análisis de mercado detallado",
        "Soporte prioritario",
      ],
      buttonText: "Elegir Premium",
      highlight: true,
    },
    {
      name: "Pro",
      price: "USD 29.99/mes",
      description: "Para inversores serios y profesionales.",
      features: [
        "Todo lo del plan Premium",
        "Asesoramiento personalizado 1 a 1",
        "Acceso anticipado a nuevas gangas",
        "Herramientas de negociación avanzadas",
        "Soporte 24/7",
      ],
      buttonText: "Elegir Pro",
      highlight: false,
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

      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Planes y Precios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encontrá el plan perfecto para tus necesidades y empezá a ahorrar en tu próxima propiedad.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-white border border-techitoLightGray shadow-lg rounded-lg flex flex-col ${
                plan.highlight ? "border-techitoPurple ring-2 ring-techitoPurple" : ""
              }`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-techitoPurple">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="text-4xl font-extrabold mt-4">{plan.price}</div>
              </CardHeader>
              <CardContent className="flex-1 px-6 py-4">
                <ul className="space-y-3 text-gray-700">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-techitoGreen flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 rounded-md shadow-md">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
