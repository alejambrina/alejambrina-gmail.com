"use server"

interface ContactFormState {
  success: boolean
  message: string
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { success: false, message: "Por favor, completa todos los campos." }
  }

  // In a real application, you would send this data to your backend,
  // an email service (e.g., Resend, SendGrid), or a CRM.
  console.log("Formulario de contacto recibido:")
  console.log(`Nombre: ${name}`)
  console.log(`Email: ${email}`)
  console.log(`Mensaje: ${message}`)

  // Simulate success
  return { success: true, message: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto." }
}
