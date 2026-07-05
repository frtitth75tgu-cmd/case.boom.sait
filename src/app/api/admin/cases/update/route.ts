import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const caseDraftId = String(form.get("caseDraftId") || "");
  const title = String(form.get("title") || "").trim();
  const slug = String(form.get("slug") || "").trim();
  const category = String(form.get("category") || "standard").trim();
  const price = Number(form.get("price") || 0);
  const description = String(form.get("description") || "").trim();
  const image = String(form.get("image") || "").trim();

  await prisma.caseDraft.update({
    where: { id: caseDraftId },
    data: { title, slug, category, price, description: description || null, image: image || null }
  });

  return NextResponse.redirect(new URL(`/admin/cases/${caseDraftId}/editor`, req.url), 303);
}
