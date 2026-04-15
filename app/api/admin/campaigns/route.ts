import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCampaignEmail, sendCampaignEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

// GET — list all campaigns
export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const campaigns = await prisma.emailCampaign.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ campaigns });
}

// POST — create and send a campaign
export async function POST(req: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    name,
    template,
    segment,
    customSubject,
    customBody,
    discountText,
  } = body as {
    name: string;
    template: string;
    segment: string;
    customSubject?: string;
    customBody?: string;
    discountText?: string;
  };

  if (!name || !template || !segment) {
    return NextResponse.json(
      { error: "Completează toate câmpurile obligatorii" },
      { status: 400 }
    );
  }

  // Collect recipients based on segment
  const recipientMap = new Map<string, string>(); // email -> name

  if (segment === "all" || segment === "orders") {
    const orders = await prisma.order.findMany({
      select: { email: true, name: true },
      distinct: ["email"],
    });
    for (const o of orders) {
      recipientMap.set(o.email.toLowerCase(), o.name);
    }
  }

  if (segment === "all" || segment === "courses") {
    const enrollments = await prisma.courseEnrollment.findMany({
      select: { email: true, name: true },
      distinct: ["email"],
    });
    for (const e of enrollments) {
      if (!recipientMap.has(e.email.toLowerCase())) {
        recipientMap.set(e.email.toLowerCase(), e.name);
      }
    }
  }

  if (segment === "all" || segment === "registered") {
    const users = await prisma.user.findMany({
      select: { email: true, name: true },
    });
    for (const u of users) {
      if (!recipientMap.has(u.email.toLowerCase())) {
        recipientMap.set(u.email.toLowerCase(), u.name || "Client");
      }
    }
  }

  const recipients = Array.from(recipientMap.entries());

  if (recipients.length === 0) {
    return NextResponse.json(
      { error: "Nu există destinatari pentru acest segment" },
      { status: 400 }
    );
  }

  // Create campaign record
  const campaign = await prisma.emailCampaign.create({
    data: {
      name,
      subject: customSubject || getCampaignEmail(template, "").subject,
      template,
      segment,
      bodyHtml: customBody || null,
      status: "sending",
    },
  });

  // Send emails (fire-and-forget for each, but we await all)
  let sentCount = 0;
  let failedCount = 0;

  // Send in batches of 5 to avoid rate limits
  const BATCH_SIZE = 5;
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(([email, recipientName]) => {
        const extra = template === "discount" ? discountText : customBody;
        const { subject, html } = getCampaignEmail(template, recipientName, extra);
        const finalSubject = customSubject || subject;
        return sendCampaignEmail(email, finalSubject, html);
      })
    );

    for (const ok of results) {
      if (ok) sentCount++;
      else failedCount++;
    }

    // Small delay between batches
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // Update campaign record
  await prisma.emailCampaign.update({
    where: { id: campaign.id },
    data: {
      sentCount,
      failedCount,
      status: failedCount === recipients.length ? "failed" : "sent",
      sentAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    campaignId: campaign.id,
    sentCount,
    failedCount,
    totalRecipients: recipients.length,
  });
}
