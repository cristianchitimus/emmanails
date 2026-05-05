import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shop-section">
      <div className="shop-container max-w-3xl text-center">
        <p className="section-label mb-3">404</p>
        <h1 className="shop-title">Pagina nu a fost gasita</h1>
        <p className="shop-copy mx-auto mb-8 mt-4 max-w-xl">
          Pagina pe care o cauti nu exista sau a fost mutata.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Acasa
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
