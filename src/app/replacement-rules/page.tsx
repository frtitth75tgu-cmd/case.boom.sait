import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="Замена предметов" text="Если предмет недоступен на маркете, подбирается аналог и разница возвращается в Boom Coins." />
      <section className="section candy-panel">
        <h2 className="candy-title">Замена предметов</h2>
        <p className="candy-muted">Если предмет недоступен на маркете, подбирается аналог и разница возвращается в Boom Coins.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
