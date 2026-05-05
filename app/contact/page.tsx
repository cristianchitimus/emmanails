import { whatsappLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacteaza Emma Nails pentru comenzi, informatii despre cursuri sau recomandari.",
};

const contactCards = [
  {
    title: "WhatsApp",
    text: "Cel mai rapid mod de contact",
    value: "+40 747 906 311",
    href: whatsappLink("Buna! Am o intrebare."),
  },
  {
    title: "Telefon",
    text: "Pentru comenzi si cursuri",
    value: "+40 747 906 311",
    href: "tel:+40747906311",
  },
  {
    title: "Email",
    text: "Scrie-ne oricand",
    value: "raileanu.emma@yahoo.com",
    href: "mailto:raileanu.emma@yahoo.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-10 md:py-14">
        <div className="shop-container">
          <p className="section-label mb-3">Contact</p>
          <h1 className="shop-title">Hai sa vorbim</h1>
          <p className="shop-copy mt-3 max-w-2xl">
            Pentru produse, cursuri, inscrieri sau recomandari, ne poti contacta rapid pe WhatsApp, telefon sau email.
          </p>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="shop-card p-6 transition-colors hover:border-dark"
              >
                <p className="font-body text-[11px] font-semibold uppercase text-dark-300" style={{ letterSpacing: "0.14em" }}>
                  {card.title}
                </p>
                <h2 className="mt-4 font-body text-lg font-semibold text-dark">{card.value}</h2>
                <p className="mt-2 font-body text-sm text-dark-400">{card.text}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded border border-neutral-100 bg-neutral-50 p-6 md:p-8">
              <p className="section-label mb-3">Locatie</p>
              <h2 className="font-display text-2xl font-semibold text-dark">Iasi, Romania</h2>
              <p className="shop-copy mt-4">
                Cursurile se desfasoara la locatia din Iasi. Pentru adresa exacta si programare, contacteaza-ne pe WhatsApp.
              </p>
            </div>
            <div className="rounded border border-neutral-100 bg-neutral-50 p-6 md:p-8">
              <p className="section-label mb-3">Programari</p>
              <h2 className="font-display text-2xl font-semibold text-dark">Produse si cursuri</h2>
              <p className="shop-copy mt-4">
                Te ajutam sa alegi produsele potrivite sau cursul potrivit nivelului tau.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
