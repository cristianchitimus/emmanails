"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, setIsOpen, removeItem, updateQuantity, clearCart } = useCart();

  if (!isOpen) return null;

  const shippingThresholdDiff = FREE_SHIPPING_THRESHOLD - totalPrice;
  const hasFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <h2 className="font-display text-xl font-bold uppercase tracking-wider">
            Coș <span className="text-pink">({totalItems})</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-neutral-50 rounded-full transition-colors"
            aria-label="Închide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free shipping progress */}
        {totalItems > 0 && (
          <div className="px-6 py-3 bg-nude/30">
            {hasFreeShipping ? (
              <p className="font-body text-xs text-center text-green-700 font-medium">
                ✓ Livrare gratuită inclusă!
              </p>
            ) : (
              <div>
                <p className="font-body text-xs text-center text-neutral-600 mb-1.5">
                  Mai adaugă <span className="font-bold text-pink">{formatPrice(shippingThresholdDiff)}</span> pentru livrare gratuită
                </p>
                <div className="w-full bg-neutral-200 rounded-full h-1.5">
                  <div
                    className="bg-pink h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {totalItems === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 text-neutral-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="font-display text-lg font-bold mb-1">Coșul tău e gol</p>
              <p className="font-body text-sm text-neutral-500 mb-6">Descoperă produsele noastre</p>
              <Link
                href="/produse"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-dark text-white font-body text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-pink transition-colors"
              >
                Shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-3 border-b border-neutral-50 last:border-0">
                  {/* Product image placeholder */}
                  <div className="w-16 h-16 bg-nude/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <span className="text-pink text-lg font-display font-bold">EN</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-dark truncate pr-4">
                      {item.name}
                    </p>
                    <p className="font-body text-sm font-bold text-pink mt-0.5">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-xs hover:border-pink hover:text-pink transition-colors"
                      >
                        −
                      </button>
                      <span className="font-body text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-xs hover:border-pink hover:text-pink transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-start p-1 text-neutral-300 hover:text-red-500 transition-colors"
                    aria-label="Șterge"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with checkout */}
        {totalItems > 0 && (
          <div className="border-t border-neutral-100 px-6 py-5 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-neutral-600">Subtotal</span>
              <span className="font-display text-lg font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="font-body text-[11px] text-neutral-400">
              Livrare și discount calculate la checkout
            </p>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-pink text-white text-center font-body text-xs font-semibold uppercase tracking-[0.2em] py-3.5 rounded-full hover:bg-dark transition-colors"
            >
              Finalizează comanda
            </Link>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-neutral-400 hover:text-red-500 transition-colors font-body"
            >
              Golește coșul
            </button>
          </div>
        )}
      </div>
    </>
  );
}
