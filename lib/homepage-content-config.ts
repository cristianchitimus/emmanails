export const HOMEPAGE_CONTENT_KEY = "homepage_content";

export interface HomepageHeroCardContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
}

export interface HomepageAboutContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  whatsappLabel: string;
  whatsappMessage: string;
}

export interface HomepageSectionHeaderContent {
  eyebrow: string;
  title: string;
  linkLabel?: string;
}

export interface HomepageFinalCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  whatsappMessage: string;
}

export interface HomepageContent {
  hero: {
    products: HomepageHeroCardContent;
    courses: HomepageHeroCardContent;
  };
  about: HomepageAboutContent;
  sections: {
    products: HomepageSectionHeaderContent;
    categories: HomepageSectionHeaderContent;
    courses: HomepageSectionHeaderContent;
    reviews: HomepageSectionHeaderContent;
    finalCta: HomepageFinalCtaContent;
  };
}

export const defaultHomepageContent: HomepageContent = {
  hero: {
    products: {
      eyebrow: "Shop",
      title: "Produse Emma Nails",
      description: "Geluri, baze, topuri si instrumente profesionale pentru tehnicieni.",
      ctaLabel: "Vezi produsele",
      href: "/produse",
      imageUrl: "/hero-products.jpg",
      imageAlt: "Produse Emma Nails",
    },
    courses: {
      eyebrow: "Academie",
      title: "Cursuri profesionale",
      description: "Tehnici moderne, practica reala si suport pentru fiecare cursanta.",
      ctaLabel: "Vezi cursurile",
      href: "/academie",
      imageUrl: "/hero-courses.jpeg",
      imageAlt: "Unghii realizate in academia Emma Nails",
    },
  },
  about: {
    eyebrow: "Despre noi",
    title: "Brand romanesc pentru tehnicieni de unghii",
    paragraphs: [
      "Emma Nails combina experienta de salon cu produse testate in lucru real. Gama este construita pentru manichiura curata, rezistenta si usor de repetat.",
      "In academie, cursurile sunt gandite practic: tehnici clare, model real si suport pentru fiecare cursanta.",
    ],
    imageUrl: "/about-emma-portrait.jpg",
    imageAlt: "Emma Nails trainer",
    primaryLabel: "Descopera Emma Nails",
    primaryHref: "/despre",
    whatsappLabel: "WhatsApp",
    whatsappMessage: "Buna! As dori mai multe informatii despre Emma Nails.",
  },
  sections: {
    products: {
      eyebrow: "Noutati",
      title: "Produse populare",
      linkLabel: "Vezi toate",
    },
    categories: {
      eyebrow: "Categorii",
      title: "Descopera gama Emma Nails",
      linkLabel: "Toate categoriile",
    },
    courses: {
      eyebrow: "Academie",
      title: "Cursuri profesionale",
      linkLabel: "Toate cursurile",
    },
    reviews: {
      eyebrow: "Recenzii",
      title: "Ce spun clientele",
    },
    finalCta: {
      eyebrow: "Suport rapid",
      title: "Ai nevoie de recomandari pentru produse sau cursuri?",
      description: "Scrie-ne si te ajutam sa alegi varianta potrivita pentru nivelul tau de lucru.",
      buttonLabel: "Scrie pe WhatsApp",
      whatsappMessage: "Buna! Am nevoie de o recomandare Emma Nails.",
    },
  },
};

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function normalizeHeroCard(value: unknown, fallback: HomepageHeroCardContent): HomepageHeroCardContent {
  const raw = isRecord(value) ? value : {};

  return {
    eyebrow: stringValue(raw.eyebrow, fallback.eyebrow),
    title: stringValue(raw.title, fallback.title),
    description: stringValue(raw.description, fallback.description),
    ctaLabel: stringValue(raw.ctaLabel, fallback.ctaLabel),
    href: stringValue(raw.href, fallback.href),
    imageUrl: stringValue(raw.imageUrl, fallback.imageUrl),
    imageAlt: stringValue(raw.imageAlt, fallback.imageAlt),
  };
}

