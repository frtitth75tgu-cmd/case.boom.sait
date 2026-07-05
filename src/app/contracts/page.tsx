export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ContractsPage() {
  const session = getSession();
  if (!session) redirect("/login");

  const inventory = await prisma.inventoryItem.findMany({
    where: { userId: session.userId, isLocked: false },
    orderBy: { createdAt: "desc" },
    take: 30
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Контракты</h1>
      <p className="mt-3 text-white/60">Выбери от 3 до 10 предметов. Сервер выдаст новый предмет из каталога близкий по общей стоимости.</p>

      <form action="/api/contracts/create" method="post" className="mt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {inventory.map((i) => (
            <label key={i.id} className="card cursor-pointer overflow-hidden">
              {i.image && <img src={i.image} alt="" className="h-32 w-full object-cover" />}
              <div className="p-4">
                <input type="checkbox" name="itemIds" value={i.id} className="mr-2" />
                <strong>{i.name}</strong>
                <div className="text-sm text-accent">{i.price} ₽</div>
              </div>
            </label>
          ))}
        </div>
        <button className="btn mt-6">Создать контракт</button>
      </form>
    </main>
  );
}
