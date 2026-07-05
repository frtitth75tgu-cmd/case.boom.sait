import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  await prisma.promoCode.create({
    data: {
      code: String(form.get("code") || "").trim().toUpperCase(),
      type: String(form.get("type") || "COINS"),
      amount: Number(form.get("amount") || 0),
      maxUses: Number(form.get("maxUses") || 1),
    }
  });

  return NextResponse.redirect(new URL("/admin/promocodes", req.url), 303);
}
