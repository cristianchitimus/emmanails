import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatPrice, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/utils";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/cont/autentificare");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cont" className="font-body text-xs text-neutral-500 hover:text-pink transition-colors uppercase tracking-wider">
            ← Contul meu
          </Link>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider mt-4">
            Comenzile <span className="text-pink">mele</span>
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
            <svg className="w-16 h-16 text-neutral-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h2 className="font-display text-xl font-bold mb-2">Nicio comandă încă</h2>
            <p className="font-body text-sm text-neutral-500 mb-6">Descoperă produsele noastre și plasează prima comandă!</p>
            <Link
              href="/produse"
              className="inline-block bg-pink text-white font-body text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-dark transition-colors"
            >
              Mergi la magazin
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/cont/comenzi/${order.id}`}
                className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-display text-base font-bold">{order.orderNumber}</p>
                      <span className={`inline-block font-body text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                        order.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                        order.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-neutral-100 text-neutral-600"
                      }`}>
                        {ORDER_STATUS_LABELS[order.status] || order.status}
                      </span>
                    </div>
                    <p className="font-body text-xs text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString("ro-RO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="font-body text-xs text-neutral-400 mt-1">
                      {order.items.length} produs{order.items.length > 1 ? "e" : ""} ·{" "}
                      {order.paymentMethod === "stripe" ? "Card" : "Ramburs"} ·{" "}
                      {PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-display text-xl font-bold">{formatPrice(order.total)}</p>
                    <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
