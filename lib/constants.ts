/** Free shipping threshold in bani (200 lei) */
export const FREE_SHIPPING_THRESHOLD = 20000;

/** Standard shipping cost in bani (20 lei) */
export const SHIPPING_COST = 2000;

/** Calculate shipping based on subtotal */
export function calculateShipping(subtotalBani: number): number {
  return subtotalBani >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
