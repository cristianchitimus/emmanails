"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  category: string;
  size: string | null;
  inStock: boolean;
  stock: number | null;
  featured: boolean;
  imageUrl: string | null;
  colorHex: string | null;
  _count: { orderItems: number };
}

const CAT_LABELS: Record<string, string> = {
  "baza-rubber": "Bază Rubber",
  "geluri-uv": "Geluri UV",
  polygel: "Polygel",
  "top-coat": "Top Coat",
  "pile-buffere": "Pile & Buffere",
  "produse-pedichiura": "Produse Pedichiură",
  "produsele-amme": "Produsele Amme",
  instrumente: "Instrumente",
};

function formatPrice(bani: number) { return (bani / 100).toFixed(2); }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("category", filter);
    if (search) params.set("q", search);
    fetch(`/api/admin/products?${params}`)
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, [filter, search]);

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditData({ price: p.price, salePrice: p.salePrice, stock: p.stock, inStock: p.inStock, featured: p.featured });
  };

  const cancelEdit = () => { setEditingId(null); setEditData({}); };

  const saveEdit = async (id: string) => {
    setSaving(id);
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setEditingId(null);
    }
    setSaving(null);
  };

  const toggleInStock = async (id: string, current: boolean) => {
    setSaving(id);
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inStock: !current }),
    });
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inStock: !current } : p)));
    setSaving(null);
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Sigur vrei să ștergi „${name}"?`)) return;
    setSaving(id);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      const data = await res.json();
      alert(data.error || "Eroare la ștergere");
    }
    setSaving(null);
  };

  const categories = ["all", ...Object.keys(CAT_LABELS)];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Produse & Stocuri</h1>
          <p className="font-body text-sm text-dark-400 mt-1">Editează prețuri, stocuri și disponibilitate</p>
        </div>
        <Link href="/admin/produse/nou"
          className="bg-pink text-white font-body text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-pink/90 transition-colors text-center">
          + Produs nou
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Caută produs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`font-body text-[10px] font-semibold uppercase tracking-wider px-3 py-2 rounded-full transition-colors ${
                filter === c ? "bg-pink text-white" : "bg-white text-dark-400 border border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {c === "all" ? "Toate" : CAT_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Produs</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Categorie</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Preț</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Reducere</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Stoc</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Vândut</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Activ</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const isEditing = editingId === p.id;
                  return (
                    <tr key={p.id} className={`border-b border-neutral-50 ${isEditing ? "bg-pink/5" : "hover:bg-neutral-50/50"}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                            {p.imageUrl ? (
                              <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="40px" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-dark-300">EN</div>
                            )}
                            {p.colorHex && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: p.colorHex }} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-body text-sm font-medium text-dark truncate max-w-[200px]">{p.name}</p>
                            {p.size && <p className="font-body text-[10px] text-dark-300">{p.size}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-body text-xs text-dark-400">{CAT_LABELS[p.category]}</td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="number" value={(editData.price || 0) / 100} onChange={(e) => setEditData({ ...editData, price: Math.round(parseFloat(e.target.value) * 100) })}
                            className="w-20 px-2 py-1 border rounded text-xs" step="0.01" />
                        ) : (
                          <span className="font-body text-sm font-medium">{formatPrice(p.price)} lei</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="number" value={editData.salePrice ? (editData.salePrice || 0) / 100 : ""} onChange={(e) => setEditData({ ...editData, salePrice: e.target.value ? Math.round(parseFloat(e.target.value) * 100) : null })}
                            className="w-20 px-2 py-1 border rounded text-xs" step="0.01" placeholder="—" />
                        ) : (
                          <span className="font-body text-xs text-dark-400">{p.salePrice ? `${formatPrice(p.salePrice)} lei` : "—"}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input type="number" value={editData.stock ?? ""} onChange={(e) => setEditData({ ...editData, stock: e.target.value === "" ? null : parseInt(e.target.value) })}
                            className="w-16 px-2 py-1 border rounded text-xs" placeholder="∞" min="0" />
                        ) : (
                          <span className={`font-body text-xs font-medium ${p.stock !== null && p.stock <= 5 ? "text-red-500" : "text-dark-400"}`}>
                            {p.stock !== null ? p.stock : "∞"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-body text-xs text-dark-400">{p._count.orderItems}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleInStock(p.id, p.inStock)}
                          disabled={saving === p.id}
                          className={`w-10 h-5 rounded-full transition-colors relative ${p.inStock ? "bg-emerald-400" : "bg-neutral-300"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${p.inStock ? "left-5" : "left-0.5"}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex gap-1">
                            <button onClick={() => saveEdit(p.id)} disabled={saving === p.id}
                              className="font-body text-[10px] font-semibold uppercase px-2.5 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50">
                              {saving === p.id ? "..." : "Salvează"}
                            </button>
                            <button onClick={cancelEdit} className="font-body text-[10px] font-semibold uppercase px-2.5 py-1.5 bg-neutral-200 text-dark-400 rounded-lg hover:bg-neutral-300">
                              Anulează
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <Link href={`/admin/produse/${p.id}`} className="font-body text-[10px] font-semibold uppercase px-2.5 py-1.5 bg-neutral-100 text-dark-400 rounded-lg hover:bg-neutral-200">
                              Editează
                            </Link>
                            <button onClick={() => deleteProduct(p.id, p.name)} disabled={saving === p.id}
                              className="font-body text-[10px] font-semibold uppercase px-2 py-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100 disabled:opacity-50">
                              ×
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="font-body text-xs text-dark-300 text-center">{products.length} produse afișate</p>
    </div>
  );
}
