import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-neutral-900 p-4">
      <nav className="flex items-baseline justify-between">
        <Link href="/">
          <span className="text-xl font-bold">Packing List</span>
        </Link>

        <div className="flex gap-4">
          <Link href="/login">
            <span className="rounded-md bg-blue-700 px-3 py-1 hover:bg-blue-500 focus-visible:bg-blue-500">
              Sign In
            </span>{' '}
          </Link>
        </div>
      </nav>
    </header>
  )
}
