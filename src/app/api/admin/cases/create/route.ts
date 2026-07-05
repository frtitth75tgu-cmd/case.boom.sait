import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  await prisma.case.create({
    data: {
      title: String(form.get("title")),
      slug: String(form.get("slug")).toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      price: Number(form.get("price")),
      image: String(form.get("image") || "/cases/starter.svg"),
      description: String(form.get("description"))
    }
  });
  return NextResponse.redirect(new URL("/admin/cases", req.url), 303);
}
