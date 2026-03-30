import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hash, compare } from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Trebuie să fii autentificat" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, phone, currentPassword, newPassword } = body;

    const updateData: any = {};

    if (name !== undefined) updateData.name = name.trim() || null;
    if (phone !== undefined) updateData.phone = phone.trim() || null;

    // Password change
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Parola curentă este obligatorie" },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Utilizator negăsit" },
          { status: 404 }
        );
      }

      const isValid = await compare(currentPassword, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: "Parola curentă este incorectă" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Parola nouă trebuie să aibă minim 6 caractere" },
          { status: 400 }
        );
      }

      updateData.passwordHash = await hash(newPassword, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: { id: true, email: true, name: true, phone: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Eroare la actualizarea profilului" },
      { status: 500 }
    );
  }
}
