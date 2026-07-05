import { config } from "@/lib/config";

const battles = [
  ["Inferno Clash", 249, "2/2"],
  ["Titan War", 599, "3/4"],
  ["Diamond Room", 50000, "1/2"],
  ["Knife Duel", 4999, "2/2"],
  ["Glove Battle", 6999, "3/3"],
  ["Legacy Fight", 150000, "1/4"],
];

export default function BattlesPage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Battles</p>
        <h1 style={{ fontSize: 46, margin: "6px 0 0", fontWeight: 1000 }}>Сражения кейсов</h1>
        <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 760 }}>
          Комнаты 1×1, 2×2 и приватные баттлы. Победитель получает банк предметов.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <button className="btn">Создать баттл</button>
          <button className="btn secondary">Приватная комната</button>
        </div>
      </section>

      <section className="case-section">
        <div className="section-head"><h2>Активные комнаты</h2></div>
        <div className="battle-grid">
          {battles.map(([name, price, slots]) => (
            <div className="battle-card" key={String(name)}>
              <div className="panel-title">{name}</div>
              <div style={{ fontSize: 28, fontWeight: 1000, color: "#ffd45a", marginTop: 10 }}>{Number(price).toLocaleString("ru-RU")} {config.boomCoinShort}</div>
              <div style={{ color: "rgba(255,255,255,.50)", marginTop: 4 }}>Игроки: {slots}</div>
              <div className="battle-slots">
                {[1,2,3,4].map((i) => <div className="battle-slot" key={i}>{i <= Number(String(slots).split("/")[0]) ? "👤" : "+"}</div>)}
              </div>
              <button className="btn" style={{ width: "100%", marginTop: 16 }}>Войти</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
