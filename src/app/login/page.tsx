import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 34, maxWidth: 720, margin: "0 auto" }}>
        <p style={{ color: "#ffd45a", fontWeight: 1000 }}>Steam Login</p>
        <h1 style={{ fontSize: 44, margin: "6px 0 0", fontWeight: 1000 }}>Вход в CaseBoom</h1>
        <p style={{ color: "rgba(255,255,255,.58)", marginTop: 12 }}>
          Нажми кнопку ниже. Должен открыться официальный Steam OpenID.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
          <a href="/api/auth/steam/start" className="btn">Войти через Steam</a>
          <Link href="/" className="btn secondary">На главную</Link>
        </div>
      </section>
    </main>
  );
}
