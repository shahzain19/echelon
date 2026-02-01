"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Cart() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addProductId = searchParams.get("add");
  const qty = Number(searchParams.get("qty") || 1);

  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const products = useQuery(api.functions.getProducts.getProducts);
  const createOrder = useMutation(api.functions.createOrder.createOrder);

  useEffect(() => {
    if (addProductId) {
      setCart((prev) => [...prev, { id: addProductId, quantity: qty }]);
    }
  }, [addProductId, qty]);

  const total = cart.reduce((acc, item) => {
    const p = products?.find((pr: any) => pr._id.toString() === item.id);
    return acc + (p?.price || 0) * item.quantity;
  }, 0);

  const handleOrder = async () => {
    if (!customerName || !phone || !address) {
      alert("Please fill in all fields");
      return;
    }
    
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    
    try {
      await createOrder({
        customerName,
        phone,
        address,
        productIds: cart.map((c) => c.id),
        total,
      });
      
      // Store phone for easy tracking
      localStorage.setItem("lastOrderPhone", phone);
      
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-16">
        <h1 className="text-4xl font-light text-gray-900 mb-12">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6">Your cart is empty</p>
            <a href="/" className="premium-button-outline inline-block">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, idx) => {
                const p = products?.find((pr: any) => pr._id.toString() === item.id);
                if (!p) return null;
                return (
                  <div key={idx} className="premium-card p-6 flex gap-6">
                    <img src={p.images[0]} alt={p.name} className="w-24 h-24 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-gray-900">{p.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-xl font-light text-gray-900 mt-2">Rs {p.price * item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-1">
              <div className="premium-card p-8 sticky top-24">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Delivery Details</h2>
                <div className="space-y-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    className="premium-input"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="premium-input"
                  />
                  <textarea 
                    placeholder="Delivery Address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className="premium-input"
                    rows={3}
                  />
                </div>
                
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>Rs {total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Delivery</span>
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between text-2xl font-light text-gray-900">
                    <span>Total</span>
                    <span>Rs {total}</span>
                  </div>
                </div>
                
                <button onClick={handleOrder} className="premium-button w-full">
                  Place Order
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Pay when you receive your order
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
