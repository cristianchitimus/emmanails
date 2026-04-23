"use client";

import { useState, useEffect } from "react";
import { formatPriceRange } from "@/lib/utils";

interface Session {
  id: string;
  dateLabel: string;
  maxSpots: number;
  spotsLeft: number;
  full: boolean;
}

interface CourseEnrollmentProps {
  course: {
    id: string;
    slug: string;
    name: string;
    priceFrom: number;
    priceTo: number;
    dates: string[];
    hasAccreditation: boolean;
  };
}

function formatPrice(bani: number) {
  return `${(bani / 100).toFixed(0)} lei`;
}

export function CourseEnrollment({ course }: CourseEnrollmentProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [accreditation, setAccreditation] = useState<"acreditat" | "neacreditat" | "">("");
  const [payment, setPayment] = useState<"avans" | "integral" | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);

  // Check for success/cancel from Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("enrolled") === "success") {
      setError(""); // clear any error
    }
  }, []);

  // Fetch available sessions
  useEffect(() => {
    fetch(`/api/courses/${course.slug}/sessions`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSessions(data);
      })
      .finally(() => setLoadingSessions(false));
  }, [course.slug]);

  const selectedSession = sessions.find((s) => s.id === selectedSessionId);
  const price = payment === "integral" ? course.priceTo : payment === "avans" ? course.priceFrom : null;

  const isComplete =
    selectedSessionId !== "" &&
    payment !== "" &&
    name.trim() !== "" &&
    email.trim() !== "" &&
    (!course.hasAccreditation || accreditation !== "");

  const handleEnroll = async () => {
    if (!isComplete) {
      setError("Completează toate câmpurile obligatorii.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          accreditation: accreditation || null,
          paymentType: payment,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Eroare la procesarea înscrierii");
      }
    } catch {
      setError("Eroare de conexiune. Încearcă din nou.");
    }

    setLoading(false);
  };

  // Success state
  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("enrolled") === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
        <span className="text-4xl">🎉</span>
        <h3 className="font-display text-xl font-medium text-emerald-800">Înscriere confirmată!</h3>
        <p className="font-body text-sm text-emerald-600">Plata a fost procesată cu succes. Vei primi un email cu detaliile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Session selection */}
      <div>
        <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark/50 mb-2">
          Alege perioada *
        </label>
        {loadingSessions ? (
          <div className="animate-pulse h-12 bg-neutral-100 rounded-sm" />
        ) : sessions.length === 0 ? (
          <p className="font-body text-sm text-dark-400">Nu sunt sesiuni disponibile momentan.</p>
        ) : (
          <div className="space-y-2">
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => { if (!s.full) { setSelectedSessionId(s.id); setError(""); } }}
                disabled={s.full}
                className={`w-full flex items-center justify-between p-3 rounded-sm border-2 text-left transition-all ${
                  s.full
                    ? "border-neutral-200 bg-neutral-50 opacity-50 cursor-not-allowed"
                    : selectedSessionId === s.id
                    ? "border-pink bg-pink/5"
                    : "border-dark-100 hover:border-dark-200"
                }`}
              >
                <span className="font-body text-sm font-semibold">{s.dateLabel}</span>
                {s.full && (
                  <span className="font-body text-xs text-red-500 font-semibold">
                    COMPLET
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Accreditation — only if course has it */}
      {course.hasAccreditation && (
        <div>
          <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark/50 mb-2">
            Tip curs *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: "acreditat" as const, label: "Acreditat", desc: "Cu diplomă acreditată" },
              { value: "neacreditat" as const, label: "Neacreditat", desc: "Fără acreditare" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setAccreditation(opt.value); setError(""); }}
                className={`p-3 rounded-sm border-2 text-left transition-all ${
                  accreditation === opt.value
                    ? "border-pink bg-pink/5"
                    : "border-dark-100 hover:border-dark-200"
                }`}
              >
                <span className="font-body text-sm font-semibold block">{opt.label}</span>
                <span className="font-body text-[11px] text-dark/40">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Payment type */}
      <div>
        <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark/50 mb-2">
          Modalitate de plată *
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => { setPayment("avans"); setError(""); }}
            className={`p-3 rounded-sm border-2 text-left transition-all ${
              payment === "avans" ? "border-pink bg-pink/5" : "border-dark-100 hover:border-dark-200"
            }`}
          >
            <span className="font-body text-sm font-semibold block">Plătesc avans</span>
            <span className="font-body text-[11px] text-dark/40">Rezervă locul acum</span>
            <span className="font-display text-lg font-semibold text-pink block mt-1">{formatPrice(course.priceFrom)}</span>
          </button>
          <button
            onClick={() => { setPayment("integral"); setError(""); }}
            className={`p-3 rounded-sm border-2 text-left transition-all ${
              payment === "integral" ? "border-pink bg-pink/5" : "border-dark-100 hover:border-dark-200"
            }`}
          >
            <span className="font-body text-sm font-semibold block">Plătesc integral</span>
            <span className="font-body text-[11px] text-dark/40">Plata completă acum</span>
            <span className="font-display text-lg font-semibold text-dark block mt-1">{formatPrice(course.priceTo)}</span>
          </button>
        </div>
      </div>

      {/* Personal info */}
      <div className="border-t border-dark-100 pt-4 space-y-3">
        <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark/50">
          Datele tale
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Nume complet *"
          className="w-full px-4 py-3 rounded-sm border border-dark-100 font-body text-sm focus:outline-none focus:border-pink transition-colors" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          className="w-full px-4 py-3 rounded-sm border border-dark-100 font-body text-sm focus:outline-none focus:border-pink transition-colors" />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefon (opțional)"
          className="w-full px-4 py-3 rounded-sm border border-dark-100 font-body text-sm focus:outline-none focus:border-pink transition-colors" />
      </div>

      {/* Price summary */}
      {price && (
        <div className="border-t border-dark-100 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-body text-xs text-dark/40 uppercase tracking-wider">De plată acum</p>
              <p className="font-display text-2xl font-semibold text-pink">{formatPrice(price)}</p>
            </div>
            {payment === "avans" && (
              <div className="text-right">
                <p className="font-body text-[10px] text-dark/40 uppercase tracking-wider">Rest de plată</p>
                <p className="font-body text-sm text-dark-400">{formatPrice(course.priceTo - course.priceFrom)}</p>
              </div>
            )}
          </div>
          {selectedSession && (
            <p className="font-body text-xs text-dark/40 mt-2">
              📅 {selectedSession.dateLabel}
            </p>
          )}
        </div>
      )}

      {/* Error */}
      {error && <p className="font-body text-xs text-red-500">{error}</p>}

      {/* CTA */}
      <button
        onClick={handleEnroll}
        disabled={loading || !isComplete}
        className={`w-full text-center font-body text-xs font-semibold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all ${
          isComplete
            ? "bg-pink text-white hover:bg-dark"
            : "bg-dark-100 text-dark/30 cursor-not-allowed"
        }`}
      >
        {loading ? "Se procesează..." : payment === "avans" ? "Plătește avansul cu cardul" : "Plătește integral cu cardul"}
      </button>

      <a
        href={`https://wa.me/40747906311?text=${encodeURIComponent(`Bună! Aș dori informații despre cursul: ${course.name}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center btn-secondary"
      >
        Cere informații pe WhatsApp
      </a>
    </div>
  );
}
