import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const title = String(form.get("title") || "Battle Room");
  const caseSlug = String(form.get("caseSlug") || "");

  const c = await prisma.case.findUnique({ where: { slug: caseSlug } });
  if (!c) return NextResponse.redirect(new URL("/battles?error=case", req.url), 303);

  await prisma.battleRoom.create({
    data: {
      title,
      mode: `1v1 · ${c.title} · ${c.price} ₽`,
      status: "WAITING"
    }
  });

  return NextResponse.redirect(new URL("/battles", req.url), 303);
}
