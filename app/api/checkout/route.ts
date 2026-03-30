import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe, calculateShipping } from "@/lib/stripe";
import { generateOrderNumber } from "@/lib/utils";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const {
      items,
      paymentMethod,
      discountCode,
      discountAmount,
      name,
      email,
      phone,
      address,
      city,
      county,
      postalCode,
    } = body as {
      items: CheckoutItem[];
      paymentMethod: "stripe" | "ramburs";
      discountCode?: string;
      discountAmount?: number;
      name: string;
      email: string;
      phone?: string;
      address: string;
      city: string;
      county: string;
      postalCode?: string;
    };

    // Validate required fields
    if (!items?.length || !paymentMethod || !name || !email || !address || !city || !county) {
      return NextResponse.json(
        { error: "Toate câmpurile obligatorii trebuie completate" },
        { status: 400 }
      );
    }

    // Verify products exist and get current prices
    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, inStock: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: "Unele produse nu sunt disponibile" },
        { status: 400 }
      );
    }

    // Calculate totals with verified prices
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return sum;
      const price = product.salePrice ?? product.price;
      return sum + price * item.quantity;
    }, 0);

    const shipping = calculateShipping(subtotal);
    const discount = discountAmount && discountAmount > 0 ? discountAmount : 0;
    const total = Math.max(subtotal - discount + shipping, 0);

    // Validate discount code if provided
    if (discountCode && discount > 0) {
      const dc = await prisma.discountCode.findUnique({
        where: { code: discountCode },
      });
      if (!dc || !dc.active) {
        return NextResponse.json(
          { error: "Codul de discount nu este valid" },
          { status: 400 }
        );
      }
      // Increment usage
      await prisma.discountCode.update({
        where: { code: discountCode },
        data: { usedCount: { increment: 1 } },
      });
    }

    const orderNumber = generateOrderNumber();

    // Build order items data
    const orderItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.id)!;
      return {
        productId: product.id,
        name: product.name,
        price: product.salePrice ?? product.price,
        quantity: item.quantity,
      };
    });

    if (paymentMethod === "stripe") {
      // Create Stripe Checkout Session
      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: email,
        metadata: {
          orderNumber,
          userId: session?.user?.id || "",
          discountCode: discountCode || "",
        },
        line_items: items.map((item) => {
          const product = products.find((p) => p.id === item.id)!;
          const unitPrice = product.salePrice ?? product.price;
          return {
            price_data: {
              currency: "ron",
              product_data: {
                name: product.name,
                ...(product.imageUrl ? { images: [product.imageUrl] } : {}),
              },
              unit_amount: unitPrice,
            },
            quantity: item.quantity,
          };
        }),
        ...(shipping > 0
          ? {
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: "fixed_amount" as const,
                    fixed_amount: { amount: shipping, currency: "ron" },
                    display_name: "Livrare standard",
                    delivery_estimate: {
                      minimum: { unit: "business_day" as const, value: 2 },
                      maximum: { unit: "business_day" as const, value: 5 },
                    },
                  },
                },
              ],
            }
          : {
              shipping_options: [
                {
                  shipping_rate_data: {
                    type: "fixed_amount" as const,
                    fixed_amount: { amount: 0, currency: "ron" },
                    display_name: "Livrare gratuită",
                  },
                },
              ],
            }),
        ...(discount > 0
          ? {
              discounts: [
                {
                  coupon: await stripe.coupons
                    .create({
                      amount_off: discount,
                      currency: "ron",
                      duration: "once",
                      name: discountCode || "Discount",
                    })
                    .then((c) => c.id),
                },
              ],
            }
          : {}),
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${orderNumber}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      });

      // Create order in DB
      await prisma.order.create({
        data: {
          orderNumber,
          userId: session?.user?.id || null,
          email,
          name,
          phone: phone || null,
          address,
          city,
          county,
          postalCode: postalCode || null,
          paymentMethod: "stripe",
          paymentStatus: "pending",
          stripeSessionId: stripeSession.id,
          subtotal,
          discount,
          discountCode: discountCode || null,
          shipping,
          total,
          status: "pending",
          items: { create: orderItemsData },
        },
      });

      return NextResponse.json({ url: stripeSession.url });
    } else {
      // Cash on delivery (ramburs)
      const order = await prisma.order.create({
        data: {
          orderNumber,
          userId: session?.user?.id || null,
          email,
          name,
          phone: phone || null,
          address,
          city,
          county,
          postalCode: postalCode || null,
          paymentMethod: "ramburs",
          paymentStatus: "pending",
          subtotal,
          discount,
          discountCode: discountCode || null,
          shipping,
          total,
          status: "pending",
          items: { create: orderItemsData },
        },
      });

      return NextResponse.json({
        success: true,
        orderNumber: order.orderNumber,
        redirectUrl: `/checkout/success?order=${order.orderNumber}`,
      });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Eroare la procesarea comenzii" },
      { status: 500 }
    );
  }
}
