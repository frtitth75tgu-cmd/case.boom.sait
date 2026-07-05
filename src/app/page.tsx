import Link from "next/link";
import { config } from "@/lib/config";
import { CaseSection, CaseVisual, showcaseCases } from "@/components/CaseShowcase";

function MiniSkin({ name, price }: { name: string; price: string }) {
  return (
    <div className="skin-card">
      <div className="skin-image"><div style={{fontSize:32}}>🔫</div></div>
      <div className="skin-name">{name}</div>
      <div className="skin-price">{price} {config.boomCoinShort}</div>
    </div>
  );
}

const minis = [
  ["AK-47 | Neon Rider", "2 450", "#ff4d6d"],
  ["AWP | Dragon Lore", "115 000", "#ffd45a"],
  ["M4A4 | Howl", "85 000", "#ff8a2a"],
  ["Karambit | Fade", "145 000", "#ff4de3"],
  ["Butterfly | Doppler", "128 000", "#8b5cf6"],
  ["USP-S | Kill Confirmed", "9 000", "#ff4d6d"],
  ["Glock-18 | Gamma", "2 700", "#62ff9b"],
  ["M4A1-S | Printstream", "14 500", "#e9eefc"],
  ["AK-47 | Asiimov", "18 500", "#ff8a2a"],
  ["AWP | Medusa", "35 000", "#62e6ff"],
  ["Sport Gloves | Pandora", "98 000", "#8b5cf6"],
];

export default function HomePage() {
  const popular = showcaseCases.slice(3, 10);
  const vip = showcaseCases.filter((c) => c.price >= 50000);
  const bonus = showcaseCases.filter((c) => c.price === 0).concat([
    { name: "Deposit Gold", price: 0, tag: "DEPOSIT", a: "#ffd45a", b: "#6d4308" },
    { name: "Daily Farm", price: 0, tag: "FREE", a: "#62ff9b", b: "#0d3f24" },
  ]);

  return (
    <main>
      <section className="market-strip">
        {minis.map(([name, price, color]) => (
          <div key={name} className="market-mini" style={{ ["--mini" as any]: color }}>
            <div className="gun" />
            <strong>{name}</strong>
            <span>{price} {config.boomCoinShort}</span>
          </div>
        ))}
      </section>

      <div className="page">
        <section className="final-grid">
          <div>
            <div className="final-hero">
              <div className="dragon">🐉</div>
              <h1 className="final-title">Новый кейс<br /><span>Dragon</span></h1>
              <p>Финальный стиль CaseBoom: кейсы, рулетка, апгрейд, сражения, бонусы, инвентарь и админ-панель.</p>
              <div style={{display:"flex",gap:12,marginTop:24,position:"relative",zIndex:3}}>
                <Link href="/cases/dragon-case" className="btn">Открыть кейс</Link>
                <Link href="/cases" className="btn secondary">Все кейсы</Link>
              </div>
            </div>

            <section className="case-section">
              <div className="section-head"><h2>Лучшие кейсы</h2><Link href="/cases" style={{color:"#ffd45a",fontWeight:900}}>Все →</Link></div>
              <div className="case-strip">{popular.map((item) => <CaseVisual key={item.name} item={item} />)}</div>
            </section>
          </div>

          <aside className="right-stack">
            <div className="roulette-panel">
              <div className="panel-title"><span>Рулетка</span><span style={{color:"#ffd45a"}}>132 участника</span></div>
              <div className="side-roulette" style={{marginTop:12}}>
                <div className="side-track">
                  {minis.concat(minis).slice(0,12).map(([name, price, color], i) => (
                    <div className="side-item" key={name+i} style={{borderColor: color+"66"}}>
                      <div>🔫</div><div>{String(name).split("|")[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn" style={{width:"100%",marginTop:14}}>Участвовать за 100 {config.boomCoinShort}</button>
            </div>

            <div className="roulette-panel">
              <div className="panel-title">Бонусы</div>
              <div className="admin-preview-grid" style={{gridTemplateColumns:"repeat(3,1fr)",marginTop:12}}>
                {["Daily","Промокод","Депозит"].map((x) => (
                  <Link href="/bonus" className="admin-preview-card" style={{minHeight:110,padding:12}} key={x}>
                    <div style={{fontSize:28}}>🎁</div><strong>{x}</strong>
                  </Link>
                ))}
              </div>
            </div>

            <div className="roulette-panel">
              <div className="panel-title">Топ игроков</div>
              <div className="final-table">
                {[["Light","AWP Dragon Lore","115 000"],["Dante","Karambit Fade","145 000"],["Scream","M4A4 Howl","85 000"]].map(([u,item,price],i) => (
                  <div className="final-table-row" key={u}>
                    <div className="avatar">{i+1}</div>
                    <div><strong>{u}</strong><div style={{color:"rgba(255,255,255,.45)",fontSize:12}}>{item}</div></div>
                    <strong style={{color:"#ffd45a"}}>{price}</strong>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="final-row">
          <div className="final-block">
            <div className="panel-title">Апгрейд</div>
            <div className="upgrade-preview" style={{marginTop:18}}>
              <MiniSkin name="AK-47 | Fire Serpent" price="42 000" />
              <div className="upgrade-preview-circle">48.62%</div>
              <MiniSkin name="M4A4 | Howl" price="85 000" />
            </div>
            <Link href="/upgrade" className="btn" style={{width:"100%",marginTop:16}}>Улучшить</Link>
          </div>

          <div className="final-block">
            <div className="panel-title">Сражения</div>
            <div className="final-table">
              {["Dragon Battle","Knife Clash","VIP Room","Fast Duel"].map((x,i)=>(
                <div className="final-table-row" key={x}>
                  <div className="avatar">VS</div>
                  <div><strong>{x}</strong><div style={{color:"rgba(255,255,255,.45)",fontSize:12}}>{i+1}/4 игроков</div></div>
                  <Link href="/battles" style={{color:"#ffd45a",fontWeight:900}}>Смотреть</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="final-block">
            <div className="panel-title">Инвентарь</div>
            <div className="skin-grid" style={{gridTemplateColumns:"repeat(2,1fr)",marginTop:12}}>
              <MiniSkin name="Karambit | Fade" price="145 000" />
              <MiniSkin name="AWP | Dragon Lore" price="115 000" />
            </div>
            <Link href="/profile" className="btn secondary" style={{width:"100%",marginTop:16}}>Открыть профиль</Link>
          </div>
        </section>

        <section className="case-section">
          <div className="section-head"><h2>VIP-кейсы</h2></div>
          <div className="case-row-grid">{vip.map((item) => <CaseVisual key={item.name} item={item} wide />)}</div>
        </section>

        <CaseSection title="🎁 Бесплатные и за депозит" items={bonus} />

        <section className="case-section">
          <div className="section-head"><h2>Админ-панель</h2></div>
          <div className="admin-preview-grid">
            {[["📦","Кейсы","Создание и редактирование"],["🎯","Шансы","Проверка суммы 100%"],["💎","Скины","Пополнения и заявки"],["🎟️","Промокоды","Бонусы и акции"]].map(([icon,title,text])=>(
              <Link href="/admin" className="admin-preview-card" key={title}>
                <div style={{fontSize:36}}>{icon}</div>
                <h3 style={{margin:"12px 0 6px"}}>{title}</h3>
                <p style={{color:"rgba(255,255,255,.50)"}}>{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="legal-note">CaseBoom — развлекательная игровая платформа с внутренней валютой {config.boomCoinName}. Не является официальным продуктом Valve/Steam.</div>
      </div>
    </main>
  );
}
