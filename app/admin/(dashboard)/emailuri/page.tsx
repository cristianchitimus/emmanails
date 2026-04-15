"use client";

import { useState, useEffect, useCallback } from "react";

interface Customer {
  email: string;
  name: string;
  phone: string | null;
  sources: string[];
  totalSpent: number;
  orderCount: number;
  courseCount: number;
  lastActivity: string;
}

interface Campaign {
  id: string;
  name: string;
  subject: string;
  template: string;
  segment: string;
  sentCount: number;
  failedCount: number;
  status: string;
  createdAt: string;
  sentAt: string | null;
}

interface Stats {
  total: number;
  orders: number;
  courses: number;
  registered: number;
}

const TEMPLATES = [
  { id: "reengagement", label: "Re-engagement", description: "Invită clienții vechi să revină cu un cod de reducere", icon: "💌" },
  { id: "new_products", label: "Produse noi", description: "Anunță colecția nouă de produse", icon: "✨" },
  { id: "course_promo", label: "Promovare cursuri", description: "Promovează locurile disponibile la cursuri", icon: "🎓" },
  { id: "discount", label: "Ofertă specială", description: "Trimite un cod de reducere sau ofertă", icon: "🎁" },
  { id: "custom", label: "Email personalizat", description: "Scrie propriul conținut de email", icon: "✍️" },
];

const SEGMENTS = [
  { id: "all", label: "Toți clienții", icon: "👥" },
  { id: "orders", label: "Clienți cu comenzi", icon: "📦" },
  { id: "courses", label: "Cursanți", icon: "🎓" },
  { id: "registered", label: "Conturi create", icon: "👤" },
];

const TEMPLATE_LABELS: Record<string, string> = {
  reengagement: "Re-engagement",
  new_products: "Produse noi",
  course_promo: "Promovare cursuri",
  discount: "Ofertă specială",
  custom: "Personalizat",
};

const SEGMENT_LABELS: Record<string, string> = {
  all: "Toți",
  orders: "Comenzi",
  courses: "Cursanți",
  registered: "Conturi",
};

function formatPrice(bani: number) {
  return `${(bani / 100).toLocaleString("ro-RO")} lei`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Azi";
  if (days === 1) return "Ieri";
  if (days < 30) return `Acum ${days} zile`;
  const months = Math.floor(days / 30);
  return `Acum ${months} lun${months === 1 ? "ă" : "i"}`;
}

