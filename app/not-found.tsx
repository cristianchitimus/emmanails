import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-label mb-3">404</p>
        <h1 className="font-display text-5xl md:text-7xl font-medium text-dark mb-4">
          Pagina nu a fost{" "}
          <span className="italic text-pink">găsită</span>
        </h1>
        <p className="font-body text-base text-dark-400 mb-8">
          Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Acasă
          </Link>
          <Link href="/produse" className="btn-secondary">
            Produse
          </Link>
          <Link href="/academie" className="btn-secondary">
            Academie
          </Link>
        </div>
      </div>
    </section>
  );
}
