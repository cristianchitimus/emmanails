"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/hooks/useCart";

const SHOP_COLUMNS = [
  {
    title: "Trenduri",
    links: [
      { label: "Noutati", href: "/produse" },
      { label: "Best sellers", href: "/produse" },
      { label: "Seturi profesionale", href: "/produse?categorie=produsele-amme" },
    ],
  },
  {
    title: "Produse",
    links: [
      { label: "Polygel", href: "/produse?categorie=polygel" },
      { label: "Baza rubber", href: "/produse?categorie=baza-rubber" },
      { label: "Geluri UV", href: "/produse?categorie=geluri-uv" },
      { label: "Top coat", href: "/produse?categorie=top-coat" },
    ],
  },
  {
    title: "Instrumente",
    links: [
      { label: "Instrumente manichiura", href: "/produse?categorie=instrumente" },
      { label: "Pile & buffere", href: "/produse?categorie=pile-buffere" },
      { label: "Pedichiura", href: "/produse?categorie=produse-pedichiura" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Noutati", href: "/produse" },
  { label: "Academie", href: "/academie" },
  { label: "Despre", href: "/despre" },
  { label: "Contact", href: "/contact" },
];

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-4.35-4.35m1.1-5.4a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A18 18 0 0 1 12 21.75c-2.68 0-5.22-.58-7.5-1.65Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.36-2 1.26 12c.07.67-.45 1.25-1.12 1.25H4.25c-.67 0-1.19-.58-1.12-1.25l1.26-12A1.13 1.13 0 0 1 5.51 7.5h12.98c.58 0 1.06.43 1.12 1Z" />
    </svg>
  );
}

export function Navbar() {
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const close = () => setShopOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  const openShop = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShopOpen(true);
  };

  const closeShopSoon = () => {
    timeoutRef.current = setTimeout(() => setShopOpen(false), 160);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/90 backdrop-blur-xl">
      <div className="shop-container">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[76px]">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="p-2 text-dark"
              aria-label="Meniu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            <div onMouseEnter={openShop} onMouseLeave={closeShopSoon}>
              <Link
                href="/produse"
                className={`shop-link py-7 ${shopOpen ? "text-pink" : ""}`}
              >
                Produse
              </Link>
            </div>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="shop-link py-7">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="justify-self-center" aria-label="Emma Nails">
            <Image
              src="/uploads/site-logo3.45.png"
              alt="Emma Nails"
              width={150}
              height={54}
              className="h-10 w-auto object-contain lg:h-12"
              priority
            />
          </Link>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <Link href="/produse" className="p-2 text-dark hover:text-pink transition-colors" aria-label="Cauta">
              <SearchIcon />
            </Link>
            <Link
              href={session ? "/cont" : "/cont/autentificare"}
              className="p-2 text-dark hover:text-pink transition-colors"
              aria-label="Cont"
            >
              <AccountIcon />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-dark hover:text-pink transition-colors"
              aria-label="Cos"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-dark px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {shopOpen && (
        <div
          onMouseEnter={openShop}
          onMouseLeave={closeShopSoon}
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-neutral-100 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
        >
          <div className="shop-container py-9">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8 grid grid-cols-3 gap-8">
                {SHOP_COLUMNS.map((column) => (
                  <div key={column.title}>
                    <p className="mb-4 font-body text-[11px] font-semibold uppercase text-dark" style={{ letterSpacing: "0.16em" }}>
                      {column.title}
                    </p>
                    <ul className="space-y-2.5">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setShopOpen(false)}
                            className="font-body text-sm text-dark-400 hover:text-pink transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Link
                href="/produse?categorie=polygel"
                onClick={() => setShopOpen(false)}
                className="group col-span-4 grid grid-cols-[120px_1fr] gap-5 rounded border border-neutral-100 bg-white p-4 shadow-[0_18px_45px_rgba(20,20,20,0.05)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="premium-product-frame relative aspect-square overflow-hidden rounded">
                  <Image
                    src="/uploads/al-pink-luna.jpeg"
                    alt="Best seller Emma Nails"
                    fill
                    className="premium-product-image object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="120px"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="mb-2 font-body text-[10px] font-semibold uppercase text-pink" style={{ letterSpacing: "0.16em" }}>
                    Best seller
                  </span>
                  <p className="font-body text-base font-semibold leading-snug text-dark">
                    Produse profesionale Emma Nails
                  </p>
                  <span className="mt-4 shop-link">Vezi gama</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white">
          <div className="shop-container py-5">
            <div className="grid gap-4">
              <Link href="/produse" onClick={() => setMobileOpen(false)} className="shop-link">
                Produse
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="shop-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-5">
              {SHOP_COLUMNS.flatMap((column) => column.links).slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded bg-neutral-50 px-3 py-2 font-body text-sm text-dark-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
