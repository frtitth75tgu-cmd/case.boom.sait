import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell title="Логи">
      <section className="candy-panel">
        <h2 className="candy-title">Логи</h2>
        <p className="candy-muted">История действий сайта и админки.</p>

        <form className="form-stack" style={{ marginTop: 18 }}>
          <div className="form-two">
            <input className="input" placeholder="Тип" />
            <input className="input" placeholder="Событие" />
          </div>
          <input className="input" placeholder="Дата" />
          <button className="btn" type="button">Сохранить</button>
        </form>

        <div className="notice">
          Раздел уже готов визуально. Следующий этап — подключить сохранение в Prisma.
        </div>
      </section>
    </AdminShell>
  );
}
