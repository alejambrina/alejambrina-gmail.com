import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle, X, MapPin, Search, DollarSign, Handshake, Key } from "lucide-react"
import Header from "@/components/header"

export default function PreciosPage() {
  const pricingPlans = [
    {
      name: "Análisis Exprés",
      price: "$15.000",
      description: "Análisis básico para una primera evaluación de la propiedad.",
      features: [
        "Valor estimado y valor/m²",
        "Comparables en la zona",
        "Ficha técnica de la propiedad",
        "Datos demográficos del barrio",
        "Estimación de gastos básicos",
      ],
      notIncluded: [
        "Análisis de barrios cercanos",
        "Mapa de calor de valores",
        "Simulación de crédito/hipoteca",
        "Cálculo más completo de costos",
        "Acceso anticipado a oportunidades",
        "Simulación avanzada (alquiler, ROI, proyección)",
        "Gestión de plano de la propiedad",
        "Valuación ajustada según plano y datos técnicos",
      ],
      buttonText: "Solicitar Análisis Exprés",
      highlight: false,
      popular: false,
    },
    {
      name: "Análisis Premium",
      price: "$40.000",
      description: "Análisis completo con herramientas avanzadas de evaluación.",
      features: [
        "Todo lo del Análisis Exprés",
        "Análisis de barrios cercanos",
        "Mapa de calor de valores",
        "Simulación de crédito/hipoteca",
        "Cálculo más completo de costos",
      ],
      notIncluded: [
        "Acceso anticipado a oportunidades",
        "Simulación avanzada (alquiler, ROI, proyección)",
        "Gestión de plano de la propiedad",
        "Valuación ajustada según plano y datos técnicos",
      ],
      buttonText: "Solicitar Análisis Premium",
      highlight: true,
      popular: true,
    },
    {
      name: "Análisis Pro",
      price: "$90.000",
      description: "Análisis profesional integral para inversores y compradores exigentes.",
      features: [
        "Todo lo del Análisis Premium",
        "Acceso anticipado a oportunidades",
        "Simulación avanzada (alquiler, ROI, proyección)",
        "Gestión de plano de la propiedad",
        "Valuación ajustada según plano y datos técnicos",
      ],
      notIncluded: [],
      buttonText: "Solicitar Análisis Pro",
      highlight: false,
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Análisis de Propiedades</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Obtén un análisis profesional y detallado de cualquier propiedad antes de tomar tu decisión de compra.
            Nuestros expertos te brindan toda la información que necesitas para invertir con confianza.
          </p>

          {/* Coverage Area Notice */}
          <div className="bg-techitoPurple/10 border border-techitoPurple/20 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-techitoPurple">
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">Cobertura: Capital Federal únicamente</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Actualmente analizamos propiedades ubicadas en Ciudad Autónoma de Buenos Aires (CABA)
            </p>
          </div>
        </section>

        {/* How Techito Works section - moved from /como-funciona */}
        <section className="bg-white rounded-lg shadow-md p-8 border border-techitoLightGray mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona Techito?</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Simplificamos el proceso de compra de propiedades para que encuentres tu hogar ideal al mejor precio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <Search className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">1. Buscamos las mejores oportunidades</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Nuestros algoritmos rastrean miles de propiedades en el mercado para identificar aquellas con el
                    mayor potencial de ahorro. No te mostramos todo, solo lo que realmente vale la pena.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">2. Analizamos el valor real</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Comparamos cada propiedad con datos históricos y de mercado para determinar su valor justo. Así,
                    podemos calcular el porcentaje de ahorro real que obtendrías.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <Handshake className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">3. Te conectamos con el vendedor</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Una vez que encuentres una propiedad que te interese, te facilitamos el contacto directo con el
                    vendedor o su representante, sin intermediarios innecesarios.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <Key className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">4. Acompañamiento hasta la compra</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Te brindamos herramientas y asesoramiento para que puedas negociar el mejor precio y te acompañamos
                    en cada etapa del proceso, desde la visita hasta la firma.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-white border shadow-lg rounded-lg flex flex-col relative ${
                plan.highlight
                  ? "border-techitoPurple ring-2 ring-techitoPurple scale-105 lg:scale-110"
                  : "border-techitoLightGray"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-techitoPurple text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-techitoPurple">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">{plan.description}</CardDescription>
                <div className="text-4xl font-extrabold text-techitoText">{plan.price}</div>
              </CardHeader>

              <CardContent className="flex-1 px-6 py-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-techitoGreen flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.map((feature, index) => (
                    <div key={`not-${index}`} className="flex items-start gap-3 opacity-40">
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-sm leading-relaxed line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  className={`w-full font-semibold py-3 rounded-md shadow-md ${
                    plan.highlight
                      ? "bg-techitoPurple hover:bg-techitoPurple/90 text-white"
                      : "bg-white border-2 border-techitoPurple text-techitoPurple hover:bg-techitoPurple/10"
                  }`}
                >
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
