import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { CartProvider } from "@/hooks/useCart";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Emma Nails — Produse Profesionale & Academie",
  description:
    "Polygel Emma Nails, instrumente premium și academie cu peste 15 ani de experiență. Iași, România.",
  other: {
    "color-scheme": "light only",
  },
  keywords: [
    "emma nails",
    "polygel",
    "cursuri manichiura",
    "cursuri pedichiura",
    "instrumente manichiura",
    "iasi",
    "academie unghii",
  ],
  openGraph: {
    title: "Emma Nails — Produse Profesionale & Academie",
    description:
      "Produse profesionale pentru unghii și cursuri acreditate de manichiură și pedichiură în Iași.",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <CartProvider>
            <div data-site-chrome>
              <AnnouncementBar />
              <Navbar />
            </div>
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
