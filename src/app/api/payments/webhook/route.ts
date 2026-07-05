import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaymentWebhookSignature } from "@/lib/payments";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-payment-signature");

  if (!verifyPaymentWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const externalId = payload.externalId;
  const status = payload.status;

  const payment = await prisma.paymentIntent.findFirst({ where: { externalId } });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  if (status === "paid" && payment.status !== "PAID") {
    await prisma.$transaction([
      prisma.paymentIntent.update({
        where: { id: payment.id },
        data: { status: "PAID", rawPayload: payload }
      }),
      prisma.user.update({
        where: { id: payment.userId },
        data: { balance: { increment: payment.amount } }
      })
    ]);
  }

  return NextResponse.json({ ok: true });
}
