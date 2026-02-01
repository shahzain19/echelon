"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function OrderConfirm() {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const lastPhone = localStorage.getItem("lastOrderPhone");
    if (lastPhone) {
      setPhone(lastPhone);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-light text-gray-900 mb-4">Order Confirmed</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for your order. Our team will contact you shortly to confirm delivery details.
            You'll pay when you receive your package.
          </p>
          
          {phone && (
            <div className="premium-card p-6 mb-8 text-left">
              <p className="text-sm text-gray-600 mb-2">Track your order using:</p>
              <p className="text-lg font-medium text-gray-900">{phone}</p>
            </div>
          )}
          
          <div className="flex gap-4 justify-center">
            <Link href="/track-order" className="premium-button-outline inline-block">
              Track Order
            </Link>
            <Link href="/" className="premium-button inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
