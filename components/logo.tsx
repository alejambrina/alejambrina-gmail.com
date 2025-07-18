import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-x-3.5 flex-col leading-3">
      <Image src="/images/techito-logo-green.png" alt="Techito" width={192} height={64} className="h-14 w-auto" />
    </Link>
  )
}
