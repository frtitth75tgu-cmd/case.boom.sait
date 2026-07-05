export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminPromosPage() {
  await requireAdmin();
  const promos = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Промокоды</h1>
      <section className="card mt-6 p-6">
        <form action="/api/admin/promos/create" method="post" className="grid gap-3 md:grid-cols-4">
          <input className="input" name="code" placeholder="CODE" required />
          <input className="input" name="amount" type="number" placeholder="Бонус ₽" required />
          <input className="input" name="maxUses" type="number" placeholder="Лимит" required />
          <button className="btn">Создать</button>
        </form>
      </section>
      <div className="mt-6 space-y-3">
        {promos.map((p) => (
          <div key={p.id} className="card grid gap-3 p-4 md:grid-cols-5">
            <strong>{p.code}</strong><span>{p.amount} ₽</span><span>{p.usedCount}/{p.maxUses}</span><span>{p.isActive ? "активен" : "выключен"}</span>
            <form action="/api/admin/promos/toggle" method="post"><input type="hidden" name="id" value={p.id}/><button className="btn btn-outline py-2 text-sm">Переключить</button></form>
          </div>
        ))}
      </div>
    </main>
  );
}