function normalizeSectionHeader(
  value: unknown,
  fallback: HomepageSectionHeaderContent,
): HomepageSectionHeaderContent {
  const raw = isRecord(value) ? value : {};
  const normalized: HomepageSectionHeaderContent = {
    eyebrow: stringValue(raw.eyebrow, fallback.eyebrow),
    title: stringValue(raw.title, fallback.title),
  };

  if (fallback.linkLabel) {
    normalized.linkLabel = stringValue(raw.linkLabel, fallback.linkLabel);
  }

  return normalized;
}

function normalizeFinalCta(value: unknown, fallback: HomepageFinalCtaContent): HomepageFinalCtaContent {
  const raw = isRecord(value) ? value : {};

  return {
    eyebrow: stringValue(raw.eyebrow, fallback.eyebrow),
    title: stringValue(raw.title, fallback.title),
    description: stringValue(raw.description, fallback.description),
    buttonLabel: stringValue(raw.buttonLabel, fallback.buttonLabel),
    whatsappMessage: stringValue(raw.whatsappMessage, fallback.whatsappMessage),
  };
}

function normalizeAbout(value: unknown, fallback: HomepageAboutContent): HomepageAboutContent {
  const raw = isRecord(value) ? value : {};
  const paragraphs = Array.isArray(raw.paragraphs)
    ? raw.paragraphs.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : fallback.paragraphs;

  return {
    eyebrow: stringValue(raw.eyebrow, fallback.eyebrow),
    title: stringValue(raw.title, fallback.title),
    paragraphs: paragraphs.length > 0 ? paragraphs : fallback.paragraphs,
    imageUrl: stringValue(raw.imageUrl, fallback.imageUrl),
    imageAlt: stringValue(raw.imageAlt, fallback.imageAlt),
    primaryLabel: stringValue(raw.primaryLabel, fallback.primaryLabel),
    primaryHref: stringValue(raw.primaryHref, fallback.primaryHref),
    whatsappLabel: stringValue(raw.whatsappLabel, fallback.whatsappLabel),
    whatsappMessage: stringValue(raw.whatsappMessage, fallback.whatsappMessage),
  };
}

export function normalizeHomepageContent(value: unknown): HomepageContent {
  const raw = isRecord(value) ? value : {};
  const hero = isRecord(raw.hero) ? raw.hero : {};
  const sections = isRecord(raw.sections) ? raw.sections : {};

  return {
    hero: {
      products: normalizeHeroCard(hero.products, defaultHomepageContent.hero.products),
      courses: normalizeHeroCard(hero.courses, defaultHomepageContent.hero.courses),
    },
    about: normalizeAbout(raw.about, defaultHomepageContent.about),
    sections: {
      products: normalizeSectionHeader(sections.products, defaultHomepageContent.sections.products),
      categories: normalizeSectionHeader(sections.categories, defaultHomepageContent.sections.categories),
      courses: normalizeSectionHeader(sections.courses, defaultHomepageContent.sections.courses),
      reviews: normalizeSectionHeader(sections.reviews, defaultHomepageContent.sections.reviews),
      finalCta: normalizeFinalCta(sections.finalCta, defaultHomepageContent.sections.finalCta),
    },
  };
}

export function parseHomepageContent(value?: string | null): HomepageContent {
  if (!value) return defaultHomepageContent;

  try {
    return normalizeHomepageContent(JSON.parse(value));
  } catch {
    return defaultHomepageContent;
  }
}

export function isAllowedHomepageImageUrl(src: string): boolean {
  if (src.startsWith("/") && !src.startsWith("//")) return true;

  try {
    const url = new URL(src);
    if (url.protocol !== "https:") return false;

    return (
      url.hostname === "emmanails.ro" ||
      url.hostname === "academy.emmanails.ro" ||
      url.hostname.endsWith(".public.blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}

export function getHomepageImageValidationErrors(content: HomepageContent): string[] {
  const imageFields = [
    ["Poza produse", content.hero.products.imageUrl],
    ["Poza cursuri", content.hero.courses.imageUrl],
    ["Poza despre", content.about.imageUrl],
  ] as const;

  return imageFields
    .filter(([, src]) => !isAllowedHomepageImageUrl(src))
    .map(([label]) => `${label} trebuie sa fie o cale locala sau un URL Vercel Blob valid.`);
}
