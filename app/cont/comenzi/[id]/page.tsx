import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatPrice, ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/cont/autentificare");
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  const statusSteps = ["pending", "processing", "shipped", "delivered"];
  const currentStepIndex = statusSteps.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cont/comenzi" className="font-body text-xs text-neutral-500 hover:text-pink transition-colors uppercase tracking-wider">
            ← Toate comenzile
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <h1 className="font-display text-2xl lg:text-3xl font-bold uppercase tracking-wider">
              {order.orderNumber}
            </h1>
            <span className={`inline-block font-body text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
              order.status === "delivered" ? "bg-green-100 text-green-700" :
              order.status === "shipped" ? "bg-blue-100 text-blue-700" :
              order.status === "processing" ? "bg-yellow-100 text-yellow-700" :
              order.status === "cancelled" ? "bg-red-100 text-red-700" :
              "bg-neutral-100 text-neutral-600"
            }`}>
              {ORDER_STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <p className="font-body text-sm text-neutral-500 mt-1">
            Plasată pe {new Date(order.createdAt).toLocaleDateString("ro-RO", {
              year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
            })}
          </p>
        </div>

        {/* Status tracker */}
        {!isCancelled && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between relative">
              {/* Progress bar */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-neutral-200">
                <div
                  className="h-full bg-pink transition-all duration-500"
                  style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                />
              </div>

              {statusSteps.map((step, i) => (
                <div key={step} className="relative flex flex-col items-center z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= currentStepIndex
                      ? "bg-pink text-white"
                      : "bg-neutral-200 text-neutral-400"
                  }`}>
                    {i < currentStepIndex ? "✓" : i + 1}
                  </div>
                  <p className={`font-body text-[10px] uppercase tracking-wider mt-2 ${
                    i <= currentStepIndex ? "text-dark font-semibold" : "text-neutral-400"
                  }`}>
                    {ORDER_STATUS_LABELS[step]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-4">Produse</h2>
            <ul className="space-y-3">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-2 border-b border-neutral-50 last:border-0">
                  <div className="w-12 h-12 bg-nude/30 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-pink text-xs font-display font-bold">EN</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm truncate">{item.name}</p>
                    <p className="font-body text-xs text-neutral-500">×{item.quantity}</p>
                  </div>
                  <p className="font-body text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1">
              <div className="flex justify-between font-body text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between font-body text-sm text-green-600">
                  <span>Discount {order.discountCode && `(${order.discountCode})`}</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-body text-sm">
                <span className="text-neutral-500">Livrare</span>
                <span>{order.shipping === 0 ? "Gratuită" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between font-display text-lg font-bold pt-2 border-t border-neutral-100">
                <span>Total</span>
                <span className="text-pink">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-4">Livrare</h2>
              <div className="space-y-1 font-body text-sm">
                <p className="font-semibold">{order.name}</p>
                <p className="text-neutral-600">{order.address}</p>
                <p className="text-neutral-600">{order.city}, {order.county} {order.postalCode}</p>
                {order.phone && <p className="text-neutral-600">{order.phone}</p>}
                <p className="text-neutral-600">{order.email}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold uppercase tracking-wider mb-4">Plată</h2>
              <div className="space-y-1 font-body text-sm">
                <p>{order.paymentMethod === "stripe" ? "Card bancar (Stripe)" : "Ramburs (plata la livrare)"}</p>
                <p className="text-neutral-500">
                  Status: {PAYMENT_STATUS_LABELS[order.paymentStatus] || order.paymentStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
