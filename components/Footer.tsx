import Link from "next/link";
import { whatsappLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-wide">
                EMMA<span className="text-pink"> NAILS</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-dark-300 leading-relaxed max-w-xs">
              Produse profesionale pentru unghii și cursuri acreditate de
              manichiură și pedichiură. Peste 15 ani de experiență.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-widest mb-5 text-dark-300">
              Magazine
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/produse"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  Toate Produsele
                </Link>
              </li>
              <li>
                <Link
                  href="/produse?categorie=polygel"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  PolyGel
                </Link>
              </li>
              <li>
                <Link
                  href="/produse?categorie=instrumente"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  Instrumente
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy links */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-widest mb-5 text-dark-300">
              Academie
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/academie"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  Toate Cursurile
                </Link>
              </li>
              <li>
                <Link
                  href="/despre"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  Despre Emma
                </Link>
              </li>
              <li>
                <a
                  href={whatsappLink("Bună! Aș dori informații despre cursuri.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  Înscriere Cursuri
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-widest mb-5 text-dark-300">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+40747906311"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  +40 747 906 311
                </a>
              </li>
              <li>
                <a
                  href="mailto:raileanu.emma@yahoo.com"
                  className="text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  raileanu.emma@yahoo.com
                </a>
              </li>
              <li>
                <span className="text-sm text-dark-200">Iași, România</span>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.facebook.com/emmanailinstructor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-dark-200 hover:text-pink transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-dark-400">
            © {new Date().getFullYear()} Emma Nails. Toate drepturile rezervate.
          </p>
          <p className="text-xs text-dark-400">
            Iași, România
          </p>
        </div>
      </div>
    </footer>
  );
}
