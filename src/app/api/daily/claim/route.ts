import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const last = await prisma.dailyBonusClaim.findFirst({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" }
  });

  if (last && Date.now() - last.createdAt.getTime() < 1000 * 60 * 60 * 20) {
    return NextResponse.redirect(new URL("/daily?error=already", req.url), 303);
  }

  const streak = last && Date.now() - last.createdAt.getTime() < 1000 * 60 * 60 * 48 ? last.streak + 1 : 1;
  const amount = Math.min(500, 50 + streak * 10);

  await prisma.$transaction([
    prisma.dailyBonusClaim.create({ data: { userId: session.userId, amount, streak } }),
    prisma.user.update({ where: { id: session.userId }, data: { balance: { increment: amount } } }),
    prisma.notification.create({
      data: {
        userId: session.userId,
        title: "Ежедневный бонус",
        message: `Начислено ${amount} ₽. Серия: ${streak}.`,
        type: "DAILY"
      }
    })
  ]);

  return NextResponse.redirect(new URL("/profile?daily=ok", req.url), 303);
}
