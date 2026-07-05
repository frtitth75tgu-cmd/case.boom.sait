import Link from "next/link";
import { config } from "@/lib/config";

const caseColors = [
  ["Rookie Case", "99", "#32ff62", "#075c28", "TOP"],
  ["Inferno Case", "249", "#ff8a2a", "#481509", "TOP"],
  ["Titan Case", "599", "#4aa3ff", "#0b2c5d", "TOP"],
  ["Diamond Vault", "50 000", "#ff40df", "#51215e", "TOP"],
  ["Emperor Vault", "100 000", "#ffd45a", "#6d4308", "TOP"],
  ["Legacy Vault", "150 000", "#ffcf5a", "#2e2507", "TOP"],
  ["Frost Case", "199", "#62e6ff", "#14385f", "NEW"],
  ["Cyber Case", "299", "#ff4de3", "#4b1456", "NEW"],
  ["Neon Case", "399", "#ff31c8", "#581560", "NEW"],
  ["Shadow Case", "499", "#a7a7a7", "#171a23", "NEW"],
  ["Dragon Case", "699", "#ff5b22", "#53200a", "NEW"],
  ["Universe Case", "999", "#9a5cff", "#241250", "NEW"],
];

const drops = [
  ["Timon", "Diamond Vault", "AWP | Dragon Lore", "125 000"],
  ["Danya", "Titan Case", "M4A4 | Howl", "58 750"],
  ["kostya", "Legacy Vault", "★ Karambit | Lore", "103 250"],
  ["Fenya", "Inferno Case", "AK-47 | Fire Serpent", "27 350"],
  ["Boomer", "Emperor Vault", "★ Sport Gloves", "89 600"],
];

const battles = [
  ["3 450", "4/4"],
  ["12 500", "2/2"],
  ["8 990", "3/3"],
];

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero-grid">
        <div>
          <div className="hero">
            <div className="hero-weapon" />
            <div className="hero-knife" />
            <h1>
              Открывай<br />
              <span>Сражайся</span><br />
              Улучшай
            </h1>
            <p>
              CaseBoom — честные открытия, Boom Coins, баттлы, апгрейд и выдача скинов через заявки.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, position: "relative", zIndex: 2 }}>
              <Link href="/cases" className="btn">К открытиям</Link>
              <Link href="/bonus" className="btn secondary">Бонусы</Link>
            </div>
          </div>

          <div className="toolbar panel" style={{ padding: 12 }}>
            <input className="input" placeholder="🔍 Поиск кейсов..." />
            <button className="filter-btn">🎁 Все</button>
            <button className="filter-btn">Бесплатные</button>
            <button className="filter-btn">За баллы</button>
            <button className="filter-btn">За депозит</button>
          </div>

          <div className="section-head">
            <h2>🔥 Популярные кейсы</h2>
            <Link href="/cases" style={{ color: "#ffd45a", fontWeight: 900 }}>Смотреть все →</Link>
          </div>
          <div className="case-grid">
            {caseColors.slice(0, 6).map(([name, price, a, b, tag]) => (
              <Link href="/cases" className="case-card" key={name} style={{ ["--case-a" as any]: a, ["--case-b" as any]: b, ["--case-glow" as any]: a + "66" }}>
                <span className="case-tag">{tag}</span>
                <div className="case-art"><div className="case-box" /></div>
                <h3>{name}</h3>
                <div className="case-price">{price} {config.boomCoinShort}</div>
              </Link>
            ))}
          </div>

          <div className="section-head">
            <h2>🆕 Новые кейсы</h2>
          </div>
          <div className="case-grid">
            {caseColors.slice(6, 12).map(([name, price, a, b, tag]) => (
              <Link href="/cases" className="case-card" key={name} style={{ ["--case-a" as any]: a, ["--case-b" as any]: b, ["--case-glow" as any]: a + "66" }}>
                <span className="case-tag" style={{ background: "#20c66b" }}>{tag}</span>
                <div className="case-art"><div className="case-box" /></div>
                <h3>{name}</h3>
                <div className="case-price">{price} {config.boomCoinShort}</div>
              </Link>
            ))}
          </div>

          <div className="section-head">
            <h2>🎁 Кейсы за депозит</h2>
          </div>
          <div className="case-grid">
            {["от 100", "от 500", "от 1000", "от 3000", "от 5000", "от 10000"].map((v) => (
              <div className="case-card" key={v} style={{ minHeight: 110 }}>
                <h3>За депозит {v} BC</h3>
                <div className="case-price">Бесплатно</div>
              </div>
            ))}
          </div>
        </div>

        <aside style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <div className="panel side-panel">
            <div className="panel-title">
              <span>Последние открытия</span>
              <span className="live-dot">LIVE</span>
            </div>
            <div style={{ marginTop: 10 }}>
              {drops.map(([user, box, item, price]) => (
                <div className="drop-row" key={user + item}>
                  <div className="avatar">{user[0]}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>{user}</div>
                    <div style={{ color: "rgba(255,255,255,.48)", fontSize: 12 }}>открыл {box}</div>
                    <div style={{ fontSize: 12 }}>{item}</div>
                    <div style={{ color: "#ffd45a", fontWeight: 1000, fontSize: 12 }}>{price} {config.boomCoinShort}</div>
                  </div>
                  <div className="item-thumb" />
                </div>
              ))}
            </div>
          </div>

          <div className="panel side-panel">
            <div className="panel-title">
              <span>Активные баттлы</span>
              <Link href="/battles" style={{ color: "#d98cff", fontSize: 11 }}>Смотреть все</Link>
            </div>
            {battles.map(([price, players], i) => (
              <div className="battle-row" key={price}>
                <div className="avatar">{i + 1}</div>
                <div style={{ fontWeight: 1000 }}>VS</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#ffd45a", fontWeight: 1000 }}>{price} {config.boomCoinShort}</div>
                  <div style={{ color: "rgba(255,255,255,.55)", fontSize: 12 }}>{players}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="panel side-panel">
            <div className="panel-title">Топ игроков недели</div>
            {["Extazzy", "Timon", "Fenya", "Danya", "Boomer"].map((name, i) => (
              <div className="battle-row" key={name}>
                <div className="avatar">{i + 1}</div>
                <div>{name}</div>
                <div style={{ color: "#ffd45a", fontWeight: 1000 }}>{[285450,154320,98760,86370,71540][i].toLocaleString("ru-RU")} {config.boomCoinShort}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="footer-features">
        <div className="feature"><strong>⚙️ Честные шансы</strong>Шансы отображаются до открытия.</div>
        <div className="feature"><strong>🔐 Безопасность</strong>Данные и заявки защищены.</div>
        <div className="feature"><strong>🎧 Поддержка</strong>Помощь по заявкам и выдаче.</div>
        <div className="feature"><strong>🔄 Замена</strong>Если предмета нет — аналог и возврат разницы.</div>
        <div className="feature"><strong>⚡ Fast Mode</strong>Быстрый апгрейд без долгой прокрутки.</div>
      </section>

      <div className="legal-note">
        CaseBoom позиционируется как развлекательная игровая платформа с внутренней валютой {config.boomCoinName}. Сервис не является официальным продуктом Valve/Steam. Итоговая правовая модель должна быть проверена профильным юристом перед коммерческим запуском.
      </div>
    </main>
  );
}
