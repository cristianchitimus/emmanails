import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileClient } from "./ProfileClient";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/cont/autentificare");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, phone: true, createdAt: true },
  });

  if (!user) redirect("/cont/autentificare");

  const recentOrders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <ProfileClient
      user={JSON.parse(JSON.stringify(user))}
      recentOrders={JSON.parse(JSON.stringify(recentOrders))}
    />
  );
}
