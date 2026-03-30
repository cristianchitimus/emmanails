"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice, whatsappLink } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  const generateWhatsAppMessage = () => {
    let msg = "Bună! Aș dori să comand:\n\n";
    items.forEach((item) => {
      msg += `• ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}\n`;
    });
    msg += `\nTotal: ${formatPrice(totalPrice)}`;
    return msg;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/50 z-[60] transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-100">
          <h2 className="font-display text-xl font-semibold">
            Coșul tău{" "}
            <span className="text-dark-400 text-base font-body">
              ({totalItems})
            </span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-dark-50 rounded-full transition-colors"
            aria-label="Închide coșul"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-16 h-16 text-dark-200 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="font-display text-lg mb-1">Coșul este gol</p>
              <p className="text-sm text-dark-400">
                Adaugă produse pentru a continua
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 border-b border-dark-50 last:border-0"
                >
                  {/* Product placeholder */}
                  <div className="w-20 h-20 bg-nude-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-[10px] text-dark-400 uppercase tracking-wider text-center px-1">
                      {item.category === "polygel" ? "PG" : "IN"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-dark leading-tight line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-pink font-medium mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-dark-200 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2.5 py-1 text-sm hover:bg-dark-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-2.5 py-1 text-sm font-medium min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2.5 py-1 text-sm hover:bg-dark-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-dark-300 hover:text-pink transition-colors"
                        aria-label="Șterge produs"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-dark-100 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm uppercase tracking-wider text-dark-400">
                Subtotal
              </span>
              <span className="font-display text-xl font-semibold">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <a
              href={whatsappLink(generateWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pink w-full text-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Comandă pe WhatsApp
            </a>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-dark-400 hover:text-pink transition-colors uppercase tracking-wider"
            >
              Golește coșul
            </button>
          </div>
        )}
      </div>
    </>
  );
}
