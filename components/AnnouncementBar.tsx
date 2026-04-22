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
        // Rose silver: cool, light pinkish-silver. Mid stop is almost porcelain
        // white with a faint rose flush; edges deepen into a desaturated mauve
        // so the band reads as silver-with-rose-undertone, not pink.
        background:
          "linear-gradient(90deg, #c9b8bc 0%, #ddccd0 22%, #efe1e4 50%, #ddccd0 78%, #c9b8bc 100%)",
        color: "#3a2a2d",
      }}
    >
      <div className="animate-marquee flex whitespace-nowrap py-2.5">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="mx-6 text-[11px] font-body font-semibold uppercase tracking-widest"
            style={{
              // Faint white halo lifts the dark mauve type off the silver mid-tone.
              textShadow: "0 1px 0 rgba(255,255,255,0.45)",
            }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
