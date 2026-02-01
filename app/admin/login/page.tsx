"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="premium-card p-10 w-full max-w-md">
        <h1 className="text-3xl font-light text-gray-900 mb-8 text-center tracking-wider">ADMIN</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="premium-input"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="premium-input"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-6 text-center">{error}</p>}
          <button
            type="submit"
            className="premium-button w-full"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-6">
          Default credentials: admin / admin123
        </p>
      </div>
    </div>
  );
}
