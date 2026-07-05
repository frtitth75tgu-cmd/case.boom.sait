import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const caseDraftId = String(form.get("caseDraftId") || "");
  const itemName = String(form.get("itemName") || "").trim();
  const rarity = String(form.get("rarity") || "Mil-Spec").trim();
  const price = Number(form.get("price") || 0);
  const chance = Number(form.get("chance") || 0);
  const image = String(form.get("image") || "").trim();

  await prisma.caseDropDraft.create({ data: { caseDraftId, itemName, rarity, price, chance, image: image || null } });
  return NextResponse.redirect(new URL(`/admin/cases/${caseDraftId}/editor`, req.url), 303);
}
