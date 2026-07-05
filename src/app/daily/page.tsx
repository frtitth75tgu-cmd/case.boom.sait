export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function DailyPage() {
  const { user } = await requireUser();
  const last = await prisma.dailyBonusClaim.findFirst({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  const claims = await prisma.dailyBonusClaim.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 10 });

  const canClaim = !last || Date.now() - last.createdAt.getTime() > 1000 * 60 * 60 * 20;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="card p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-accent">Daily Bonus</p>
        <h1 className="mt-3 text-5xl font-black">Ежедневный бонус</h1>
        <p className="mt-4 text-white/60">Забирай бонус раз в сутки. Серия увеличивает награду.</p>

        <form action="/api/daily/claim" method="post" className="mt-7">
          <button className={`btn ${canClaim ? "" : "opacity-50"}`} disabled={!canClaim}>
            {canClaim ? "Забрать бонус" : "Бонус уже получен"}
          </button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black">История</h2>
        <div className="mt-4 space-y-3">
          {claims.map((c) => (
            <div key={c.id} className="card p-4">+{c.amount} ₽ · серия {c.streak} · {c.createdAt.toLocaleString("ru-RU")}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
