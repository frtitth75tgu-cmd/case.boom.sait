import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell title="Бонусы">
      <section className="candy-panel">
        <h2 className="candy-title">Бонусы</h2>
        <p className="candy-muted">Daily, уровни, депозитные награды.</p>

        <form className="form-stack" style={{ marginTop: 18 }}>
          <div className="form-two">
            <input className="input" placeholder="Название" />
            <input className="input" placeholder="Награда" />
          </div>
          <input className="input" placeholder="Кулдаун" />
          <button className="btn" type="button">Сохранить</button>
        </form>

        <div className="notice">
          Раздел уже готов визуально. Следующий этап — подключить сохранение в Prisma.
        </div>
      </section>
    </AdminShell>
  );
}
