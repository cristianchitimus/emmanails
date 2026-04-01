"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { value: "polygel", label: "PolyGel", subs: ["polygel-clasic", "polygel-color", "polygel-reflective"] },
  { value: "acrylic-liquid", label: "Acrylic Liquid", subs: ["acrylic-liquid"] },
  { value: "baze-rubber", label: "Baze Rubber", subs: ["rubber-base", "glitter-rubber-base"] },
  { value: "gel-constructie", label: "Gel Construcție", subs: ["gel-liquid", "builder-gel", "jelly"] },
  { value: "top-coat", label: "Top Coat", subs: ["glitter-vibe-top", "clear-steel-top", "velvet-matte-top"] },
  { value: "instrumente", label: "Instrumente", subs: ["instrumente-manichiura", "instrumente-pedichiura", "instrumente-set"] },
];

export default function AdminNewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageInput, setImageInput] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "polygel",
    subcategory: "",
    price: "",
    salePrice: "",
    size: "",
    colorHex: "",
    images: [] as string[],
    stock: "",
    inStock: true,
    featured: false,
  });

  const selectedCat = CATEGORIES.find((c) => c.value === form.category);

  const addImage = () => {
    const url = imageInput.trim();
    if (url && !form.images.includes(url)) {
      setForm({ ...form, images: [...form.images, url] });
      setImageInput("");
    }
  };

  const removeImage = (idx: number) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      subcategory: form.subcategory || null,
      price: Math.round(parseFloat(form.price) * 100),
      salePrice: form.salePrice ? Math.round(parseFloat(form.salePrice) * 100) : null,
      size: form.size || null,
      colorHex: form.colorHex || null,
      imageUrl: form.images[0] || null,
      images: form.images,
      stock: form.stock !== "" ? parseInt(form.stock) : null,
      inStock: form.inStock,
      featured: form.featured,
    };

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/produse");
    } else {
      const data = await res.json();
      setError(data.error || "Eroare la salvare");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/produse" className="text-dark-400 hover:text-dark transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Produs nou</h1>
          <p className="font-body text-sm text-dark-400 mt-1">Adaugă un produs nou în magazin</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <h2 className="font-display text-lg font-medium">Informații produs</h2>

          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Nume produs *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="ex: Builder Gel — Pink Promise, 30g"
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" required />
          </div>

          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Descriere</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descrierea detaliată a produsului..."
              rows={4}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink resize-y" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Categorie *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink">
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Subcategorie</label>
              {selectedCat && selectedCat.subs.length > 0 ? (
                <select value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink">
                  <option value="">— Selectează —</option>
                  {selectedCat.subs.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ) : (
                <input type="text" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                  placeholder="Subcategorie opțională"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
              )}
            </div>
          </div>

          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Gramaj / Volum</label>
            <input type="text" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}
              placeholder="ex: 30g, 12ml, 60g"
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <h2 className="font-display text-lg font-medium">Preț & Stoc</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Preț (lei) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="95.00" step="0.01" min="0"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" required />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Preț redus (lei)</label>
              <input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                placeholder="Opțional" step="0.01" min="0"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Stoc (buc.)</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="∞ (nelimitat)" min="0"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
            </div>
          </div>

          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                className="w-4 h-4 text-pink rounded border-neutral-300 focus:ring-pink" />
              <span className="font-body text-sm">Disponibil (în stoc)</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 text-pink rounded border-neutral-300 focus:ring-pink" />
              <span className="font-body text-sm">Produs recomandat</span>
            </label>
          </div>
        </div>

        {/* Color */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <h2 className="font-display text-lg font-medium">Nuanță</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Culoare hex (pentru inimioară)</label>
              <div className="flex gap-2">
                <input type="color" value={form.colorHex || "#D4537E"} onChange={(e) => setForm({ ...form, colorHex: e.target.value })}
                  className="w-12 h-11 border border-neutral-200 rounded-lg cursor-pointer p-0.5" />
                <input type="text" value={form.colorHex} onChange={(e) => setForm({ ...form, colorHex: e.target.value })}
                  placeholder="#D4537E (opțional)"
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm font-mono focus:ring-2 focus:ring-pink/30 focus:border-pink" />
              </div>
            </div>
            {form.colorHex && (
              <div className="flex items-center gap-2 pt-5">
                <svg width="28" height="28" viewBox="0 0 24 22" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={form.colorHex} stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
                </svg>
                <span className="font-body text-xs text-dark-400">Preview</span>
              </div>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <h2 className="font-display text-lg font-medium">Imagini</h2>
          <p className="font-body text-xs text-dark-400">Adaugă URL-uri ale pozelor produsului. Prima imagine va fi poza principală.</p>

          <div className="flex gap-2">
            <input type="url" value={imageInput} onChange={(e) => setImageInput(e.target.value)}
              placeholder="https://emmanails.ro/wp-content/uploads/..." onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
            <button type="button" onClick={addImage}
              className="px-5 py-3 bg-neutral-100 text-dark-400 font-body text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors">
              Adaugă
            </button>
          </div>

          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {form.images.map((url, idx) => (
                <div key={idx} className="relative group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 relative">
                    <Image src={url} alt={`Imagine ${idx + 1}`} fill className="object-cover" sizes="150px"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/emma-nails-jar-generic.jpg"; }} />
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-pink text-white font-body text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                        Principală
                      </span>
                    )}
                  </div>
                  <button type="button" onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    ×
                  </button>
                  <p className="font-body text-[10px] text-dark-300 mt-1 truncate">{url.split("/").pop()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error & Submit */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="flex-1 bg-pink text-white font-body text-sm font-semibold uppercase tracking-wider py-3.5 rounded-xl hover:bg-pink/90 transition-colors disabled:opacity-50">
            {saving ? "Se salvează..." : "Salvează produsul"}
          </button>
          <Link href="/admin/produse"
            className="px-8 py-3.5 bg-neutral-100 text-dark-400 font-body text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors text-center">
            Anulează
          </Link>
        </div>
      </form>
    </div>
  );
}
