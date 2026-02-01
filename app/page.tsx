
"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const products = useQuery(api.functions.getProducts.getProducts);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-wider text-gray-900 mb-6">
            Premium Packs
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Curated collections designed for excellence
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="flex-1 container mx-auto px-6 py-16">
        {products === undefined ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse text-gray-500">Loading products...</div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p: any) => (
              <ProductCard
                key={p._id}
                id={p._id.toString()}
                name={p.name}
                description={p.description}
                price={p.price}
                images={p.images}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 mb-2">No products available yet</p>
            <p className="text-sm text-gray-400">Check back soon for new arrivals</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
