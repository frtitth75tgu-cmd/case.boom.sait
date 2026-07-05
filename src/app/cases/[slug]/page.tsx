import Link from "next/link";
import { config } from "@/lib/config";

const skins = [
  ["AK-47 | Fire Serpent", "Covert", 42000],
  ["AWP | Dragon Lore", "Covert", 115000],
  ["M4A4 | Howl", "Covert", 85000],
  ["★ Karambit | Fade", "Exotic", 145000],
  ["★ Sport Gloves | Pandora", "Exotic", 98000],
  ["AK-47 | Asiimov", "Classified", 18500],
  ["M4A1-S | Printstream", "Classified", 14500],
  ["USP-S | Kill Confirmed", "Covert", 9000],
];

function niceTitle(slug: string) {
  return slug.split("-").map((x) => x[0]?.toUpperCase() + x.slice(1)).join(" ");
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const title = niceTitle(params.slug);

  return (
    <main className="page">
      <section className="opening-stage">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 22, alignItems: "center" }}>
          <div>
            <span className="route-status">Кейс открыт</span>
            <h1 style={{ fontSize: 52, margin: "12px 0 0", fontWeight: 1000 }}>{title}</h1>
            <p style={{ color: "rgba(255,255,255,.62)", maxWidth: 680 }}>
              Здесь открывается страница кейса. Кнопки пока ведут на рабочие демо-страницы, чтобы не было ошибок.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              <Link href={`/cases/${params.slug}/open`} className="btn">Открыть за 999 {config.boomCoinShort}</Link>
              <Link href="/upgrade" className="btn secondary">В апгрейд</Link>
              <Link href="/cases" className="btn secondary">Назад к кейсам</Link>
            </div>
          </div>
          <div className="case-art" style={{ height: 220 }}><div className="case-box" style={{ width: 150, height: 106 }} /></div>
        </div>

        <div className="roulette-window" style={{ marginTop: 24 }}>
          <div className="roulette-pointer" />
          <div className="roulette-track">
            {skins.concat(skins).map(([name, rarity, price], i) => (
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
      </section>

      <section className="case-section">
        <div className="section-head"><h2>Содержимое кейса</h2></div>
        <div className="skin-grid">
          {skins.map(([name, rarity, price]) => (
            <div className="skin-card" key={name}>
              <div className="skin-image"><div style={{ fontSize: 32 }}>🔫</div></div>
              <div className="skin-name">{name}</div>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>{rarity}</div>
              <div className="skin-price">{Number(price).toLocaleString("ru-RU")} {config.boomCoinShort}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
