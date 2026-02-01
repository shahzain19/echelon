"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function OrderConfirm() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p>Thank you for your order. Our team will contact you for delivery details.</p>
        <Link href="/" className="mt-6 inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
