import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function Page() {
  return (
    <main className="page">
      <PageHero label="CaseBoom" title="Уведомления" text="Системные сообщения и важные события." />
      <section className="section candy-panel">
        <h2 className="candy-title">Уведомления</h2>
        <p className="candy-muted">Системные сообщения и важные события.</p>
        <div className="actions">
          <Link href="/" className="btn">На главную</Link>
          <Link href="/support" className="btn secondary">Поддержка</Link>
        </div>
      </section>
    </main>
  );
}
