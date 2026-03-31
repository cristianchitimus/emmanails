"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";

const MEGA_MENU_DATA = {
  produse: {
    label: "Shop",
    columns: [
      {
        title: "PolyGel",
        links: [
          { label: "Toate produsele PolyGel", href: "/produse?categorie=polygel" },
          { label: "Nude & Cover", href: "/produse?categorie=polygel&sub=polygel-nude" },
          { label: "Clear & Clasic", href: "/produse?categorie=polygel&sub=polygel-clasic" },
          { label: "Color KD", href: "/produse?categorie=polygel&sub=polygel-color" },
          { label: "Reflective", href: "/produse?categorie=polygel&sub=polygel-reflective" },
          { label: "Builder Gel", href: "/produse?categorie=polygel&sub=polygel-builder" },
        ],
      },
      {
        title: "Instrumente",
        links: [
          { label: "Toate instrumentele", href: "/produse?categorie=instrumente" },
          { label: "Aparatură", href: "/produse?categorie=instrumente&sub=instrumente-aparatura" },
          { label: "Instrumente manichiură", href: "/produse?categorie=instrumente&sub=instrumente-manichiura" },
          { label: "Pensule", href: "/produse?categorie=instrumente&sub=instrumente-pensule" },
          { label: "Consumabile", href: "/produse?categorie=instrumente&sub=instrumente-consumabile" },
        ],
      },
      {
        title: "Acrylic Liquid",
        links: [
          { label: "Toate nuanțele", href: "/produse?categorie=acrylic-liquid" },
        ],
      },
      {
        title: "Baze Rubber",
        links: [
          { label: "Toate bazele", href: "/produse?categorie=baze-rubber" },
          { label: "Rubber Base", href: "/produse?categorie=baze-rubber&sub=rubber-base" },
          { label: "Glitter Rubber Base", href: "/produse?categorie=baze-rubber&sub=glitter-rubber-base" },
        ],
      },
      {
        title: "Gel De Construcție",
        links: [
          { label: "Toate gelurile", href: "/produse?categorie=gel-constructie" },
          { label: "Gel Liquid", href: "/produse?categorie=gel-constructie&sub=gel-liquid" },
          { label: "Builder Gel", href: "/produse?categorie=gel-constructie&sub=builder-gel" },
          { label: "Jelly Builder Gel", href: "/produse?categorie=gel-constructie&sub=jelly" },
        ],
      },
      {
        title: "Top Coat",
        links: [
          { label: "Glitter Vibe Top", href: "/produse?categorie=top-coat&sub=glitter-vibe-top" },
          { label: "Velvet Matte Top", href: "/produse?categorie=top-coat&sub=velvet-matte-top" },
        ],
      },
    ],
    featured: {
      title: "BEST SELLER",
      product: "PolyGel Cover Light",
      href: "/produse/polygel-emma-nails-cover-light-30g",
      imageUrl: "https://emmanails.ro/wp-content/uploads/2024/10/polygel-cover-light-30g.png",
    },
  },
  academie: {
    label: "Academie",
    columns: [
      {
        title: "Cursuri după nivel",
        links: [
          { label: "Toate cursurile", href: "/academie" },
          { label: "Începător", href: "/academie?nivel=incepator" },
          { label: "Mediu", href: "/academie?nivel=mediu" },
          { label: "Avansat", href: "/academie?nivel=avansat" },
        ],
      },
      {
        title: "Cursuri populare",
        links: [
          { label: "Curs bază Nivel 1", href: "/academie/curs-baza-stilist-protezist-unghii-nivel-1" },
          { label: "Perfecționare PolyGel", href: "/academie/curs-perfectionare-polygel" },
          { label: "Nail Art Avansat", href: "/academie/curs-nail-art-avansat" },
          { label: "Masterclass Emma", href: "/academie/masterclass-emma-nails" },
        ],
      },
    ],
    featured: {
      title: "MASTERCLASS",
      product: "Masterclass cu Emma",
      href: "/academie/masterclass-emma-nails",
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/04/image.jpg",
    },
  },
};

type MenuKey = keyof typeof MEGA_MENU_DATA;

