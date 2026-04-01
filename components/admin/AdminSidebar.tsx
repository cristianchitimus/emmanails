"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/comenzi", label: "Comenzi", icon: "📦" },
  { href: "/admin/produse", label: "Produse & Stocuri", icon: "🏷️" },
  { href: "/admin/cursuri", label: "Cursuri & Înscrieri", icon: "🎓" },
  { href: "/admin/coduri", label: "Coduri Reducere", icon: "🎟️" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 border-b border-pink/10">
        <Link href="/" className="block">
          <h1 className="font-display text-xl font-medium text-dark">Emma Nails</h1>
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-pink font-semibold mt-0.5">Admin Panel</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all ${
              isActive(item.href)
                ? "bg-pink/10 text-pink font-semibold"
                : "text-dark-400 hover:bg-neutral-100 hover:text-dark"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-100 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-xs text-dark-400 hover:bg-neutral-100 transition-all"
        >
          <span>🌐</span> Vezi site-ul
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-xs text-red-500 hover:bg-red-50 transition-all w-full text-left"
        >
          <span>🚪</span> Deconectare
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg rounded-xl p-2.5"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {mobileOpen ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 5h14M3 10h14M3 15h14" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-100 z-40 transform transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {sidebar}
      </aside>
    </>
  );
}
