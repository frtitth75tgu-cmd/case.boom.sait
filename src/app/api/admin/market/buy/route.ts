import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { config } from "@/lib/config";
import { createMarketAutoBuyRequest } from "@/lib/market";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await req.formData();
  const itemName = String(form.get("itemName") || "").trim();
  const maxPrice = Number(form.get("maxPrice"));

  if (!itemName || !Number.isInteger(maxPrice) || maxPrice < 1) {
    return NextResponse.redirect(new URL("/admin/market?error=invalid", req.url), 303);
  }

  if (maxPrice > config.marketMaxItemPriceRub) {
    return NextResponse.redirect(new URL("/admin/market?error=max_price", req.url), 303);
  }

  const result = await createMarketAutoBuyRequest({ itemName, maxPrice });

  await prisma.marketPurchase.create({
    data: {
      provider: config.marketProvider,
      status: result.status,
      itemName,
      itemPrice: maxPrice,
      maxPrice,
      externalId: result.externalId,
      createdById: session.userId,
      payload: {
        message: result.message,
        autoBuyEnabled: config.marketAutoBuyEnabled
      }
    }
  });

  await prisma.adminAction.create({
    data: {
      adminUserId: session.userId,
      action: "MARKET_BUY_REQUEST",
      targetType: "MarketPurchase",
      metadata: { itemName, maxPrice, result }
    }
  });

  return NextResponse.redirect(new URL("/admin/market", req.url), 303);
}
