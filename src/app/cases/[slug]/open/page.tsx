import Link from "next/link";
import { getCase, getCaseSkins } from "@/data/catalog";
import { CaseOpeningClient } from "@/components/CaseOpeningClient";

export default function OpenPage({ params }: { params: { slug: string } }) {
  const box = getCase(params.slug);
  const items = getCaseSkins(params.slug);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>Открытие: {box.title}</h1>
        <p style={{ color: "var(--muted)" }}>
          Новый этап: живое открытие, Fast Mode, победный предмет и переход в инвентарь.
        </p>
        <div className="actions">
          <Link href={`/cases/${box.slug}`} className="btn secondary">Назад к кейсу</Link>
          <Link href="/cases" className="btn secondary">Все кейсы</Link>
        </div>
      </section>

      <section className="section">
        <CaseOpeningClient items={items} caseTitle={box.title} />
      </section>
    </main>
  );
}
