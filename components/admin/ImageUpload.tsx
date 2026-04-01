"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.url) {
      return data.url;
    }
    throw new Error(data.error || "Upload eșuat");
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (images.length + fileArray.length > maxImages) {
      setError(`Maxim ${maxImages} imagini`);
      return;
    }

    setUploading(true);
    setError("");

    try {
      const urls: string[] = [];
      for (const file of fileArray) {
        const url = await uploadFile(file);
        urls.push(url);
      }
      onChange([...images, ...urls]);
    } catch (err: any) {
      setError(err.message || "Eroare la upload");
    }

    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (url && !images.includes(url)) {
      onChange([...images, url]);
      setUrlInput("");
    }
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const moveImage = (idx: number, direction: -1 | 1) => {
    const newImages = [...images];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= newImages.length) return;
    [newImages[idx], newImages[newIdx]] = [newImages[newIdx], newImages[idx]];
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          dragOver ? "border-pink bg-pink/5" : "border-neutral-200 hover:border-pink/50 hover:bg-neutral-50"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin w-5 h-5 border-2 border-pink border-t-transparent rounded-full" />
            <span className="font-body text-sm text-dark-400">Se încarcă...</span>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">📸</div>
            <p className="font-body text-sm text-dark-400">
              Trage imagini aici sau <span className="text-pink font-semibold">click pentru a selecta</span>
            </p>
            <p className="font-body text-[10px] text-dark-300 mt-1">JPG, PNG, WebP · Max 5MB</p>
          </>
        )}
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Sau paste URL imagine..."
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          className="flex-1 px-3 py-2 border border-neutral-200 rounded-xl font-body text-xs focus:ring-2 focus:ring-pink/30 focus:border-pink"
        />
        <button type="button" onClick={addUrl}
          className="px-4 py-2 bg-neutral-100 text-dark-400 font-body text-[10px] font-semibold uppercase tracking-wider rounded-xl hover:bg-neutral-200">
          + URL
        </button>
      </div>

      {/* Error */}
      {error && <p className="font-body text-xs text-red-500">{error}</p>}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {images.map((url, idx) => (
            <div key={`${url}-${idx}`} className="relative group aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <Image
                src={url}
                alt={`Imagine ${idx + 1}`}
                fill
                className="object-cover"
                sizes="150px"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-pink text-white font-body text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full z-10">
                  Principală
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {idx > 0 && (
                  <button type="button" onClick={() => moveImage(idx, -1)} className="w-6 h-6 bg-white rounded-full text-xs flex items-center justify-center shadow">←</button>
                )}
                <button type="button" onClick={() => removeImage(idx)} className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow">×</button>
                {idx < images.length - 1 && (
                  <button type="button" onClick={() => moveImage(idx, 1)} className="w-6 h-6 bg-white rounded-full text-xs flex items-center justify-center shadow">→</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
