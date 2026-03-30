/** Format price from bani to RON display string */
export function formatPrice(bani: number): string {
  const lei = bani / 100;
  return `${lei.toLocaleString("ro-RO", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} lei`;
}

/** Format price range for courses */
export function formatPriceRange(from: number, to: number): string {
  if (from === to) return formatPrice(from);
  return `${formatPrice(from)} – ${formatPrice(to)}`;
}

/** Generate WhatsApp link */
export function whatsappLink(message?: string): string {
  const phone = "40740000000"; // Replace with Emma's actual number
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Generate a random order number */
export function generateOrderNumber(): string {
  const prefix = "EN";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/** Romanian counties for address forms */
export const ROMANIAN_COUNTIES = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brașov", "Brăila", "București", "Buzău", "Caraș-Severin", "Călărași",
  "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Satu Mare", "Sălaj",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vaslui", "Vâlcea",
  "Vrancea",
];

/** Order status labels in Romanian */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "În așteptare",
  processing: "Se procesează",
  shipped: "Expediat",
  delivered: "Livrat",
  cancelled: "Anulat",
};

/** Payment status labels in Romanian */
export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: "În așteptare",
  paid: "Plătit",
  failed: "Eșuat",
};
