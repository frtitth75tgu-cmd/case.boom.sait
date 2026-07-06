import Link from "next/link";
import { boom, CaseBox, rarityColor, Skin } from "@/data/catalog";

export function SkinCard({item}:{item:Skin}){
 const c=rarityColor(item.rarity); const icon=item.type==="knife"?"🔪":item.type==="gloves"?"🧤":item.type==="sniper"?"🎯":item.type==="pistol"?"🔫":"🔫";
 return <div className="skin-card" style={{"--rarity":c,"--rarityGlow":c+"55"} as any}>
  <div className="skin-img"><div className="skin-icon">{icon}</div>{item.type!=="gloves"&&<div className="weapon"/>}</div>
  <h3>{item.name}</h3><div className="rarity">{item.rarity}</div><div className="price">{item.price.toLocaleString("ru-RU")} {boom.short}</div>
 </div>
}
export function CaseCard({item,wide=false}:{item:CaseBox;wide?:boolean}){
 return <Link href={`/cases/${item.slug}`} className={wide?"case-card case-wide":"case-card"} style={{"--caseA":item.a+"77","--caseB":item.b} as any}>
  <span className="case-tag">{item.tag}</span>
  {wide?<><div><h3 style={{fontSize:24}}>{item.title}</h3><p style={{color:"rgba(255,255,255,.55)"}}>Реальные названия CS2-скинов и ориентиры цен.</p><div className="price">{item.price?item.price.toLocaleString("ru-RU")+" "+boom.short:"Бесплатно"}</div></div><div className="case-art"><div className="case-box"/></div></>:<>
  <div className="case-art"><div className="case-box"/></div><h3>{item.title}</h3><div className="price">{item.price?item.price.toLocaleString("ru-RU")+" "+boom.short:"Бесплатно"}</div></>}
 </Link>
}
export function Section({title,children,href}:{title:string;children:React.ReactNode;href?:string}){
 return <section className="section"><div className="section-head"><h2>{title}</h2>{href&&<Link href={href} style={{color:"var(--gold)",fontWeight:900}}>Все →</Link>}</div>{children}</section>
}
