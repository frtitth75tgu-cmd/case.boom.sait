import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Rarity } from "@prisma/client";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  await prisma.caseItem.create({
    data: {
      caseId: String(form.get("caseId")),
      name: String(form.get("name")),
      rarity: String(form.get("rarity")) as Rarity,
      price: Number(form.get("price")),
      chanceBps: Number(form.get("chanceBps"))
    }
  });

  return NextResponse.redirect(new URL("/admin/cases", req.url), 303);
}
