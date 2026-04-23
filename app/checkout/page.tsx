"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice, ROMANIAN_COUNTIES } from "@/lib/utils";
import { calculateShipping, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totalPrice, clearCart, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validating, setValidating] = useState(true);

  // Validate cart items exist in database
  useEffect(() => {
    if (items.length === 0) { setValidating(false); return; }
    (async () => {
      try {
        const res = await fetch("/api/cart/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: items.map((i) => i.id) }),
        });
        const data = await res.json();
        if (data.invalid?.length > 0) {
          for (const id of data.invalid) removeItem(id);
        }
      } catch {}
      setValidating(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "Iași",
    postalCode: "",
    // Invoicing — all optional; shown only after the user ticks needsInvoice.
    needsInvoice: false,
    billingType: "person" as "person" | "company",
    billingName: "",
    billingCnp: "",
    billingCompany: "",
    billingVatId: "",
    billingRegNumber: "",
    billingAddress: "",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "ramburs">("stripe");

  // Discount code
  const [discountCode, setDiscountCode] = useState("");
  const [discountResult, setDiscountResult] = useState<{
    valid: boolean;
    code: string;
    discountAmount: number;
    label: string;
  } | null>(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState("");

  // Pre-fill from session
  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
      }));
    }
  }, [session]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/produse");
    }
  }, [items.length, router]);

  const subtotal = totalPrice;
  const shipping = calculateShipping(subtotal);
  const discount = discountResult?.discountAmount || 0;
  const total = Math.max(subtotal - discount + shipping, 0);

  const validateDiscount = async () => {
    if (!discountCode.trim()) return;

    setDiscountLoading(true);
    setDiscountError("");
    setDiscountResult(null);

    try {
      const res = await fetch("/api/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode.trim(), subtotal }),
      });
      const data = await res.json();

      if (!res.ok) {
        setDiscountError(data.error);
      } else {
        setDiscountResult(data);
      }
    } catch {
      setDiscountError("Eroare la validarea codului");
    } finally {
      setDiscountLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!form.name || !form.email || !form.address || !form.city || !form.county) {
      setError("Completează toate câmpurile obligatorii");
      setLoading(false);
      return;
    }

    // Invoice validation: mirrors the server — company invoices need at
    // least the business name, CUI, and a billing address.
    if (form.needsInvoice && form.billingType === "company") {
      if (!form.billingCompany || !form.billingVatId || !form.billingAddress) {
        setError("Pentru factură pe firmă completează denumirea, CUI și adresa de facturare");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          paymentMethod,
          discountCode: discountResult?.code || undefined,
          discountAmount: discount,
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Eroare la procesarea comenzii");
        return;
      }

      if (paymentMethod === "stripe" && data.url) {
        // Redirect to Stripe
        clearCart();
        window.location.href = data.url;
      } else if (data.redirectUrl) {
        // Ramburs — redirect to success
        clearCart();
        router.push(data.redirectUrl);
      }
    } catch {
      setError("Eroare la procesarea comenzii. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  if (validating) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="inline-block w-6 h-6 border-2 border-dark-200 border-t-pink rounded-full animate-spin" />
        <p className="font-body text-xs uppercase tracking-widest text-dark-400">Se verifică produsele...</p>
      </div>
    </div>
  );
  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/produse" className="font-body text-xs text-neutral-500 hover:text-pink transition-colors uppercase tracking-wider">
            ← Continuă cumpărăturile
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold uppercase tracking-wider mt-4">
            Finalizare <span className="text-pink">Comandă</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* ─── LEFT: Form ─── */}
            <div className="lg:col-span-7 space-y-8">
              {/* Contact & Shipping */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
                  Date de livrare
                </h2>

                {!session && (
                  <div className="bg-nude/30 rounded-xl p-4 mb-6">
                    <p className="font-body text-sm text-neutral-600">
                      Ai deja un cont?{" "}
                      <Link href="/cont/autentificare" className="text-pink font-semibold hover:underline">
                        Autentifică-te
                      </Link>{" "}
                      pentru a completa automat datele.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Nume complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                      placeholder="Maria Popescu"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                      placeholder="maria@email.com"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                      placeholder="0740 000 000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Adresă completă *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                      placeholder="Strada, număr, bloc, apartament"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Oraș *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                      placeholder="Iași"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Județ *
                    </label>
                    <select
                      required
                      value={form.county}
                      onChange={(e) => setForm({ ...form, county: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors bg-white"
                    >
                      {ROMANIAN_COUNTIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Cod poștal
                    </label>
                    <input
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                      placeholder="700000"
                    />
                  </div>
                </div>
              </div>

              {/* Invoicing (Date de facturare) */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.needsInvoice}
                    onChange={(e) =>
                      setForm({ ...form, needsInvoice: e.target.checked })
                    }
                    className="accent-pink w-4 h-4 mt-1"
                  />
                  <div>
                    <h2 className="font-display text-lg font-bold uppercase tracking-wider">
                      Vreau factură
                    </h2>
                    <p className="font-body text-xs text-neutral-500 mt-1">
                      Bifează dacă ai nevoie de factură fiscală pentru această
                      comandă.
                    </p>
                  </div>
                </label>

                {form.needsInvoice && (
                  <div className="mt-6 space-y-5">
                    {/* Persoană fizică / juridică toggle */}
                    <div>
                      <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                        Tip factură
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(
                          [
                            { value: "person", label: "Persoană fizică" },
                            { value: "company", label: "Persoană juridică" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              setForm({ ...form, billingType: opt.value })
                            }
                            className={`px-4 py-3 rounded-xl border-2 font-body text-sm transition-all ${
                              form.billingType === opt.value
                                ? "border-pink bg-pink/5 text-dark"
                                : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {form.billingType === "person" ? (
                      <>
                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                            Nume pe factură
                          </label>
                          <input
                            type="text"
                            value={form.billingName}
                            onChange={(e) =>
                              setForm({ ...form, billingName: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                            placeholder="Lasă gol pentru a folosi numele de livrare"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                            CNP <span className="text-neutral-400 normal-case">(opțional)</span>
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={form.billingCnp}
                            onChange={(e) =>
                              setForm({ ...form, billingCnp: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                            placeholder="1234567890123"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                            Adresă de facturare <span className="text-neutral-400 normal-case">(dacă diferă de livrare)</span>
                          </label>
                          <input
                            type="text"
                            value={form.billingAddress}
                            onChange={(e) =>
                              setForm({ ...form, billingAddress: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                            placeholder="Strada, număr, oraș, județ, cod poștal"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                            Denumire firmă *
                          </label>
                          <input
                            type="text"
                            value={form.billingCompany}
                            onChange={(e) =>
                              setForm({ ...form, billingCompany: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                            placeholder="ex. Emma Beauty S.R.L."
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                              CUI *
                            </label>
                            <input
                              type="text"
                              value={form.billingVatId}
                              onChange={(e) =>
                                setForm({ ...form, billingVatId: e.target.value })
                              }
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                              placeholder="RO12345678"
                            />
                          </div>
                          <div>
                            <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                              Nr. reg. comerțului
                            </label>
                            <input
                              type="text"
                              value={form.billingRegNumber}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  billingRegNumber: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                              placeholder="J22/123/2024"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                            Adresă firmă *
                          </label>
                          <input
                            type="text"
                            value={form.billingAddress}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                billingAddress: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/20 transition-colors"
                            placeholder="Strada, număr, oraș, județ, cod poștal"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
                  Metodă de plată
                </h2>
                <div className="space-y-3">
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-pink bg-pink/5"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                      className="accent-pink w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-body text-sm font-semibold text-dark">Card bancar</p>
                      <p className="font-body text-xs text-neutral-500 mt-0.5">Plată securizată prin Stripe — Visa, Mastercard, Apple Pay</p>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-[7px] font-bold flex items-center justify-center">VISA</div>
                      <div className="w-8 h-5 bg-red-500 rounded text-white text-[7px] font-bold flex items-center justify-center">MC</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "ramburs"
                        ? "border-pink bg-pink/5"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="ramburs"
                      checked={paymentMethod === "ramburs"}
                      onChange={() => setPaymentMethod("ramburs")}
                      className="accent-pink w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-body text-sm font-semibold text-dark">Ramburs (plata la livrare)</p>
                      <p className="font-body text-xs text-neutral-500 mt-0.5">Plătești cash la primirea coletului</p>
                    </div>
                    <div className="w-8 h-5 bg-green-600 rounded text-white text-[7px] font-bold flex items-center justify-center">
                      RON
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* ─── RIGHT: Order Summary ─── */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm sticky top-28">
                <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-6">
                  Sumar comandă
                </h2>

                {/* Cart items */}
                <ul className="space-y-3 mb-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-nude/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt="" className="w-full h-full object-contain rounded-lg" />
                        ) : (
                          <span className="text-pink text-xs font-display font-bold">EN</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-dark truncate">{item.name}</p>
                        <p className="font-body text-xs text-neutral-500">×{item.quantity}</p>
                      </div>
                      <p className="font-body text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </li>
                  ))}
                </ul>

                {/* Discount code */}
                <div className="mb-6 pb-6 border-b border-neutral-100">
                  <label className="block font-body text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Cod de discount
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value.toUpperCase());
                        setDiscountError("");
                        setDiscountResult(null);
                      }}
                      placeholder="Ex: WELCOME10"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 font-body text-sm focus:outline-none focus:border-pink transition-colors uppercase"
                    />
                    <button
                      type="button"
                      onClick={validateDiscount}
                      disabled={discountLoading || !discountCode.trim()}
                      className="px-4 py-2.5 bg-dark text-white font-body text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-pink transition-colors disabled:opacity-50"
                    >
                      {discountLoading ? "..." : "Aplică"}
                    </button>
                  </div>
                  {discountError && (
                    <p className="font-body text-xs text-red-500 mt-1.5">{discountError}</p>
                  )}
                  {discountResult && (
                    <p className="font-body text-xs text-green-600 mt-1.5 font-medium">
                      ✓ Cod aplicat: {discountResult.label}
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-body text-sm text-green-600">
                      <span>Discount ({discountResult?.label})</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-neutral-600">Livrare</span>
                    <span>{shipping === 0 ? <span className="text-green-600">Gratuită</span> : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-display text-xl font-bold pt-3 border-t border-neutral-100">
                    <span>Total</span>
                    <span className="text-pink">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 text-red-600 font-body text-sm rounded-xl p-3 mb-4">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-pink text-white font-body text-sm font-semibold uppercase tracking-[0.2em] py-4 rounded-full hover:bg-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Se procesează..."
                    : paymentMethod === "stripe"
                    ? `Plătește ${formatPrice(total)}`
                    : `Plasează comanda — ${formatPrice(total)}`}
                </button>

                <p className="font-body text-[11px] text-neutral-400 text-center mt-3">
                  {paymentMethod === "stripe"
                    ? "Vei fi redirecționat către Stripe pentru plata securizată"
                    : "Vei plăti cash la primirea coletului"}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
