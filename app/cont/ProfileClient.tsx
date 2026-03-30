"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { formatPrice, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/utils";

interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  createdAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

interface ProfileClientProps {
  user: User;
  recentOrders: Order[];
}

export function ProfileClient({ user, recentOrders }: ProfileClientProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      if (res.ok) {
        setMessage("Profil actualizat cu succes!");
        setEditing(false);
      } else {
        const data = await res.json();
        setMessage(data.error || "Eroare la actualizare");
      }
    } catch {
      setMessage("Eroare la actualizare");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wider">
              Contul <span className="text-pink">meu</span>
            </h1>
            <p className="font-body text-sm text-neutral-500 mt-1">
              Bine ai venit, {user.name || user.email}!
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-red-500 transition-colors px-4 py-2 border border-neutral-200 rounded-full hover:border-red-300"
          >
            Deconectare
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wider">
                Date personale
              </h2>
              <button
                onClick={() => setEditing(!editing)}
                className="font-body text-xs font-semibold text-pink hover:underline uppercase tracking-wider"
              >
                {editing ? "Anulează" : "Editează"}
              </button>
            </div>

            {message && (
              <div className={`font-body text-sm rounded-xl p-3 mb-4 ${message.includes("succes") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {message}
              </div>
            )}

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Nume
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink transition-colors"
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-pink text-white font-body text-xs font-semibold uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-dark transition-colors disabled:opacity-50"
                >
                  {loading ? "Se salvează..." : "Salvează"}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="font-body text-xs text-neutral-400 uppercase tracking-wider">Email</p>
                  <p className="font-body text-sm font-medium mt-0.5">{user.email}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-neutral-400 uppercase tracking-wider">Nume</p>
                  <p className="font-body text-sm font-medium mt-0.5">{user.name || "—"}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-neutral-400 uppercase tracking-wider">Telefon</p>
                  <p className="font-body text-sm font-medium mt-0.5">{user.phone || "—"}</p>
                </div>
                <div>
                  <p className="font-body text-xs text-neutral-400 uppercase tracking-wider">Membru din</p>
                  <p className="font-body text-sm font-medium mt-0.5">
                    {new Date(user.createdAt).toLocaleDateString("ro-RO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
              Acțiuni rapide
            </h2>
            <div className="space-y-3">
              <Link
                href="/cont/comenzi"
                className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:border-pink/30 hover:bg-pink/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-nude/40 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold">Comenzile mele</p>
                    <p className="font-body text-xs text-neutral-500">Istoric și status comenzi</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-neutral-300 group-hover:text-pink transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/produse"
                className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:border-pink/30 hover:bg-pink/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-nude/40 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold">Magazin</p>
                    <p className="font-body text-xs text-neutral-500">Descoperă produsele noastre</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-neutral-300 group-hover:text-pink transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent orders */}
        {recentOrders.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wider">
                Comenzi recente
              </h2>
              <Link
                href="/cont/comenzi"
                className="font-body text-xs font-semibold text-pink hover:underline uppercase tracking-wider"
              >
                Vezi toate →
              </Link>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/cont/comenzi/${order.id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 hover:border-pink/30 hover:bg-pink/5 transition-all"
                >
                  <div>
                    <p className="font-body text-sm font-semibold">{order.orderNumber}</p>
                    <p className="font-body text-xs text-neutral-500 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("ro-RO")} · {order.items.length} produs{order.items.length > 1 ? "e" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-sm font-bold">{formatPrice(order.total)}</p>
                    <span className={`inline-block font-body text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
                      order.status === "delivered" ? "bg-green-100 text-green-700" :
                      order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-neutral-100 text-neutral-600"
                    }`}>
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
