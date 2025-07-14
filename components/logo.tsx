import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* The font is inherited from app/layout.tsx, using Inter variable font */}
      <span className="text-xl font-black text-foreground">Techito</span>
    </Link>
  )
}
