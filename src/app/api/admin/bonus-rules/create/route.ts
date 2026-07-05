import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  await prisma.bonusRule.create({
    data: {
      key: String(form.get("key") || "").trim(),
      title: String(form.get("title") || "").trim(),
      amount: Number(form.get("amount") || 0),
      cooldownHours: Number(form.get("cooldownHours") || 24),
    }
  });

  return NextResponse.redirect(new URL("/admin/bonus-rules", req.url), 303);
}
