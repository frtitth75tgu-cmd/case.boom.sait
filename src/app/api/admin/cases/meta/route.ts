import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const caseDraftId = String(form.get("caseDraftId") || "");
  const data = {
    isTop: form.get("isTop") === "on",
    isNew: form.get("isNew") === "on",
    isVip: form.get("isVip") === "on",
    isFree: form.get("isFree") === "on",
    isDeposit: form.get("isDeposit") === "on",
    accentA: String(form.get("accentA") || "#ffd45a"),
    accentB: String(form.get("accentB") || "#ff8a2a"),
  };

  await prisma.caseAdminMeta.upsert({
    where: { caseDraftId },
    update: data,
    create: { caseDraftId, ...data }
  });

  return NextResponse.redirect(new URL(`/admin/cases/${caseDraftId}/editor`, req.url), 303);
}
