import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { createServerSeed, hashSeed, rollBps } from "@/lib/provablyFair";
import { simpleRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const limited = simpleRateLimit(req, "upgrade", 10, 60_000);
  if (limited) return limited;

  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const inventoryItemId = String(form.get("inventoryItemId") || "");
  const targetSkinId = String(form.get("targetSkinId") || "");

  const [item, target] = await Promise.all([
    prisma.inventoryItem.findFirst({ where: { id: inventoryItemId, userId: session.userId, isLocked: false } }),
    prisma.skinCatalogItem.findFirst({ where: { id: targetSkinId, isActive: true } })
  ]);

  if (!item || !target || target.price <= item.price) {
    return NextResponse.redirect(new URL("/upgrade?error=invalid", req.url), 303);
  }

  const serverSeed = createServerSeed();
  const clientSeed = `${session.steamId}:upgrade:${Date.now()}`;
  const roll = rollBps(serverSeed, clientSeed, 1);
  const chanceBps = Math.max(100, Math.min(7500, Math.floor((item.price / target.price) * 9000)));
  const win = roll <= chanceBps;

  if (win) {
    await prisma.$transaction([
      prisma.inventoryItem.delete({ where: { id: item.id } }),
      prisma.inventoryItem.create({
        data: {
          userId: session.userId,
          name: target.marketHashName,
          rarity: target.rarity,
          price: target.price,
          image: target.image,
          source: "upgrade"
        }
      }),
      prisma.auditLog.create({
        data: {
          userId: session.userId,
          action: "UPGRADE_WIN",
          metadata: { input: item.name, target: target.marketHashName, roll, chanceBps, serverSeedHash: hashSeed(serverSeed) }
        }
      })
    ]);
  } else {
    await prisma.$transaction([
      prisma.inventoryItem.delete({ where: { id: item.id } }),
      prisma.auditLog.create({
        data: {
          userId: session.userId,
          action: "UPGRADE_LOSE",
          metadata: { input: item.name, target: target.marketHashName, roll, chanceBps, serverSeedHash: hashSeed(serverSeed) }
        }
      })
    ]);
  }

  return NextResponse.redirect(new URL(`/profile?upgrade=${win ? "win" : "lose"}`, req.url), 303);
}
