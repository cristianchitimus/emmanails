"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  defaultHomepageContent,
  type HomepageAboutContent,
  type HomepageContent,
  type HomepageFinalCtaContent,
  type HomepageHeroCardContent,
  type HomepageSectionHeaderContent,
} from "@/lib/homepage-content-config";

type HeroSide = keyof HomepageContent["hero"];
type SectionKey = keyof Omit<HomepageContent["sections"], "finalCta">;

const sectionLabels: Record<SectionKey, string> = {
  products: "Produse",
  categories: "Categorii",
  courses: "Cursuri",
  reviews: "Recenzii",
};

function shouldBypassImageOptimizer(src: string) {
  return src.startsWith("http");
}

export function HomepageEditor() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/admin/homepage")
      .then(async (res) => {
        if (!res.ok) throw new Error("Nu am putut incarca setarile pentru prima pagina.");
        return res.json() as Promise<HomepageContent>;
      })
      .then((data) => {
        if (mounted) setContent(data);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err.message : "Eroare la incarcare.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const saveContent = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Eroare la salvare.");

      setContent(data.content);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la salvare.");
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (key: string, file: File, onUploaded: (url: string) => void) => {
    setUploading(key);
    setSaved(false);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.url) throw new Error(data.error || "Upload esuat.");

      onUploaded(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la upload.");
    } finally {
      setUploading(null);
    }
  };

  const updateHero = (side: HeroSide, field: keyof HomepageHeroCardContent, value: string) => {
    setContent((current) => ({
      ...current,
      hero: {
        ...current.hero,
        [side]: {
          ...current.hero[side],
          [field]: value,
        },
      },
    }));
  };

  const updateAbout = (field: keyof HomepageAboutContent, value: string | string[]) => {
    setContent((current) => ({
      ...current,
      about: {
        ...current.about,
        [field]: value,
      },
    }));
  };

  const updateAboutParagraph = (index: number, value: string) => {
    setContent((current) => {
      const paragraphs = [...current.about.paragraphs];
      paragraphs[index] = value;

      return {
        ...current,
        about: {
          ...current.about,
          paragraphs,
        },
      };
    });
  };

  const updateSection = (
    section: SectionKey,
    field: keyof HomepageSectionHeaderContent,
    value: string,
  ) => {
    setContent((current) => ({
      ...current,
      sections: {
        ...current.sections,
        [section]: {
          ...current.sections[section],
          [field]: value,
        },
      },
    }));
  };

  const updateFinalCta = (field: keyof HomepageFinalCtaContent, value: string) => {
    setContent((current) => ({
      ...current,
      sections: {
        ...current.sections,
        finalCta: {
          ...current.sections.finalCta,
          [field]: value,
        },
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-pink border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-dark md:text-3xl">Prima pagina</h1>
          <p className="mt-1 max-w-2xl font-body text-sm text-dark-400">
            Editeaza imaginile si textele principale de pe homepage. Schimbarile apar pe site dupa salvare.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setContent(defaultHomepageContent)}
            className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-dark-500 transition-colors hover:bg-neutral-50"
          >
            Reseteaza local
          </button>
          <button
            type="button"
            onClick={saveContent}
            disabled={saving}
            className="rounded-xl bg-dark px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-pink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Se salveaza..." : "Salveaza pagina"}
          </button>
        </div>
      </div>

      {(saved || error) && (
        <div
          className={`rounded-xl border px-4 py-3 font-body text-sm ${
            saved
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {saved ? "Prima pagina a fost salvata." : error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
        <div className="space-y-6">
          <EditorPanel
            eyebrow="Hero"
            title="Card produse"
            description="Imaginea si textul pentru partea de produse din primul ecran."
          >
            <ImageControl
              label="Poza produse"
              value={content.hero.products.imageUrl}
              uploading={uploading === "hero-products"}
              onUrlChange={(value) => updateHero("products", "imageUrl", value)}
              onUpload={(file) =>
                uploadImage("hero-products", file, (url) => updateHero("products", "imageUrl", url))
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Eticheta" value={content.hero.products.eyebrow} onChange={(value) => updateHero("products", "eyebrow", value)} />
              <TextField label="Text buton" value={content.hero.products.ctaLabel} onChange={(value) => updateHero("products", "ctaLabel", value)} />
            </div>
            <TextField label="Titlu" value={content.hero.products.title} onChange={(value) => updateHero("products", "title", value)} />
            <TextArea label="Descriere" value={content.hero.products.description} onChange={(value) => updateHero("products", "description", value)} />
            <TextField label="Text alternativ poza" value={content.hero.products.imageAlt} onChange={(value) => updateHero("products", "imageAlt", value)} />
          </EditorPanel>

          <EditorPanel
            eyebrow="Hero"
            title="Card cursuri"
            description="Imaginea si textul pentru partea de cursuri din primul ecran."
          >
            <ImageControl
              label="Poza cursuri"
              value={content.hero.courses.imageUrl}
              uploading={uploading === "hero-courses"}
              onUrlChange={(value) => updateHero("courses", "imageUrl", value)}
              onUpload={(file) =>
                uploadImage("hero-courses", file, (url) => updateHero("courses", "imageUrl", url))
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Eticheta" value={content.hero.courses.eyebrow} onChange={(value) => updateHero("courses", "eyebrow", value)} />
              <TextField label="Text buton" value={content.hero.courses.ctaLabel} onChange={(value) => updateHero("courses", "ctaLabel", value)} />
            </div>
            <TextField label="Titlu" value={content.hero.courses.title} onChange={(value) => updateHero("courses", "title", value)} />
            <TextArea label="Descriere" value={content.hero.courses.description} onChange={(value) => updateHero("courses", "description", value)} />
            <TextField label="Text alternativ poza" value={content.hero.courses.imageAlt} onChange={(value) => updateHero("courses", "imageAlt", value)} />
          </EditorPanel>

          <EditorPanel
            eyebrow="Despre"
            title="Bloc imagine si text"
            description="Sectiunea cu portretul si prezentarea brandului."
          >
            <ImageControl
              label="Poza bloc despre"
              value={content.about.imageUrl}
              uploading={uploading === "about-image"}
              onUrlChange={(value) => updateAbout("imageUrl", value)}
              onUpload={(file) => uploadImage("about-image", file, (url) => updateAbout("imageUrl", url))}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Eticheta" value={content.about.eyebrow} onChange={(value) => updateAbout("eyebrow", value)} />
              <TextField label="Text buton principal" value={content.about.primaryLabel} onChange={(value) => updateAbout("primaryLabel", value)} />
            </div>
            <TextField label="Titlu" value={content.about.title} onChange={(value) => updateAbout("title", value)} />
            <TextArea label="Paragraf 1" value={content.about.paragraphs[0] || ""} onChange={(value) => updateAboutParagraph(0, value)} />
            <TextArea label="Paragraf 2" value={content.about.paragraphs[1] || ""} onChange={(value) => updateAboutParagraph(1, value)} />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Text buton WhatsApp" value={content.about.whatsappLabel} onChange={(value) => updateAbout("whatsappLabel", value)} />
              <TextField label="Text alternativ poza" value={content.about.imageAlt} onChange={(value) => updateAbout("imageAlt", value)} />
            </div>
            <TextArea label="Mesaj WhatsApp" value={content.about.whatsappMessage} onChange={(value) => updateAbout("whatsappMessage", value)} />
          </EditorPanel>

          <EditorPanel
            eyebrow="Sectiuni"
            title="Titluri si CTA"
            description="Textele mici care apar in restul homepage-ului."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {(Object.keys(sectionLabels) as SectionKey[]).map((section) => (
                <div key={section} className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400">
                    {sectionLabels[section]}
                  </h3>
                  <div className="mt-4 space-y-3">
                    <TextField label="Eticheta" value={content.sections[section].eyebrow} onChange={(value) => updateSection(section, "eyebrow", value)} />
                    <TextField label="Titlu" value={content.sections[section].title} onChange={(value) => updateSection(section, "title", value)} />
                    {content.sections[section].linkLabel !== undefined && (
                      <TextField label="Text link" value={content.sections[section].linkLabel || ""} onChange={(value) => updateSection(section, "linkLabel", value)} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
              <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400">
                CTA final
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <TextField label="Eticheta" value={content.sections.finalCta.eyebrow} onChange={(value) => updateFinalCta("eyebrow", value)} />
                <TextField label="Text buton" value={content.sections.finalCta.buttonLabel} onChange={(value) => updateFinalCta("buttonLabel", value)} />
              </div>
              <div className="mt-4 space-y-4">
                <TextField label="Titlu" value={content.sections.finalCta.title} onChange={(value) => updateFinalCta("title", value)} />
                <TextArea label="Descriere" value={content.sections.finalCta.description} onChange={(value) => updateFinalCta("description", value)} />
                <TextArea label="Mesaj WhatsApp" value={content.sections.finalCta.whatsappMessage} onChange={(value) => updateFinalCta("whatsappMessage", value)} />
              </div>
            </div>
          </EditorPanel>
        </div>

        <aside className="xl:sticky xl:top-8 xl:self-start">
          <HomepagePreview content={content} />
        </aside>
      </div>
    </div>
  );
}

function EditorPanel({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm md:p-6">
      <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-pink">{eyebrow}</p>
      <h2 className="mt-1 font-display text-xl font-medium text-dark">{title}</h2>
      <p className="mt-1 font-body text-sm text-dark-400">{description}</p>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-dark-400">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-body text-sm text-dark outline-none transition focus:border-pink focus:ring-2 focus:ring-pink/20"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-wider text-dark-400">
        {label}
      </span>
      <textarea
        value={value}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-body text-sm leading-relaxed text-dark outline-none transition focus:border-pink focus:ring-2 focus:ring-pink/20"
      />
    </label>
  );
}

function ImageControl({
  label,
  value,
  uploading,
  onUrlChange,
  onUpload,
}: {
  label: string;
  value: string;
  uploading: boolean;
  onUrlChange: (value: string) => void;
  onUpload: (file: File) => void;
}) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
      <div className="grid gap-4 md:grid-cols-[160px_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
          {value ? (
            <Image
              src={value}
              alt=""
              fill
              unoptimized={shouldBypassImageOptimizer(value)}
              className="object-cover"
              sizes="160px"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-body text-xs text-dark-300">
              Fara poza
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-pink border-t-transparent" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400">{label}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-pink px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-pink-600">
              Incarca poza
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) onUpload(file);
                  event.target.value = "";
                }}
              />
            </label>
          </div>
          <input
            value={value}
            onChange={(event) => onUrlChange(event.target.value)}
            placeholder="/poza.jpg sau URL din upload"
            className="mt-3 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 font-body text-xs text-dark outline-none transition focus:border-pink focus:ring-2 focus:ring-pink/20"
          />
          <p className="mt-2 font-body text-xs text-dark-300">
            Recomandat: JPG/WebP, minim 1400px latime. Upload-ul salveaza imaginea in Vercel Blob.
          </p>
        </div>
      </div>
    </div>
  );
}

function HomepagePreview({ content }: { content: HomepageContent }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
      <div className="border-b border-neutral-100 p-4">
        <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">
          Previzualizare live
        </p>
      </div>
      <div className="space-y-5 p-4">
        <div className="grid gap-2">
          <PreviewHeroCard card={content.hero.products} />
          <PreviewHeroCard card={content.hero.courses} />
        </div>

        <div className="rounded-xl border border-neutral-100 p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
            {content.about.imageUrl && (
              <Image
                src={content.about.imageUrl}
                alt=""
                fill
                unoptimized={shouldBypassImageOptimizer(content.about.imageUrl)}
                className="object-cover object-top"
                sizes="430px"
              />
            )}
          </div>
          <p className="mt-4 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">
            {content.about.eyebrow}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-dark">
            {content.about.title}
          </h3>
          <p className="mt-2 line-clamp-3 font-body text-xs leading-relaxed text-dark-400">
            {content.about.paragraphs[0]}
          </p>
        </div>

        <div className="rounded-xl bg-dark p-4 text-white">
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-white/60">
            {content.sections.finalCta.eyebrow}
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold leading-tight">
            {content.sections.finalCta.title}
          </h3>
          <p className="mt-2 font-body text-xs leading-relaxed text-white/70">
            {content.sections.finalCta.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function PreviewHeroCard({ card }: { card: HomepageHeroCardContent }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-dark text-white">
      {card.imageUrl && (
        <Image
          src={card.imageUrl}
          alt=""
          fill
          unoptimized={shouldBypassImageOptimizer(card.imageUrl)}
          className="object-cover opacity-80"
          sizes="430px"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="rounded bg-white/15 px-2 py-1 font-body text-[9px] font-semibold uppercase tracking-wider">
          {card.eyebrow}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold leading-tight">{card.title}</h3>
        <p className="mt-1 line-clamp-2 font-body text-xs leading-relaxed text-white/75">{card.description}</p>
      </div>
    </div>
  );
}
