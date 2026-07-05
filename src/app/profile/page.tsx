import { config } from "@/lib/config";
import { SkinCard } from "@/components/SkinCard";

export default function ProfilePage() {
  return (
    <main className="page">
      <section className="profile-grid">
        <aside className="profile-hero">
          <div className="avatar" style={{ width: 84, height: 84, fontSize: 34 }}>T</div>
          <h1 style={{ fontSize: 34, margin: "16px 0 0", fontWeight: 1000 }}>Timon</h1>
          <p style={{ color: "rgba(255,255,255,.55)" }}>Level 17 · CaseBoom Player</p>
          <div className="level-bar"><span style={{ width: "62%" }} /></div>
          <div style={{ marginTop: 10, color: "rgba(255,255,255,.45)", fontSize: 13 }}>620 / 1000 XP</div>

          <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
            <button className="btn">Пополнить скинами</button>
            <button className="btn secondary">Настроить трейд-ссылку</button>
          </div>
        </aside>

        <div>
          <div className="stat-grid">
            <div className="stat-card"><small>Баланс</small><strong>15 450 {config.boomCoinShort}</strong></div>
            <div className="stat-card"><small>Открыто кейсов</small><strong>248</strong></div>
            <div className="stat-card"><small>Лучший дроп</small><strong>125K</strong></div>
            <div className="stat-card"><small>Баттлы</small><strong>37</strong></div>
          </div>

          <section className="case-section">
            <div className="section-head"><h2>Инвентарь</h2></div>
            <div className="skin-grid">
              <SkinCard name="AK-47 | Redline" rarity="Restricted" price={850} />
              <SkinCard name="AWP | Asiimov" rarity="Covert" price={4300} />
              <SkinCard name="M4A1-S | Printstream" rarity="Covert" price={9800} />
              <SkinCard name="★ Karambit | Doppler" rarity="Exotic" price={115000} />
              <SkinCard name="USP-S | Cortex" rarity="Classified" price={740} />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
