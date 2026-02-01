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
    <Link href={`/product/${id}`} className="group">
      <div className="premium-card overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img 
            src={images[0]} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-light text-gray-900 mb-2">{name}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-light text-gray-900">Rs {price}</p>
            <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors uppercase tracking-wide">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
