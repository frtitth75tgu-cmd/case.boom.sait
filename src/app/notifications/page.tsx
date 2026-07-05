export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function NotificationsPage() {
  const { user } = await requireUser();
  const items = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-black">Уведомления</h1>
        <form action="/api/notifications/read-all" method="post">
          <button className="btn btn-outline">Прочитать все</button>
        </form>
      </div>
      <div className="mt-7 space-y-3">
        {items.length ? items.map((n) => (
          <div key={n.id} className={`card p-5 ${n.isRead ? "opacity-60" : ""}`}>
            <div className="text-sm text-accent">{n.type}</div>
            <h2 className="mt-1 text-xl font-black">{n.title}</h2>
            <p className="mt-2 text-white/60">{n.message}</p>
            <div className="mt-2 text-xs text-white/40">{n.createdAt.toLocaleString("ru-RU")}</div>
          </div>
        )) : <p className="text-white/55">Уведомлений пока нет.</p>}
      </div>
    </main>
  );
}
