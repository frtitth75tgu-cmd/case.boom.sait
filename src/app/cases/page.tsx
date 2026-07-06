import { cases } from "@/data/catalog";
import { CaseCard, Section } from "@/components/Visuals";
export default function Cases(){
 const groups=[["🎁 Бесплатные и депозит",["free","deposit"]],["🔥 Популярные",["budget","popular"]],["🔪 Ножи и перчатки",["premium","knife","gloves"]],["👑 VIP",["vip"]]] as const;
 return <main className="page"><section className="panel" style={{padding:24}}><h1 style={{fontSize:46,margin:0}}>Кейсы CaseBoom</h1><p style={{color:"var(--muted)"}}>Каталог кейсов без битых ссылок.</p><div className="actions"><input className="input" placeholder="🔍 Поиск кейса..."/><button className="btn secondary">Все</button><button className="btn secondary">VIP</button></div></section>
 {groups.map(([title,cats])=><Section key={title} title={title}><div className="strip">{cases.filter(c=>cats.includes(c.category as any)).map(c=><CaseCard key={c.slug} item={c}/>)}</div></Section>)}</main>
}
