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
    <div
      className="overflow-hidden text-white"
      style={{
        // Rose gold band: deep rose → warm gold highlight in the middle → back.
        // The 5-stop gradient gives it depth instead of looking like one flat colour.
        background:
          "linear-gradient(90deg, #9c5563 0%, #b76e79 22%, #d4a574 50%, #b76e79 78%, #9c5563 100%)",
      }}
    >
      <div className="animate-marquee flex whitespace-nowrap py-2.5">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="mx-6 text-[11px] font-body font-medium uppercase tracking-widest"
            style={{
              // Subtle dark shadow for legibility on the lighter midpoint of the gradient.
              textShadow: "0 1px 2px rgba(80, 30, 40, 0.35)",
            }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
