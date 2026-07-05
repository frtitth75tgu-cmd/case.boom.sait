export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Пользователи</h1>
      <div className="mt-6 space-y-3">
        {users.map((u) => (
          <div key={u.id} className="card grid gap-3 p-4 md:grid-cols-[2fr_2fr_1fr_1fr_auto]">
            <strong>{u.username}</strong>
            <span className="text-white/50">{u.steamId}</span>
            <span>{u.balance} ₽</span>
            <span>{u.role}</span>
            <form action="/api/admin/users/toggle-block" method="post">
              <input type="hidden" name="userId" value={u.id} />
              <button className="btn btn-outline py-2 text-sm">{u.isBlocked ? "Разблокировать" : "Заблокировать"}</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
