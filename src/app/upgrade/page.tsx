export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ItemCard } from "@/components/ItemCard";

export default async function UpgradePage() {
  const session = getSession();
  if (!session) redirect("/login");

  const [inventory, targets] = await Promise.all([
    prisma.inventoryItem.findMany({ where: { userId: session.userId, isLocked: false }, orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.skinCatalogItem.findMany({ where: { isActive: true }, orderBy: { price: "asc" }, take: 50 })
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">Апгрейд</h1>
      <p className="mt-3 text-white/60">Выбери свой предмет и цель дороже. Шанс считается сервером по стоимости предметов.</p>

      <section className="card mt-8 p-6">
        <form action="/api/upgrade/perform" method="post" className="grid gap-4 md:grid-cols-3">
          <select className="input" name="inventoryItemId" required>
            {inventory.map((i) => <option key={i.id} value={i.id}>{i.name} · {i.price} ₽</option>)}
          </select>
          <select className="input" name="targetSkinId" required>
            {targets.map((t) => <option key={t.id} value={t.id}>{t.marketHashName} · {t.price} ₽</option>)}
          </select>
          <button className="btn">Попробовать апгрейд</button>
        </form>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-black">Твои предметы</h2>
          <div className="mt-4 grid gap-4">
            {inventory.length ? inventory.slice(0, 6).map((i) => (
              <ItemCard key={i.id} name={i.name} rarity={i.rarity} price={i.price} image={i.image} />
            )) : <p className="text-white/55">Сначала открой кейс.</p>}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black">Цели</h2>
          <div className="mt-4 grid gap-4">
            {targets.slice(-6).map((t) => (
              <ItemCard key={t.id} name={t.marketHashName} rarity={t.rarity} price={t.price} image={t.image} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
