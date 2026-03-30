import Link from "next/link";

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const orderNumber = params.order;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold uppercase tracking-wider mb-3">
          Mulțumim!
        </h1>

        <p className="font-body text-neutral-600 mb-2">
          Comanda ta a fost plasată cu succes.
        </p>

        {orderNumber && (
          <p className="font-body text-sm text-neutral-500 mb-6">
            Număr comandă: <span className="font-semibold text-dark">{orderNumber}</span>
          </p>
        )}

        <p className="font-body text-sm text-neutral-500 mb-8">
          Vei primi un email de confirmare cu detaliile comenzii. Livrarea durează 2-5 zile lucrătoare.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/cont/comenzi"
            className="inline-block bg-dark text-white font-body text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-pink transition-colors"
          >
            Vezi comenzile mele
          </Link>
          <Link
            href="/produse"
            className="inline-block border-2 border-dark text-dark font-body text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-dark hover:text-white transition-colors"
          >
            Continuă cumpărăturile
          </Link>
        </div>
      </div>
    </div>
  );
}
