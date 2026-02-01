"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

type Tab = "products" | "orders";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [showForm, setShowForm] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const products = useQuery(api.functions.getProducts.getProducts);
  const orders = useQuery(api.functions.getOrders.getOrders);
  const createProduct = useMutation(api.functions.adminProducts.createProduct);
  const deleteProduct = useMutation(api.functions.adminProducts.deleteProduct);
  const updateOrderStatus = useMutation(api.functions.updateOrderStatus.updateOrderStatus);
  const generateUploadUrl = useMutation(api.functions.uploadImage.generateUploadUrl);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      const storageIds: any[] = [];
      
      for (const file of imageFiles) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        storageIds.push(storageId);
      }

      const tagArray = tags.split(",").map(t => t.trim()).filter(t => t);

      await createProduct({
        name,
        description,
        imageStorageIds: storageIds,
        price: parseFloat(price),
        tags: tagArray,
      });

      setName("");
      setDescription("");
      setPrice("");
      setTags("");
      setImageFiles([]);
      setShowForm(false);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (confirm("Delete this product?")) {
      await deleteProduct({ id });
    }
  };

  const handleStatusChange = async (orderId: any, newStatus: string) => {
    await updateOrderStatus({ orderId, status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  if (!isAuth) return <div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center">
        <h1 className="text-3xl font-light tracking-wider text-gray-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "products"
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "orders"
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Orders {orders && orders.length > 0 && `(${orders.length})`}
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12">
        {/* Products Tab */}
        {activeTab === "products" && (
          <>
            <div className="mb-8">
              <button
                onClick={() => setShowForm(!showForm)}
                className="premium-button"
              >
                {showForm ? "Cancel" : "+ Add New Product"}
              </button>
            </div>

            {showForm && (
              <div className="premium-card p-8 mb-12">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Create Product</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="premium-input"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="premium-input"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="premium-input"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="premium-input"
                      placeholder="premium, bundle, featured"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="premium-input"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">Select one or more images</p>
                    {imageFiles.length > 0 && (
                      <div className="mt-4 grid grid-cols-4 gap-4">
                        {imageFiles.map((file, idx) => (
                          <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-200">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`Preview ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="premium-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? "Uploading..." : "Create Product"}
                  </button>
                </form>
              </div>
            )}

            <div className="premium-card p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Products</h2>
              <div className="space-y-6">
                {products?.map((product: any) => (
                  <div key={product._id} className="border border-gray-100 p-6 rounded-xl flex justify-between items-start hover:border-gray-200 transition-colors">
                    <div className="flex gap-6">
                      <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                      <div>
                        <h3 className="text-lg font-light text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        <p className="text-xl font-light text-gray-900 mt-2">Rs {product.price}</p>
                        <p className="text-xs text-gray-500 mt-1">{product.tags.join(", ")}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {!products?.length && (
                  <p className="text-gray-500 text-center py-12">No products yet</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="premium-card p-8">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Orders</h2>
            <div className="space-y-6">
              {orders?.map((order: any) => (
                <div key={order._id} className="border border-gray-100 p-6 rounded-xl hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-light text-gray-900">{order.customerName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{order.phone}</p>
                      <p className="text-sm text-gray-600">{order.address}</p>
                      <p className="text-xs text-gray-500 mt-2">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-gray-900">Rs {order.total}</p>
                      <span className={`inline-block mt-2 px-4 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Products:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.productIds.map((pid: string, idx: number) => {
                        const product = products?.find((p: any) => p._id.toString() === pid);
                        return product ? (
                          <span key={idx} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                            {product.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="premium-input text-sm py-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
              {!orders?.length && (
                <p className="text-gray-500 text-center py-12">No orders yet</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
