"use client";

import { useEffect, useState } from "react";

interface DiscountCode {
  id: string;
  code: string;
  type: string;
  value: number;
  minOrderValue: number | null;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
  createdAt: string;
}

function formatPrice(bani: number) { return `${(bani / 100).toFixed(2)} lei`; }

export default function AdminCoduriPage() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ code: "", type: "percentage", value: "", minOrderValue: "", maxUses: "", expiresAt: "" });

  const fetchCodes = () => {
    setLoading(true);
    fetch("/api/admin/discount-codes").then((r) => r.json()).then(setCodes).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCodes(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/discount-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: form.code,
        type: form.type,
        value: form.type === "percentage" ? parseInt(form.value) : Math.round(parseFloat(form.value) * 100),
        minOrderValue: form.minOrderValue ? Math.round(parseFloat(form.minOrderValue) * 100) : null,
        maxUses: form.maxUses || null,
        expiresAt: form.expiresAt || null,
      }),
    });
    if (res.ok) {
      setForm({ code: "", type: "percentage", value: "", minOrderValue: "", maxUses: "", expiresAt: "" });
      setShowForm(false);
      fetchCodes();
    }
    setSaving(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await fetch(`/api/admin/discount-codes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !current }),
    });
    setCodes((prev) => prev.map((c) => (c.id === id ? { ...c, active: !current } : c)));
  };

  const deleteCode = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest cod?")) return;
    await fetch(`/api/admin/discount-codes/${id}`, { method: "DELETE" });
    setCodes((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Coduri Reducere</h1>
          <p className="font-body text-sm text-dark-400 mt-1">Crează și gestionează codurile de discount</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-pink text-white font-body text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-pink/90 transition-colors">
          {showForm ? "Anulează" : "+ Cod nou"}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Cod</label>
              <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="ex: VARA20"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30" required />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Tip</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30">
                <option value="percentage">Procentual (%)</option>
                <option value="fixed">Sumă fixă (lei)</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">
                Valoare {form.type === "percentage" ? "(%)" : "(lei)"}
              </label>
              <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder={form.type === "percentage" ? "10" : "20.00"}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30" required min="0" step={form.type === "fixed" ? "0.01" : "1"} />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Comandă minimă (lei)</label>
              <input type="number" value={form.minOrderValue} onChange={(e) => setForm({ ...form, minOrderValue: e.target.value })} placeholder="Opțional"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30" min="0" step="0.01" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Nr. maxim utilizări</label>
              <input type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} placeholder="Nelimitat"
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30" min="1" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Expiră la</label>
              <input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30" />
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="bg-emerald-500 text-white font-body text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-xl hover:bg-emerald-600 disabled:opacity-50">
            {saving ? "Se salvează..." : "Creează cod"}
          </button>
        </form>
      )}

      {/* Codes table */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" />
          </div>
        ) : codes.length === 0 ? (
          <p className="p-12 text-center font-body text-sm text-dark-400">Niciun cod de reducere.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Cod</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Tip</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Valoare</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Min. comandă</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Utilizări</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Expiră</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Activ</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-5 py-3">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((c) => {
                  const expired = c.expiresAt && new Date(c.expiresAt) < new Date();
                  const maxed = c.maxUses !== null && c.usedCount >= c.maxUses;
                  return (
                    <tr key={c.id} className={`border-b border-neutral-50 ${(!c.active || expired || maxed) ? "opacity-50" : ""}`}>
                      <td className="px-5 py-4">
                        <span className="font-mono text-sm font-bold text-pink bg-pink/10 px-2.5 py-1 rounded-lg">{c.code}</span>
                      </td>
                      <td className="px-5 py-4 font-body text-xs text-dark-400">{c.type === "percentage" ? "Procent" : "Sumă fixă"}</td>
                      <td className="px-5 py-4 font-body text-sm font-semibold">
                        {c.type === "percentage" ? `${c.value}%` : formatPrice(c.value)}
                      </td>
                      <td className="px-5 py-4 font-body text-xs text-dark-400">{c.minOrderValue ? formatPrice(c.minOrderValue) : "—"}</td>
                      <td className="px-5 py-4 font-body text-xs">
                        <span className="font-semibold">{c.usedCount}</span>
                        <span className="text-dark-300"> / {c.maxUses ?? "∞"}</span>
                      </td>
                      <td className="px-5 py-4 font-body text-xs text-dark-400">
                        {c.expiresAt ? (
                          <span className={expired ? "text-red-500" : ""}>
                            {new Date(c.expiresAt).toLocaleDateString("ro-RO")}
                            {expired && " (expirat)"}
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => toggleActive(c.id, c.active)}
                          className={`w-10 h-5 rounded-full transition-colors relative ${c.active ? "bg-emerald-400" : "bg-neutral-300"}`}>
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${c.active ? "left-5" : "left-0.5"}`} />
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <button onClick={() => deleteCode(c.id)}
                          className="font-body text-[10px] font-semibold uppercase px-2.5 py-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100">
                          Șterge
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
