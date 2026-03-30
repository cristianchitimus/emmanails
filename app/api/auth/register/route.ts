import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, phone } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email și parola sunt obligatorii" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Parola trebuie să aibă minim 6 caractere" },
        { status: 400 }
      );
    }

    const emailNormalized = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Există deja un cont cu acest email" },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: emailNormalized,
        name: name?.trim() || null,
        phone: phone?.trim() || null,
        passwordHash,
      },
    });

    return NextResponse.json(
      { message: "Cont creat cu succes", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Eroare la crearea contului" },
      { status: 500 }
    );
  }
}
