"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Parolă incorectă");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/50 to-nude-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-medium text-dark">Emma Nails</h1>
          <p className="font-body text-sm text-dark-400 mt-1 uppercase tracking-wider">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">
              Parolă Admin
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introdu parola..."
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-pink/30 focus:border-pink transition-all"
              autoFocus
            />
          </div>

          {error && (
            <p className="font-body text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-pink text-white font-body text-sm font-semibold uppercase tracking-wider py-3 rounded-xl hover:bg-pink/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Se verifică..." : "Intră în Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
