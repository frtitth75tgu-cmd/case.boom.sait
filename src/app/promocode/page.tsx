import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="Промокод" text="Активация бонусных кодов CaseBoom." />
      <section className="section candy-panel">
        <h2 className="candy-title">Промокод</h2>
        <p className="candy-muted">Активация бонусных кодов CaseBoom.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
