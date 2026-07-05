import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { createServerSeed, hashSeed, pickByBps, rollBps } from "@/lib/provablyFair";
import { simpleRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const limited = simpleRateLimit(req, "case-open", 10, 60_000);
  if (limited) return limited;
  const session = getSession();
  if (!session) return NextResponse.json({ error: "Нужен вход через Steam" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.isBlocked) return NextResponse.json({ error: "Аккаунт недоступен" }, { status: 403 });

  const caseData = await prisma.case.findUnique({
    where: { slug: params.slug },
    include: { items: true }
  });

  if (!caseData || !caseData.isActive) {
    return NextResponse.json({ error: "Кейс не найден" }, { status: 404 });
  }

  if (user.balance < caseData.price) {
    return NextResponse.json({ error: "Недостаточно баланса" }, { status: 400 });
  }

  const serverSeed = createServerSeed();
  const serverSeedHash = hashSeed(serverSeed);
  const clientSeed = `${user.steamId}:${Date.now()}`;
  const nonce = await prisma.caseOpening.count({ where: { userId: user.id } }) + 1;
  const roll = rollBps(serverSeed, clientSeed, nonce);
  const item = pickByBps(caseData.items, roll);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { balance: { decrement: caseData.price } }
    }),
    prisma.inventoryItem.create({
      data: {
        userId: user.id,
        name: item.name,
        rarity: item.rarity,
        price: item.price,
        image: item.image,
        source: `case:${caseData.slug}`
      }
    }),
    prisma.caseOpening.create({
      data: {
        userId: user.id,
        caseId: caseData.id,
        itemName: item.name,
        itemRarity: item.rarity,
        itemPrice: item.price,
        serverSeedHash,
        clientSeed,
        nonce,
        rollBps: roll
      }
    }),
    prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "CASE_OPEN",
        metadata: {
          caseSlug: caseData.slug,
          itemName: item.name,
          price: item.price,
          roll
        }
      }
    }),
    prisma.notification.create({
      data: {
        userId: user.id,
        title: "Открытие кейса",
        message: `Выпал предмет ${item.name} стоимостью ${item.price} ₽.`,
        type: "CASE_DROP"
      }
    })
  ]);

  return NextResponse.json({
    item: {
      name: item.name,
      rarity: item.rarity,
      price: item.price,
      image: item.image
    },
    fair: {
      serverSeedHash,
      clientSeed,
      nonce,
      rollBps: roll
    }
  });
}
