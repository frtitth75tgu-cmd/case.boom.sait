export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function TradesPage() {
  const { user } = await requireUser();
  const trades = await prisma.tradeOffer.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 20 });
  const inventory = await prisma.inventoryItem.findMany({ where: { userId: user.id, isLocked: false }, orderBy: { createdAt: "desc" }, take: 20 });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Трейды</h1>
      <p className="mt-3 text-white/60">Каркас для Steam Trade Bot. Без настроенного бота реальные трейды не отправляются.</p>

      <section className="card mt-6 p-6">
        <h2 className="text-2xl font-black">Создать заявку на вывод</h2>
        <form action="/api/trades/create" method="post" className="mt-5 grid gap-4">
          <input className="input" name="tradeUrl" placeholder="Steam trade URL" required />
          <select className="input" name="itemId" required>
            {inventory.map((i) => <option key={i.id} value={i.id}>{i.name} · {i.price} ₽</option>)}
          </select>
          <button className="btn">Создать заявку</button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black">История</h2>
        <div className="mt-4 space-y-3">
          {trades.length ? trades.map((t) => (
            <div key={t.id} className="card p-4">{t.type} · {t.status} · {t.externalId || "без external id"}</div>
          )) : <p className="text-white/55">Трейдов пока нет.</p>}
        </div>
      </section>
    </main>
  );
}