export default function EmailuriPage() {
  const [tab, setTab] = useState<"send" | "customers" | "history">("send");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, orders: 0, courses: 0, registered: 0 });
  const [loading, setLoading] = useState(true);

  // Send form state
  const [selectedTemplate, setSelectedTemplate] = useState("reengagement");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [campaignName, setCampaignName] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [customBody, setCustomBody] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; sentCount: number; failedCount: number } | null>(null);

  // Customer search
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [custRes, campRes] = await Promise.all([
        fetch("/api/admin/customers"),
        fetch("/api/admin/campaigns"),
      ]);
      const custData = await custRes.json();
      const campData = await campRes.json();
      setCustomers(custData.customers || []);
      setStats(custData.stats || { total: 0, orders: 0, courses: 0, registered: 0 });
      setCampaigns(campData.campaigns || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSend = async () => {
    if (!campaignName.trim()) {
      alert("Adaugă un nume pentru campanie");
      return;
    }

    const segmentLabel = SEGMENTS.find((s) => s.id === selectedSegment)?.label || selectedSegment;
    const count = selectedSegment === "all" ? stats.total
      : selectedSegment === "orders" ? stats.orders
      : selectedSegment === "courses" ? stats.courses
      : stats.registered;

    if (!confirm(`Trimiți emailul "${campaignName}" către ${count} destinatar${count !== 1 ? "i" : ""} (${segmentLabel})?`)) {
      return;
    }

    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaignName,
          template: selectedTemplate,
          segment: selectedSegment,
          customSubject: customSubject || undefined,
          customBody: customBody || undefined,
          discountText: discountText || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSendResult({ success: true, sentCount: data.sentCount, failedCount: data.failedCount });
        setCampaignName("");
        setCustomSubject("");
        setCustomBody("");
        setDiscountText("");
        fetchData();
      } else {
        alert(data.error || "Eroare la trimitere");
      }
    } catch {
      alert("Eroare de rețea");
    }
    setSending(false);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark">Emailuri & Campanii</h1>
          <p className="font-body text-sm text-dark-400 mt-1">Trimite emailuri automate către foștii clienți</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total contacte", value: stats.total, icon: "👥", color: "bg-blue-50 text-blue-600" },
          { label: "Cu comenzi", value: stats.orders, icon: "📦", color: "bg-green-50 text-green-600" },
          { label: "Cursanți", value: stats.courses, icon: "🎓", color: "bg-purple-50 text-purple-600" },
          { label: "Conturi create", value: stats.registered, icon: "👤", color: "bg-orange-50 text-orange-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-neutral-100">
            <div className="flex items-center gap-3">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${s.color}`}>{s.icon}</span>
              <div>
                <p className="font-display text-2xl font-bold text-dark">{loading ? "—" : s.value}</p>
                <p className="font-body text-xs text-dark-400">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 mb-8 w-fit">
        {([
          { id: "send", label: "Trimite email", icon: "📤" },
          { id: "customers", label: "Contacte", icon: "👥" },
          { id: "history", label: "Istoric", icon: "📋" },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${
              tab === t.id ? "bg-white text-dark shadow-sm" : "text-dark-400 hover:text-dark"
            }`}
          >
            <span className="mr-1.5">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Send Campaign ── */}
      {tab === "send" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Campaign name */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-2">
                Nume campanie *
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="ex: Ofertă mai 2026, Re-engagement aprilie..."
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none"
              />
            </div>

            {/* Template selection */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-4">
                Alege template-ul
              </label>
              <div className="space-y-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all ${
                      selectedTemplate === t.id
                        ? "border-pink bg-pink/5"
                        : "border-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{t.icon}</span>
                      <div>
                        <p className="font-body text-sm font-semibold text-dark">{t.label}</p>
                        <p className="font-body text-xs text-dark-400">{t.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template-specific fields */}
            {selectedTemplate === "discount" && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-2">
                  Text ofertă (apare în email)
                </label>
                <input
                  type="text"
                  value={discountText}
                  onChange={(e) => setDiscountText(e.target.value)}
                  placeholder="ex: 15% REDUCERE cu codul VARA15"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none"
                />
              </div>
            )}

            {selectedTemplate === "custom" && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-4">
                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-2">
                    Subiect email
                  </label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="Subiectul emailului..."
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-2">
                    Conținut email (HTML)
                  </label>
                  <textarea
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    rows={6}
                    placeholder="<p>Bună! Avem vești noi...</p>"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none resize-y"
                  />
                  <p className="font-body text-xs text-dark-300 mt-1">Poți folosi HTML. Salutarea &quot;Bună [Nume]!&quot; se adaugă automat.</p>
                </div>
              </div>
            )}

            {/* Custom subject override for non-custom templates */}
            {selectedTemplate !== "custom" && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-2">
                  Subiect personalizat (opțional)
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Lasă gol pentru subiectul implicit al template-ului"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none"
                />
              </div>
            )}
          </div>

          {/* Right: Segment + Send */}
          <div className="space-y-6">
            {/* Segment selection */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <label className="block font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-4">
                Către cine trimiți?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SEGMENTS.map((s) => {
                  const count =
                    s.id === "all" ? stats.total
                    : s.id === "orders" ? stats.orders
                    : s.id === "courses" ? stats.courses
                    : stats.registered;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSegment(s.id)}
                      className={`text-left px-4 py-4 rounded-xl border-2 transition-all ${
                        selectedSegment === s.id
                          ? "border-pink bg-pink/5"
                          : "border-neutral-100 hover:border-neutral-200"
                      }`}
                    >
                      <span className="text-2xl block mb-1">{s.icon}</span>
                      <p className="font-body text-sm font-semibold text-dark">{s.label}</p>
                      <p className="font-body text-xs text-dark-400">{loading ? "..." : count} contacte</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview summary */}
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 border-dashed">
              <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-dark-400 mb-3">Rezumat campanie</h3>
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-400">Template:</span>
                  <span className="font-medium text-dark">{TEMPLATES.find((t) => t.id === selectedTemplate)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Segment:</span>
                  <span className="font-medium text-dark">{SEGMENTS.find((s) => s.id === selectedSegment)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Destinatari:</span>
                  <span className="font-medium text-dark">
                    {selectedSegment === "all" ? stats.total
                      : selectedSegment === "orders" ? stats.orders
                      : selectedSegment === "courses" ? stats.courses
                      : stats.registered}
                  </span>
                </div>
              </div>
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={sending || !campaignName.trim()}
              className={`w-full py-4 rounded-xl font-body text-sm font-semibold uppercase tracking-wider transition-all ${
                sending || !campaignName.trim()
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "bg-pink text-white hover:bg-pink-600 active:scale-[0.98]"
              }`}
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Se trimit emailurile...
                </span>
              ) : (
                "📤 Trimite campania"
              )}
            </button>

            {/* Send result */}
            {sendResult && (
              <div className={`rounded-xl p-4 ${sendResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className={`font-body text-sm font-semibold ${sendResult.success ? "text-green-700" : "text-red-700"}`}>
                  {sendResult.success ? "✅ Campanie trimisă cu succes!" : "❌ Eroare la trimitere"}
                </p>
                <p className="font-body text-xs text-dark-400 mt-1">
                  {sendResult.sentCount} trimise · {sendResult.failedCount} eșuate
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: Customers ── */}
      {tab === "customers" && (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-neutral-100">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Caută după email sau nume..."
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl font-body text-sm focus:ring-2 focus:ring-pink/20 focus:border-pink outline-none"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Nume</th>
                  <th className="text-left px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Email</th>
                  <th className="text-left px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Surse</th>
                  <th className="text-right px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Comenzi</th>
                  <th className="text-right px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Cheltuit</th>
                  <th className="text-right px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Ultima activitate</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 font-body text-sm text-dark-400">Se încarcă...</td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 font-body text-sm text-dark-400">
                      {search ? "Niciun rezultat" : "Nu există contacte încă"}
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((c, i) => (
                    <tr key={i} className="border-b border-neutral-50 hover:bg-neutral-50/50">
                      <td className="px-6 py-3.5">
                        <p className="font-body text-sm font-medium text-dark">{c.name}</p>
                        {c.phone && <p className="font-body text-xs text-dark-300">{c.phone}</p>}
                      </td>
                      <td className="px-6 py-3.5 font-body text-sm text-dark-400">{c.email}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex gap-1.5">
                          {c.sources.includes("orders") && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-600">📦 Comenzi</span>
                          )}
                          {c.sources.includes("courses") && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-600">🎓 Cursuri</span>
                          )}
                          {c.sources.includes("registered") && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600">👤 Cont</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-right font-body text-sm text-dark">{c.orderCount || "—"}</td>
                      <td className="px-6 py-3.5 text-right font-body text-sm text-dark">{c.totalSpent > 0 ? formatPrice(c.totalSpent) : "—"}</td>
                      <td className="px-6 py-3.5 text-right font-body text-xs text-dark-400">{timeAgo(c.lastActivity)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && (
            <div className="p-4 border-t border-neutral-100 font-body text-xs text-dark-400">
              {filteredCustomers.length} contacte{search ? ` (filtrate din ${customers.length})` : ""}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: Campaign History ── */}
      {tab === "history" && (
        <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100">
                  <th className="text-left px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Campanie</th>
                  <th className="text-left px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Template</th>
                  <th className="text-left px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Segment</th>
                  <th className="text-center px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Trimise</th>
                  <th className="text-center px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Eșuate</th>
                  <th className="text-center px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Status</th>
                  <th className="text-right px-6 py-3 font-body text-[10px] font-semibold uppercase tracking-wider text-dark-400">Dată</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 font-body text-sm text-dark-400">Se încarcă...</td>
                  </tr>
                ) : campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 font-body text-sm text-dark-400">
                      Nu ai trimis încă nicio campanie
                    </td>
                  </tr>
                ) : (
                  campaigns.map((c) => (
                    <tr key={c.id} className="border-b border-neutral-50 hover:bg-neutral-50/50">
                      <td className="px-6 py-3.5">
                        <p className="font-body text-sm font-medium text-dark">{c.name}</p>
                        <p className="font-body text-xs text-dark-300 truncate max-w-[200px]">{c.subject}</p>
                      </td>
                      <td className="px-6 py-3.5 font-body text-xs text-dark-400">{TEMPLATE_LABELS[c.template] || c.template}</td>
                      <td className="px-6 py-3.5 font-body text-xs text-dark-400">{SEGMENT_LABELS[c.segment] || c.segment}</td>
                      <td className="px-6 py-3.5 text-center font-body text-sm font-semibold text-green-600">{c.sentCount}</td>
                      <td className="px-6 py-3.5 text-center font-body text-sm font-semibold text-red-500">{c.failedCount || "—"}</td>
                      <td className="px-6 py-3.5 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold ${
                          c.status === "sent" ? "bg-green-50 text-green-600"
                          : c.status === "sending" ? "bg-yellow-50 text-yellow-600"
                          : c.status === "failed" ? "bg-red-50 text-red-600"
                          : "bg-neutral-100 text-dark-400"
                        }`}>
                          {c.status === "sent" ? "Trimis" : c.status === "sending" ? "Se trimite..." : c.status === "failed" ? "Eșuat" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right font-body text-xs text-dark-400">
                        {c.sentAt ? new Date(c.sentAt).toLocaleDateString("ro-RO") : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
