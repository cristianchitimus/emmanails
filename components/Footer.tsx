import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image
                src="https://emmanails.ro/wp-content/uploads/2025/04/logo3.45.png"
                alt="Emma Nails"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="font-body text-xs text-dark/40 leading-relaxed mt-4 max-w-xs">
              Produse profesionale pentru unghii și cursuri acreditate. Peste 15 ani de experiență.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/emmanailinstructor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-pink hover:text-white transition-colors text-dark/40"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/40747906311"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors text-dark/40"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-wider text-dark mb-4">Magazin</h3>
            <ul className="space-y-2">
              {[
                { href: "/produse", label: "Toate produsele" },
                { href: "/produse?categorie=polygel", label: "PolyGel" },
                { href: "/produse?categorie=instrumente", label: "Instrumente" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-xs text-dark/40 hover:text-pink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-wider text-dark mb-4">Academie</h3>
            <ul className="space-y-2">
              {[
                { href: "/academie", label: "Toate cursurile" },
                { href: "/academie?nivel=incepator", label: "Începător" },
                { href: "/academie?nivel=mediu", label: "Mediu" },
                { href: "/academie?nivel=avansat", label: "Avansat" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-xs text-dark/40 hover:text-pink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-wider text-dark mb-4">Informații</h3>
            <ul className="space-y-2">
              {[
                { href: "/cont", label: "Contul meu" },
                { href: "/despre", label: "Despre noi" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-xs text-dark/40 hover:text-pink transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="font-body text-xs text-dark/40">+40 747 906 311</span>
              </li>
              <li>
                <span className="font-body text-xs text-dark/40">raileanu.emma@yahoo.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-dark/30">
            © {new Date().getFullYear()} Emma Nails. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 bg-blue-600 rounded text-white text-[6px] font-bold flex items-center justify-center">VISA</div>
            <div className="w-8 h-5 bg-red-500 rounded text-white text-[6px] font-bold flex items-center justify-center">MC</div>
            <div className="w-8 h-5 bg-green-600 rounded text-white text-[6px] font-bold flex items-center justify-center">RON</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
