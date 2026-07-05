import Link from "next/link";
import { config } from "@/lib/config";
import { CaseSection, CaseVisual, showcaseCases } from "@/components/CaseShowcase";

const baseCategories = [
  ["🎁", "Бесплатные", "Daily, welcome и бонусы", "#62ff9b", "#0d3f24"],
  ["💎", "За депозит", "Bronze, Silver, Gold, Diamond", "#4aa3ff", "#0b2c5d"],
  ["🔫", "Оружие", "AWP, AK-47, M4, Pistols", "#ff8a2a", "#481509"],
  ["🔪", "Ножи", "Knife Hunter и VIP-дроп", "#ffd45a", "#6d4308"],
  ["🧤", "Перчатки", "Glove Vault и редкие перчатки", "#ff7a2a", "#5e240e"],
  ["👑", "VIP", "Diamond / Emperor / Legacy", "#ff40df", "#51215e"],
];

const generated = Array.from({ length: 84 }, (_, i) => {
  const names = ["Rookie", "Carbon", "Inferno", "Eclipse", "Titan", "Phantom", "Aurora", "Glacier", "Storm", "Cyber", "Neon", "Shadow"];
  const colors = [["#32ff62","#075c28"],["#ff8a2a","#481509"],["#4aa3ff","#0b2c5d"],["#ff40df","#51215e"],["#ffd45a","#6d4308"],["#9a5cff","#241250"]][i % 6];
  return {
    name: `${names[i % names.length]} Case ${i + 1}`,
    price: i < 20 ? 49 + i * 25 : i < 60 ? 500 + i * 80 : 5000 + i * 400,
    tag: i % 5 === 0 ? "NEW" : i % 3 === 0 ? "TOP" : "CASE",
    a: colors[0],
    b: colors[1],
  };
});

const all = showcaseCases.concat(generated);
const sections = [
  ["🎁 Бесплатные и бонусные", all.filter((c) => c.price === 0 || c.tag === "FREE" || c.tag === "DEPOSIT").concat(generated.slice(0, 6))],
  ["🔥 Популярные", all.filter((c) => c.tag === "TOP" || c.tag === "HOT").slice(0, 14)],
  ["🔫 Бюджетные", all.filter((c) => c.price > 0 && c.price <= 500).slice(0, 14)],
  ["💎 Средние", all.filter((c) => c.price > 500 && c.price <= 3000).slice(0, 14)],
  ["🔪 Ножи и перчатки", all.filter((c) => c.tag === "KNIFE" || c.tag === "GLOVES").concat(generated.slice(30, 38))],
  ["👑 VIP и дорогие", all.filter((c) => c.price >= 5000).slice(0, 14)],
];

export default function CasesPage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 24 }}>
        <h1 style={{ fontSize: 46, lineHeight: 1, margin: 0, fontWeight: 1000 }}>Кейсы CaseBoom</h1>
        <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 760 }}>
          Кейсы разложены по разделам, а не свалены в одну сетку. Так пользователю проще выбрать нужную категорию.
        </p>

        <div className="toolbar" style={{ marginTop: 18 }}>
          <input className="input" placeholder="🔍 Поиск кейса, оружия или категории..." />
          <button className="filter-btn">Все</button>
          <button className="filter-btn">До 500 BC</button>
          <button className="filter-btn">VIP</button>
          <button className="filter-btn">Бесплатные</button>
        </div>

        <div className="price-range-tabs" style={{ marginTop: 14 }}>
          {["Все", "0 BC", "до 100 BC", "100–500 BC", "500–3000 BC", "VIP 50k+", "Ножи", "Перчатки"].map((x) => <button key={x}>{x}</button>)}
        </div>
      </section>

      <section className="case-section">
        <div className="section-head"><h2>Категории</h2></div>
        <div className="category-grid">
          {baseCategories.map(([icon, title, text, a, b]) => (
            <Link href="/cases" className="category-card" key={title} style={{ ["--cat-a" as any]: a, ["--cat-b" as any]: b, ["--cat-glow" as any]: a + "66" }}>
              <div className="icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>

      {sections.map(([title, items]) => (
        <CaseSection key={title as string} title={title as string} items={items as any} />
      ))}

      <section className="case-section">
        <div className="section-head">
          <div>
            <h2>Главные VIP-кейсы</h2>
            <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.50)", fontSize: 13 }}>Отдельный большой блок, чтобы дорогие кейсы выглядели как премиум-витрина.</p>
          </div>
        </div>
        <div className="case-row-grid">
          {showcaseCases.filter((c) => c.price >= 50000).map((item) => <CaseVisual key={item.name} item={item} wide />)}
        </div>
      </section>
    </main>
  );
}
