"use client";

import { useEffect, useState } from "react";

interface CatTree {
  [key: string]: { total: number; subcategories: Record<string, number> };
}

const CAT_LABELS: Record<string, string> = {
  polygel: "PolyGel",
  instrumente: "Instrumente",
  "acrygel-liquid": "Acrygel Liquid",
  "baze-rubber": "Baze Rubber",
  "baze-rubber-efect": "Baze Rubber cu Efect",
  geluri: "Geluri",
  topuri: "Topuri",
};

export default function AdminCategoriiPage() {
  const [tree, setTree] = useState<CatTree>({});
  const [loading, setLoading] = useState(true);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    fetch("/api/admin/categories").then((r) => r.json()).then(setTree).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleRename = async (oldCat: string) => {
    if (!renameValue.trim() || renameValue === oldCat) {
      setRenaming(null);
      return;
    }
    setSaving(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "rename", oldCategory: oldCat, newCategory: renameValue.toLowerCase().replace(/\s+/g, "-") }),
    });
    setRenaming(null);
    setRenameValue("");
    setSaving(false);
    fetchCategories();
  };

  const handleRenameSub = async (cat: string, oldSub: string, newSub: string) => {
    if (!newSub.trim() || newSub === oldSub) return;
    setSaving(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "rename", oldCategory: cat, newCategory: cat, oldSubcategory: oldSub, newSubcategory: newSub.toLowerCase().replace(/\s+/g, "-") }),
    });
    setSaving(false);
    fetchCategories();
  };

  const totalProducts = Object.values(tree).reduce((s, c) => s + c.total, 0);

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Categorii</h1>
        <p className="font-body text-sm text-dark-400 mt-1">{Object.keys(tree).length} categorii · {totalProducts} produse total</p>
      </div>

      <div className="space-y-4">
        {Object.entries(tree).map(([cat, data]) => (
          <div key={cat} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-neutral-50">
              <div className="flex items-center gap-3">
                {renaming === cat ? (
                  <div className="flex gap-2">
                    <input type="text" value={renameValue} onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleRename(cat)}
                      className="px-3 py-1.5 border border-pink rounded-lg font-body text-sm" autoFocus />
                    <button onClick={() => handleRename(cat)} disabled={saving}
                      className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg font-body text-xs font-semibold">✓</button>
                    <button onClick={() => setRenaming(null)}
                      className="px-3 py-1.5 bg-neutral-200 rounded-lg font-body text-xs">✕</button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-lg font-medium">{CAT_LABELS[cat] || cat}</h2>
                    <span className="font-body text-xs text-dark-300 bg-neutral-100 px-2 py-0.5 rounded-full">{cat}</span>
                    <span className="font-body text-xs text-dark-400">{data.total} produse</span>
                  </>
                )}
              </div>
              {renaming !== cat && (
                <button onClick={() => { setRenaming(cat); setRenameValue(cat); }}
                  className="font-body text-[10px] font-semibold uppercase px-3 py-1.5 bg-neutral-100 text-dark-400 rounded-lg hover:bg-neutral-200">
                  Redenumește
                </button>
              )}
            </div>

            {Object.keys(data.subcategories).length > 0 && (
              <div className="p-5 space-y-2">
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-dark-300 mb-2">Subcategorii</p>
                {Object.entries(data.subcategories).map(([sub, count]) => (
                  <SubcategoryRow key={sub} category={cat} subcategory={sub} count={count} onRename={handleRenameSub} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="font-body text-xs text-dark-300 text-center">
        Categorii și subcategorii noi se creează automat la adăugarea produselor (din pagina Produs nou).
      </p>
    </div>
  );
}

function SubcategoryRow({ category, subcategory, count, onRename }: {
  category: string; subcategory: string; count: number;
  onRename: (cat: string, oldSub: string, newSub: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(subcategory);

  return (
    <div className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-neutral-50">
      {editing ? (
        <div className="flex gap-2 flex-1">
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { onRename(category, subcategory, value); setEditing(false); } }}
            className="px-2 py-1 border border-pink rounded font-body text-xs flex-1" autoFocus />
          <button onClick={() => { onRename(category, subcategory, value); setEditing(false); }}
            className="px-2 py-1 bg-emerald-500 text-white rounded font-body text-[10px]">✓</button>
          <button onClick={() => { setValue(subcategory); setEditing(false); }}
            className="px-2 py-1 bg-neutral-200 rounded font-body text-[10px]">✕</button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink/40" />
            <span className="font-body text-sm">{subcategory}</span>
            <span className="font-body text-xs text-dark-300">({count})</span>
          </div>
          <button onClick={() => setEditing(true)}
            className="font-body text-[10px] text-dark-300 hover:text-pink">Redenumește</button>
        </>
      )}
    </div>
  );
}
