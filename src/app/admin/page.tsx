export const dynamic = "force-dynamic";

import Link from "next/link";
import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  await requireAdmin();

  const [users, payments, openings, cases, promos, trades] = await Promise.all([
    prisma.user.count(),
    prisma.paymentIntent.count(),
    prisma.caseOpening.count(),
    prisma.case.count(),
    prisma.promoCode.count(),
    prisma.tradeOffer.count()
  ]);

  const cards = [
    ["/admin/users", "Пользователи", users],
    ["/admin/cases", "Кейсы", cases],
    ["/admin/payments", "Платежи", payments],
    ["/admin/promos", "Промокоды", promos],
    ["/admin/trades", "Трейды", trades],
    ["/admin/openings", "Открытия", openings],
    ["/admin/market", "Авто-закупка", "→"],
    ["/admin/balance", "Выдача баланса", "→"],
    ["/admin/notifications", "Уведомления", "→"],
    ["/admin/actions", "Журнал действий", "→"],
    ["/admin/settings", "Настройки", "→"]
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Админ-панель</h1>
      <p className="mt-3 text-white/60">Управление проектом CaseBoom Pro v2.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map(([href, title, value]) => (
          <Link href={href as string} key={href as string} className="card p-6 transition hover:border-accent/40">
            <div className="text-white/50">{title}</div>
            <div className="mt-2 text-4xl font-black text-accent">{value}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
