"use client";

import { useMemo, useState } from "react";
import { boom, Skin } from "@/data/catalog";
import { SkinCard } from "@/components/Visuals";

export function CaseOpeningClient({ items, caseTitle }: { items: Skin[]; caseTitle: string }) {
  const [opened, setOpened] = useState(false);
  const [fast, setFast] = useState(false);
  const [winner, setWinner] = useState<Skin | null>(null);

  const tape = useMemo(() => {
    const list: Skin[] = [];
    for (let i = 0; i < 4; i++) list.push(...items);
    return list;
  }, [items]);

  function openCase() {
    const sorted = [...items].sort((a, b) => a.price - b.price);
    const roll = Math.random();
    const win =
      roll > 0.985 ? sorted[sorted.length - 1] :
      roll > 0.94 ? sorted[Math.max(0, sorted.length - 2)] :
      roll > 0.72 ? sorted[Math.floor(sorted.length / 2)] :
      sorted[Math.floor(Math.random() * Math.min(5, sorted.length))];

    setOpened(false);
    setWinner(null);
    setTimeout(() => {
      setWinner(win);
      setOpened(true);
    }, fast ? 350 : 1400);
  }

  return (
    <div className="opening-live">
      <div className="opening-top">
        <div>
          <p style={{ color: "var(--gold)", fontWeight: 1000, margin: 0 }}>Case Opening</p>
          <h2>{caseTitle}</h2>
        </div>
        <label className="fast-toggle">
          <input type="checkbox" checked={fast} onChange={(e) => setFast(e.target.checked)} />
          Fast Mode
        </label>
      </div>

      <div className={fast ? "roulette live fast" : "roulette live"}>
        <div className="track">
          {tape.map((s, i) => (
            <div className="roll-item" key={s.name + i}>
              <SkinCard item={s} />
            </div>
          ))}
        </div>
      </div>

      <div className="actions" style={{ justifyContent: "center" }}>
        <button className="btn" onClick={openCase}>Открыть кейс</button>
        <button className="btn secondary" onClick={() => { setWinner(null); setOpened(false); }}>Сброс</button>
      </div>

      {opened && winner && (
        <div className="win-panel">
          <div className="win-glow">✦</div>
          <h2>Выпал предмет</h2>
          <div className="win-item">
            <SkinCard item={winner} />
          </div>
          <div className="price" style={{ fontSize: 30 }}>{winner.price.toLocaleString("ru-RU")} {boom.short}</div>
          <div className="actions" style={{ justifyContent: "center" }}>
            <a className="btn" href="/profile">В инвентарь</a>
            <a className="btn secondary" href="/upgrade">В апгрейд</a>
          </div>
        </div>
      )}
    </div>
  );
}
