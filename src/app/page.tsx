import Link from "next/link";
import { config } from "@/lib/config";
import { CaseSection, CaseVisual, showcaseCases } from "@/components/CaseShowcase";

const popular = showcaseCases.slice(3, 10);
const free = showcaseCases.filter((c) => c.tag === "FREE" || c.tag === "DEPOSIT").concat([
  { name: "Silver Deposit", price: 0, tag: "DEPOSIT", a: "#c9d3e6", b: "#283140" },
  { name: "Gold Deposit", price: 0, tag: "DEPOSIT", a: "#ffd45a", b: "#6d4308" },
  { name: "Daily Bonus Case", price: 0, tag: "FREE", a: "#62ff9b", b: "#0d3f24" },
]);
const premium = showcaseCases.filter((c) => c.price >= 999 && c.price < 50000);
const expensive = showcaseCases.filter((c) => c.price >= 50000);
const weapons = [
  { name: "AWP Collection", price: 899, tag: "AWP", a: "#62e6ff", b: "#14385f" },
  { name: "AK-47 Collection", price: 799, tag: "AK", a: "#ff8a2a", b: "#481509" },
  { name: "M4 Collection", price: 699, tag: "M4", a: "#4aa3ff", b: "#0b2c5d" },
  { name: "Pistol Pack", price: 199, tag: "LOW", a: "#32ff62", b: "#075c28" },
  { name: "Knife Hunter", price: 4999, tag: "KNIFE", a: "#ffe176", b: "#624109" },
  { name: "Glove Vault", price: 6999, tag: "GLOVES", a: "#ff7a2a", b: "#5e240e" },
];

const drops = [
  ["Timon", "Diamond Vault", "AWP | Dragon Lore", "125 000"],
  ["Danya", "Titan Case", "M4A4 | Howl", "58 750"],
  ["kostya", "Legacy Vault", "★ Karambit | Lore", "103 250"],
  ["Fenya", "Inferno Case", "AK-47 | Fire Serpent", "27 350"],
  ["Boomer", "Emperor Vault", "★ Sport Gloves", "89 600"],
];

const categories = [
  ["🎁", "Бесплатные", "Daily и бонусные", "#62ff9b", "#0d3f24"],
  ["💎", "За депозит", "Награды за пополнение", "#4aa3ff", "#0b2c5d"],
  ["🔪", "Ножи", "Кейсы с knife-дропом", "#ffd45a", "#6d4308"],
  ["🧤", "Перчатки", "Gloves-серия", "#ff7a2a", "#5e240e"],
  ["🔥", "Популярные", "Самые открываемые", "#ff4d6d", "#521525"],
  ["👑", "Дорогие", "50k / 100k / 150k", "#ff40df", "#51215e"],
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
              Кейсы не в куче<br />
              <span>а по разделам</span><br />
              как на сервисе
            </h1>
            <p>
              CaseBoom — витрина кейсов по категориям: бесплатные, за депозит, популярные, оружейные, ножи, перчатки и VIP.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, position: "relative", zIndex: 2 }}>
              <Link href="/cases" className="btn">Смотреть кейсы</Link>
              <Link href="/deposit-skins" className="btn secondary">Пополнить скинами</Link>
            </div>
          </div>

          <div className="toolbar panel" style={{ padding: 12 }}>
            <input className="input" placeholder="🔍 Найти кейс, предмет или категорию..." />
            <button className="filter-btn">Все</button>
            <button className="filter-btn">Ножи</button>
            <button className="filter-btn">Перчатки</button>
            <button className="filter-btn">VIP</button>
          </div>

          <section className="case-section">
            <div className="section-head"><h2>Категории</h2></div>
            <div className="category-grid">
              {categories.map(([icon, title, text, a, b]) => (
                <Link href="/cases" className="category-card" key={title} style={{ ["--cat-a" as any]: a, ["--cat-b" as any]: b, ["--cat-glow" as any]: a + "66" }}>
                  <div className="icon">{icon}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="case-section">
            <div className="section-head">
              <div>
                <h2>Главные кейсы</h2>
                <p style={{ margin: "5px 0 0", color: "rgba(255,255,255,.50)", fontSize: 13 }}>Крупные карточки для главной витрины</p>
              </div>
            </div>
            <div className="case-row-grid">
              {expensive.map((item) => <CaseVisual key={item.name} item={item} wide />)}
            </div>
          </section>

          <CaseSection title="🔥 Популярные кейсы" subtitle="Самые открываемые на витрине" items={popular} />
          <CaseSection title="🎁 Бесплатные и за депозит" subtitle="Daily, welcome и бонусы за пополнение" items={free} />
          <CaseSection title="🔫 Оружейные коллекции" subtitle="AWP, AK-47, M4, пистолеты, ножи и перчатки" items={weapons} />
          <CaseSection title="💎 Премиум и VIP" subtitle="Дорогие кейсы и редкие категории" items={premium.concat(expensive)} />
        </div>

        <aside style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <div className="panel side-panel">
            <div className="panel-title"><span>Последние открытия</span><span className="live-dot">LIVE</span></div>
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
            <div className="panel-title">Быстрые разделы</div>
            {["Бесплатный кейс", "Пополнить скинами", "Апгрейд Fast Mode", "Создать баттл", "Правила замены"].map((name, i) => (
              <Link href={["/bonus","/deposit-skins","/upgrade","/battles","/replacement-rules"][i]} className="battle-row" key={name}>
                <div className="avatar">{i + 1}</div>
                <div style={{ gridColumn: "span 2", fontWeight: 900 }}>{name}</div>
              </Link>
            ))}
          </div>

          <div className="panel side-panel">
            <div className="panel-title">Экономика</div>
            <p style={{ color: "rgba(255,255,255,.58)", fontSize: 13 }}>
              Все игровые цены показаны в {config.boomCoinName}. При замене недоступного предмета разница возвращается на внутренний баланс.
            </p>
          </div>
        </aside>
      </section>

      <section className="footer-features">
        <div className="feature"><strong>⚙️ Честные шансы</strong>Показываем вероятности до открытия.</div>
        <div className="feature"><strong>🔍 Поиск</strong>Кейсы можно искать по названию и категории.</div>
        <div className="feature"><strong>🎁 Бонусы</strong>Daily, депозитные и промокоды.</div>
        <div className="feature"><strong>🔄 Замена</strong>Аналог и возврат разницы в BC.</div>
        <div className="feature"><strong>💎 Скины</strong>Пополнение скинами через заявки.</div>
      </section>

      <div className="legal-note">
        CaseBoom позиционируется как развлекательная игровая платформа с внутренней валютой {config.boomCoinName}. Итоговая правовая модель должна быть проверена профильным юристом перед коммерческим запуском.
      </div>
    </main>
  );
}
