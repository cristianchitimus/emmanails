import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <Image
                src="/uploads/site-logo3.45.png"
                alt="Emma Nails"
                width={120}
                height={40}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm text-dark-300 leading-relaxed max-w-xs">
              Produse profesionale pentru unghii și cursuri acreditate de
              manichiură și pedichiură. Peste 15 ani de experiență.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] mb-4">
              Magazin
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/produse", label: "Toate produsele" },
                { href: "/produse?categorie=polygel", label: "PolyGel" },
                { href: "/produse?categorie=instrumente", label: "Instrumente" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-300 hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] mb-4">
              Academie
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/academie", label: "Toate cursurile" },
                { href: "/academie?nivel=incepator", label: "Începător" },
                { href: "/academie?nivel=mediu", label: "Mediu" },
                { href: "/academie?nivel=avansat", label: "Avansat" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-300 hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Info */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] mb-4">
              Contul meu
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/cont", label: "Profil" },
                { href: "/cont/comenzi", label: "Comenzile mele" },
                { href: "/despre", label: "Despre noi" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-300 hover:text-pink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-400">
            © {new Date().getFullYear()} Emma Nails. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-dark-400">Plăți securizate</span>
            <div className="flex gap-1.5">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-[7px] font-bold flex items-center justify-center">VISA</div>
              <div className="w-8 h-5 bg-red-500 rounded text-white text-[7px] font-bold flex items-center justify-center">MC</div>
              <div className="w-8 h-5 bg-green-600 rounded text-white text-[7px] font-bold flex items-center justify-center">RON</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
