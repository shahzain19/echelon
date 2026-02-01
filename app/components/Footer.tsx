export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-light tracking-wider text-gray-900 mb-4">ECHELON</h2>
            <p className="text-gray-600 text-sm">Premium packs, delivered with care</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-gray-900 transition-colors">Home</a></li>
              <li><a href="/track-order" className="hover:text-gray-900 transition-colors">Track Order</a></li>
              <li><a href="/cart" className="hover:text-gray-900 transition-colors">Cart</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Cash on Delivery</li>
              <li>Secure Packaging</li>
              <li>Fast Delivery</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Echelon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
