import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="История" text="Открытия, апгрейды, баттлы и заявки." />
      <section className="section candy-panel">
        <h2 className="candy-title">История</h2>
        <p className="candy-muted">Открытия, апгрейды, баттлы и заявки.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
