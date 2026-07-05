export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function BattleRoomPage({ params }: { params: { id: string } }) {
  const session = getSession();
  const room = await prisma.battleRoom.findUnique({ where: { id: params.id } });
  if (!room) return notFound();

  const participants = await prisma.battleParticipant.findMany({
    where: { battleId: room.id },
    orderBy: { createdAt: "asc" }
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section className="card p-8">
        <p className="text-accent">{room.status}</p>
        <h1 className="mt-2 text-4xl font-black">{room.title}</h1>
        <p className="mt-3 text-white/60">{room.mode}</p>

        {session && (
          <form action="/api/battles/join" method="post" className="mt-6">
            <input type="hidden" name="battleId" value={room.id} />
            <button className="btn">Войти в комнату</button>
          </form>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black">Участники</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {participants.length ? participants.map((p) => (
            <div key={p.id} className="card p-4">
              <strong>{p.userId.slice(0, 8)}...</strong>
              <div className="mt-2 text-accent">Очки: {p.score}</div>
              <div className="text-sm text-white/45">{p.status}</div>
            </div>
          )) : <p className="text-white/55">Пока никто не вошёл.</p>}
        </div>
      </section>
    </main>
  );
}
