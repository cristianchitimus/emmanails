import { whatsappLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează Emma Nails pentru comenzi, informații despre cursuri sau orice întrebare. WhatsApp, email și telefon.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3">Contact</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-dark leading-tight">
            Hai să <span className="italic text-pink">vorbim</span>
          </h1>
          <p className="font-body text-base text-dark-400 mt-3 max-w-xl">
            Fie că ai întrebări despre produse, cursuri sau dorești să te
            programezi, sunt aici pentru tine.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <a
              href={whatsappLink("Bună! Am o întrebare.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white border border-dark-100 rounded-sm p-8 text-center hover:border-pink/40 hover:shadow-lg transition-all card-hover"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-medium mb-1 group-hover:text-pink transition-colors">
                WhatsApp
              </h3>
              <p className="font-body text-sm text-dark-400">
                Cel mai rapid mod de a mă contacta
              </p>
              <p className="font-body text-sm font-medium text-dark mt-3">
                +40 747 906 311
              </p>
            </a>

            {/* Phone */}
            <a
              href="tel:+40747906311"
              className="group block bg-white border border-dark-100 rounded-sm p-8 text-center hover:border-pink/40 hover:shadow-lg transition-all card-hover"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-medium mb-1 group-hover:text-pink transition-colors">
                Telefon
              </h3>
              <p className="font-body text-sm text-dark-400">
                Sună-mă direct
              </p>
              <p className="font-body text-sm font-medium text-dark mt-3">
                +40 747 906 311
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:raileanu.emma@yahoo.com"
              className="group block bg-white border border-dark-100 rounded-sm p-8 text-center hover:border-pink/40 hover:shadow-lg transition-all card-hover"
            >
              <div className="w-14 h-14 bg-pink-50 rounded-full mx-auto flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors">
                <svg
                  className="w-6 h-6 text-pink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-medium mb-1 group-hover:text-pink transition-colors">
                Email
              </h3>
              <p className="font-body text-sm text-dark-400">
                Scrie-mi un email
              </p>
              <p className="font-body text-sm font-medium text-dark mt-3">
                raileanu.emma@yahoo.com
              </p>
            </a>
          </div>

          {/* Location */}
          <div className="mt-12 bg-dark rounded-sm p-8 md:p-12 text-center text-white">
            <h3 className="font-display text-2xl font-medium mb-3">
              Locație
            </h3>
            <p className="font-body text-base text-dark-300 mb-2">
              Iași, România
            </p>
            <p className="font-body text-sm text-dark-400 max-w-md mx-auto">
              Cursurile se desfășoară la locația din Iași. Pentru adresa exactă
              și programare, contactează-mă pe WhatsApp.
            </p>
            <div className="mt-6">
              <a
                href="https://www.facebook.com/emmanailinstructor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-dark-300 hover:text-pink transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook — Emma Nail Instructor
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
