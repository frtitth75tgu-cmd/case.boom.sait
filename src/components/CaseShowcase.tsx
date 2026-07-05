import Link from "next/link";
import { config } from "@/lib/config";

export type ShowcaseCase = {
  name: string;
  price: number;
  tag: string;
  a: string;
  b: string;
  href?: string;
};

export const showcaseCases: ShowcaseCase[] = [
  { name: "Rookie Case", price: 49, tag: "START", a: "#32ff62", b: "#075c28" },
  { name: "Daily Drop", price: 0, tag: "FREE", a: "#62e6ff", b: "#14385f" },
  { name: "Bronze Deposit", price: 0, tag: "DEPOSIT", a: "#d48745", b: "#3b1b07" },
  { name: "Inferno Case", price: 249, tag: "HOT", a: "#ff8a2a", b: "#481509" },
  { name: "Carbon Case", price: 299, tag: "NEW", a: "#c9d3e6", b: "#161b26" },
  { name: "Mirage Case", price: 399, tag: "TOP", a: "#e9c77b", b: "#383016" },
  { name: "Titan Case", price: 599, tag: "TOP", a: "#4aa3ff", b: "#0b2c5d" },
  { name: "Phantom Case", price: 799, tag: "TOP", a: "#9a5cff", b: "#241250" },
  { name: "Dragon Case", price: 999, tag: "HOT", a: "#ff5b22", b: "#53200a" },
  { name: "Neon Case", price: 1299, tag: "NEW", a: "#ff31c8", b: "#581560" },
  { name: "Black Gold", price: 2499, tag: "VIP", a: "#ffd45a", b: "#14110a" },
  { name: "Knife Hunter", price: 4999, tag: "KNIFE", a: "#ffe176", b: "#624109" },
  { name: "Glove Vault", price: 6999, tag: "GLOVES", a: "#ff7a2a", b: "#5e240e" },
  { name: "Diamond Vault", price: 50000, tag: "50K", a: "#ff40df", b: "#51215e" },
  { name: "Emperor Vault", price: 100000, tag: "100K", a: "#ffd45a", b: "#6d4308" },
  { name: "Legacy Vault", price: 150000, tag: "150K", a: "#ffcf5a", b: "#2e2507" },
];

export function CaseVisual({ item, wide = false }: { item: ShowcaseCase; wide?: boolean }) {
  return (
    <Link
      href={item.href || "/cases"}
      className={wide ? "case-card case-wide" : "case-card"}
      style={{ ["--case-a" as any]: item.a, ["--case-b" as any]: item.b, ["--case-glow" as any]: item.a + "66" }}
    >
      <span className="case-tag" style={{ background: item.tag === "FREE" ? "#20c66b" : item.tag === "DEPOSIT" ? "#4aa3ff" : "#ff4d6d" }}>{item.tag}</span>
      {wide ? (
        <>
          <div>
            <h3 style={{ fontSize: 24 }}>{item.name}</h3>
            <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, marginTop: 7 }}>
              Специальный кейс CaseBoom с прозрачными шансами и выдачей предметов.
            </p>
            <div className="case-price">{item.price === 0 ? "Бесплатно" : `${item.price.toLocaleString("ru-RU")} ${config.boomCoinShort}`}</div>
          </div>
          <div className="case-wide-art"><div className="case-box" /></div>
        </>
      ) : (
        <>
          <div className="case-art"><div className="case-box" /></div>
          <h3>{item.name}</h3>
          <div className="case-price">{item.price === 0 ? "Бесплатно" : `${item.price.toLocaleString("ru-RU")} ${config.boomCoinShort}`}</div>
        </>
      )}
    </Link>
  );
}

export function CaseSection({ title, subtitle, items }: { title: string; subtitle?: string; items: ShowcaseCase[] }) {
  return (
    <section className="case-section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.50)", fontSize: 13 }}>{subtitle}</p>}
        </div>
        <Link href="/cases" style={{ color: "#ffd45a", fontWeight: 900 }}>Все →</Link>
      </div>
      <div className="case-strip">
        {items.map((item) => <CaseVisual key={item.name} item={item} />)}
      </div>
    </section>
  );
}
