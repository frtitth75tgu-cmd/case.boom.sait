export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function BattlesPage() {
  const session = getSession();
  const rooms = await prisma.battleRoom.findMany({ orderBy: { createdAt: "desc" }, take: 20 });
  const cases = await prisma.case.findMany({ where: { isActive: true }, orderBy: { price: "asc" } });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">Кейс-батлы</h1>
      <p className="mt-3 text-white/60">Базовая механика комнат. Полный realtime-режим можно добавить в следующей версии.</p>

      {session && (
        <section className="card mt-6 p-6">
          <h2 className="text-2xl font-black">Создать комнату</h2>
          <form action="/api/battles/create" method="post" className="mt-5 grid gap-4 md:grid-cols-3">
            <input className="input" name="title" placeholder="Название комнаты" required />
            <select className="input" name="caseSlug">
              {cases.map((c) => <option key={c.id} value={c.slug}>{c.title} · {c.price} ₽</option>)}
            </select>
            <button className="btn">Создать</button>
          </form>
        </section>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {rooms.length ? rooms.map((r) => (
          <div key={r.id} className="card p-6">
            <h2 className="text-2xl font-black">{r.title}</h2>
            <p className="mt-3 text-white/55">{r.mode}</p>
            <div className="mt-5 rounded-2xl bg-bg p-4 text-accent">{r.status}</div>
            <a className="btn mt-5" href={`/battles/${r.id}`}>Открыть</a>
          </div>
        )) : <p className="text-white/55">Комнат пока нет.</p>}
      </div>
    </main>
  );
}
