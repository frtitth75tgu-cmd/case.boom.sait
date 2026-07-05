import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const code = String(form.get("code") || "").trim().toUpperCase();

  const promo = await prisma.promoCode.findUnique({ where: { code } });
  if (!promo || !promo.isActive || promo.usedCount >= promo.maxUses) {
    return NextResponse.redirect(new URL("/promos?error=invalid", req.url), 303);
  }

  const existing = await prisma.promoRedemption.findUnique({
    where: { userId_promoCodeId: { userId: session.userId, promoCodeId: promo.id } }
  });

  if (existing) return NextResponse.redirect(new URL("/promos?error=used", req.url), 303);

  await prisma.$transaction([
    prisma.promoRedemption.create({ data: { userId: session.userId, promoCodeId: promo.id } }),
    prisma.promoCode.update({ where: { id: promo.id }, data: { usedCount: { increment: 1 } } }),
    prisma.user.update({ where: { id: session.userId }, data: { balance: { increment: promo.amount } } })
  ]);

  return NextResponse.redirect(new URL("/profile?promo=ok", req.url), 303);
}
