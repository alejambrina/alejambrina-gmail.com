import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle, X, MapPin } from "lucide-react"
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

        {/* Additional Information Section */}
        <section className="bg-white rounded-lg shadow-md p-8 border border-techitoLightGray">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona nuestro análisis?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-techitoPurple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Envías la propiedad</h3>
                    <p className="text-gray-600">
                      Nos compartes el link o los datos de la propiedad de Capital Federal que te interesa analizar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-techitoPurple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Analizamos en profundidad</h3>
                    <p className="text-gray-600">
                      Nuestros expertos realizan un análisis completo usando datos de mercado de CABA y herramientas
                      especializadas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-techitoPurple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Recibes el reporte</h3>
                    <p className="text-gray-600">
                      Te entregamos un reporte detallado con toda la información en 24-48 horas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-techitoPurple text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Tomas la mejor decisión</h3>
                    <p className="text-gray-600">
                      Con toda la información necesaria, puedes decidir con confianza si comprar o seguir buscando.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-6">
                ¿Tienes dudas sobre qué análisis elegir? Nuestro equipo te ayuda a decidir.
              </p>
              <Button
                variant="outline"
                className="border-techitoPurple text-techitoPurple hover:bg-techitoPurple/10 py-3 px-8 rounded-md bg-transparent"
              >
                Consultar con un experto
              </Button>
            </div>
          </div>
        </section>

        {/* Coverage Limitation Notice */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-techitoPurple" />
              Área de Cobertura
            </h3>
            <p className="text-gray-600 mb-4">
              Nuestros análisis están especializados en el mercado inmobiliario de{" "}
              <strong>Capital Federal (CABA)</strong>. Contamos con datos precisos y actualizados de todos los barrios
              porteños para brindarte el análisis más exacto posible.
            </p>
            <p className="text-sm text-gray-500">
              ¿Tienes una propiedad fuera de CABA? Contáctanos para conocer nuestros planes de expansión.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
