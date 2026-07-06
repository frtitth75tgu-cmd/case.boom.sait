import { skins, boom } from "@/data/catalog";
import { InventorySellClient } from "@/components/InventorySellClient";

export default function Profile() {
  const inv = skins.slice(0, 8);
  const total = inv.reduce((s, x) => s + x.price, 0);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 46, margin: 0 }}>Профиль</h1>
        <p style={{ color: "var(--muted)" }}>
          Инвентарь, продажа предметов, заявки и апгрейд.
        </p>

        <div className="inventory-stat">
          <div className="metric"><b>{inv.length}</b><span>предметов</span></div>
          <div className="metric"><b>{total.toLocaleString("ru-RU")}</b><span>стоимость инвентаря {boom.short}</span></div>
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

        <div style={{ marginTop: 14 }}>
          <InventorySellClient items={inv} />
        </div>
      </section>
    </main>
  );
}
