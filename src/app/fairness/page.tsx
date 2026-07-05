import Link from "next/link";

export default function Page() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <span className="route-status">Раздел работает</span>
        <h1 style={{ fontSize: 46, margin: "12px 0 0", fontWeight: 1000 }}>Проверяемая честность</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Здесь будет система проверки результата открытия.</p>
        <Link href="/" className="btn" style={{ marginTop: 18 }}>На главную</Link>
      </section>
    </main>
  );
}
