import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-x-3.5 flex-col leading-3">
      <Image
        src="/images/techito-logo-green.png"
        alt="Techito"
        width={160}
        height={53}
        className="h-12 w-auto"
        priority
      />
    </Link>
  )
}
