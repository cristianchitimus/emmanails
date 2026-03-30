"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/produse", label: "Shop" },
    { href: "/academie", label: "Academie" },
    { href: "/despre", label: "Despre" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-dark-100/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -ml-2"
            aria-label="Meniu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop nav links — left */}
          <div className="hidden md:flex items-center gap-8">
            {links.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs font-medium uppercase tracking-widest text-dark hover:text-pink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo — center */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-display text-2xl md:text-3xl font-bold tracking-wide text-dark">
              EMMA
              <span className="text-pink"> NAILS</span>
            </span>
          </Link>

          {/* Desktop nav links — right + cart */}
          <div className="hidden md:flex items-center gap-8">
            {links.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs font-medium uppercase tracking-widest text-dark hover:text-pink transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 -mr-2 group"
              aria-label="Coș de cumpărături"
            >
              <svg
                className="w-5 h-5 group-hover:text-pink transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full min-w-[18px] min-h-[18px]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile cart button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden relative p-2 -mr-2"
            aria-label="Coș de cumpărături"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-pink text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full min-w-[18px] min-h-[18px]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-dark-100/50 bg-white">
          <div className="px-4 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-body text-sm font-medium uppercase tracking-widest text-dark hover:text-pink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
