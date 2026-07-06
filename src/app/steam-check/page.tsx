export default function SteamCheckPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "не задано";

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 42, margin: 0 }}>Steam Check</h1>
        <p style={{ color: "var(--muted)" }}>Проверка адресов для входа Steam.</p>

        <div className="table">
          <div className="row">
            <div className="avatar">1</div>
            <div>
              <b>NEXT_PUBLIC_SITE_URL</b>
              <br />
              <span style={{ color: "var(--muted)" }}>{site}</span>
            </div>
            <span />
          </div>
          <div className="row">
            <div className="avatar">2</div>
            <div>
              <b>Steam Start</b>
              <br />
              <span style={{ color: "var(--muted)" }}>/api/auth/steam/start</span>
            </div>
            <a href="/api/auth/steam/start" className="btn">Проверить</a>
          </div>
          <div className="row">
            <div className="avatar">3</div>
            <div>
              <b>Steam Callback</b>
              <br />
              <span style={{ color: "var(--muted)" }}>/api/auth/steam/callback</span>
            </div>
            <span />
          </div>
        </div>
      </section>
    </main>
  );
}
