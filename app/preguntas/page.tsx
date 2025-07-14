import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Header from "@/components/header"

export default function PreguntasPage() {
  const faqs = [
    {
      question: "¿Qué es Techito y cómo me ayuda a ahorrar?",
      answer:
        "Techito es una plataforma que utiliza algoritmos avanzados para identificar propiedades en el mercado que están por debajo de su valor promedio. Te mostramos solo las 'gangas' para que puedas comprar tu primera propiedad o invertir pagando lo menos posible.",
    },
    {
      question: "¿Cómo se calcula el 'porcentaje debajo del promedio'?",
      answer:
        "Nuestro sistema analiza miles de datos de propiedades similares (ubicación, tamaño, antigüedad, características) y compara el precio de la propiedad que te interesa con el promedio de mercado. El porcentaje indica cuánto más barata es esa propiedad en comparación con el valor esperado.",
    },
    {
      question: "¿Techito es una inmobiliaria?",
      answer:
        "No, Techito no es una inmobiliaria. Somos una plataforma tecnológica que te conecta con oportunidades y te brinda herramientas para que tomes las mejores decisiones. No cobramos comisiones por venta, nuestro modelo se basa en suscripciones a planes premium.",
    },
    {
      question: "¿Puedo contactar al vendedor directamente a través de Techito?",
      answer:
        "Sí, una vez que encuentres una propiedad que te interese, te facilitamos el contacto directo con el vendedor o su representante para que puedas iniciar la negociación sin intermediarios innecesarios.",
    },
    {
      question: "¿Qué tipo de propiedades puedo encontrar en Techito?",
      answer:
        "En Techito encontrarás una amplia variedad de propiedades, desde departamentos y casas hasta PHs y lofts, en diversas ubicaciones. Nos enfocamos en identificar oportunidades en el mercado residencial.",
    },
    {
      question: "¿Cómo puedo publicar mi propiedad en Techito?",
      answer:
        "Actualmente, Techito se enfoca en ayudar a los compradores a encontrar las mejores oportunidades. No ofrecemos una función directa para que los particulares publiquen sus propiedades. Sin embargo, si eres un desarrollador o una inmobiliaria y te interesa que tus propiedades aparezcan en nuestra plataforma, por favor contáctanos a través de la sección de 'Contacto'.",
    },
    {
      question: "¿Techito ofrece asesoramiento legal o financiero?",
      answer:
        "Techito es una plataforma tecnológica y no brinda asesoramiento legal o financiero directo. Sin embargo, en nuestros planes Premium y Pro, te conectamos con una red de profesionales de confianza (escribanos, asesores financieros) que pueden guiarte en cada etapa del proceso de compra.",
    },
    {
      question: "¿Cómo me aseguro de que las propiedades son realmente 'gangas'?",
      answer:
        "Nuestro algoritmo de análisis de mercado es robusto y se actualiza constantemente con datos de diversas fuentes. Además, te proporcionamos herramientas para que puedas verificar la información y, si lo deseas, realizar tu propia investigación o consultar con un profesional antes de tomar cualquier decisión.",
    },
    {
      question: "¿Hay alguna comisión por comprar a través de Techito?",
      answer:
        "No, Techito no cobra ninguna comisión por la compra de propiedades. Nuestro modelo de negocio se basa en las suscripciones a nuestros planes (Básico, Premium, Pro), que te dan acceso a diferentes niveles de herramientas y oportunidades. El precio que ves es el precio de la propiedad, sin costos ocultos por nuestra parte.",
    },
  ]

  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1 p-6 md:p-10 max-w-3xl mx-auto w-full">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aquí encontrarás respuestas a las preguntas más comunes sobre cómo funciona Techito y cómo puedes aprovechar
            al máximo nuestra plataforma.
          </p>
        </section>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold text-techitoText hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <section className="text-center mt-12 md:mt-16">
          <h2 className="text-2xl font-bold mb-4">¿No encontraste tu respuesta?</h2>
          <p className="text-lg text-gray-600 mb-6">Contactanos y te ayudaremos con gusto.</p>
          <Link href="/contacto">
            {" "}
            {/* Assuming a contact page will be created */}
            <Button className="bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 px-8 rounded-md shadow-md">
              Contactar
            </Button>
          </Link>
        </section>
      </main>
    </div>
  )
}
