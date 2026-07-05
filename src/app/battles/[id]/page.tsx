import Link from "next/link";
import { config } from "@/lib/config";

function niceTitle(id: string) {
  return id.split("-").map((x) => x[0]?.toUpperCase() + x.slice(1)).join(" ");
}

export default function BattleRoomPage({ params }: { params: { id: string } }) {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <span className="route-status">Комната открыта</span>
        <h1 style={{ fontSize: 46, margin: "12px 0 0", fontWeight: 1000 }}>{niceTitle(params.id)}</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>
          Это демо-комната. Следующий этап — подключить реальное создание баттлов, оплату входа и распределение выигрыша.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <Link href="/battles" className="btn secondary">Назад</Link>
          <Link href="/cases" className="btn">Добавить кейс</Link>
        </div>
      </section>

      <section className="final-row">
        {[1,2,3,4].map((i) => (
          <div className="final-block" key={i}>
            <div className="avatar" style={{ width: 62, height: 62 }}>{i === 1 ? "T" : "?"}</div>
            <h2>{i === 1 ? "Timon" : "Свободное место"}</h2>
            <p style={{ color: "rgba(255,255,255,.55)" }}>{i === 1 ? `Ставка 2 450 ${config.boomCoinShort}` : "Ожидает игрока"}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
