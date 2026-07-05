import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const userId = String(form.get("userId") || "");
  const title = String(form.get("title") || "");
  const message = String(form.get("message") || "");

  await prisma.notification.create({ data: { userId, title, message, type: "ADMIN" } });
  await prisma.adminAction.create({ data: { adminUserId: session.userId, action: "NOTIFICATION_SEND", targetType: "User", targetId: userId } });

  return NextResponse.redirect(new URL("/admin/notifications", req.url), 303);
}
