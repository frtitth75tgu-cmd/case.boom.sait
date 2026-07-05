import Link from "next/link";
import { config } from "@/lib/config";

const names = [
  "Rookie", "Carbon", "Inferno", "Eclipse", "Titan", "Phantom", "Legacy", "Diamond", "Royal", "Emperor",
  "Aurora", "Glacier", "Venom", "Volcano", "Mirage", "Frost", "Storm", "Black Gold", "Infinity", "Dragon",
  "Cyber", "Neon", "Shadow", "Universe", "Samurai", "Pulse", "Ruby", "Sapphire", "Emerald", "Obsidian"
];

export default function CasesPage() {
  const list = Array.from({ length: 100 }, (_, i) => {
    const base = names[i % names.length];
    const price = i < 20 ? 99 + i * 50 : i < 70 ? 500 + i * 110 : [50000, 100000, 150000][i % 3];
    const colors = [
      ["#32ff62", "#075c28"], ["#ff8a2a", "#481509"], ["#4aa3ff", "#0b2c5d"], ["#ff40df", "#51215e"], ["#ffd45a", "#6d4308"], ["#9a5cff", "#241250"]
    ][i % 6];
    return { name: `${base} Case ${i + 1}`, price, colors };
  });

  return (
    <main className="page">
      <section className="panel" style={{ padding: 24 }}>
        <h1 style={{ fontSize: 44, lineHeight: 1, margin: 0, fontWeight: 1000 }}>Кейсы CaseBoom</h1>
        <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 760 }}>
          100 кейсов, поиск, фильтры, категории и цены в {config.boomCoinName}.
        </p>
        <div className="toolbar" style={{ marginTop: 18 }}>
          <input className="input" placeholder="🔍 Найти кейс, оружие или категорию..." />
          <button className="filter-btn">Все</button>
          <button className="filter-btn">Ножи</button>
          <button className="filter-btn">Перчатки</button>
          <button className="filter-btn">Дорогие</button>
        </div>
      </section>

      <div className="section-head">
        <h2>Все кейсы</h2>
      </div>

      <div className="case-grid">
        {list.map(({ name, price, colors }, i) => (
          <Link href={`/cases/${i + 1}`} className="case-card" key={name} style={{ ["--case-a" as any]: colors[0], ["--case-b" as any]: colors[1], ["--case-glow" as any]: colors[0] + "66" }}>
            <span className="case-tag" style={{ background: i > 70 ? "#ff4d6d" : i % 4 === 0 ? "#20c66b" : "#ff4d6d" }}>
              {i > 70 ? "VIP" : i % 4 === 0 ? "NEW" : "TOP"}
            </span>
            <div className="case-art"><div className="case-box" /></div>
            <h3>{name}</h3>
            <div className="case-price">{price.toLocaleString("ru-RU")} {config.boomCoinShort}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
