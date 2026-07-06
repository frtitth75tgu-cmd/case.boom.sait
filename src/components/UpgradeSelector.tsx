"use client";
import { useMemo, useState } from "react";
import { boom } from "@/data/catalog";

const presets=[10,25,50,75,90];
export function UpgradeSelector(){
 const [chance,setChance]=useState(50); const base=2500;
 const target=useMemo(()=>Math.round(base/(chance/100)),[chance]);
 const risk=chance<25?"Высокий риск / дорогая цель":chance<55?"Средний риск":"Низкий риск / дешевле цель";
 return <div className="upgrade-card"><div className="upgrade-layout">
  <div><p style={{color:"var(--gold)",fontWeight:1000}}>Upgrade Chance</p><h2 style={{fontSize:38,margin:"6px 0 0"}}>Выбор процента апгрейда</h2>
  <p style={{color:"var(--muted)"}}>Ставишь шанс сам: ниже процент — дороже цель, выше процент — безопаснее, но выигрыш меньше.</p>
  <div className="presets">{presets.map(p=><button key={p} className={chance===p?"preset active":"preset"} onClick={()=>setChance(p)}>{p}%</button>)}</div>
  <input type="range" min="1" max="95" value={chance} onChange={e=>setChance(Number(e.target.value))} style={{width:"100%",marginTop:18}}/>
  <div className="risk" style={{marginTop:14}}><span style={{width:`${chance}%`}}/></div>
  <div className="metrics" style={{marginTop:18}}>
   <div className="metric"><b>{base.toLocaleString("ru-RU")} {boom.short}</b><span>твой предмет</span></div>
   <div className="metric"><b>{chance}%</b><span>выбранный шанс</span></div>
   <div className="metric"><b>{target.toLocaleString("ru-RU")} {boom.short}</b><span>цель до</span></div>
   <div className="metric"><b style={{fontSize:16}}>{risk}</b><span>риск</span></div>
  </div></div>
  <div className="orb" style={{"--deg":`${Math.round(chance*3.6)}deg`} as any}><div><strong>{chance}%</strong><span style={{color:"var(--muted)"}}>шанс успеха</span></div></div>
 </div></div>
}
