import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await req.formData();
  const userId = String(form.get("userId") || "");
  const amount = Number(form.get("amount"));
  const reason = String(form.get("reason") || "").trim();

  if (!userId || !Number.isInteger(amount) || amount < 1 || amount > 100000 || !reason) {
    return NextResponse.redirect(new URL("/admin/balance?error=invalid", req.url), 303);
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } }
    }),
    prisma.auditLog.create({
      data: {
        userId,
        action: "ADMIN_BALANCE_GRANT",
        metadata: {
          amount,
          reason,
          adminUserId: session.userId
        }
      }
    }),
    prisma.adminAction.create({
      data: {
        adminUserId: session.userId,
        action: "BALANCE_GRANT_USER",
        targetType: "User",
        targetId: userId,
        metadata: { amount, reason }
      }
    })
  ]);

  return NextResponse.redirect(new URL("/admin/balance?success=1", req.url), 303);
}
