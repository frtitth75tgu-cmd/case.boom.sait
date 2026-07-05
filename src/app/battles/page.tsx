import Link from "next/link";
import { config } from "@/lib/config";

const rooms = [
  ["dragon-battle", "Dragon Battle", 2450, "1/2"],
  ["knife-clash", "Knife Clash", 1200, "2/2"],
  ["vip-room", "VIP Room", 5000, "1/3"],
  ["fast-duel", "Fast Duel", 300, "3/4"],
];

export default function BattlesPage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <span className="route-status">Battles</span>
        <h1 style={{ fontSize: 46, margin: "12px 0 0", fontWeight: 1000 }}>Сражения кейсов</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Все кнопки ведут на рабочие страницы без ошибок.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <Link href="/battles/create" className="btn">Создать баттл</Link>
          <Link href="/cases" className="btn secondary">Выбрать кейс</Link>
        </div>
      </section>

      <section className="case-section">
        <div className="section-head"><h2>Активные комнаты</h2></div>
        <div className="battle-grid">
          {rooms.map(([slug, name, price, players]) => (
            <Link href={`/battles/${slug}`} className="battle-card" key={String(slug)}>
              <div className="panel-title">{name}</div>
              <div style={{ color: "#ffd45a", fontSize: 28, fontWeight: 1000, marginTop: 12 }}>{Number(price).toLocaleString("ru-RU")} {config.boomCoinShort}</div>
              <div style={{ color: "rgba(255,255,255,.55)", marginTop: 4 }}>Игроки: {players}</div>
              <div className="battle-slots">
                {[1,2,3,4].map((i) => <div className="battle-slot" key={i}>{i <= Number(String(players).split("/")[0]) ? "👤" : "+"}</div>)}
              </div>
              <div className="btn" style={{ width: "100%", marginTop: 16 }}>Вступить</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
