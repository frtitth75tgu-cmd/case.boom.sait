import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const codeText = String(form.get("code") || "").trim().toUpperCase();
  const code = await prisma.promoCode.findUnique({ where: { code: codeText } });

  if (!code || !code.isActive || code.usedCount >= code.maxUses) {
    return NextResponse.redirect(new URL("/promocode?error=invalid", req.url), 303);
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: session.userId }, data: { balance: { increment: code.amount } } }),
    prisma.promoCode.update({ where: { id: code.id }, data: { usedCount: { increment: 1 } } })
  ]);

  await prisma.notification.create({
    data: { userId: session.userId, title: "Промокод активирован", message: `Начислено ${code.amount} Boom Coins.`, type: "PROMOCODE" }
  }).catch(() => null);

  return NextResponse.redirect(new URL("/profile?promo=success", req.url), 303);
}
