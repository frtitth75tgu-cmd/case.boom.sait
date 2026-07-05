import { config } from "@/lib/config";

const bonuses = [
  ["🎁", "Daily Bonus", "Каждые 24 часа", `50–500 ${config.boomCoinShort}`],
  ["🗓️", "Weekly Bonus", "За активность недели", `до 2500 ${config.boomCoinShort}`],
  ["💎", "Deposit Bonus", "За пополнение скинами", "бонусный кейс"],
  ["🎟️", "Promo Bonus", "По промокодам", "BC, кейсы, скидки"],
  ["🏆", "Level Bonus", "За уровни", "эксклюзивные кейсы"],
  ["⚔️", "Battle Bonus", "За сражения", "опыт и BC"],
];

export default function BonusPage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Bonus System</p>
        <h1 style={{ fontSize: 46, margin: "6px 0 0", fontWeight: 1000 }}>Бонусы CaseBoom</h1>
        <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 760 }}>
          Бонусы, ежедневные награды, промокоды и кейсы за депозит. Всё начисляется во внутренней валюте {config.boomCoinName}.
        </p>
      </section>

      <section className="admin-grid" style={{ marginTop: 18 }}>
        {bonuses.map(([icon, title, text, reward]) => (
          <div className="admin-tile" key={title}>
            <div style={{ fontSize: 34 }}>{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
            <div style={{ color: "#ffd45a", fontWeight: 1000, marginTop: 12 }}>{reward}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
