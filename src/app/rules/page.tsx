import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="Правила" text="Правила CaseBoom, бонусов, выдачи и апгрейда." />
      <section className="section candy-panel">
        <h2 className="candy-title">Правила</h2>
        <p className="candy-muted">Правила CaseBoom, бонусов, выдачи и апгрейда.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
