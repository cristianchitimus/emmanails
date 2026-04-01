import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, name, email, phone, accreditation, paymentType } = body;

    if (!sessionId || !name || !email || !paymentType) {
      return NextResponse.json({ error: "Câmpuri obligatorii lipsă" }, { status: 400 });
    }

    // Get session with course and enrollment count
    const session = await prisma.courseSession.findUnique({
      where: { id: sessionId },
      include: {
        course: true,
        _count: { select: { enrollments: { where: { status: { not: "cancelled" } } } } },
      },
    });

    if (!session || !session.active) {
      return NextResponse.json({ error: "Sesiunea nu este disponibilă" }, { status: 400 });
    }

    // Check spots
    const spotsUsed = session._count.enrollments;
    if (spotsUsed >= session.maxSpots) {
      return NextResponse.json({ error: "Nu mai sunt locuri disponibile pentru această sesiune" }, { status: 400 });
    }

    const course = session.course;
    const amount = paymentType === "avans" ? course.priceFrom : course.priceTo;
    const totalPrice = course.priceTo;

    const paymentLabel = paymentType === "avans"
      ? `Avans — ${course.name} (${session.dateLabel})`
      : `Plată integrală — ${course.name} (${session.dateLabel})`;

    // Create Stripe checkout session
    const stripe = getStripe();
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: {
        type: "course_enrollment",
        courseId: course.id,
        sessionId: session.id,
        paymentType,
        accreditation: accreditation || "",
        name,
        phone: phone || "",
      },
      line_items: [{
        price_data: {
          currency: "ron",
          product_data: {
            name: paymentLabel,
            description: `${course.name} — ${session.dateLabel}${accreditation ? ` (${accreditation})` : ""}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/academie/${course.slug}?enrolled=success&session=${session.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/academie/${course.slug}?enrolled=cancel`,
    });

    // Create enrollment record
    await prisma.courseEnrollment.create({
      data: {
        sessionId: session.id,
        name,
        email,
        phone: phone || null,
        accreditation: accreditation || null,
        paymentType,
        amountPaid: amount,
        totalPrice,
        paymentStatus: "pending",
        stripeSessionId: stripeSession.id,
        status: "pending",
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error: any) {
    console.error("Course enrollment error:", error);
    return NextResponse.json({ error: "Eroare la procesarea înscrierii" }, { status: 500 });
  }
}
