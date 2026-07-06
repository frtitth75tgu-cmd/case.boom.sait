import Link from "next/link";
import { boom, getCase, getCaseSkins } from "@/data/catalog";
import { SkinCard } from "@/components/Visuals";
export default function CasePage({params}:{params:{slug:string}}){
 const box=getCase(params.slug); const items=getCaseSkins(params.slug);
 return <main className="page"><section className="panel" style={{padding:28}}><div className="grid2"><div><span className="case-tag" style={{position:"static"}}>{box.tag}</span><h1 style={{fontSize:52,margin:"14px 0 0"}}>{box.title}</h1><p style={{color:"var(--muted)"}}>Содержимое кейса, рулетка и цены в {boom.name}.</p><div className="actions"><Link href={`/cases/${box.slug}/open`} className="btn">Открыть за {box.price.toLocaleString("ru-RU")} {boom.short}</Link><Link href="/cases" className="btn secondary">Назад</Link></div></div><div className="case-art" style={{height:220,"--caseA":box.a+"77","--caseB":box.b} as any}><div className="case-box" style={{width:150,height:106}}/></div></div>
 <div className="roulette" style={{marginTop:24}}><div className="track">{items.concat(items).map((s,i)=><div className="roll-item" key={s.name+i}><SkinCard item={s}/></div>)}</div></div></section>
 <SectionContent title="Содержимое кейса"><div className="grid">{items.map(s=><SkinCard key={s.name} item={s}/>)}</div></SectionContent></main>
}
function SectionContent({title,children}:{title:string;children:React.ReactNode}){return <section className="section"><div className="section-head"><h2>{title}</h2></div>{children}</section>}
