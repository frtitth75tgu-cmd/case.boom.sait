import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell title="Промокоды">
      <section className="candy-panel">
        <h2 className="candy-title">Промокоды</h2>
        <p className="candy-muted">Коды на бонусы и Boom Coins.</p>

        <form className="form-stack" style={{ marginTop: 18 }}>
          <div className="form-two">
            <input className="input" placeholder="Код" />
            <input className="input" placeholder="Сумма" />
          </div>
          <input className="input" placeholder="Лимит" />
          <button className="btn" type="button">Сохранить</button>
        </form>

        <div className="notice">
          Раздел уже готов визуально. Следующий этап — подключить сохранение в Prisma.
        </div>
      </section>
    </AdminShell>
  );
}
