"use client"

import { useActionState } from "react"
import { submitContactForm } from "@/actions/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: "",
  })

  return (
    <form action={formAction} className="bg-white p-8 rounded-lg shadow-md border border-techitoLightGray space-y-6">
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
  )
}
