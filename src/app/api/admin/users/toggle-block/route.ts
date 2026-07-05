import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const userId = String(form.get("userId") || "");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.redirect(new URL("/admin/users", req.url), 303);

  await prisma.user.update({ where: { id: userId }, data: { isBlocked: !user.isBlocked } });
  await prisma.adminAction.create({
    data: { adminUserId: session.userId, action: user.isBlocked ? "USER_UNBLOCK" : "USER_BLOCK", targetType: "User", targetId: userId }
  });

  return NextResponse.redirect(new URL("/admin/users", req.url), 303);
}