export function Navbar() {
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleMenuEnter = (key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(key);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  // Close mega menu on scroll
  useEffect(() => {
    const handleScroll = () => setActiveMenu(null);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const simpleLinks = [
    { href: "/despre", label: "Despre" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white border-b border-neutral-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left: Mobile hamburger + Desktop nav links */}
          <div className="flex items-center gap-8">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Meniu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop mega menu triggers */}
            <div className="hidden lg:flex items-center gap-6">
              {(Object.keys(MEGA_MENU_DATA) as MenuKey[]).map((key) => (
                <div
                  key={key}
                  onMouseEnter={() => handleMenuEnter(key)}
                  onMouseLeave={handleMenuLeave}
                  className="relative"
                >
                  <Link
                    href={key === "produse" ? "/produse" : "/academie"}
                    className={`font-body text-xs font-semibold uppercase tracking-[0.2em] py-7 transition-colors ${
                      activeMenu === key ? "text-pink" : "text-dark hover:text-pink"
                    }`}
                  >
                    {MEGA_MENU_DATA[key].label}
                  </Link>
                </div>
              ))}
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-dark hover:text-pink transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
            <Image
              src="https://emmanails.ro/wp-content/uploads/2025/04/logo3.45.png"
              alt="Emma Nails"
              width={140}
              height={50}
              className="h-10 lg:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right: Account + Cart */}
          <div className="flex items-center gap-4">
            {/* Account icon */}
            <Link
              href={session ? "/cont" : "/cont/autentificare"}
              className="p-2 text-dark hover:text-pink transition-colors"
              aria-label="Cont"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-dark hover:text-pink transition-colors relative"
              aria-label="Coș"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center min-w-[18px] h-[18px]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── MEGA MENU DROPDOWN ─── */}
      {activeMenu && (
        <div
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={handleMenuLeave}
          className="hidden lg:block absolute left-0 right-0 bg-white border-b border-neutral-100 shadow-xl z-40 animate-fadeIn"
        >
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="grid grid-cols-12 gap-8">
              {/* Link columns */}
              <div className="col-span-8 grid grid-cols-2 gap-8">
                {MEGA_MENU_DATA[activeMenu].columns.map((col) => (
                  <div key={col.title}>
                    <h3 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-dark mb-4">
                      {col.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setActiveMenu(null)}
                            className="font-body text-sm text-neutral-600 hover:text-pink hover:translate-x-1 transition-all inline-block"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured product card */}
              <div className="col-span-4">
                <Link
                  href={MEGA_MENU_DATA[activeMenu].featured.href}
                  onClick={() => setActiveMenu(null)}
                  className="group block relative bg-nude/30 rounded-2xl overflow-hidden aspect-[4/3]"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <Image
                      src={MEGA_MENU_DATA[activeMenu].featured.imageUrl}
                      alt={MEGA_MENU_DATA[activeMenu].featured.product}
                      width={300}
                      height={300}
                      className="object-contain max-h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-pink bg-white/90 px-3 py-1 rounded-full">
                      {MEGA_MENU_DATA[activeMenu].featured.title}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-display text-base font-bold text-dark">
                      {MEGA_MENU_DATA[activeMenu].featured.product}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MOBILE MENU ─── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {(Object.keys(MEGA_MENU_DATA) as MenuKey[]).map((key) => (
              <div key={key}>
                <Link
                  href={key === "produse" ? "/produse" : "/academie"}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-lg font-bold uppercase tracking-wider text-dark hover:text-pink transition-colors"
                >
                  {MEGA_MENU_DATA[key].label}
                </Link>
                <div className="mt-3 ml-3 space-y-4">
                  {MEGA_MENU_DATA[key].columns.map((col) => (
                    <div key={col.title}>
                      <p className="font-body text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                        {col.title}
                      </p>
                      <ul className="space-y-1.5">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileOpen(false)}
                              className="font-body text-sm text-neutral-600 hover:text-pink transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-display text-lg font-bold uppercase tracking-wider text-dark hover:text-pink transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-100">
              <Link
                href={session ? "/cont" : "/cont/autentificare"}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 font-body text-sm font-medium text-dark hover:text-pink transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {session ? `Contul meu (${session.user.name || session.user.email})` : "Autentificare / Înregistrare"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
