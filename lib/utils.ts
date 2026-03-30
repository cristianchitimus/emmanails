/** Format price from bani to RON display string */
export function formatPrice(bani: number): string {
  const lei = bani / 100;
  return `${lei.toLocaleString("ro-RO")} lei`;
}

/** Format price range for courses */
export function formatPriceRange(from: number, to: number): string {
  return `${formatPrice(from)} – ${formatPrice(to)}`;
}

/** Generate WhatsApp link */
export function whatsappLink(message?: string): string {
  const base = "https://wa.me/40747906311";
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

/** Capitalize first letter */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
