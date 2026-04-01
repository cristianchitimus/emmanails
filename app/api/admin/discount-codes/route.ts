import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const codes = await prisma.discountCode.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(codes);
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { code, type, value, minOrderValue, maxUses, expiresAt } = body;

  if (!code || !type || value === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const discount = await prisma.discountCode.create({
    data: {
      code: code.toUpperCase(),
      type,
      value: parseInt(value),
      minOrderValue: minOrderValue ? parseInt(minOrderValue) : null,
      maxUses: maxUses ? parseInt(maxUses) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      active: true,
    },
  });

  return NextResponse.json(discount);
}
