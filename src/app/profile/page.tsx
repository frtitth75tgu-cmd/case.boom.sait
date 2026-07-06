import { skins, boom } from "@/data/catalog";
import { SkinCard } from "@/components/Visuals";

export default function Profile() {
  const inv = skins.slice(0, 8);
  const total = inv.reduce((s, x) => s + x.price, 0);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 46, margin: 0 }}>Профиль</h1>
        <p style={{ color: "var(--muted)" }}>
          Баланс: 15 450 {boom.short} · Уровень 17 · Steam подключен
        </p>

        <div className="inventory-stat">
          <div className="metric"><b>{inv.length}</b><span>предметов</span></div>
          <div className="metric"><b>{total.toLocaleString("ru-RU")}</b><span>стоимость инвентаря</span></div>
          <div className="metric"><b>42</b><span>открытий</span></div>
          <div className="metric"><b>18%</b><span>удача апгрейда</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Инвентарь</h2>
        </div>

        <div className="inv-toolbar">
          <input className="input" placeholder="🔍 Поиск предмета..." />
          <button className="btn secondary">Цена ↑</button>
          <button className="btn secondary">Редкость</button>
          <button className="btn secondary">Выдать</button>
        </div>

        <div className="grid" style={{ marginTop: 14 }}>
          {inv.map((s) => (
            <div key={s.name}>
              <SkinCard item={s} />
              <div className="item-actions">
                <a href="/upgrade">Апгрейд</a>
                <a href="/deposit-skins">Заявка</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
