import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await req.formData();
  const depositId = String(form.get("depositId") || "");
  const action = String(form.get("action") || "");
  const estimatedValue = Number(form.get("estimatedValue") || 0);
  const creditedCoins = Number(form.get("creditedCoins") || 0);
  const adminComment = String(form.get("adminComment") || "").trim();

  const deposit = await prisma.skinDeposit.findUnique({ where: { id: depositId } });
  if (!deposit) return NextResponse.redirect(new URL("/admin/skin-deposits?error=not_found", req.url), 303);

  if (action === "APPROVE") {
    await prisma.$transaction([
      prisma.skinDeposit.update({
        where: { id: depositId },
        data: {
          status: "APPROVED",
          estimatedValue,
          creditedCoins,
          adminComment,
          reviewedById: session.userId
        }
      }),
      prisma.user.update({
        where: { id: deposit.userId },
        data: { balance: { increment: creditedCoins } }
      }),
      prisma.notification.create({
        data: {
          userId: deposit.userId,
          title: "Пополнение скинами подтверждено",
          message: `Начислено ${creditedCoins} Boom Coins.`,
          type: "SKIN_DEPOSIT_APPROVED"
        }
      }),
      prisma.adminAction.create({
        data: {
          adminUserId: session.userId,
          action: "SKIN_DEPOSIT_APPROVE",
          targetType: "SkinDeposit",
          targetId: depositId,
          metadata: { estimatedValue, creditedCoins, adminComment }
        }
      })
    ]);
  }

  if (action === "REJECT") {
    await prisma.$transaction([
      prisma.skinDeposit.update({
        where: { id: depositId },
        data: { status: "REJECTED", adminComment, reviewedById: session.userId }
      }),
      prisma.notification.create({
        data: {
          userId: deposit.userId,
          title: "Пополнение скинами отклонено",
          message: adminComment || "Заявка отклонена администратором.",
          type: "SKIN_DEPOSIT_REJECTED"
        }
      })
    ]);
  }

  if (action === "PENALTY") {
    await prisma.$transaction([
      prisma.skinDeposit.update({
        where: { id: depositId },
        data: { status: "PENALTY", adminComment: adminComment || "Нарушение правил трейда.", reviewedById: session.userId }
      }),
      prisma.accountPenalty.create({
        data: {
          userId: deposit.userId,
          type: "TRADE_ABUSE",
          reason: adminComment || "Отмена трейда, некорректная трейд-ссылка или попытка злоупотребления системой пополнения скинами.",
          level: 2
        }
      }),
      prisma.notification.create({
        data: {
          userId: deposit.userId,
          title: "Ограничение аккаунта",
          message: "По заявке на пополнение скинами применены санкции аккаунта. Подробности доступны в правилах сервиса.",
          type: "ACCOUNT_PENALTY"
        }
      })
    ]);
  }

  return NextResponse.redirect(new URL("/admin/skin-deposits", req.url), 303);
}
