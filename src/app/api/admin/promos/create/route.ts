import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const form = await req.formData();

  const promo = await prisma.promoCode.create({
    data: {
      code: String(form.get("code")).trim().toUpperCase(),
      amount: Number(form.get("amount")),
      maxUses: Number(form.get("maxUses"))
    }
  });

  await prisma.adminAction.create({
    data: {
      adminUserId: session.userId,
      action: "PROMO_CREATE",
      targetType: "PromoCode",
      targetId: promo.id,
      metadata: { code: promo.code, amount: promo.amount, maxUses: promo.maxUses }
    }
  });

  const referer = req.headers.get("referer") || "/admin/promos";
  return NextResponse.redirect(new URL(referer, req.url), 303);
}
