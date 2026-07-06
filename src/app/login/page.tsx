import Link from "next/link";

export default function Login() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 34, maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontSize: 44, margin: 0 }}>Вход через Steam</h1>
        <p style={{ color: "var(--muted)" }}>
          Кнопка открывает официальный Steam OpenID. После входа тебя вернёт на новую главную CaseBoom.
        </p>

        <div className="actions">
          <a href="/api/auth/steam/start" className="btn">Войти через Steam</a>
          <Link href="/" className="btn secondary">На главную</Link>
        </div>

        <div className="notice">
          Для локального запуска в .env должно быть:
          <br />
          <b>NEXT_PUBLIC_SITE_URL="http://localhost:3000"</b>
          <br />
          Для Vercel поставь свой домен:
          <br />
          <b>NEXT_PUBLIC_SITE_URL="https://твой-домен.vercel.app"</b>
        </div>
      </section>
    </main>
  );
}
