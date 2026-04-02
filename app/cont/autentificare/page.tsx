"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/cont";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email sau parolă incorectă");
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/uploads/site-logo3.45.png"
              alt="Emma Nails"
              width={140}
              height={50}
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h1 className="font-display text-2xl font-bold uppercase tracking-wider mt-6">
            Autentificare
          </h1>
          <p className="font-body text-sm text-neutral-500 mt-2">
            Intră în contul tău Emma Nails
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-100">
          {error && (
            <div className="bg-red-50 text-red-600 font-body text-sm rounded-xl p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                placeholder="maria@email.com"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Parolă
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink text-white font-body text-xs font-semibold uppercase tracking-[0.2em] py-3.5 rounded-full hover:bg-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Se autentifică..." : "Intră în cont"}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-sm text-neutral-500 mt-6">
          Nu ai un cont?{" "}
          <Link href="/cont/inregistrare" className="text-pink font-semibold hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </div>
    </div>
  );
}
