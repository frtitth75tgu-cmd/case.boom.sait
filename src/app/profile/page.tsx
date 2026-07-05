export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { ItemCard } from "@/components/ItemCard";

export default async function ProfilePage() {
  const session = getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      inventory: { orderBy: { createdAt: "desc" } },
      openings: { orderBy: { createdAt: "desc" }, take: 10 },
      payments: { orderBy: { createdAt: "desc" }, take: 5 }
    }
  });

  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="card flex flex-wrap items-center gap-6 p-7">
        <div className="h-24 w-24 overflow-hidden rounded-3xl bg-soft">
          {user.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <div>
          <h1 className="text-4xl font-black">{user.username}</h1>
          <p className="mt-2 text-white/50">SteamID: {user.steamId}</p>
          <p className="mt-2 text-2xl font-black text-accent">Баланс: {user.balance} ₽</p>
        </div>
        <form action="/api/auth/logout" method="post" className="ml-auto">
          <button className="btn btn-outline">Выйти</button>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-black">Инвентарь</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {user.inventory.length ? user.inventory.map((i) => (
            <ItemCard key={i.id} name={i.name} rarity={i.rarity} price={i.price} image={i.image} />
          )) : <p className="text-white/55">Инвентарь пуст.</p>}
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-black">Последние открытия</h2>
          <div className="mt-4 space-y-3">
            {user.openings.map((o) => (
              <div key={o.id} className="rounded-2xl bg-bg p-4">
                {o.itemName} · <span className="text-accent">{o.itemPrice} ₽</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-black">Платежи</h2>
          <div className="mt-4 space-y-3">
            {user.payments.map((p) => (
              <div key={p.id} className="rounded-2xl bg-bg p-4">
                {p.amount} ₽ · {p.status}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
