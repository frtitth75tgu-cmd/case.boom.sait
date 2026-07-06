import { UpgradeSelector } from "@/components/UpgradeSelector";
import { skins } from "@/data/catalog";
import { SkinCard } from "@/components/Visuals";
export default function Upgrade(){const targets=skins.filter(s=>s.price>2500).slice(0,8);return <main className="page"><section className="panel" style={{padding:28}}><h1 style={{fontSize:46,margin:0}}>Апгрейд</h1><p style={{color:"var(--muted)"}}>Выбирай процент шанса сам: 10%, 25%, 50%, 75%, 90% или ползунком.</p></section><section className="section"><UpgradeSelector/></section><section className="section"><div className="section-head"><h2>Цели для апгрейда</h2></div><div className="grid">{targets.map(s=><SkinCard key={s.name} item={s}/>)}</div></section></main>}
