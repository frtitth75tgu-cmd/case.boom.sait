import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";

export default async function DepositSkinsPage() {
  const session = getSession();
  if (!session) redirect("/login");

  const deposits = await prisma.skinDeposit.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    take: 20
  }).catch(() => []);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Skin Deposit</p>
        <h1 style={{ fontSize: 46, margin: "6px 0 0", fontWeight: 1000 }}>Пополнение скинами</h1>
        <p style={{ color: "rgba(255,255,255,.62)", maxWidth: 760 }}>
          Отправь заявку на пополнение через CS2/Steam-скины. Администратор проверит трейд, оценит предметы по подключённым маркетам и начислит Boom Coins.
        </p>
      </section>

      <section className="hero-grid" style={{ marginTop: 18 }}>
        <div className="panel" style={{ padding: 22 }}>
          <h2 style={{ fontSize: 26, fontWeight: 1000 }}>Создать заявку</h2>

          <form action="/api/deposit-skins/create" method="post" style={{ display: "grid", gap: 14, marginTop: 18 }}>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "rgba(255,255,255,.65)", fontWeight: 800 }}>Твоя трейд-ссылка Steam</span>
              <input className="input" name="tradeUrl" placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..." required />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "rgba(255,255,255,.65)", fontWeight: 800 }}>Какие предметы отправляешь</span>
              <textarea className="input" name="itemsText" rows={6} placeholder={"Например:\nAK-47 | Redline FT\nAWP | Asiimov BS\n★ Karambit | Doppler"} required />
            </label>

            <button className="btn" disabled={!config.skinDepositEnabled}>
              {config.skinDepositEnabled ? "Отправить заявку" : "Пополнение скинами временно выключено"}
            </button>
          </form>
        </div>

        <aside className="panel side-panel">
          <div className="panel-title">Как это работает</div>
          <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
            {[
              ["1", "Ты отправляешь заявку и трейд-ссылку."],
              ["2", "Админ проверяет предметы и их актуальную цену."],
              ["3", `После подтверждения начисляются Boom Coins с учётом комиссии ${config.skinDepositCommissionPercent}%.`],
              ["4", "При некорректной ссылке или отмене трейда заявка может быть отклонена."]
            ].map(([n, t]) => (
              <div className="battle-row" key={n}>
                <div className="avatar">{n}</div>
                <div style={{ gridColumn: "span 2", color: "rgba(255,255,255,.72)" }}>{t}</div>
              </div>
            ))}
          </div>

          <div className="legal-note">
            Если пользователь систематически отменяет трейды, указывает чужие/некорректные ссылки или пытается обмануть оценку, администрация может ограничить бонусы, трейды или заблокировать аккаунт.
          </div>
        </aside>
      </section>

      <section style={{ marginTop: 22 }}>
        <div className="section-head"><h2>Мои заявки</h2></div>
        <div className="panel" style={{ padding: 16 }}>
          {deposits.length ? deposits.map((d) => (
            <div key={d.id} className="drop-row" style={{ gridTemplateColumns: "1fr 120px 120px" }}>
              <div>
                <strong>{d.itemsText.split("\\n")[0]}</strong>
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>{d.createdAt.toLocaleString("ru-RU")}</div>
                {d.adminComment && <div style={{ color: "rgba(255,255,255,.55)", fontSize: 12 }}>Комментарий: {d.adminComment}</div>}
              </div>
              <div style={{ color: "#ffd45a", fontWeight: 1000 }}>{d.creditedCoins} {config.boomCoinShort}</div>
              <div style={{ fontWeight: 1000 }}>{d.status}</div>
            </div>
          )) : <p style={{ color: "rgba(255,255,255,.55)" }}>Заявок пока нет.</p>}
        </div>
      </section>
    </main>
  );
}
