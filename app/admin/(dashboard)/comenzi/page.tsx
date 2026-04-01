"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string | null;
  address: string;
  city: string;
  county: string;
  paymentMethod: string;
  paymentStatus: string;
  total: number;
  subtotal: number;
  discount: number;
  discountCode: string | null;
  shipping: number;
  status: string;
  createdAt: string;
  items: Array<{ id: string; name: string; price: number; quantity: number; product: { imageUrl: string | null; slug: string } }>;
}

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];
const STATUS_LABELS: Record<string, string> = {
  all: "Toate", pending: "În așteptare", processing: "Se procesează",
  shipped: "Expediată", delivered: "Livrată", cancelled: "Anulată",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800", processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800", delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
const PAYMENT_LABELS: Record<string, string> = {
  stripe: "Card", ramburs: "Ramburs",
};

function formatPrice(bani: number) { return `${(bani / 100).toFixed(2)} lei`; }
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    fetch(`/api/admin/orders?status=${filter}`)
      .then((r) => r.json())
      .then((data) => setOrders(data.orders || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setUpdating(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Comenzi</h1>
          <p className="font-body text-sm text-dark-400 mt-1">Gestionează comenzile clienților</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`font-body text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-colors ${
              filter === s ? "bg-pink text-white" : "bg-white text-dark-400 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" />
          </div>
        ) : orders.length === 0 ? (
          <p className="p-12 text-center font-body text-sm text-dark-400">Nicio comandă{filter !== "all" ? ` cu statusul „${STATUS_LABELS[filter]}"` : ""}.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Nr.</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Client</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Produse</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Total</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Plată</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Status</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Data</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-50 hover:bg-neutral-50/50">
                    <td className="px-5 py-4">
                      <span className="font-body text-sm font-semibold text-pink">#{order.orderNumber}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-body text-sm font-medium">{order.name}</p>
                      <p className="font-body text-xs text-dark-400">{order.email}</p>
                      {order.phone && <p className="font-body text-xs text-dark-300">{order.phone}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-body text-xs text-dark-400">
                        {order.items.slice(0, 2).map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                        {order.items.length > 2 && ` +${order.items.length - 2}`}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-body text-sm font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-5 py-4">
                      <span className="font-body text-xs">{PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}</span>
                      <span className={`block font-body text-[10px] ${order.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}>
                        {order.paymentStatus === "paid" ? "Plătit" : "Neplătit"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block font-body text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-body text-xs text-dark-400 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        disabled={updating === order.id}
                        className="font-body text-xs border border-neutral-200 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-pink/30 focus:border-pink disabled:opacity-50"
                      >
                        {STATUSES.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
