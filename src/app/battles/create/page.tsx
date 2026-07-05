import Link from "next/link";
import { config } from "@/lib/config";

export default function CreateBattlePage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28, maxWidth: 820, margin: "0 auto" }}>
        <span className="route-status">Создание баттла</span>
        <h1 style={{ fontSize: 46, margin: "12px 0 0", fontWeight: 1000 }}>Создать сражение</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>
          Пока это демо-форма. Она не падает с ошибкой и показывает будущую механику.
        </p>

        <div className="action-grid" style={{ marginTop: 18 }}>
          {["1×1", "2×2", "Приватная"].map((x) => (
            <Link href="/battles/demo-room" className="action-card" key={x}>
              <h2>{x}</h2>
              <p style={{ color: "rgba(255,255,255,.55)" }}>Создать за 500 {config.boomCoinShort}</p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <Link href="/battles" className="btn secondary">Назад к баттлам</Link>
        </div>
      </section>
    </main>
  );
}
