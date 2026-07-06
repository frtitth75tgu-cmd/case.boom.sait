import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell title="Шансы">
      <section className="candy-panel">
        <h2 className="candy-title">Шансы</h2>
        <p className="candy-muted">Настройка выпадений и процентов.</p>

        <form className="form-stack" style={{ marginTop: 18 }}>
          <div className="form-two">
            <input className="input" placeholder="Предмет" />
            <input className="input" placeholder="Шанс %" />
          </div>
          <input className="input" placeholder="Цена" />
          <button className="btn" type="button">Сохранить</button>
        </form>

        <div className="notice">
          Раздел уже готов визуально. Следующий этап — подключить сохранение в Prisma.
        </div>
      </section>
    </AdminShell>
  );
}
