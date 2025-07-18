import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/techito-logo.png"
        alt="Techito Logo"
        width={120}
        height={40}
        className="h-8 w-auto"
        priority
      />
    </Link>
  )
}
