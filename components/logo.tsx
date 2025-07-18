import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-x-3.5 flex-col leading-3">
      <div className="text-2xl font-bold text-techitoPurple">Techito</div>
    </Link>
  )
}
