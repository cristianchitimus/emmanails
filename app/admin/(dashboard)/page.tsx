"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalOrders: number;
  ordersToday: number;
  ordersThisMonth: number;
  totalRevenue: number;
  revenueThisMonth: number;
  revenueToday: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalCustomers: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    name: string;
    email: string;
    total: number;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
    items: Array<{ name: string; quantity: number }>;
  }>;
  monthlySales: Array<{ month: string; orders: number; revenue: number }>;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "În așteptare",
  processing: "Se procesează",
  shipped: "Expediată",
  delivered: "Livrată",
  cancelled: "Anulată",
};

function formatPrice(bani: number) {
  return `${(bani / 100).toFixed(2)} lei`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!stats) return <p className="text-dark-400">Eroare la încărcare.</p>;

  const maxRevenue = Math.max(...(stats.monthlySales.map((m) => m.revenue) || [1]));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Dashboard</h1>
        <p className="font-body text-sm text-dark-400 mt-1">Bun venit în panoul de administrare Emma Nails</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Vânzări totale" value={formatPrice(stats.totalRevenue)} sub={`${stats.totalOrders} comenzi`} color="pink" />
        <StatCard label="Luna aceasta" value={formatPrice(stats.revenueThisMonth)} sub={`${stats.ordersThisMonth} comenzi`} color="purple" />
        <StatCard label="Azi" value={formatPrice(stats.revenueToday)} sub={`${stats.ordersToday} comenzi`} color="green" />
        <StatCard label="În așteptare" value={String(stats.pendingOrders)} sub={`${stats.lowStockProducts} stoc redus`} color="yellow" />
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-neutral-100">
          <p className="font-body text-xs text-dark-400 uppercase tracking-wider">Produse</p>
          <p className="font-display text-2xl font-medium mt-1">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-neutral-100">
          <p className="font-body text-xs text-dark-400 uppercase tracking-wider">Clienți</p>
          <p className="font-display text-2xl font-medium mt-1">{stats.totalCustomers}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-neutral-100">
          <p className="font-body text-xs text-dark-400 uppercase tracking-wider">Stoc redus</p>
          <p className="font-display text-2xl font-medium mt-1 text-yellow-600">{stats.lowStockProducts}</p>
        </div>
      </div>

      {/* Monthly sales chart */}
      {stats.monthlySales.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-neutral-100">
          <h2 className="font-display text-lg font-medium mb-6">Vânzări lunare</h2>
          <div className="flex items-end gap-3 h-40">
            {stats.monthlySales.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <p className="font-body text-[10px] text-dark-400">{formatPrice(m.revenue)}</p>
                <div
                  className="w-full bg-gradient-to-t from-pink to-pink/60 rounded-t-lg transition-all min-h-[4px]"
                  style={{ height: `${Math.max((m.revenue / maxRevenue) * 100, 3)}%` }}
                />
                <p className="font-body text-[10px] text-dark-400">
                  {new Date(m.month + "-01").toLocaleDateString("ro-RO", { month: "short" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h2 className="font-display text-lg font-medium">Comenzi recente</h2>
          <Link href="/admin/comenzi" className="font-body text-xs text-pink font-semibold uppercase tracking-wider hover:underline">
            Vezi toate →
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="p-6 text-center font-body text-sm text-dark-400">Nicio comandă încă.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-6 py-3">Comandă</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-6 py-3">Client</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-6 py-3">Total</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-6 py-3">Status</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-6 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/comenzi/${order.id}`} className="font-body text-sm font-semibold text-pink hover:underline">
                        #{order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-body text-sm font-medium text-dark">{order.name}</p>
                      <p className="font-body text-xs text-dark-400">{order.email}</p>
                    </td>
                    <td className="px-6 py-4 font-body text-sm font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block font-body text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status] || "bg-neutral-100"}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body text-xs text-dark-400">{formatDate(order.createdAt)}</td>
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

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colors: Record<string, string> = {
    pink: "border-l-pink",
    purple: "border-l-purple-400",
    green: "border-l-emerald-400",
    yellow: "border-l-yellow-400",
  };

  return (
    <div className={`bg-white rounded-2xl p-5 border border-neutral-100 border-l-4 ${colors[color]}`}>
      <p className="font-body text-xs text-dark-400 uppercase tracking-wider">{label}</p>
      <p className="font-display text-xl md:text-2xl font-semibold mt-1 text-dark">{value}</p>
      <p className="font-body text-xs text-dark-300 mt-1">{sub}</p>
    </div>
  );
}
