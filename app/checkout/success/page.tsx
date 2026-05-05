import Link from "next/link";

interface Props {
  searchParams: { order?: string };
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const orderNumber = searchParams.order;

  return (
    <section className="shop-section">
      <div className="shop-container flex min-h-[58vh] items-center justify-center">
        <div className="w-full max-w-xl rounded border border-neutral-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="section-label mb-3">Comanda plasata</p>
          <h1 className="shop-title">Multumim!</h1>
          <p className="shop-copy mx-auto mt-4 max-w-md">
            Comanda ta a fost plasata cu succes. Vei primi un email de confirmare cu detaliile comenzii.
          </p>

          {orderNumber && (
            <p className="mt-5 font-body text-sm text-dark-400">
              Numar comanda: <span className="font-semibold text-dark">{orderNumber}</span>
            </p>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/cont/comenzi" className="btn-primary">
              Vezi comenzile
            </Link>
            <Link href="/produse" className="btn-secondary">
              Continua cumparaturile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
