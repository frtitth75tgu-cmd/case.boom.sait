export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminActionsPage() {
  await requireAdmin();

  const actions = await prisma.adminAction.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Журнал админ-действий</h1>
      <div className="mt-6 space-y-3">
        {actions.length ? actions.map((a) => (
          <div key={a.id} className="card p-4">
            <strong>{a.action}</strong> · {a.targetType || "—"} · {a.targetId || "—"}
            <div className="mt-1 text-sm text-white/45">{a.createdAt.toLocaleString("ru-RU")}</div>
          </div>
        )) : <p className="text-white/55">Действий пока нет.</p>}
      </div>
    </main>
  );
}
