import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} TuTechito. All rights reserved.</p>
        <p className="mt-2">
          <Link href="/compra" className="text-blue-500 hover:underline">
            Compra TuTechito
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
