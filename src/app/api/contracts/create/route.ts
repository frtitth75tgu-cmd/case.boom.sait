import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url), 303);

  const form = await req.formData();
  const itemIds = form.getAll("itemIds").map(String).slice(0, 10);

  if (itemIds.length < 3 || itemIds.length > 10) {
    return NextResponse.redirect(new URL("/contracts?error=count", req.url), 303);
  }

  const items = await prisma.inventoryItem.findMany({
    where: { id: { in: itemIds }, userId: session.userId, isLocked: false }
  });

  if (items.length !== itemIds.length) {
    return NextResponse.redirect(new URL("/contracts?error=items", req.url), 303);
  }

  const total = items.reduce((sum, i) => sum + i.price, 0);
  const targetPrice = Math.floor(total * 0.88);

  const output =
    (await prisma.skinCatalogItem.findFirst({
      where: { price: { lte: Math.max(targetPrice, 1) }, isActive: true },
      orderBy: { price: "desc" }
    })) ||
    (await prisma.skinCatalogItem.findFirst({ where: { isActive: true }, orderBy: { price: "asc" } }));

  if (!output) return NextResponse.redirect(new URL("/contracts?error=no_output", req.url), 303);

  await prisma.$transaction([
    prisma.inventoryItem.deleteMany({ where: { id: { in: itemIds }, userId: session.userId } }),
    prisma.inventoryItem.create({
      data: {
        userId: session.userId,
        name: output.marketHashName,
        rarity: output.rarity,
        price: output.price,
        image: output.image,
        source: "contract"
      }
    }),
    prisma.contract.create({
      data: {
        userId: session.userId,
        inputItems: items.map((i) => ({ id: i.id, name: i.name, price: i.price })),
        outputName: output.marketHashName,
        outputRarity: output.rarity,
        outputPrice: output.price
      }
    }),
    prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "CONTRACT_CREATE",
        metadata: { inputCount: items.length, total, output: output.marketHashName, outputPrice: output.price }
      }
    })
  ]);

  return NextResponse.redirect(new URL("/profile?contract=ok", req.url), 303);
}
