export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BalancePage() {
  const session = getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { payments: { orderBy: { createdAt: "desc" }, take: 20 } }
  });

  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-black">Баланс и платежи</h1>
      <p className="mt-3 text-white/60">
        Текущая версия использует демонстрационные платежи. Реальное списание денег не выполняется.
      </p>

      <section className="card mt-7 p-6">
        <div className="text-white/50">Текущий баланс</div>
        <div className="mt-2 text-5xl font-black text-accent">{user.balance} ₽</div>
      </section>

      <section className="card mt-6 p-6">
        <h2 className="text-2xl font-black">Демо-пополнение</h2>
        <form action="/api/payments/create" method="post" className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
          <input className="input" name="amount" type="number" min="50" max="15000" defaultValue="500" />
          <button className="btn">Создать платеж</button>
        </form>
        <p className="mt-4 text-sm text-white/45">
          Для реального запуска нужно подключить провайдера, webhook, онлайн-чеки и юридически проверить модель.
        </p>
        <Link href="/payments-policy" className="mt-4 inline-block text-ice">Условия платежей →</Link>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black">История</h2>
        <div className="mt-4 space-y-3">
          {user.payments.length ? user.payments.map((p) => (
            <div key={p.id} className="card p-4">
              <strong>{p.amount} ₽</strong> · {p.provider} · {p.status}
              <div className="mt-1 text-sm text-white/45">{p.externalId}</div>
            </div>
          )) : <p className="text-white/55">Платежей пока нет.</p>}
        </div>
      </section>
    </main>
  );
}
