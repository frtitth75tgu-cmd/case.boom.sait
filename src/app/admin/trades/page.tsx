export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminTradesPage() {
  await requireAdmin();
  const trades = await prisma.tradeOffer.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">Трейды</h1>
      <div className="mt-6 space-y-3">
        {trades.map((t) => (
          <div key={t.id} className="card p-4">
            <strong>{t.type}</strong> · {t.status} · {t.externalId || "no external id"}
            <div className="mt-1 text-sm text-white/45">{t.tradeUrl}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
