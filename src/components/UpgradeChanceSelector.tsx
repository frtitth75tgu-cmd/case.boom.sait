"use client";

import { useMemo, useState } from "react";
import { config } from "@/lib/config";

const presets = [10, 25, 50, 75, 90];

export function UpgradeChanceSelector() {
  const [chance, setChance] = useState(50);
  const baseItem = 2500;

  const targetPrice = useMemo(() => {
    return Math.max(1, Math.round(baseItem / (chance / 100)));
  }, [chance]);

  const riskText = chance < 25 ? "Высокий риск / дорогая цель" : chance < 55 ? "Средний риск" : "Низкий риск / дешевле цель";

  return (
    <section className="upgrade-slider-card">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 330px", gap: 22, alignItems: "center" }}>
        <div>
          <p style={{ color: "#ffd45a", fontWeight: 1000 }}>Upgrade Chance</p>
          <h2 style={{ margin: "6px 0 0", fontSize: 38, fontWeight: 1000 }}>Выбор процента апгрейда</h2>
          <p style={{ color: "rgba(255,255,255,.58)" }}>
            Пользователь сам выбирает шанс. Чем ниже процент, тем дороже цель можно поставить. Чем выше процент — тем безопаснее, но выигрыш меньше.
          </p>

          <div className="chance-presets" style={{ marginTop: 18 }}>
            {presets.map((p) => (
              <button key={p} className={chance === p ? "chance-preset active" : "chance-preset"} onClick={() => setChance(p)}>
                {p}%
              </button>
            ))}
          </div>

          <div style={{ marginTop: 18 }}>
            <input
              type="range"
              min="1"
              max="95"
              value={chance}
              onChange={(e) => setChance(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div className="risk-meter" style={{ marginTop: 14 }}>
            <span style={{ width: `${chance}%` }} />
          </div>

          <div className="stat-grid" style={{ marginTop: 18 }}>
            <div className="stat-card"><small>Твой предмет</small><strong>{baseItem.toLocaleString("ru-RU")} {config.boomCoinShort}</strong></div>
            <div className="stat-card"><small>Выбранный шанс</small><strong>{chance}%</strong></div>
            <div className="stat-card"><small>Цель до</small><strong>{targetPrice.toLocaleString("ru-RU")} {config.boomCoinShort}</strong></div>
            <div className="stat-card"><small>Риск</small><strong style={{ fontSize: 18 }}>{riskText}</strong></div>
          </div>
        </div>

        <div className="big-upgrade-orb" style={{ ["--chanceDeg" as any]: `${Math.round(chance * 3.6)}deg` }}>
          <div>
            <strong>{chance}%</strong>
            <span style={{ color: "rgba(255,255,255,.55)" }}>шанс успеха</span>
          </div>
        </div>
      </div>
    </section>
  );
}
