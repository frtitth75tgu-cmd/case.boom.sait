export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";
import { ensureReferralProfile } from "@/lib/referrals";
import { config } from "@/lib/config";

export default async function ReferralsPage() {
  const { user } = await requireUser();
  const profile = await ensureReferralProfile(user.id, user.steamId);
  const invites = await prisma.referralInvite.findMany({
    where: { inviterId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  const link = `${config.siteUrl}/r/${profile.code}`;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Реферальная система</h1>
      <p className="mt-3 text-white/60">Приглашай пользователей и получай бонусный баланс.</p>

      <section className="card mt-6 p-6">
        <div className="text-white/50">Твоя ссылка</div>
        <div className="mt-3 rounded-2xl bg-bg p-4 text-xl font-black text-accent">{link}</div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-bg p-4"><div className="text-white/50">Код</div><strong>{profile.code}</strong></div>
          <div className="rounded-2xl bg-bg p-4"><div className="text-white/50">Приглашений</div><strong>{invites.length}</strong></div>
          <div className="rounded-2xl bg-bg p-4"><div className="text-white/50">Заработано</div><strong>{profile.totalEarned} ₽</strong></div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black">История</h2>
        <div className="mt-4 space-y-3">
          {invites.length ? invites.map((i) => (
            <div key={i.id} className="card p-4">Приглашение · бонус {i.reward} ₽ · {i.createdAt.toLocaleString("ru-RU")}</div>
          )) : <p className="text-white/55">Приглашений пока нет.</p>}
        </div>
      </section>
    </main>
  );
}
