"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TrackOrder() {
  const [phone, setPhone] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const orders = useQuery(
    api.functions.trackOrder.trackOrderByPhone,
    searchPhone ? { phone: searchPhone } : "skip"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPhone(phone);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped": return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "pending": return 1;
      case "confirmed": return 2;
      case "shipped": return 3;
      case "delivered": return 4;
      case "cancelled": return 0;
      default: return 1;
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-light text-gray-900 mb-4 text-center">Track Your Order</h1>
          <p className="text-gray-600 text-center mb-12">
            Enter your phone number to track your order status
          </p>

          {/* Search Form */}
          <div className="premium-card p-8 mb-12">
            <form onSubmit={handleSearch}>
              <div className="flex gap-4">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="premium-input flex-1"
                  required
                />
                <button type="submit" className="premium-button">
                  Track Order
                </button>
              </div>
            </form>
          </div>

          {/* Results */}
          {searchPhone && (
            <div className="space-y-8">
              {orders && orders.length > 0 ? (
                orders.map((order: any) => (
                  <div key={order._id} className="premium-card p-8">
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                      <div>
                        <h2 className="text-2xl font-light text-gray-900 mb-2">
                          Order for {order.customerName}
                        </h2>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-light text-gray-900">Rs {order.total}</p>
                        <span className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    {order.status !== "cancelled" && (
                      <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                          {["Pending", "Confirmed", "Shipped", "Delivered"].map((step, idx) => {
                            const stepNumber = idx + 1;
                            const currentStep = getStatusStep(order.status);
                            const isActive = stepNumber <= currentStep;
                            const isCurrent = stepNumber === currentStep;

                            return (
                              <div key={step} className="flex-1 relative">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                                      isActive
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-200 text-gray-500"
                                    } ${isCurrent ? "ring-4 ring-gray-300" : ""}`}
                                  >
                                    {isActive ? "✓" : stepNumber}
                                  </div>
                                  <p className={`text-xs mt-2 ${isActive ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                    {step}
                                  </p>
                                </div>
                                {idx < 3 && (
                                  <div
                                    className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                                      stepNumber < currentStep ? "bg-gray-900" : "bg-gray-200"
                                    }`}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {order.status === "cancelled" && (
                      <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-800 text-center">
                          This order has been cancelled
                        </p>
                      </div>
                    )}

                    {/* Delivery Address */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Address</h3>
                      <p className="text-gray-900">{order.address}</p>
                      <p className="text-sm text-gray-600 mt-1">{order.phone}</p>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Order Items</h3>
                      <div className="space-y-2">
                        {order.productIds.map((productId: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                            <span className="text-gray-900">Product ID: {productId}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : orders === undefined ? (
                <div className="premium-card p-12 text-center">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : (
                <div className="premium-card p-12 text-center">
                  <p className="text-gray-500">No orders found for this phone number</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Please check your phone number and try again
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
