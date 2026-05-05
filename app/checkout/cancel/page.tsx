import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <section className="shop-section">
      <div className="shop-container flex min-h-[58vh] items-center justify-center">
        <div className="w-full max-w-xl rounded border border-neutral-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>

          <p className="section-label mb-3">Checkout</p>
          <h1 className="shop-title">Plata anulata</h1>
          <p className="shop-copy mx-auto mt-4 max-w-md">
            Plata a fost anulata. Nu a fost debitata nicio suma, iar cosul ramane disponibil.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/checkout" className="btn-primary">
              Incearca din nou
            </Link>
            <Link href="/produse" className="btn-secondary">
              Inapoi la magazin
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
