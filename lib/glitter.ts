// Helper: detect if a product should show glitter heart
export function isGlitterProduct(product: {
  subcategory?: string | null;
  name?: string;
}): boolean {
  const sub = product.subcategory || "";
  const name = (product.name || "").toLowerCase();
  
  // Glitter subcategories
  if (sub === "glitter-rubber-base") return true;
  if (sub === "glitter-vibe-top") return true;
  
  // Glitter/shimmer product lines (by name)
  if (name.includes("metal bloom")) return true;
  if (name.includes("allè vibes") || name.includes("alle vibes")) return true;
  if (name.includes("cosmic chrome")) return true;
  if (name.includes("moon shimmer")) return true;
  if (name.includes("soul sisters")) return true;
  if (name.includes("pearl touch")) return true;
  if (name.includes("pink promise")) return true;
  if (name.includes("lilac anne")) return true;
  
  return false;
}
