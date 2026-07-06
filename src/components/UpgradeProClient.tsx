"use client";

import { useMemo, useState } from "react";
import { boom, Skin, skins } from "@/data/catalog";
import { SkinCard } from "@/components/Visuals";

const chances = [10, 25, 50, 75, 90];

export function UpgradeProClient() {
  const [chance, setChance] = useState(50);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<"idle" | "win" | "lose">("idle");

  const source = skins.find((s) => s.name === "AK-47 | Redline") || skins[0];

  const target = useMemo(() => {
    const maxPrice = Math.round(source.price / (chance / 100));
    const available = skins.filter((s) => s.price >= source.price && s.price <= maxPrice * 1.25);
    return available[available.length - 1] || skins.find((s) => s.price > source.price) || skins[0];
  }, [chance, source.price]);

  const targetLimit = Math.round(source.price / (chance / 100));

  function spin() {
    setSpinning(true);
    setResult("idle");

    setTimeout(() => {
      const roll = Math.random() * 100;
      setResult(roll <= chance ? "win" : "lose");
      setSpinning(false);
    }, 900);
  }

  return (
    <div className="upgrade-pro">
      <div className="upgrade-pro-grid">
        <div className="upgrade-slot">
          <h3 style={{ marginTop: 0 }}>Твой предмет</h3>
          <SkinCard item={source} />
        </div>

        <div className="upgrade-center">
          <div className="spin-label">{spinning ? "Крутится..." : "Крутить"}</div>

          <div className="upgrade-wheel" style={{ ["--deg" as any]: `${Math.round(chance * 3.6)}deg` }}>
            <div className="upgrade-wheel-content">
              <strong>{chance}%</strong>
              <span>шанс апгрейда</span>
            </div>
          </div>

          <div className="chance-row">
            {chances.map((item) => (
              <button
                key={item}
                type="button"
                className={chance === item ? "chance-btn active" : "chance-btn"}
                onClick={() => setChance(item)}
              >
                {item}%
              </button>
            ))}
          </div>

          <input
            type="range"
            min="1"
            max="95"
            value={chance}
            onChange={(e) => setChance(Number(e.target.value))}
            style={{ width: "100%", marginTop: 16 }}
          />

          <p style={{ color: "var(--muted)", fontSize: 13 }}>
            Цель до: <b style={{ color: "#ffd45a" }}>{targetLimit.toLocaleString("ru-RU")} {boom.short}</b>
          </p>

          <button className="btn" onClick={spin} disabled={spinning} style={{ width: "100%", marginTop: 10 }}>
            {spinning ? "Крутим..." : "Крутить"}
          </button>

          {result !== "idle" && (
            <div className="upgrade-result">
              <h3 style={{ margin: 0 }}>{result === "win" ? "Апгрейд успешен!" : "Апгрейд не прошёл"}</h3>
              <p style={{ color: "var(--muted)", marginBottom: 0 }}>
                {result === "win" ? `Получен предмет: ${target.name}` : "Предмет сгорел. Можно попробовать ещё."}
              </p>
            </div>
          )}
        </div>

        <div className="upgrade-slot">
          <h3 style={{ marginTop: 0 }}>Предмет цели</h3>
          <SkinCard item={target} />
        </div>
      </div>
    </div>
  );
}
