export default function PromoCodePage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28, maxWidth: 720, margin: "0 auto" }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Promo Code</p>
        <h1 style={{ fontSize: 44, margin: "6px 0 0", fontWeight: 1000 }}>Активация промокода</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Введи промокод, чтобы получить бонусы CaseBoom.</p>
        <form action="/api/promocode/activate" method="post" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, marginTop: 18 }}>
          <input className="input" name="code" placeholder="CASEBOOM2026" required />
          <button className="btn">Активировать</button>
        </form>
      </section>
    </main>
  );
}
