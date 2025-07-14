import Link from "next/link"
import { Home } from "lucide-react"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Home className="h-6 w-6 text-techitoPurple" />
      <span className="text-xl font-black text-techitoText">Techito</span>
    </Link>
  )
}
