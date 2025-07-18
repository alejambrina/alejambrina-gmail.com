import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contacto Section */}
        <div>
          <h3 className="text-base font-normal text-gray-400 mb-4">Contáctanos</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hola@techito.com.ar"
                className="text-gray-200 font-medium hover:text-techitoPurple transition-colors"
              >
                hola@techito.com.ar
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <h4 className="text-base font-normal text-gray-400 mb-2">Horario de atención</h4>
            <p className="text-gray-200 font-medium">Lunes a viernes</p>
            <p className="text-gray-200 font-medium">07 a 22 hs</p>
          </div>
        </div>

        {/* Compañía Section */}
        <div>
          <h3 className="text-base font-normal text-gray-400 mb-4">Compañía</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/sobre-nosotros"
                className="text-gray-200 font-medium hover:text-techitoPurple transition-colors"
              >
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/trabaja-con-nosotros"
                className="text-gray-200 font-medium hover:text-techitoPurple transition-colors"
              >
                Trabaja con nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/* Placeholder for other links or social media if needed */}
        <div>
          <h3 className="text-base font-normal text-gray-400 mb-4">Explora</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/precios" className="text-gray-200 font-medium hover:text-techitoPurple transition-colors">
                Compra TuTechito
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-200 font-medium hover:text-techitoPurple transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Techito. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
