"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface CatTree {
  [key: string]: { total: number; subcategories: Record<string, number> };
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  category: string;
  subcategory: string | null;
  size: string | null;
  colorHex: string | null;
  imageUrl: string | null;
  images: string[];
  stock: number | null;
  inStock: boolean;
  featured: boolean;
}

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState<CatTree>({});

  const [form, setForm] = useState({
    name: "", description: "", category: "", subcategory: "",
    newCategory: "", newSubcategory: "",
    price: "", salePrice: "", size: "", colorHex: "",
    images: [] as string[], stock: "", inStock: true, featured: false,
  });

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products/${id}`).then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
    ]).then(([product, cats]) => {
      if (product.error) { setError("Produsul nu a fost găsit"); setLoading(false); return; }
      setCategories(cats);
      setForm({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        newCategory: "", newSubcategory: "",
        price: product.price ? (product.price / 100).toFixed(2) : "",
        salePrice: product.salePrice ? (product.salePrice / 100).toFixed(2) : "",
        size: product.size || "",
        colorHex: product.colorHex || "",
        images: product.images || [],
        stock: product.stock !== null ? String(product.stock) : "",
        inStock: product.inStock,
        featured: product.featured,
      });
      setLoading(false);
    });
  }, [id]);

  const catKeys = Object.keys(categories);
  const activeCategory = form.category === "__new__" ? "" : form.category;
  const subcategories = categories[activeCategory]?.subcategories || {};
  const useNewCategory = form.category === "__new__";
  const useNewSubcategory = form.subcategory === "__new__";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const finalCategory = useNewCategory ? form.newCategory.toLowerCase().replace(/\s+/g, "-") : form.category;
    const finalSubcategory = useNewSubcategory ? form.newSubcategory.toLowerCase().replace(/\s+/g, "-") : form.subcategory;

    if (!form.name || !form.price || !finalCategory) {
      setError("Nume, preț și categorie sunt obligatorii");
      setSaving(false);
      return;
    }

    const payload = {
      name: form.name,
      description: form.description || null,
      category: finalCategory,
      subcategory: finalSubcategory || null,
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

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess("Produsul a fost salvat cu succes!");
      // Refresh categories in case category changed
      fetch("/api/admin/categories").then((r) => r.json()).then(setCategories);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      const data = await res.json();
      setError(data.error || "Eroare la salvare");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/produse" className="text-dark-400 hover:text-dark transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Editează produs</h1>
          <p className="font-body text-sm text-dark-400 mt-1">{form.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images — first section for visibility */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <h2 className="font-display text-lg font-medium">Imagini</h2>
          <p className="font-body text-xs text-dark-400">Încarcă poze sau adaugă URL-uri. Prima imagine = poza principală, a doua = hover.</p>
          <ImageUpload images={form.images} onChange={(imgs) => setForm({ ...form, images: imgs })} />
          {form.images.length >= 2 && (
            <div className="flex gap-4 items-center p-3 bg-neutral-50 rounded-xl">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden relative bg-neutral-100">
                  <Image src={form.images[0]} alt="Primary" fill className="object-cover" sizes="64px" />
                </div>
                <p className="font-body text-[10px] text-dark-400 mt-1">Principal</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg overflow-hidden relative bg-neutral-100">
                  <Image src={form.images[1]} alt="Hover" fill className="object-cover" sizes="64px" />
                </div>
                <p className="font-body text-[10px] text-dark-400 mt-1">Hover</p>
              </div>
            </div>
          )}
        </div>

        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <h2 className="font-display text-lg font-medium">Informații produs</h2>
          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Nume produs *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" required />
          </div>
          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Descriere</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4} className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink resize-y" />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Categorie *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink">
                <option value="">— Selectează —</option>
                {catKeys.map((c) => (
                  <option key={c} value={c}>{c} ({categories[c].total})</option>
                ))}
                <option value="__new__">+ Categorie nouă</option>
              </select>
              {useNewCategory && (
                <input type="text" value={form.newCategory} onChange={(e) => setForm({ ...form, newCategory: e.target.value })}
                  placeholder="ex: geluri-color" className="mt-2 w-full px-4 py-3 border border-pink/30 rounded-xl font-body text-sm bg-pink/5" />
              )}
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Subcategorie</label>
              <select value={form.subcategory || ""} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink">
                <option value="">— Fără —</option>
                {Object.keys(subcategories).map((s) => (
                  <option key={s} value={s}>{s} ({subcategories[s]})</option>
                ))}
                <option value="__new__">+ Subcategorie nouă</option>
              </select>
              {useNewSubcategory && (
                <input type="text" value={form.newSubcategory} onChange={(e) => setForm({ ...form, newSubcategory: e.target.value })}
                  placeholder="ex: builder-gel-color" className="mt-2 w-full px-4 py-3 border border-pink/30 rounded-xl font-body text-sm bg-pink/5" />
              )}
            </div>
          </div>

          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Gramaj / Volum</label>
            <input type="text" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}
              placeholder="ex: 30g, 12ml" className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-4">
          <h2 className="font-display text-lg font-medium">Preț & Stoc</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Preț (lei) *</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                step="0.01" min="0" className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" required />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Preț redus (lei)</label>
              <input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                step="0.01" min="0" placeholder="Opțional" className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1.5 block">Stoc (buc.)</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="∞ (nelimitat)" min="0" className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/30 focus:border-pink" />
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
              <div className="flex gap-2">
                <input type="color" value={form.colorHex || "#D4537E"} onChange={(e) => setForm({ ...form, colorHex: e.target.value })}
                  className="w-12 h-11 border border-neutral-200 rounded-lg cursor-pointer p-0.5" />
                <input type="text" value={form.colorHex} onChange={(e) => setForm({ ...form, colorHex: e.target.value })}
                  placeholder="#D4537E (opțional)"
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm font-mono focus:ring-2 focus:ring-pink/30 focus:border-pink" />
              </div>
            </div>
            {form.colorHex && (
              <svg width="28" height="28" viewBox="0 0 24 22" fill="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={form.colorHex} stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
              </svg>
            )}
          </div>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="font-body text-sm text-emerald-600">{success}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="flex-1 bg-pink text-white font-body text-sm font-semibold uppercase tracking-wider py-3.5 rounded-xl hover:bg-pink/90 transition-colors disabled:opacity-50">
            {saving ? "Se salvează..." : "Salvează modificările"}
          </button>
          <Link href="/admin/produse" className="px-8 py-3.5 bg-neutral-100 text-dark-400 font-body text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors text-center">
            Înapoi
          </Link>
        </div>
      </form>
    </div>
  );
}
