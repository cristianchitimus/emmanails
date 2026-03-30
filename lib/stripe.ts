import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

/** Free shipping threshold in bani (200 lei) */
export const FREE_SHIPPING_THRESHOLD = 20000;

/** Standard shipping cost in bani (20 lei) */
export const SHIPPING_COST = 2000;

/** Calculate shipping based on subtotal */
export function calculateShipping(subtotalBani: number): number {
  return subtotalBani >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
