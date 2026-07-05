export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminOpeningsPage() {
  await requireAdmin();
  const openings = await prisma.caseOpening.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: true, case: true } });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Открытия</h1>
      <div className="mt-6 space-y-3">
        {openings.map((o) => (
          <div key={o.id} className="card grid gap-3 p-4 md:grid-cols-5">
            <strong>{o.user.username}</strong><span>{o.case.title}</span><span>{o.itemName}</span><span>{o.rollBps}/10000</span><span>{o.createdAt.toLocaleString("ru-RU")}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
