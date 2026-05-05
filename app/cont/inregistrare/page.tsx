"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Parolele nu coincid");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Parola trebuie să aibă minim 6 caractere");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Eroare la crearea contului");
        setLoading(false);
        return;
      }

      // Auto-login after registration
      const loginResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (loginResult?.error) {
        router.push("/cont/autentificare");
      } else {
        router.push("/cont");
        router.refresh();
      }
    } catch {
      setError("Eroare la crearea contului. Încearcă din nou.");
      setLoading(false);
    }
  };

  return (
    <div className="shop-section-muted flex min-h-[80vh] items-center justify-center px-4">
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
            Creează cont
          </h1>
          <p className="font-body text-sm text-neutral-500 mt-2">
            Alătură-te comunității Emma Nails
          </p>
        </div>

        <div className="bg-white rounded border border-neutral-100 p-6 shadow-sm sm:p-8">
          {error && (
            <div className="bg-red-50 text-red-600 font-body text-sm rounded p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Nume complet
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded border border-neutral-200 px-4 py-3 font-body text-sm transition-colors focus:border-dark focus:outline-none"
                placeholder="Maria Popescu"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded border border-neutral-200 px-4 py-3 font-body text-sm transition-colors focus:border-dark focus:outline-none"
                placeholder="maria@email.com"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded border border-neutral-200 px-4 py-3 font-body text-sm transition-colors focus:border-dark focus:outline-none"
                placeholder="0740 000 000"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Parolă *
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded border border-neutral-200 px-4 py-3 font-body text-sm transition-colors focus:border-dark focus:outline-none"
                placeholder="Minim 6 caractere"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                Confirmă parola *
              </label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full rounded border border-neutral-200 px-4 py-3 font-body text-sm transition-colors focus:border-dark focus:outline-none"
                placeholder="Repetă parola"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark text-white font-body text-xs font-semibold uppercase py-3.5 rounded hover:bg-pink transition-colors disabled:opacity-50"
              style={{ letterSpacing: "0.14em" }}
            >
              {loading ? "Se creează contul..." : "Creează cont"}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-sm text-neutral-500 mt-6">
          Ai deja un cont?{" "}
          <Link href="/cont/autentificare" className="text-pink font-semibold hover:underline">
            Autentifică-te
          </Link>
        </p>
      </div>
    </div>
  );
}
