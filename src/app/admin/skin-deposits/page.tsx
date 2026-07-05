import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";

export default async function AdminSkinDepositsPage() {
  await requireAdmin();

  const deposits = await prisma.skinDeposit.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  }).catch(() => []);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 42, margin: 0, fontWeight: 1000 }}>Пополнения скинами</h1>
        <p style={{ color: "rgba(255,255,255,.62)" }}>
          Проверка трейдов, оценка предметов и начисление Boom Coins.
        </p>
      </section>

      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        {deposits.length ? deposits.map((d) => (
          <div key={d.id} className="panel" style={{ padding: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 14 }}>
              <div>
                <div style={{ color: "#ffd45a", fontWeight: 1000 }}>{d.status}</div>
                <h2 style={{ margin: "6px 0", fontSize: 22, fontWeight: 1000 }}>Заявка #{d.id.slice(0, 8)}</h2>
                <pre style={{ whiteSpace: "pre-wrap", color: "rgba(255,255,255,.75)", fontFamily: "inherit" }}>{d.itemsText}</pre>
                <a href={d.tradeUrl} target="_blank" style={{ color: "#62e6ff" }}>Открыть трейд-ссылку</a>
                {d.adminComment && <p style={{ color: "rgba(255,255,255,.55)" }}>Комментарий: {d.adminComment}</p>}
              </div>

              <form action="/api/admin/skin-deposits/review" method="post" style={{ display: "grid", gap: 10 }}>
                <input type="hidden" name="depositId" value={d.id} />
                <input className="input" name="estimatedValue" type="number" min="0" placeholder="Оценка в BC" defaultValue={d.estimatedValue || ""} />
                <input className="input" name="creditedCoins" type="number" min="0" placeholder="Начислить BC" defaultValue={d.creditedCoins || ""} />
                <input className="input" name="adminComment" placeholder="Комментарий" />
                <button className="btn" name="action" value="APPROVE">Подтвердить</button>
                <button className="btn secondary" name="action" value="REJECT">Отклонить</button>
                <button className="btn secondary" name="action" value="PENALTY">Санкция</button>
              </form>
            </div>
          </div>
        )) : <p style={{ color: "rgba(255,255,255,.55)" }}>Заявок пока нет.</p>}
      </div>
    </main>
  );
}
