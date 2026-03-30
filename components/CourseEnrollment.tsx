"use client";

import { useState } from "react";
import { formatPriceRange } from "@/lib/utils";

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

export function CourseEnrollment({ course }: CourseEnrollmentProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [accreditation, setAccreditation] = useState<"acreditat" | "neacreditat" | "">("");
  const [payment, setPayment] = useState<"avans" | "integral" | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isComplete =
    selectedDate !== "" &&
    payment !== "" &&
    (!course.hasAccreditation || accreditation !== "");

  const handleEnroll = async () => {
    if (!isComplete) {
      setError("Selectează toate opțiunile înainte de a continua.");
      return;
    }

    setLoading(true);
    setError("");

    // Build WhatsApp message with selections
    const parts = [
      `Bună! Aș dori să mă înscriu la cursul: ${course.name}`,
      `Data: ${selectedDate}`,
      course.hasAccreditation ? `Tip: ${accreditation === "acreditat" ? "Acreditat" : "Neacreditat"}` : null,
      `Plată: ${payment === "avans" ? "Avans" : "Integrală"}`,
    ].filter(Boolean);

    const message = parts.join("\n");
    const whatsappUrl = `https://wa.me/40747906311?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      {/* Date selection */}
      <div>
        <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark/50 mb-2">
          Alege data cursului *
        </label>
        <select
          value={selectedDate}
          onChange={(e) => { setSelectedDate(e.target.value); setError(""); }}
          className="w-full px-4 py-3 rounded-sm border border-dark-100 font-body text-sm focus:outline-none focus:border-pink transition-colors bg-white"
        >
          <option value="">Selectează o dată</option>
          {course.dates.map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
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
          {[
            { value: "avans" as const, label: "Plătesc avans", desc: "Rezervă locul cu avans" },
            { value: "integral" as const, label: "Plătesc integral", desc: "Plata completă acum" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setPayment(opt.value); setError(""); }}
              className={`p-3 rounded-sm border-2 text-left transition-all ${
                payment === opt.value
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

      {/* Price */}
      <div className="border-t border-dark-100 pt-4">
        <p className="font-body text-xs text-dark/40 uppercase tracking-wider mb-1">Investiție</p>
        <p className="font-display text-2xl font-semibold text-dark">
          {formatPriceRange(course.priceFrom, course.priceTo)}
        </p>
        <p className="font-body text-xs text-dark/40 mt-1">Prețul variază în funcție de opțiunile alese</p>
      </div>

      {/* Error */}
      {error && (
        <p className="font-body text-xs text-red-500">{error}</p>
      )}

      {/* CTA */}
      <button
        onClick={handleEnroll}
        disabled={loading}
        className={`w-full text-center font-body text-xs font-semibold uppercase tracking-[0.2em] py-3.5 rounded-full transition-all ${
          isComplete
            ? "bg-pink text-white hover:bg-dark"
            : "bg-dark-100 text-dark/30 cursor-not-allowed"
        }`}
      >
        {loading ? "Se procesează..." : "Înscrie-te acum"}
      </button>

      <a
        href={`https://wa.me/40747906311?text=${encodeURIComponent(`Bună! Aș dori informații despre cursul: ${course.name}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center btn-secondary"
      >
        Cere informații
      </a>
    </div>
  );
}
