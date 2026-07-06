import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="Политика конфиденциальности" text="Как хранятся данные пользователя." />
      <section className="section candy-panel">
        <h2 className="candy-title">Политика конфиденциальности</h2>
        <p className="candy-muted">Как хранятся данные пользователя.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
