export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/authGuards";

export default async function PromosPage() {
  await requireUser();
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <section className="card p-8">
        <h1 className="text-4xl font-black">Промокод</h1>
        <p className="mt-3 text-white/60">Введите промокод для начисления бонусного баланса.</p>
        <form action="/api/promos/redeem" method="post" className="mt-6 flex gap-3">
          <input className="input" name="code" placeholder="START500" required />
          <button className="btn">Активировать</button>
        </form>
      </section>
    </main>
  );
}
