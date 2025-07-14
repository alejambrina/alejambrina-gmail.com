"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useActionState } from "react"
import { submitContactForm } from "@/actions/contact"
import Header from "@/components/header"

export default function ContactoPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, { success: false, message: "" })

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

        <form
          action={formAction}
          className="bg-white p-8 rounded-lg shadow-md border border-techitoLightGray space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              required
              className="w-full px-4 py-2 border border-techitoLightGray rounded-md focus:ring-techitoPurple focus:border-techitoPurple"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu.email@ejemplo.com"
              required
              className="w-full px-4 py-2 border border-techitoLightGray rounded-md focus:ring-techitoPurple focus:border-techitoPurple"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Tu mensaje
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              required
              className="w-full px-4 py-2 border border-techitoLightGray rounded-md focus:ring-techitoPurple focus:border-techitoPurple"
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-techitoPurple hover:bg-techitoPurple/90 text-white font-semibold py-3 rounded-md shadow-md"
          >
            {isPending ? "Enviando..." : "Enviar Mensaje"}
          </Button>

          {state?.message && (
            <p className={`mt-4 text-center text-sm ${state.success ? "text-techitoGreen" : "text-red-600"}`}>
              {state.message}
            </p>
          )}
        </form>
      </main>
    </div>
  )
}
