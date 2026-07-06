import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="Проверка честности" text="Проверка результатов открытий и апгрейдов." />
      <section className="section candy-panel">
        <h2 className="candy-title">Проверка честности</h2>
        <p className="candy-muted">Проверка результатов открытий и апгрейдов.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
