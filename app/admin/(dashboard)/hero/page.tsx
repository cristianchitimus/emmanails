"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface HeroSlot {
  key: string;
  label: string;
  description: string;
  position: string;
}

const HERO_SLOTS: HeroSlot[] = [
  {
    key: "hero_left_image",
    label: "Card mare (stânga)",
    description: "Poza principală — Cursuri / Academy",
    position: "Ocupă toată partea stângă",
  },
  {
    key: "hero_right_top_image",
    label: "Card mic sus (dreapta)",
    description: "Masterclass / Academie — portretul cu Emma",
    position: "Dreapta sus",
  },
  {
    key: "hero_right_bottom_image",
    label: "Card mic jos (dreapta)",
    description: "Shop / Produse profesionale",
    position: "Dreapta jos",
  },
];

export default function HeroPage() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const keys = HERO_SLOTS.map((s) => s.key).join(",");
      const res = await fetch(`/api/admin/settings?keys=${keys}`);
      const data = await res.json();
      setImages(data);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleUpload = async (slotKey: string, file: File) => {
    setUploading(slotKey);
    setSaved(false);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (uploadData.url) {
        // Save to settings
        const newImages = { ...images, [slotKey]: uploadData.url };
        setImages(newImages);

        await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ settings: { [slotKey]: uploadData.url } }),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(uploadData.error || "Eroare la upload");
      }
    } catch {
      alert("Eroare de rețea");
    }
    setUploading(null);
  };

  const handleUrlChange = async (slotKey: string, url: string) => {
    const newImages = { ...images, [slotKey]: url };
    setImages(newImages);
  };

  const saveUrl = async (slotKey: string) => {
    setSaved(false);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { [slotKey]: images[slotKey] } }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Eroare la salvare");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark">Imagini Hero</h1>
          <p className="font-body text-sm text-dark-400 mt-1">
            Schimbă pozele din secțiunea principală de pe prima pagină
          </p>
        </div>
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2">
            <p className="font-body text-sm font-semibold text-green-700">✅ Salvat!</p>
          </div>
        )}
      </div>

      {/* Layout preview */}
      <div className="bg-neutral-100 rounded-2xl p-4 mb-8">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-3">
          Previzualizare layout
        </p>
        <div className="grid grid-cols-12 gap-2 h-48">
          <div className="col-span-7 bg-dark/10 rounded-xl flex items-center justify-center relative overflow-hidden">
            {images.hero_left_image && (
              <Image src={images.hero_left_image} alt="" fill className="object-cover rounded-xl opacity-60" sizes="300px" />
            )}
            <span className="relative z-10 font-body text-xs font-bold text-dark bg-white/80 px-3 py-1 rounded-full">
              Card mare
            </span>
          </div>
          <div className="col-span-5 grid grid-rows-2 gap-2">
            <div className="bg-dark/10 rounded-xl flex items-center justify-center relative overflow-hidden">
              {images.hero_right_top_image && (
                <Image src={images.hero_right_top_image} alt="" fill className="object-cover rounded-xl opacity-60" sizes="200px" />
              )}
              <span className="relative z-10 font-body text-[10px] font-bold text-dark bg-white/80 px-2 py-0.5 rounded-full">
                Dreapta sus
              </span>
            </div>
            <div className="bg-dark/10 rounded-xl flex items-center justify-center relative overflow-hidden">
              {images.hero_right_bottom_image && (
                <Image src={images.hero_right_bottom_image} alt="" fill className="object-cover rounded-xl opacity-60" sizes="200px" />
              )}
              <span className="relative z-10 font-body text-[10px] font-bold text-dark bg-white/80 px-2 py-0.5 rounded-full">
                Dreapta jos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slot editors */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-6 h-6 border-2 border-dark-200 border-t-pink rounded-full animate-spin" />
          <p className="font-body text-xs text-dark-400 mt-2">Se încarcă...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {HERO_SLOTS.map((slot) => (
            <div key={slot.key} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  {/* Current image preview */}
                  <div className="relative w-40 h-40 md:w-56 md:h-40 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                    {images[slot.key] ? (
                      <Image
                        src={images[slot.key]}
                        alt={slot.label}
                        fill
                        className="object-cover"
                        sizes="224px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-body text-xs text-dark-300">Nicio imagine</span>
                      </div>
                    )}
                    {uploading === slot.key && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-dark-200 border-t-pink rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Info + controls */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-bold text-dark">{slot.label}</h3>
                    <p className="font-body text-sm text-dark-400 mt-1">{slot.description}</p>
                    <p className="font-body text-xs text-dark-300 mt-0.5">{slot.position}</p>

                    {/* Upload button */}
                    <div className="mt-4 flex flex-wrap gap-3">
                      <label className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider bg-pink text-white px-5 py-2.5 rounded-xl cursor-pointer hover:bg-pink-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Încarcă poză nouă
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(slot.key, file);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>

                    {/* URL input */}
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={images[slot.key] || ""}
                        onChange={(e) => handleUrlChange(slot.key, e.target.value)}
                        placeholder="URL imagine..."
                        className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg font-body text-xs focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none truncate"
                      />
                      <button
                        onClick={() => saveUrl(slot.key)}
                        className="px-4 py-2 bg-dark text-white font-body text-xs font-semibold rounded-lg hover:bg-dark-700 transition-colors"
                      >
                        Salvează
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help */}
      <div className="mt-8 bg-neutral-50 rounded-2xl p-6 border border-neutral-200 border-dashed">
        <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-2">
          💡 Sfaturi
        </h3>
        <ul className="font-body text-sm text-dark-400 space-y-1.5">
          <li>• Pozele se actualizează imediat pe site după salvare</li>
          <li>• Rezoluție recomandată: minim 1200x800px pentru calitate optimă</li>
          <li>• Formate acceptate: JPG, PNG, WebP (max 5MB)</li>
          <li>• Cardul mare stânga: orientare portret funcționează cel mai bine</li>
          <li>• Cardurile mici: orientare peisaj sau pătrat</li>
        </ul>
      </div>
    </div>
  );
}
