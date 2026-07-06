import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="Поддержка" text="Заявки, помощь и вопросы по аккаунту." />
      <section className="section candy-panel">
        <h2 className="candy-title">Поддержка</h2>
        <p className="candy-muted">Заявки, помощь и вопросы по аккаунту.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
