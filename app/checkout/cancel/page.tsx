import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold uppercase tracking-wider mb-3">
          Plată anulată
        </h1>

        <p className="font-body text-neutral-600 mb-8">
          Plata a fost anulată. Nu ți-a fost debitată nicio sumă. Coșul tău este în continuare disponibil.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/checkout"
            className="inline-block bg-pink text-white font-body text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-dark transition-colors"
          >
            Încearcă din nou
          </Link>
          <Link
            href="/produse"
            className="inline-block border-2 border-dark text-dark font-body text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-dark hover:text-white transition-colors"
          >
            Înapoi la magazin
          </Link>
        </div>
      </div>
    </div>
  );
}
