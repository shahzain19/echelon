import Link from "next/link";

export default function Header() {
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-gray-100/50">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-wider text-gray-900 group-hover:text-gray-600 transition-colors">
            ECHELON
          </h1>
        </Link>
        
        <nav className="flex items-center gap-6 md:gap-8">
          <Link 
            href="/track-order" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors uppercase tracking-wide relative group"
          >
            Track Order
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/cart" 
            className="relative group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-all duration-300">
              <svg className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
