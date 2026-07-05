import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const form = await req.formData();
  const id = String(form.get("id"));
  const promo = await prisma.promoCode.findUnique({ where: { id } });
  if (promo) await prisma.promoCode.update({ where: { id }, data: { isActive: !promo.isActive } });
  return NextResponse.redirect(new URL("/admin/promos", req.url), 303);
}
