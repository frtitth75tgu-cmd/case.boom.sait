import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const battleId = String(form.get("battleId") || "");

  const room = await prisma.battleRoom.findUnique({ where: { id: battleId } });
  if (!room) return NextResponse.redirect(new URL("/battles?error=room", req.url), 303);

  const existing = await prisma.battleParticipant.findFirst({
    where: { battleId, userId: session.userId }
  });

  if (!existing) {
    await prisma.battleParticipant.create({
      data: { battleId, userId: session.userId, score: 0 }
    });
  }

  return NextResponse.redirect(new URL(`/battles/${battleId}`, req.url), 303);
}
