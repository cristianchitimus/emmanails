import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "Codul de discount este obligatoriu" },
        { status: 400 }
      );
    }

    const discount = await prisma.discountCode.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!discount) {
      return NextResponse.json(
        { error: "Codul de discount nu este valid" },
        { status: 404 }
      );
    }

    if (!discount.active) {
      return NextResponse.json(
        { error: "Acest cod de discount nu mai este activ" },
        { status: 400 }
      );
    }

    if (discount.expiresAt && discount.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Acest cod de discount a expirat" },
        { status: 400 }
      );
    }

    if (discount.maxUses && discount.usedCount >= discount.maxUses) {
      return NextResponse.json(
        { error: "Acest cod de discount a atins limita de utilizări" },
        { status: 400 }
      );
    }

    if (discount.minOrderValue && subtotal < discount.minOrderValue) {
      const minLei = (discount.minOrderValue / 100).toFixed(0);
      return NextResponse.json(
        { error: `Comanda minimă pentru acest cod este ${minLei} lei` },
        { status: 400 }
      );
    }

    // Calculate discount amount
    let discountAmount: number;
    if (discount.type === "percentage") {
      discountAmount = Math.round((subtotal * discount.value) / 100);
    } else {
      discountAmount = Math.min(discount.value, subtotal);
    }

    return NextResponse.json({
      valid: true,
      code: discount.code,
      type: discount.type,
      value: discount.value,
      discountAmount,
      label:
        discount.type === "percentage"
          ? `-${discount.value}%`
          : `-${(discount.value / 100).toFixed(0)} lei`,
    });
  } catch (error) {
    console.error("Discount validation error:", error);
    return NextResponse.json(
      { error: "Eroare la validarea codului" },
      { status: 500 }
    );
  }
}
