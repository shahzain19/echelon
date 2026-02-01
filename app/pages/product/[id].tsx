"use client"
import { useRouter } from "next/router";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const products = useQuery(api.functions.getProducts.getProducts);
  const product = products?.find((p: any) => p._id.toString() === id);

  const [quantity, setQuantity] = useState(1);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={product.images[0]} alt={product.name} className="w-full md:w-1/2 h-auto rounded" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="font-semibold mt-4">Rs {product.price}</p>
            <div className="mt-4 flex items-center gap-2">
              <span>Quantity:</span>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border rounded px-2 py-1"
              />
            </div>
            <a
              href={`/cart?add=${product._id}&qty=${quantity}`}
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Add to Cart (COD)
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
