import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const code = await prisma.discountCode.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(code);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.discountCode.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
