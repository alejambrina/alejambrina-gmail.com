import Header from "@/components/header"
import type { Metadata } from "next" // Import Metadata type
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contacto - Techito | Envíanos tus Preguntas y Sugerencias",
  description:
    "Contacta con Techito para cualquier pregunta, sugerencia o ayuda con tu búsqueda de propiedades. Estamos aquí para ayudarte a encontrar tu techito ideal.",
  keywords: ["contacto Techito", "ayuda propiedades", "preguntas Techito", "soporte inmobiliario", "Techito"],
  openGraph: {
    title: "Contacto - Techito | Envíanos tus Preguntas y Sugerencias",
    description:
      "Contacta con Techito para cualquier pregunta, sugerencia o ayuda con tu búsqueda de propiedades. Estamos aquí para ayudarte a encontrar tu techito ideal.",
    url: "https://www.techito.com/contacto", // Replace with your actual domain
    siteName: "Techito",
    images: [
      {
        url: "https://www.techito.com/og-image.jpg", // Replace with a relevant image for social sharing
        width: 1200,
        height: 630,
        alt: "Contacta con Techito",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Techito | Envíanos tus Preguntas y Sugerencias",
    description:
      "Contacta con Techito para cualquier pregunta, sugerencia o ayuda con tu búsqueda de propiedades. Estamos aquí para ayudarte a encontrar tu techito ideal.",
    creator: "@TechitoApp", // Replace with your Twitter handle
    images: ["https://www.techito.com/og-image.jpg"], // Replace with a relevant image
  },
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-techitoBackground text-techitoText flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1 p-6 md:p-10 max-w-xl mx-auto w-full">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacta con Techito</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? Envíanos un mensaje y te responderemos a la brevedad.
          </p>
        </section>

        <ContactForm />
      </main>
    </div>
  )
}
