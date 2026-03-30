import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AnnouncementBar } from "@/components/AnnouncementBar";

export const metadata: Metadata = {
  title: {
    default: "Emma Nails — Produse Profesionale & Academie de Manichiură",
    template: "%s | Emma Nails",
  },
  description:
    "Produse profesionale pentru unghii și cursuri acreditate de manichiură și pedichiură. Polygel Emma Nails, instrumente premium și academie cu peste 15 ani de experiență. Iași, România.",
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
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
