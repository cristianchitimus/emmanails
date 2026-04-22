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
      className="overflow-hidden"
      style={{
        // Match the page panel palette (#fdf6f3 / #ffffff / #f5e8e5) so the
        // bar reads as part of the page background rather than as a separate
        // band. Subtle horizontal variation keeps it from looking like a
        // flat strip.
        background:
          "linear-gradient(90deg, #f5e8e5 0%, #fdf6f3 25%, #ffffff 50%, #fdf6f3 75%, #f5e8e5 100%)",
        color: "#3a2a2d",
      }}
    >
      <div className="animate-marquee flex whitespace-nowrap py-2.5">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="mx-6 text-[11px] font-body font-semibold uppercase tracking-widest"
            style={{
              // Faint white halo softens the dark mauve type on the cream wash.
              textShadow: "0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
