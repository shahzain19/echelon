import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="group">
          <h1 className="text-3xl font-light tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors">
            ECHELON
          </h1>
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/track-order" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors uppercase tracking-wide">
            Track Order
          </Link>
          <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors uppercase tracking-wide">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
