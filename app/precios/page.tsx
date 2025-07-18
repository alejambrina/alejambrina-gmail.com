import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { CheckCircle, X, MapPin, Search, FileText, BarChart3, CheckSquare } from "lucide-react"
import Header from "@/components/header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

        {/* How Techito Works section - aligned with analysis types */}
        <section className="bg-white rounded-lg shadow-md p-8 border border-techitoLightGray mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona nuestro servicio de análisis?</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Un proceso simple y profesional para obtener el análisis perfecto según tus necesidades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <Search className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">1. Selecciona tu tipo de análisis</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Elige entre nuestros tres niveles de análisis: <strong>Exprés</strong> para una evaluación rápida,{" "}
                    <strong>Premium</strong> para un análisis completo, o <strong>Pro</strong> para el máximo nivel de
                    detalle profesional.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">2. Analizamos tu propiedad</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Nuestros expertos realizan un análisis exhaustivo utilizando datos de mercado, comparables, mapas de
                    calor y todas las herramientas incluidas en tu plan seleccionado.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <FileText className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">3. Recibes tu reporte completo</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Te entregamos un reporte detallado con toda la información analizada: valuación, comparables, datos
                    del barrio, simulaciones financieras y recomendaciones profesionales.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border border-techitoLightGray shadow-md rounded-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-techitoPurple/10 text-techitoPurple">
                    <CheckSquare className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">4. Tomas la mejor decisión</CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-4 text-gray-700">
                  <p>
                    Con toda la información precisa y confiable en tus manos, puedes tomar una decisión de compra
                    informada y negociar con confianza el mejor precio posible.
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

        {/* FAQ Section */}
        <section className="bg-white rounded-lg shadow-md p-8 border border-techitoLightGray">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros análisis de propiedades y cómo
              funciona Techito.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-0">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Qué es Techito y cómo me ayuda a ahorrar?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Techito es una plataforma que utiliza algoritmos avanzados para identificar propiedades en el mercado
                  que están por debajo de su valor promedio. Te mostramos solo las 'gangas' para que puedas comprar tu
                  primera propiedad o invertir pagando lo menos posible.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Cómo se calcula el 'porcentaje debajo del promedio'?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Nuestro sistema analiza miles de datos de propiedades similares (ubicación, tamaño, antigüedad,
                  características) y compara el precio de la propiedad que te interesa con el promedio de mercado. El
                  porcentaje indica cuánto más barata es esa propiedad en comparación con el valor esperado.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Techito es una inmobiliaria?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  No, Techito no es una inmobiliaria. Somos una plataforma tecnológica que te conecta con oportunidades
                  y te brinda herramientas para que tomes las mejores decisiones. No cobramos comisiones por venta,
                  nuestro modelo se basa en suscripciones a planes premium.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Puedo contactar al vendedor directamente a través de Techito?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Sí, una vez que encuentres una propiedad que te interese, te facilitamos el contacto directo con el
                  vendedor o su representante para que puedas iniciar la negociación sin intermediarios innecesarios.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Qué tipo de propiedades puedo encontrar en Techito?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  En Techito encontrarás una amplia variedad de propiedades, desde departamentos y casas hasta PHs y
                  lofts, en diversas ubicaciones. Nos enfocamos en identificar oportunidades en el mercado residencial.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Cómo puedo publicar mi propiedad en Techito?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Actualmente, Techito se enfoca en ayudar a los compradores a encontrar las mejores oportunidades. No
                  ofrecemos una función directa para que los particulares publiquen sus propiedades. Sin embargo, si
                  eres un desarrollador o una inmobiliaria y te interesa que tus propiedades aparezcan en nuestra
                  plataforma, por favor contáctanos a través de la sección de 'Contacto'.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Techito ofrece asesoramiento legal o financiero?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Techito es una plataforma tecnológica y no brinda asesoramiento legal o financiero directo. Sin
                  embargo, en nuestros planes Premium y Pro, te conectamos con una red de profesionales de confianza
                  (escribanos, asesores financieros) que pueden guiarte en cada etapa del proceso de compra.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Cómo me aseguro de que las propiedades son realmente 'gangas'?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Nuestro algoritmo de análisis de mercado es robusto y se actualiza constantemente con datos de
                  diversas fuentes. Además, te proporcionamos herramientas para que puedas verificar la información y,
                  si lo deseas, realizar tu propia investigación o consultar con un profesional antes de tomar cualquier
                  decisión.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                  ¿Hay alguna comisión por comprar a través de Techito?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  No, Techito no cobra ninguna comisión por la compra de propiedades. Nuestro modelo de negocio se basa
                  en las suscripciones a nuestros planes (Básico, Premium, Pro), que te dan acceso a diferentes niveles
                  de herramientas y oportunidades. El precio que ves es el precio de la propiedad, sin costos ocultos
                  por nuestra parte.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">¿No encontraste tu respuesta?</h3>
              <p className="text-lg text-gray-600 mb-6">Contactanos y te ayudaremos con gusto.</p>
              <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 px-8 rounded-md shadow-md">
                Contactar
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
