export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminCasesPage() {
  await requireAdmin();
  const cases = await prisma.case.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Кейсы</h1>

      <section className="card mt-6 p-6">
        <h2 className="text-2xl font-black">Создать кейс</h2>
        <form action="/api/admin/cases/create" method="post" className="mt-5 grid gap-4 md:grid-cols-2">
          <input className="input" name="title" placeholder="Название" required />
          <input className="input" name="slug" placeholder="slug" required />
          <input className="input" name="price" placeholder="Цена" type="number" min="1" required />
          <input className="input" name="image" placeholder="/cases/starter.svg" defaultValue="/cases/starter.svg" />
          <textarea className="input md:col-span-2" name="description" placeholder="Описание" required />
          <button className="btn md:col-span-2">Создать</button>
        </form>
      </section>

      <div className="mt-8 space-y-5">
        {cases.map((c) => (
          <div key={c.id} className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black">{c.title}</h2>
                <p className="text-white/50">{c.slug} · {c.price} ₽ · {c.isActive ? "активен" : "скрыт"}</p>
              </div>
              <form action="/api/admin/cases/toggle" method="post">
                <input type="hidden" name="caseId" value={c.id} />
                <button className="btn btn-outline">{c.isActive ? "Скрыть" : "Активировать"}</button>
              </form>
            </div>

            <form action="/api/admin/cases/items/create" method="post" className="mt-5 grid gap-3 md:grid-cols-5">
              <input type="hidden" name="caseId" value={c.id} />
              <input className="input" name="name" placeholder="Предмет" required />
              <select className="input" name="rarity">
                <option>COMMON</option><option>UNCOMMON</option><option>RARE</option><option>EPIC</option><option>MYTHIC</option><option>LEGENDARY</option>
              </select>
              <input className="input" name="price" type="number" placeholder="Цена" required />
              <input className="input" name="chanceBps" type="number" placeholder="Шанс bps 1-10000" required />
              <button className="btn">Добавить</button>
            </form>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {c.items.map((i) => (
                <div key={i.id} className="rounded-2xl bg-bg p-4">
                  <strong>{i.name}</strong>
                  <div className="text-sm text-white/50">{i.rarity} · {i.price} ₽ · {(i.chanceBps / 100).toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
