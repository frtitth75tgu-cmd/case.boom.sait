import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const caseId = String(form.get("caseId"));
  const c = await prisma.case.findUnique({ where: { id: caseId } });
  if (c) await prisma.case.update({ where: { id: caseId }, data: { isActive: !c.isActive } });
  return NextResponse.redirect(new URL("/admin/cases", req.url), 303);
}
