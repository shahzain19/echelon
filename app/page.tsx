
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
      <section className="relative gradient-bg py-24 md:py-32 border-b border-gray-100 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-light tracking-wider text-gray-900 mb-6 animate-fade-in">
            Premium Packs
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in stagger-1 leading-relaxed">
            Curated collections designed for excellence. Discover premium quality products delivered with care.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-12 mt-12 animate-fade-in stagger-2">
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900">{products?.length || 0}</div>
              <div className="text-sm text-gray-600 mt-1">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900">100%</div>
              <div className="text-sm text-gray-600 mt-1">Quality</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-gray-900">COD</div>
              <div className="text-sm text-gray-600 mt-1">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="flex-1 container mx-auto px-6 py-20">
        {products === undefined ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-500">Loading products...</p>
            </div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-3">Our Collection</h2>
              <p className="text-gray-600">Handpicked premium products just for you</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p: any, idx: number) => (
                <div key={p._id} className={`animate-fade-in stagger-${Math.min(idx + 1, 6)}`}>
                  <ProductCard
                    id={p._id.toString()}
                    name={p.name}
                    description={p.description}
                    price={p.price}
                    images={p.images}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-3">No Products Yet</h3>
            <p className="text-gray-500 mb-2">Our collection is being curated</p>
            <p className="text-sm text-gray-400">Check back soon for new arrivals</p>
          </div>
        )}
      </main>
      
      {/* Features Section */}
      <section className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Cash on Delivery</h3>
              <p className="text-gray-600 text-sm">Pay when you receive your order</p>
            </div>
            
            <div className="text-center animate-fade-in stagger-1">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Packaging</h3>
              <p className="text-gray-600 text-sm">Your products arrive safely</p>
            </div>
            
            <div className="text-center animate-fade-in stagger-2">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick and reliable shipping</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
