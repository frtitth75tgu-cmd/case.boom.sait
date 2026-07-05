export default function AdminHelpPage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 44, margin: 0, fontWeight: 1000 }}>Как пользоваться админкой</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Краткий порядок работы.</p>
      </section>

      <section className="timeline">
        {[
          ["1", "Создай кейс", "Админка → Кейсы → Быстро создать кейс."],
          ["2", "Открой редактор", "Нажми на карточку кейса."],
          ["3", "Добавь предметы", "Внизу редактора добавь скины, цены и шансы."],
          ["4", "Проверь 100%", "Справа должна быть сумма шансов ровно 100%."],
          ["5", "Отметь категории", "TOP / NEW / VIP / бесплатный / за депозит."],
          ["6", "Сохрани", "После сохранения кейс готов к выводу на сайт."]
        ].map(([n,t,d]) => (
          <div className="timeline-row" key={n}>
            <div className="avatar">{n}</div>
            <div><strong>{t}</strong><div style={{ color: "rgba(255,255,255,.55)" }}>{d}</div></div>
            <span className="status-pill">OK</span>
          </div>
        ))}
      </section>
    </main>
  );
}
