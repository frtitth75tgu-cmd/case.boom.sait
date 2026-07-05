import Link from "next/link";
import { config } from "@/lib/config";

function niceTitle(slug: string) {
  return slug.split("-").map((x) => x[0]?.toUpperCase() + x.slice(1)).join(" ");
}

export default function CaseOpenDemoPage({ params }: { params: { slug: string } }) {
  return (
    <main className="page">
      <section className="opening-stage">
        <span className="route-status">Демо открытия</span>
        <h1 style={{ fontSize: 48, margin: "12px 0 0", fontWeight: 1000 }}>{niceTitle(params.slug)}</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>
          Это рабочая демо-страница открытия. На следующем этапе подключим реальное списание баланса и выпадение из базы.
        </p>

        <div className="roulette-window" style={{ marginTop: 24 }}>
          <div className="roulette-pointer" />
          <div className="roulette-track">
            {["AK-47", "AWP", "M4A4", "Karambit", "Gloves", "USP-S", "Glock", "Deagle", "AWP", "M4A1-S"].map((x, i) => (
              <div className="roulette-item" key={x + i}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 32 }}>🔫</div>
                  <strong>{x}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel" style={{ padding: 22, marginTop: 22, textAlign: "center" }}>
          <div style={{ fontSize: 44 }}>🏆</div>
          <h2 style={{ fontSize: 34, margin: "8px 0", fontWeight: 1000 }}>AK-47 | Fire Serpent</h2>
          <div style={{ color: "#ffd45a", fontSize: 28, fontWeight: 1000 }}>42 000 {config.boomCoinShort}</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
            <Link href="/profile" className="btn">В инвентарь</Link>
            <Link href={`/cases/${params.slug}`} className="btn secondary">Открыть ещё</Link>
            <Link href="/upgrade" className="btn secondary">В апгрейд</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
