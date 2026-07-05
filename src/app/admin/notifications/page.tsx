export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminNotificationsPage() {
  await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Уведомления</h1>
      <section className="card mt-6 p-6">
        <h2 className="text-2xl font-black">Отправить пользователю</h2>
        <form action="/api/admin/notifications/send" method="post" className="mt-5 grid gap-4">
          <select className="input" name="userId">
            {users.map((u) => <option key={u.id} value={u.id}>{u.username} · {u.steamId}</option>)}
          </select>
          <input className="input" name="title" placeholder="Заголовок" required />
          <textarea className="input" name="message" placeholder="Сообщение" required />
          <button className="btn">Отправить</button>
        </form>
      </section>
    </main>
  );
}
