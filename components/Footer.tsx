import Link from "next/link";
import Image from "next/image";

const footerColumns = [
  {
    title: "Informatii utile",
    links: [
      { href: "/despre", label: "Despre noi" },
      { href: "/contact", label: "Contact" },
      { href: "/produse", label: "Produse" },
      { href: "/academie", label: "Academie" },
    ],
  },
  {
    title: "Emma Nails",
    links: [
      { href: "/produse?categorie=polygel", label: "Polygel" },
      { href: "/produse?categorie=baza-rubber", label: "Baza rubber" },
      { href: "/produse?categorie=geluri-uv", label: "Geluri UV" },
      { href: "/produse?categorie=instrumente", label: "Instrumente" },
    ],
  },
  {
    title: "Cont",
    links: [
      { href: "/cont", label: "Profil" },
      { href: "/cont/comenzi", label: "Comenzile mele" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white text-dark">
      <div className="shop-container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/uploads/site-logo3.45.png"
                alt="Emma Nails"
                width={140}
                height={50}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-dark-400">
              Produse profesionale pentru manichiura si pedichiura, dezvoltate pentru tehnicieni care lucreaza curat, precis si constant.
            </p>
            <div className="mt-6 grid gap-1.5 font-body text-sm text-dark-500">
              <span>Iasi, Romania</span>
              <a href="tel:+40747906311" className="hover:text-pink transition-colors">+40 747 906 311</a>
              <a href="mailto:raileanu.emma@yahoo.com" className="hover:text-pink transition-colors">raileanu.emma@yahoo.com</a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 font-body text-[11px] font-semibold uppercase text-dark" style={{ letterSpacing: "0.16em" }}>
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="font-body text-sm text-dark-400 hover:text-pink transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-4 font-body text-[11px] font-semibold uppercase text-dark" style={{ letterSpacing: "0.16em" }}>
              Comunitate
            </h3>
            <p className="font-body text-sm leading-relaxed text-dark-400">
              Urmareste noutatile Emma Nails sau scrie-ne pentru recomandari de produse si cursuri.
            </p>
            <a href="mailto:raileanu.emma@yahoo.com" className="btn-secondary mt-5">
              Scrie-ne
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-dark-400">
            © {new Date().getFullYear()} Emma Nails. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-2">
            {["VISA", "MC", "RON"].map((label) => (
              <span key={label} className="rounded border border-neutral-200 px-2 py-1 font-body text-[10px] font-semibold text-dark-500">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
