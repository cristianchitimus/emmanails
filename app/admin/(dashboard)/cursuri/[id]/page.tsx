"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Session {
  id: string;
  dateLabel: string;
  maxSpots: number;
  active: boolean;
  enrolled: number;
  spotsLeft: number;
}

interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  accreditation: string | null;
  paymentType: string;
  amountPaid: number;
  totalPrice: number;
  paymentStatus: string;
  status: string;
  createdAt: string;
  session: { dateLabel: string };
}

interface Course {
  id: string;
  name: string;
  priceFrom: number;
  priceTo: number;
  duration: string | null;
  hasAccreditation: boolean;
  sessions: Session[];
  totalEnrollments: number;
}

function formatPrice(bani: number) { return `${(bani / 100).toFixed(0)} lei`; }
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
const PAYMENT_COLORS: Record<string, string> = {
  pending: "text-yellow-600",
  paid: "text-green-600",
  failed: "text-red-600",
};

export default function AdminCourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSession, setNewSession] = useState({ dateLabel: "", maxSpots: "10" });
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [coursesRes, enrollRes] = await Promise.all([
      fetch("/api/admin/courses").then((r) => r.json()),
      fetch(`/api/admin/courses/${courseId}/enrollments`).then((r) => r.json()),
    ]);
    const found = coursesRes.find((c: Course) => c.id === courseId);
    setCourse(found || null);
    setEnrollments(enrollRes);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [courseId]);

  const addSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSession.dateLabel) return;
    setSaving(true);
    const res = await fetch(`/api/admin/courses/${courseId}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSession),
    });
    if (res.ok) {
      setNewSession({ dateLabel: "", maxSpots: "10" });
      setShowAddForm(false);
      await fetchData();
    }
    setSaving(false);
  };

  const toggleSession = async (sessionId: string, active: boolean) => {
    await fetch(`/api/admin/courses/${courseId}/sessions/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    await fetchData();
  };

  const deleteSession = async (sessionId: string) => {
    if (!confirm("Sigur vrei să ștergi această sesiune?")) return;
    const res = await fetch(`/api/admin/courses/${courseId}/sessions/${sessionId}`, { method: "DELETE" });
    if (res.ok) {
      await fetchData();
    } else {
      const data = await res.json();
      alert(data.error || "Eroare la ștergere");
    }
  };

  const updateMaxSpots = async (sessionId: string, maxSpots: number) => {
    await fetch(`/api/admin/courses/${courseId}/sessions/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ maxSpots }),
    });
    await fetchData();
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" /></div>;
  if (!course) return <p className="text-dark-400 p-8">Cursul nu a fost găsit.</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/cursuri" className="text-dark-400 hover:text-dark transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">{course.name}</h1>
          <p className="font-body text-sm text-dark-400 mt-1">
            Avans: <strong className="text-pink">{formatPrice(course.priceFrom)}</strong> · Integral: <strong>{formatPrice(course.priceTo)}</strong>
            {course.duration && ` · ${course.duration}`}
          </p>
        </div>
      </div>

      {/* Sessions management */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-neutral-100">
          <h2 className="font-display text-lg font-medium">Sesiuni / Perioade</h2>
          <button onClick={() => setShowAddForm(!showAddForm)}
            className="bg-pink text-white font-body text-[10px] font-semibold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-pink/90 transition-colors">
            {showAddForm ? "Anulează" : "+ Sesiune nouă"}
          </button>
        </div>

        {/* Add session form */}
        {showAddForm && (
          <form onSubmit={addSession} className="p-5 bg-pink/5 border-b border-neutral-100 flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1 block">Perioada *</label>
              <input type="text" value={newSession.dateLabel} onChange={(e) => setNewSession({ ...newSession, dateLabel: e.target.value })}
                placeholder="ex: 19-23 Ianuarie 2026" className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm" required />
            </div>
            <div className="w-24">
              <label className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-1 block">Locuri</label>
              <input type="number" value={newSession.maxSpots} onChange={(e) => setNewSession({ ...newSession, maxSpots: e.target.value })}
                min="1" className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl font-body text-sm" />
            </div>
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 bg-emerald-500 text-white font-body text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-emerald-600 disabled:opacity-50">
              {saving ? "..." : "Adaugă"}
            </button>
          </form>
        )}

        {/* Sessions list */}
        <div className="divide-y divide-neutral-50">
          {course.sessions.length === 0 ? (
            <p className="p-5 text-center font-body text-sm text-dark-300">Nicio sesiune creată.</p>
          ) : (
            course.sessions.map((s) => (
              <div key={s.id} className={`flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 ${!s.active ? "opacity-50" : ""}`}>
                <div className="flex items-center gap-3 flex-1">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    !s.active ? "bg-neutral-300" : s.spotsLeft <= 0 ? "bg-red-400" : s.spotsLeft <= 3 ? "bg-yellow-400" : "bg-emerald-400"
                  }`} />
                  <div>
                    <span className="font-body text-sm font-medium">{s.dateLabel}</span>
                    <span className={`ml-3 font-body text-xs ${s.spotsLeft <= 0 ? "text-red-500 font-semibold" : "text-dark-400"}`}>
                      {s.enrolled}/{s.maxSpots} înscrieri
                      {s.spotsLeft <= 0 && " — COMPLET"}
                      {s.spotsLeft > 0 && s.spotsLeft <= 3 && ` — ${s.spotsLeft} locuri rămase`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" value={s.maxSpots} min="1"
                    onChange={(e) => updateMaxSpots(s.id, parseInt(e.target.value) || 10)}
                    className="w-16 px-2 py-1.5 border border-neutral-200 rounded-lg text-xs font-body text-center" />
                  <span className="font-body text-[10px] text-dark-300">locuri</span>
                  <button onClick={() => toggleSession(s.id, s.active)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${s.active ? "bg-emerald-400" : "bg-neutral-300"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${s.active ? "left-5" : "left-0.5"}`} />
                  </button>
                  <button onClick={() => deleteSession(s.id)}
                    className="font-body text-[10px] font-semibold uppercase px-2 py-1.5 bg-red-50 text-red-400 rounded-lg hover:bg-red-100">×</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Enrollments table */}
      <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="font-display text-lg font-medium">Înscrieri ({enrollments.length})</h2>
        </div>

        {enrollments.length === 0 ? (
          <p className="p-8 text-center font-body text-sm text-dark-300">Nicio înscriere încă.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Cursant</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Sesiune</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Tip</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Plată</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Sumă</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Status</th>
                  <th className="text-left font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400 px-4 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e) => (
                  <tr key={e.id} className="border-b border-neutral-50 hover:bg-neutral-50/50">
                    <td className="px-4 py-3">
                      <p className="font-body text-sm font-medium">{e.name}</p>
                      <p className="font-body text-xs text-dark-400">{e.email}</p>
                      {e.phone && <p className="font-body text-[10px] text-dark-300">{e.phone}</p>}
                    </td>
                    <td className="px-4 py-3 font-body text-xs">{e.session.dateLabel}</td>
                    <td className="px-4 py-3 font-body text-xs">
                      {e.accreditation && <span className="block">{e.accreditation === "acreditat" ? "Acreditat" : "Neacreditat"}</span>}
                      <span className={e.paymentType === "integral" ? "font-semibold" : ""}>{e.paymentType === "avans" ? "Avans" : "Integral"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-body text-xs font-semibold ${PAYMENT_COLORS[e.paymentStatus] || ""}`}>
                        {e.paymentStatus === "paid" ? "Plătit" : e.paymentStatus === "pending" ? "Neplătit" : "Eșuat"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-body text-sm font-semibold">{formatPrice(e.amountPaid)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block font-body text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${STATUS_COLORS[e.status] || "bg-neutral-100"}`}>
                        {e.status === "pending" ? "În așteptare" : e.status === "confirmed" ? "Confirmat" : "Anulat"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-body text-xs text-dark-400">{formatDate(e.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
