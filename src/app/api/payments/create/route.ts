import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { config } from "@/lib/config";
import { createDemoPaymentUrl } from "@/lib/payments";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const amount = Number(form.get("amount"));

  if (!Number.isInteger(amount) || amount < 50 || amount > 15000) {
    return NextResponse.redirect(new URL("/balance?error=amount", req.url), 303);
  }

  const payment = await prisma.paymentIntent.create({
    data: {
      userId: session.userId,
      provider: config.paymentProvider,
      amount,
      status: "CREATED_DEMO",
      externalId: `demo_${Date.now()}`,
      comment: "Демо-платеж. Реальное списание не выполняется."
    }
  });

  return NextResponse.redirect(new URL(createDemoPaymentUrl(payment.id), req.url), 303);
}
