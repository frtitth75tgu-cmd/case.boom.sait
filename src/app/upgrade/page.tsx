import Link from "next/link";
import { UpgradeChanceSelector } from "@/components/UpgradeChanceSelector";
import { skins } from "@/data/cs2Catalog";
import { SkinCard } from "@/components/Cs2Visuals";

export default function UpgradePage() {
  const source = skins.find((s) => s.name === "AK-47 | Redline") || skins[0];
  const targets = skins.filter((s) => s.price > source.price).slice(0, 8);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 1000 }}>Upgrade Ultimate</p>
        <h1 style={{ fontSize: 46, margin: "6px 0 0", fontWeight: 1000 }}>Апгрейд с выбором процента</h1>
        <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 760 }}>
          Пользователь выбирает шанс сам: низкий процент — можно поставить более дорогую цель, высокий процент — безопаснее, но цель дешевле.
        </p>
      </section>

      <section style={{ marginTop: 18 }}>
        <UpgradeChanceSelector />
      </section>

      <section className="case-section">
        <div className="section-head">
          <div>
            <h2>Выбор цели</h2>
            <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.50)", fontSize: 13 }}>Примеры предметов, на которые можно апгрейдиться</p>
          </div>
          <Link href="/skins" style={{ color: "#ffd45a", fontWeight: 900 }}>Каталог →</Link>
        </div>
        <div className="skin-grid">
          {targets.map((item) => <SkinCard key={item.name} item={item} />)}
        </div>
      </section>
    </main>
  );
}
