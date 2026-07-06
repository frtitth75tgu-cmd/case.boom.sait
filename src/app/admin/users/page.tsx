import { AdminShell } from "@/components/AdminShell";

export default function Page() {
  return (
    <AdminShell title="Пользователи">
      <section className="candy-panel">
        <h2 className="candy-title">Пользователи</h2>
        <p className="candy-muted">Баланс, роли, блокировки и профиль.</p>

        <form className="form-stack" style={{ marginTop: 18 }}>
          <div className="form-two">
            <input className="input" placeholder="Steam ID" />
            <input className="input" placeholder="Баланс" />
          </div>
          <input className="input" placeholder="Роль" />
          <button className="btn" type="button">Сохранить</button>
        </form>

        <div className="notice">
          Раздел уже готов визуально. Следующий этап — подключить сохранение в Prisma.
        </div>
      </section>
    </AdminShell>
  );
}
