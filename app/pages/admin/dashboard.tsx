"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrls, setImageUrls] = useState("");

  const products = useQuery(api.functions.getProducts.getProducts);
  const createProduct = useMutation(api.functions.adminProducts.createProduct);
  const deleteProduct = useMutation(api.functions.adminProducts.deleteProduct);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const images = imageUrls.split("\n").filter(url => url.trim());
    const tagArray = tags.split(",").map(t => t.trim()).filter(t => t);

    await createProduct({
      name,
      description,
      images,
      price: parseFloat(price),
      tags: tagArray,
    });

    setName("");
    setDescription("");
    setPrice("");
    setTags("");
    setImageUrls("");
    setShowForm(false);
  };

  const handleDelete = async (id: any) => {
    if (confirm("Delete this product?")) {
      await deleteProduct({ id });
    }
  };

  if (!isAuth) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          >
            {showForm ? "Cancel" : "Add New Product"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price (Rs)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="premium, bundle, featured"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Image URLs (one per line)</label>
                <textarea
                  value={imageUrls}
                  onChange={(e) => setImageUrls(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={4}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Create Product
              </button>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="space-y-4">
            {products?.map((product: any) => (
              <div key={product._id} className="border p-4 rounded flex justify-between items-start">
                <div className="flex gap-4">
                  <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="font-semibold mt-1">Rs {product.price}</p>
                    <p className="text-xs text-gray-500">{product.tags.join(", ")}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
