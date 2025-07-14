import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contacto Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contáctanos</h3>
          <ul className="space-y-2">
            <li>
              <a href="tel:+525658108436" className="hover:text-techitoPurple transition-colors">
                +52 565 810 8436
              </a>
            </li>
            <li>
              <a href="mailto:hola@techito.com.ar" className="hover:text-techitoPurple transition-colors">
                hola@techito.com.ar
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <h4 className="text-md font-semibold text-white mb-2">Horario de atención</h4>
            <p>Lunes a viernes</p>
            <p>07 a 22 hs</p>
          </div>
        </div>

        {/* Compañía Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Compañía</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/sobre-nosotros" className="hover:text-techitoPurple transition-colors">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/trabaja-con-nosotros" className="hover:text-techitoPurple transition-colors">
                Trabaja con nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Placeholder for other links or social media if needed */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explora</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/como-funciona" className="hover:text-techitoPurple transition-colors">
                ¿Cómo funciona?
              </Link>
            </li>
            <li>
              <Link href="/precios" className="hover:text-techitoPurple transition-colors">
                Precios
              </Link>
            </li>
            <li>
              <Link href="/preguntas" className="hover:text-techitoPurple transition-colors">
                Preguntas Frecuentes
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-techitoPurple transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Techito. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
