import Link from "next/link";
import { cases, skins, boom } from "@/data/catalog";
import { CaseCard, Section, SkinCard } from "@/components/Visuals";
import { UpgradeSelector } from "@/components/UpgradeSelector";
import { CandyStats } from "@/components/CandyStats";
import { LiveDropFeed } from "@/components/LiveDropFeed";
import { BoomCorePanel } from "@/components/BoomCore";

export default function Home(){
 const popular=cases.filter(c=>["popular","premium","knife","gloves"].includes(c.category));
 const vip=cases.filter(c=>c.category==="vip"); const bonus=cases.filter(c=>c.category==="free"||c.category==="deposit"); const top=skins.slice(0,12);
 return <main>
  <section className="market-strip">{top.map(s=><Link className="market-item" href="/cases" key={s.name} style={{"--mini":s.rarity==="Exotic"?"#ffd45a":s.rarity==="Covert"?"#ff4d6d":"#8b5cf6"} as any}><div className="market-gun"/><strong>{s.name}</strong><span>{s.price.toLocaleString("ru-RU")} {boom.short}</span></Link>)}</section>
  <div className="page">
   <section className="hero"><div className="hero-core"><div className="boom-core-big"><span className="core-ring core-ring-a" /><span className="core-ring core-ring-b" /><span className="core-ring core-ring-c" /><span className="core-pulse" /><b>CB</b></div></div><h1>CaseBoom<br/><span>Ultimate</span></h1><p>Цельная версия без патчей: быстрый Steam-вход, кейсы, скины, реальные ориентиры цен, апгрейд с выбором процента, баттлы, бонусы и заготовка под market URL.</p>
    <div className="hero-actions"><Link href="/cases" className="btn">Открыть кейсы</Link><Link href="/upgrade" className="btn secondary">Апгрейд</Link><Link href="/battles" className="btn secondary">Баттлы</Link></div>
    <div className="metrics"><div className="metric"><b>100+</b><span>кейсов в концепции</span></div><div className="metric"><b>40+</b><span>топовых скинов</span></div><div className="metric"><b>1–95%</b><span>шанс апгрейда</span></div><div className="metric"><b>URL</b><span>market provider</span></div></div>
   </section>
   <Section title="Статистика проекта"><CandyStats /></Section>
   <section className="section candy-shell"><div className="candy-panel"><h2 className="candy-title">Live Drops</h2><p className="candy-muted">Последние крупные выпадения внутри CaseBoom.</p><LiveDropFeed /></div><div className="candy-panel"><h2 className="candy-title">Boom Core Status</h2><p className="candy-muted">Ядро заряжено. Бонусы, кейсы и апгрейды работают в едином фиолетово-неоновом стиле.</p><div className="notice">Следующий этап: подключение реальной истории открытий и инвентаря через базу.</div></div></section>
   <Section title="Игровые режимы"><div className="grid">{[["📦","Кейсы","Открытие с рулеткой","/cases","#ffd45a"],["⚡","Апгрейд","Выбор процента","/upgrade","#8b5cf6"],["⚔️","Баттлы","Комнаты и сражения","/battles","#ff4d6d"],["💎","Пополнение","Заявки скинами","/deposit-skins","#62e6ff"]].map(([i,t,d,h,c])=><Link key={t} href={h} className="mode-card" style={{"--glow":c+"44"} as any}><div className="icon">{i}</div><h3>{t}</h3><p>{d}</p></Link>)}</div></Section>
   <Section title="Boom Core"><BoomCorePanel/></Section>\n   <Section title="Апгрейд с шансом"><UpgradeSelector/></Section>
   <Section title="🔥 Популярные кейсы" href="/cases"><div className="strip">{popular.map(c=><CaseCard key={c.slug} item={c}/>)}</div></Section>
   <section className="section grid3"><div className="panel" style={{padding:18}}><div className="section-head"><h2>Топ-дропы</h2></div><div className="grid2">{top.slice(0,2).map(s=><SkinCard key={s.name} item={s}/>)}</div><Link href="/cases" className="btn" style={{width:"100%",marginTop:16}}>К кейсам</Link></div>
   <div className="panel" style={{padding:18}}><div className="section-head"><h2>VIP-кейсы</h2></div><div className="table">{vip.map(c=><Link href={`/cases/${c.slug}`} className="row" key={c.slug}><div className="avatar">👑</div><div><b>{c.title}</b><br/><span style={{color:"var(--muted)"}}>{c.tag}</span></div><b style={{color:"var(--gold)"}}>{c.price.toLocaleString("ru-RU")}</b></Link>)}</div></div>
   <div className="panel" style={{padding:18}}><div className="section-head"><h2>Бонусные</h2></div><div className="table">{bonus.map(c=><Link href={`/cases/${c.slug}`} className="row" key={c.slug}><div className="avatar">🎁</div><div><b>{c.title}</b><br/><span style={{color:"var(--muted)"}}>{c.category}</span></div><b style={{color:"var(--green)"}}>FREE</b></Link>)}</div></div></section>
   <div className="notice">Цены являются ориентиром в Boom Coins. Для реального запуска подключается market API через переменную MARKET_API_URL.</div>
  </div>
 </main>
}
