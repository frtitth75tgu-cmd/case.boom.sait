import { config } from "@/lib/config";
import { SkinCard } from "@/components/SkinCard";

const left = ["AK-47 | Redline", "Restricted", 850] as const;
const right = ["AWP | Asiimov", "Covert", 4300] as const;

export default function UpgradePage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Upgrade</p>
        <h1 style={{ fontSize: 46, margin: "6px 0 0", fontWeight: 1000 }}>Апгрейд предметов</h1>
        <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 760 }}>
          Новый дизайн апгрейда с обычной анимацией и Fast Mode для быстрой прокрутки.
        </p>
      </section>

      <section className="panel" style={{ padding: 24, marginTop: 18 }}>
        <div className="upgrade-arena">
          <SkinCard name={left[0]} rarity={left[1]} price={left[2]} />
          <div>
            <div className="upgrade-orb"><span>19.76%</span></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
              <button className="btn">Апгрейд</button>
              <button className="btn secondary">⚡ Fast Mode</button>
            </div>
          </div>
          <SkinCard name={right[0]} rarity={right[1]} price={right[2]} />
        </div>
      </section>

      <section className="case-section">
        <div className="section-head"><h2>История апгрейдов</h2></div>
        <div className="panel" style={{ padding: 14 }}>
          {["Успех · AWP | Asiimov", "Неудача · M4A1-S | Printstream", "Успех · AK-47 | Vulcan"].map((x, i) => (
            <div className="battle-row" key={x}>
              <div className="avatar">{i + 1}</div>
              <div style={{ gridColumn: "span 2", fontWeight: 900 }}>{x}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
