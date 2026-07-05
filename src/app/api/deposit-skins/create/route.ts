import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";

function isSteamTradeUrl(url: string) {
  return url.startsWith("https://steamcommunity.com/tradeoffer/new/");
}

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  if (!config.skinDepositEnabled) {
    return NextResponse.redirect(new URL("/deposit-skins?error=disabled", req.url), 303);
  }

  const form = await req.formData();
  const tradeUrl = String(form.get("tradeUrl") || "").trim();
  const itemsText = String(form.get("itemsText") || "").trim();

  if (!isSteamTradeUrl(tradeUrl) || itemsText.length < 3) {
    await prisma.accountPenalty.create({
      data: {
        userId: session.userId,
        type: "INVALID_TRADE_LINK",
        reason: "Пользователь указал некорректную трейд-ссылку при заявке на пополнение скинами.",
        level: 1
      }
    }).catch(() => null);

    return NextResponse.redirect(new URL("/deposit-skins?error=invalid_trade_url", req.url), 303);
  }

  await prisma.skinDeposit.create({
    data: {
      userId: session.userId,
      tradeUrl,
      itemsText,
      status: "PENDING",
      payload: {
        userAgent: req.headers.get("user-agent") || "",
        ip: req.headers.get("x-forwarded-for") || ""
      }
    }
  });

  await prisma.notification.create({
    data: {
      userId: session.userId,
      title: "Заявка на пополнение скинами создана",
      message: "Администратор проверит предметы и начислит Boom Coins после подтверждения трейда.",
      type: "SKIN_DEPOSIT"
    }
  }).catch(() => null);

  return NextResponse.redirect(new URL("/deposit-skins?success=1", req.url), 303);
}
