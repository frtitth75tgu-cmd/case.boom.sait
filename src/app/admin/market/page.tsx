export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";

export default async function AdminMarketPage() {
  await requireAdmin();

  const purchases = await prisma.marketPurchase.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">Авто-закупка в маркете</h1>
      <p className="mt-3 text-white/60">
        Безопасный каркас под маркет. Реальная покупка работает только после настройки MARKET_API_URL/API_KEY и включения MARKET_AUTO_BUY_ENABLED.
      </p>

      <section className="card mt-6 p-6">
        <h2 className="text-2xl font-black">Состояние</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-bg p-4">
            <div className="text-white/50">Авто-закупка</div>
            <div className={config.marketAutoBuyEnabled ? "text-2xl font-black text-green-400" : "text-2xl font-black text-hot"}>
              {config.marketAutoBuyEnabled ? "Включена" : "Отключена"}
            </div>
          </div>
          <div className="rounded-2xl bg-bg p-4">
            <div className="text-white/50">Провайдер</div>
            <div className="text-2xl font-black text-accent">{config.marketProvider}</div>
          </div>
          <div className="rounded-2xl bg-bg p-4">
            <div className="text-white/50">Макс. цена предмета</div>
            <div className="text-2xl font-black">{config.marketMaxItemPriceRub} ₽</div>
          </div>
          <div className="rounded-2xl bg-bg p-4">
            <div className="text-white/50">Дневной бюджет</div>
            <div className="text-2xl font-black">{config.marketDailyBudgetRub} ₽</div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-white/70">
          Переключение делается в <code>.env</code>: MARKET_AUTO_BUY_ENABLED="true" или "false". Это безопаснее, чем случайно включить реальные покупки из браузера.
        </div>
      </section>

      <section className="card mt-6 p-6">
        <h2 className="text-2xl font-black">Создать тестовую заявку на закупку</h2>
        <form action="/api/admin/market/buy" method="post" className="mt-5 grid gap-4 md:grid-cols-3">
          <input className="input" name="itemName" placeholder="AK-47 | Redline" required />
          <input className="input" name="maxPrice" type="number" min="1" placeholder="Макс. цена ₽" required />
          <button className="btn">Создать заявку</button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black">История закупок</h2>
        <div className="mt-4 space-y-3">
          {purchases.length ? purchases.map((p) => (
            <div key={p.id} className="card grid gap-3 p-4 md:grid-cols-5">
              <strong>{p.itemName}</strong>
              <span>{p.itemPrice} ₽</span>
              <span>{p.provider}</span>
              <span>{p.status}</span>
              <span className="text-white/45">{p.externalId || "—"}</span>
            </div>
          )) : <p className="text-white/55">Заявок пока нет.</p>}
        </div>
      </section>
    </main>
  );
}
