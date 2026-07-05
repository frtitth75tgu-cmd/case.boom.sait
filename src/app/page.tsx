import Link from "next/link";
import { config } from "@/lib/config";
import { cases, skins } from "@/data/cs2Catalog";
import { CaseCard, CaseWide, SkinCard } from "@/components/Cs2Visuals";
import { UpgradeChanceSelector } from "@/components/UpgradeChanceSelector";

export default function HomePage() {
  const vip = cases.filter((c) => c.category === "vip");
  const popular = cases.filter((c) => ["popular", "premium", "knife", "gloves"].includes(c.category)).slice(0, 8);
  const bonus = cases.filter((c) => c.category === "free" || c.category === "deposit");
  const topSkins = skins.slice(0, 12);

  return (
    <main>
      <section className="market-strip">
        {topSkins.map((item) => (
          <Link href="/skins" key={item.name} className="market-mini" style={{ ["--mini" as any]: item.rarity === "Exotic" ? "#ffd45a" : item.rarity === "Covert" ? "#ff4d6d" : "#8b5cf6" }}>
            <div className="gun" />
            <strong>{item.name}</strong>
            <span>{item.price.toLocaleString("ru-RU")} {config.boomCoinShort}</span>
          </Link>
        ))}
      </section>

      <div className="page">
        <section className="ultimate-hero">
          <h1 className="ultimate-title">CaseBoom<br /><span>Ultimate</span></h1>
          <p className="ultimate-subtitle">
            Мощная версия проекта: кейсы, скины, реальные ориентиры цен, апгрейд с выбором процента, баттлы, бонусы, промокоды и админка.
          </p>
          <div className="ultimate-actions">
            <Link href="/cases" className="btn">Открыть кейсы</Link>
            <Link href="/upgrade" className="btn secondary">Апгрейд</Link>
            <Link href="/battles" className="btn secondary">Баттлы</Link>
            <Link href="/skins" className="btn secondary">Скины</Link>
          </div>
          <div className="ultimate-metrics">
            <div className="metric-card"><strong>100+</strong><span>кейсов в концепции</span></div>
            <div className="metric-card"><strong>40+</strong><span>топовых скинов</span></div>
            <div className="metric-card"><strong>1–95%</strong><span>шанс апгрейда</span></div>
            <div className="metric-card"><strong>BC</strong><span>Boom Coins</span></div>
          </div>
        </section>

        <section className="case-section">
          <div className="section-head"><h2>Игровые режимы</h2></div>
          <div className="mode-grid">
            {[
              ["📦", "Кейсы", "Открытие кейсов с рулеткой и шансами", "/cases", "#ffd45a"],
              ["⚡", "Апгрейд", "Выбор процента: 10%, 25%, 50%, 75%, 90%", "/upgrade", "#8b5cf6"],
              ["⚔️", "Баттлы", "Комнаты 1×1, 2×2 и приватные бои", "/battles", "#ff4d6d"],
              ["💎", "Пополнение", "Пополнение скинами через заявки", "/deposit-skins", "#62e6ff"],
            ].map(([icon, title, text, href, color]) => (
              <Link href={href} className="mode-card" style={{ ["--mode" as any]: color + "44" }} key={title}>
                <div className="mode-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="case-section">
          <UpgradeChanceSelector />
        </section>

        <section className="case-section">
          <div className="section-head"><h2>🔥 Популярные кейсы</h2><Link href="/cases" style={{ color: "#ffd45a", fontWeight: 900 }}>Все →</Link></div>
          <div className="case-strip">{popular.map((item) => <CaseCard key={item.slug} item={item} />)}</div>
        </section>

        <section className="final-row">
          <div className="final-block">
            <div className="panel-title">Топовые скины</div>
            <div className="skin-grid" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 12 }}>
              {topSkins.slice(0, 2).map((item) => <SkinCard key={item.name} item={item} />)}
            </div>
            <Link href="/skins" className="btn" style={{ width: "100%", marginTop: 16 }}>Все скины</Link>
          </div>

          <div className="final-block">
            <div className="panel-title">VIP-кейсы</div>
            <div className="ultimate-table">
              {vip.map((c) => (
                <Link href={`/cases/${c.slug}`} className="ultimate-row" key={c.slug}>
                  <div className="avatar">👑</div>
                  <div><strong>{c.title}</strong><div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>{c.tag}</div></div>
                  <strong style={{ color: "#ffd45a" }}>{c.price.toLocaleString("ru-RU")}</strong>
                </Link>
              ))}
            </div>
          </div>

          <div className="final-block">
            <div className="panel-title">Бонусные кейсы</div>
            <div className="ultimate-table">
              {bonus.map((c) => (
                <Link href={`/cases/${c.slug}`} className="ultimate-row" key={c.slug}>
                  <div className="avatar">🎁</div>
                  <div><strong>{c.title}</strong><div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>{c.category}</div></div>
                  <strong style={{ color: "#62ff9b" }}>FREE</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="section-head"><h2>👑 Большие кейсы</h2></div>
          <div className="case-row-grid">{vip.map((item) => <CaseWide key={item.slug} item={item} />)}</div>
        </section>

        <div className="legal-note">
          Цены являются рыночным ориентиром. Для реального запуска подключается market API и автоматическое обновление.
        </div>
      </div>
    </main>
  );
}
