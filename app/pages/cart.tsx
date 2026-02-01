"use client"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Cart() {
  const router = useRouter();
  const addProductId = router.query.add as string;
  const qty = Number(router.query.qty || 1);

  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const products = useQuery(api.functions.getProducts.getProducts);
  const createOrder = useMutation(api.functions.createOrder.createOrder);

  // Add item from query
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
    await createOrder({
      customerName,
      phone,
      address,
      productIds: cart.map((c) => c.id),
      total,
    });
    router.push("/order-confirm");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item, idx) => {
          const p = products?.find((pr: any) => pr._id.toString() === item.id);
          if (!p) return null;
          return (
            <div key={idx} className="flex justify-between mb-4 border-b pb-2">
              <span>{p.name} x {item.quantity}</span>
              <span>Rs {p.price * item.quantity}</span>
            </div>
          );
        })}
        {cart.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Cash-on-Delivery Details</h2>
            <div className="flex flex-col gap-2 mt-2">
              <input type="text" placeholder="Full Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="border p-2 rounded"/>
              <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 rounded"/>
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 rounded"/>
            </div>
            <p className="mt-2 font-semibold">Total: Rs {total}</p>
            <button onClick={handleOrder} className="mt-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Place Order (COD)</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
