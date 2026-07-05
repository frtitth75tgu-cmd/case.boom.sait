import Link from "next/link";
import { config } from "@/lib/config";
import { SkinCard } from "@/components/SkinCard";

const items = [
  ["AK-47 | Redline", "Restricted", 850],
  ["AWP | Asiimov", "Covert", 4300],
  ["M4A1-S | Printstream", "Covert", 9800],
  ["USP-S | Cortex", "Classified", 740],
  ["Glock-18 | Vogue", "Classified", 680],
  ["Desert Eagle | Code Red", "Covert", 5200],
  ["★ Karambit | Doppler", "Exotic", 115000],
  ["★ Sport Gloves | Vice", "Exotic", 145000],
];

export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className="page">
      <section className="hero-grid">
        <div className="opening-stage">
          <h1 style={{ fontSize: 46, margin: 0, fontWeight: 1000 }}>Diamond Vault</h1>
          <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 660 }}>
            Витрина кейса, рулетка открытия, список предметов и прозрачные шансы.
          </p>

          <div className="roulette-window" style={{ marginTop: 22 }}>
            <div className="roulette-pointer" />
            <div className="roulette-track">
              {items.concat(items).map(([name, rarity, price], i) => (
                <div className="roulette-item" key={name + i}>
                  <div style={{ textAlign: "center", padding: 8 }}>
                    <div style={{ fontSize: 28 }}>🔫</div>
                    <div style={{ fontSize: 12, fontWeight: 900, marginTop: 6 }}>{name}</div>
                    <div style={{ color: "#ffd45a", fontWeight: 1000, marginTop: 4 }}>{Number(price).toLocaleString("ru-RU")} {config.boomCoinShort}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <button className="btn">Открыть за 50 000 {config.boomCoinShort}</button>
            <button className="btn secondary">Открыть быстро</button>
          </div>
        </div>

        <aside className="panel side-panel">
          <div className="panel-title">Информация</div>
          <div className="stat-card" style={{ marginTop: 12 }}><small>Цена</small><strong>50 000 {config.boomCoinShort}</strong></div>
          <div className="stat-card" style={{ marginTop: 12 }}><small>Предметов</small><strong>128</strong></div>
          <div className="stat-card" style={{ marginTop: 12 }}><small>Редкий шанс</small><strong>0.18%</strong></div>
          <div className="legal-note">Шансы отображаются до открытия. Результат сохраняется в истории.</div>
        </aside>
      </section>

      <section className="case-section">
        <div className="section-head">
          <h2>Предметы внутри кейса</h2>
          <Link href="/fairness" style={{ color: "#ffd45a", fontWeight: 900 }}>Проверка честности →</Link>
        </div>
        <div className="skin-grid">
          {items.map(([name, rarity, price]) => <SkinCard key={name} name={String(name)} rarity={String(rarity)} price={Number(price)} />)}
        </div>
      </section>
    </main>
  );
}
