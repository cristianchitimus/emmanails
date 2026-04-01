import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sendOrderStatusEmail } from "@/lib/email";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: { include: { product: true } }, user: true },
  });

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { status, paymentStatus } = body;

  const data: Record<string, string> = {};
  if (status) data.status = status;
  if (paymentStatus) data.paymentStatus = paymentStatus;

  const order = await prisma.order.update({
    where: { id: params.id },
    data,
    include: { items: true },
  });

  // Send status change email to customer (non-blocking)
  if (status) {
    sendOrderStatusEmail(order.email, order.name, order.orderNumber, status).catch(() => {});
  }

  return NextResponse.json(order);
}
