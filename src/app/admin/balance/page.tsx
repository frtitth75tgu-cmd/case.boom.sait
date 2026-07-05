export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminBalancePage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  const promos = await prisma.promoCode.findMany({
    orderBy: { createdAt: "desc" },
    take: 20
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Выдача баланса</h1>
      <p className="mt-3 text-white/60">Ручное начисление пользователю или создание промокода с бонусным балансом.</p>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-black">Выдать пользователю</h2>
          <form action="/api/admin/balance/grant-user" method="post" className="mt-5 grid gap-4">
            <select className="input" name="userId" required>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.username} · {u.steamId} · {u.balance} ₽</option>
              ))}
            </select>
            <input className="input" name="amount" type="number" min="1" max="100000" placeholder="Сумма ₽" required />
            <input className="input" name="reason" placeholder="Причина: компенсация, бонус, тест" required />
            <button className="btn">Начислить баланс</button>
          </form>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-black">Создать промокод</h2>
          <form action="/api/admin/promos/create" method="post" className="mt-5 grid gap-4">
            <input className="input" name="code" placeholder="CODE или оставь свой код" required />
            <input className="input" name="amount" type="number" min="1" max="100000" placeholder="Сумма ₽" required />
            <input className="input" name="maxUses" type="number" min="1" max="100000" placeholder="Кол-во активаций" required />
            <button className="btn">Создать промокод</button>
          </form>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Последние промокоды</h2>
        <div className="mt-4 space-y-3">
          {promos.length ? promos.map((p) => (
            <div key={p.id} className="card grid gap-3 p-4 md:grid-cols-4">
              <strong>{p.code}</strong>
              <span>{p.amount} ₽</span>
              <span>{p.usedCount}/{p.maxUses}</span>
              <span>{p.isActive ? "активен" : "выключен"}</span>
            </div>
          )) : <p className="text-white/55">Промокодов пока нет.</p>}
        </div>
      </section>
    </main>
  );
}
