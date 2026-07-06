import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell title="Пополнения">
      <section className="candy-panel">
        <h2 className="candy-title">Пополнения</h2>
        <p className="candy-muted">Заявки на пополнение скинами.</p>

        <form className="form-stack" style={{ marginTop: 18 }}>
          <div className="form-two">
            <input className="input" placeholder="Trade URL" />
            <input className="input" placeholder="Сумма" />
          </div>
          <input className="input" placeholder="Статус" />
          <button className="btn" type="button">Сохранить</button>
        </form>

        <div className="notice">
          Раздел уже готов визуально. Следующий этап — подключить сохранение в Prisma.
        </div>
      </section>
    </AdminShell>
  );
}
