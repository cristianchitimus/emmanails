"use client";

export function AnnouncementBar() {
  const messages = [
    "LIVRARE GRATUITĂ PENTRU COMENZI PESTE 200 LEI",
    "★",
    "CURSURI ACREDITATE CU DIPLOMĂ",
    "★",
    "POLYGEL EMMA NAILS — FORMULĂ ORIGINALĂ",
    "★",
    "PESTE 15 ANI DE EXPERIENȚĂ",
    "★",
  ];

  const repeated = [...messages, ...messages];

  return (
    <div className="bg-dark text-white overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap py-2.5">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="mx-6 text-[11px] font-body font-medium uppercase tracking-widest"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
