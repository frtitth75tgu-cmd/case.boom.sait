import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell title="Кейсы">
      <section className="candy-panel">
        <h2 className="candy-title">Кейсы</h2>
        <p className="candy-muted">Создание и редактирование кейсов.</p>

        <form className="form-stack" style={{ marginTop: 18 }}>
          <div className="form-two">
            <input className="input" placeholder="Название кейса" />
            <input className="input" placeholder="Цена" />
          </div>
          <input className="input" placeholder="Категория" />
          <button className="btn" type="button">Сохранить</button>
        </form>

        <div className="notice">
          Раздел уже готов визуально. Следующий этап — подключить сохранение в Prisma.
        </div>
      </section>
    </AdminShell>
  );
}
