import Link from "next/link";
import Image from "next/image";
import { whatsappLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre Emma",
  description: "Emma — nail instructor cu peste 15 ani de experiență. Iași, România.",
};

const EMMA_PORTRAIT = "/uploads/site-image.jpg";
const WORK_PHOTOS = [
  "/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
  "/uploads/academy-WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
  "/uploads/academy-WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg",
];

export default function DesprePage() {
  return (
    <>
      {/* Full-width hero split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
        <div className="relative h-[60vh] lg:h-auto overflow-hidden">
          <Image src={EMMA_PORTRAIT} alt="Emma — nail instructor" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" priority />
        </div>
        <div className="flex items-center bg-nude-200 px-8 md:px-16 lg:px-20 py-16 md:py-20">
          <div className="max-w-lg">
            <p className="section-label mb-4">Despre Emma</p>
            <h1 className="font-display text-3xl md:text-4xl font-medium leading-tight">
              Pasiune, <span className="italic text-pink">dedicare</span> și excelență
            </h1>
            <p className="font-body text-base text-dark-500 leading-relaxed mt-6">
              Sunt Emma, nail instructor și fondatoarea Emma Nails. Am descoperit pasiunea pentru manichiură acum peste 15 ani și de atunci nu m-am mai oprit din învățat și din format noi profesioniști.
            </p>
            <div className="flex gap-8 mt-8">
              {[
                { num: "15+", label: "Ani experiență" },
                { num: "500+", label: "Cursante formate" },
              ].map((s, i) => (
                <div key={i}>
                  <span className="font-display text-3xl font-bold text-pink">{s.num}</span>
                  <p className="font-body text-xs text-dark-400 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="font-display text-3xl md:text-4xl font-medium">Povestea <span className="italic text-pink">mea</span></h2>
          <p className="font-body text-base text-dark-500 leading-relaxed">
            Am început această călătorie din dorința de a oferi servicii de manichiură și pedichiură la cel mai înalt standard. De-a lungul anilor, am participat la zeci de cursuri internaționale, perfecționându-mi constant tehnicile.
          </p>
          <p className="font-body text-base text-dark-500 leading-relaxed">
            Am fondat Emma Nails Academy — un spațiu dedicat formării de noi profesioniști. Astăzi, sute de cursante lucrează cu succes în saloane din toată România.
          </p>
          <p className="font-body text-base text-dark-500 leading-relaxed">
            Gama de produse Emma Nails — în special Polygel-ul cu formulă originală — a fost dezvoltată pe baza nevoilor reale din salon. Fiecare produs este testat extensiv pentru calitate maximă.
          </p>
        </div>
      </section>

      {/* Work gallery */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WORK_PHOTOS.map((img, i) => (
              <div key={i} className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image src={img} alt={`Lucrare Emma ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-dark text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-center mb-14">
            Ce mă <span className="italic text-pink">definește</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {[
              { title: "Calitate fără compromis", text: "Fiecare produs și fiecare curs reflectă cele mai înalte standarde profesionale." },
              { title: "Educație practică", text: "Cursurile mele sunt centrate pe practică. Fiecare cursantă lucrează pe model real." },
              { title: "Suport continuu", text: "Relația cu cursantele mele nu se termină la finalul cursului. Ofer consultanță continuă." },
            ].map((v, i) => (
              <div key={i} className="space-y-3">
                <div className="w-10 h-10 bg-pink/20 rounded-sm flex items-center justify-center">
                  <span className="font-display text-lg text-pink font-bold">{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-medium">{v.title}</h3>
                <p className="font-body text-sm text-dark-300 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Hai să <span className="italic text-pink">colaborăm</span></h2>
          <p className="font-body text-base text-dark-500 mb-8 max-w-lg mx-auto">
            Fie că ești interesată de produse sau de cursuri, sunt aici să te ajut.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/produse" className="btn-secondary">Produse</Link>
            <Link href="/academie" className="btn-primary">Cursuri</Link>
            <a href={whatsappLink("Bună! Aș dori să discutăm.")} target="_blank" rel="noopener noreferrer" className="btn-pink">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
