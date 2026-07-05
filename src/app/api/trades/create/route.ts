import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { createTradeOffer } from "@/lib/tradeBot";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const tradeUrl = String(form.get("tradeUrl") || "");
  const itemId = String(form.get("itemId") || "");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  const item = await prisma.inventoryItem.findFirst({ where: { id: itemId, userId: session.userId, isLocked: false } });

  if (!user || !item || !tradeUrl.includes("steamcommunity.com/tradeoffer/new")) {
    return NextResponse.redirect(new URL("/trades?error=invalid", req.url), 303);
  }

  const offer = await createTradeOffer({
    steamId: user.steamId,
    tradeUrl,
    items: [{ name: item.name, price: item.price }]
  });

  await prisma.$transaction([
    prisma.inventoryItem.update({ where: { id: item.id }, data: { isLocked: true } }),
    prisma.tradeOffer.create({
      data: {
        userId: user.id,
        type: "WITHDRAW",
        status: offer.ok ? "SENT" : "CREATED",
        tradeUrl,
        externalId: offer.externalId,
        payload: { itemId: item.id, message: offer.message }
      }
    })
  ]);

  return NextResponse.redirect(new URL("/trades", req.url), 303);
}
