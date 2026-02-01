import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductCard({ id, name, description, price, images }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="premium-card overflow-hidden h-full flex flex-col">
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          <img 
            src={images[0]} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Quick view badge */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-gray-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Quick View →
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-light text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
            {name}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {description}
          </p>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div>
              <p className="text-2xl font-light text-gray-900">
                Rs {price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Cash on Delivery</p>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
