export type Skin = { name:string; weapon:string; finish:string; rarity:string; price:number; type:"rifle"|"sniper"|"pistol"|"knife"|"gloves"|"smg" };
export type CaseBox = { slug:string; title:string; category:string; price:number; tag:string; a:string; b:string; items:string[] };

export const skins: Skin[] = [
{name:"AWP | Dragon Lore",weapon:"AWP",finish:"Dragon Lore",rarity:"Covert",price:115000,type:"sniper"},
{name:"AWP | Medusa",weapon:"AWP",finish:"Medusa",rarity:"Covert",price:35000,type:"sniper"},
{name:"AWP | Asiimov",weapon:"AWP",finish:"Asiimov",rarity:"Covert",price:4300,type:"sniper"},
{name:"AWP | Neo-Noir",weapon:"AWP",finish:"Neo-Noir",rarity:"Covert",price:1900,type:"sniper"},
{name:"AWP | Wildfire",weapon:"AWP",finish:"Wildfire",rarity:"Covert",price:3200,type:"sniper"},
{name:"AWP | Containment Breach",weapon:"AWP",finish:"Containment Breach",rarity:"Covert",price:7800,type:"sniper"},
{name:"AK-47 | Fire Serpent",weapon:"AK-47",finish:"Fire Serpent",rarity:"Covert",price:42000,type:"rifle"},
{name:"AK-47 | Wild Lotus",weapon:"AK-47",finish:"Wild Lotus",rarity:"Covert",price:98000,type:"rifle"},
{name:"AK-47 | Gold Arabesque",weapon:"AK-47",finish:"Gold Arabesque",rarity:"Covert",price:78000,type:"rifle"},
{name:"AK-47 | Asiimov",weapon:"AK-47",finish:"Asiimov",rarity:"Covert",price:18500,type:"rifle"},
{name:"AK-47 | Redline",weapon:"AK-47",finish:"Redline",rarity:"Classified",price:850,type:"rifle"},
{name:"AK-47 | Neon Rider",weapon:"AK-47",finish:"Neon Rider",rarity:"Covert",price:2450,type:"rifle"},
{name:"AK-47 | The Empress",weapon:"AK-47",finish:"The Empress",rarity:"Covert",price:2600,type:"rifle"},
{name:"AK-47 | Vulcan",weapon:"AK-47",finish:"Vulcan",rarity:"Covert",price:6500,type:"rifle"},
{name:"M4A4 | Howl",weapon:"M4A4",finish:"Howl",rarity:"Covert",price:85000,type:"rifle"},
{name:"M4A4 | Poseidon",weapon:"M4A4",finish:"Poseidon",rarity:"Classified",price:28000,type:"rifle"},
{name:"M4A4 | Asiimov",weapon:"M4A4",finish:"Asiimov",rarity:"Covert",price:5500,type:"rifle"},
{name:"M4A4 | The Emperor",weapon:"M4A4",finish:"The Emperor",rarity:"Covert",price:1800,type:"rifle"},
{name:"M4A1-S | Printstream",weapon:"M4A1-S",finish:"Printstream",rarity:"Covert",price:14500,type:"rifle"},
{name:"M4A1-S | Hot Rod",weapon:"M4A1-S",finish:"Hot Rod",rarity:"Classified",price:12000,type:"rifle"},
{name:"M4A1-S | Golden Coil",weapon:"M4A1-S",finish:"Golden Coil",rarity:"Covert",price:2500,type:"rifle"},
{name:"Desert Eagle | Blaze",weapon:"Desert Eagle",finish:"Blaze",rarity:"Restricted",price:32000,type:"pistol"},
{name:"Desert Eagle | Printstream",weapon:"Desert Eagle",finish:"Printstream",rarity:"Covert",price:7800,type:"pistol"},
{name:"USP-S | Kill Confirmed",weapon:"USP-S",finish:"Kill Confirmed",rarity:"Covert",price:9000,type:"pistol"},
{name:"USP-S | Printstream",weapon:"USP-S",finish:"Printstream",rarity:"Covert",price:6500,type:"pistol"},
{name:"Glock-18 | Fade",weapon:"Glock-18",finish:"Fade",rarity:"Restricted",price:65000,type:"pistol"},
{name:"Glock-18 | Gamma Doppler",weapon:"Glock-18",finish:"Gamma Doppler",rarity:"Covert",price:2700,type:"pistol"},
{name:"★ Karambit | Fade",weapon:"Karambit",finish:"Fade",rarity:"Exotic",price:145000,type:"knife"},
{name:"★ Karambit | Doppler",weapon:"Karambit",finish:"Doppler",rarity:"Exotic",price:115000,type:"knife"},
{name:"★ Butterfly Knife | Doppler",weapon:"Butterfly Knife",finish:"Doppler",rarity:"Exotic",price:128000,type:"knife"},
{name:"★ Butterfly Knife | Fade",weapon:"Butterfly Knife",finish:"Fade",rarity:"Exotic",price:165000,type:"knife"},
{name:"★ M9 Bayonet | Lore",weapon:"M9 Bayonet",finish:"Lore",rarity:"Exotic",price:97000,type:"knife"},
{name:"★ Talon Knife | Marble Fade",weapon:"Talon Knife",finish:"Marble Fade",rarity:"Exotic",price:82000,type:"knife"},
{name:"★ Bayonet | Gamma Doppler",weapon:"Bayonet",finish:"Gamma Doppler",rarity:"Exotic",price:74000,type:"knife"},
{name:"★ Sport Gloves | Pandora's Box",weapon:"Sport Gloves",finish:"Pandora's Box",rarity:"Exotic",price:98000,type:"gloves"},
{name:"★ Sport Gloves | Vice",weapon:"Sport Gloves",finish:"Vice",rarity:"Exotic",price:145000,type:"gloves"},
{name:"★ Sport Gloves | Hedge Maze",weapon:"Sport Gloves",finish:"Hedge Maze",rarity:"Exotic",price:89000,type:"gloves"},
{name:"★ Specialist Gloves | Crimson Kimono",weapon:"Specialist Gloves",finish:"Crimson Kimono",rarity:"Exotic",price:112000,type:"gloves"},
{name:"★ Driver Gloves | King Snake",weapon:"Driver Gloves",finish:"King Snake",rarity:"Exotic",price:64000,type:"gloves"},
];

export const cases: CaseBox[] = [
{slug:"daily-drop",title:"Daily Drop",category:"free",price:0,tag:"FREE",a:"#62ff9b",b:"#0d3f24",items:["AK-47 | Redline","AWP | Neo-Noir","USP-S | Kill Confirmed"]},
{slug:"bronze-deposit",title:"Bronze Deposit",category:"deposit",price:0,tag:"DEPOSIT",a:"#d48745",b:"#3b1b07",items:["AK-47 | Redline","M4A4 | The Emperor","AWP | Asiimov"]},
{slug:"rookie-case",title:"Rookie Case",category:"budget",price:49,tag:"START",a:"#32ff62",b:"#075c28",items:["AK-47 | Redline","AWP | Neo-Noir","Glock-18 | Gamma Doppler"]},
{slug:"inferno-case",title:"Inferno Case",category:"popular",price:249,tag:"HOT",a:"#ff8a2a",b:"#481509",items:["AK-47 | Fire Serpent","Desert Eagle | Blaze","M4A4 | Asiimov"]},
{slug:"dragon-case",title:"Dragon Case",category:"premium",price:999,tag:"HOT",a:"#ff5b22",b:"#53200a",items:["AWP | Dragon Lore","AK-47 | Fire Serpent","M4A4 | Howl"]},
{slug:"awp-collection",title:"AWP Collection",category:"premium",price:899,tag:"AWP",a:"#62e6ff",b:"#14385f",items:["AWP | Dragon Lore","AWP | Medusa","AWP | Asiimov","AWP | Wildfire"]},
{slug:"ak-47-collection",title:"AK-47 Collection",category:"premium",price:799,tag:"AK",a:"#ff8a2a",b:"#481509",items:["AK-47 | Wild Lotus","AK-47 | Gold Arabesque","AK-47 | Vulcan","AK-47 | The Empress"]},
{slug:"knife-hunter",title:"Knife Hunter",category:"knife",price:4999,tag:"KNIFE",a:"#ffe176",b:"#624109",items:["★ Karambit | Fade","★ Butterfly Knife | Doppler","★ M9 Bayonet | Lore"]},
{slug:"glove-vault",title:"Glove Vault",category:"gloves",price:6999,tag:"GLOVES",a:"#ff7a2a",b:"#5e240e",items:["★ Sport Gloves | Pandora's Box","★ Sport Gloves | Vice","★ Specialist Gloves | Crimson Kimono"]},
{slug:"diamond-vault",title:"Diamond Vault",category:"vip",price:50000,tag:"50K",a:"#ff40df",b:"#51215e",items:["AWP | Dragon Lore","★ Karambit | Doppler","M4A4 | Howl"]},
{slug:"emperor-vault",title:"Emperor Vault",category:"vip",price:100000,tag:"100K",a:"#ffd45a",b:"#6d4308",items:["★ Sport Gloves | Vice","★ Butterfly Knife | Fade","AK-47 | Wild Lotus"]},
{slug:"legacy-vault",title:"Legacy Vault",category:"vip",price:150000,tag:"150K",a:"#ffcf5a",b:"#2e2507",items:["★ Butterfly Knife | Fade","AWP | Dragon Lore","★ Sport Gloves | Vice"]},
];

export const boom = { name:"Boom Coins", short:"BC" };
export function getCase(slug:string){return cases.find(c=>c.slug===slug)||cases[0]}
export function getCaseSkins(slug:string){const box=getCase(slug);const main=skins.filter(s=>box.items.includes(s.name));const rest=skins.filter(s=>!box.items.includes(s.name)).slice(0,10);return [...main,...rest].slice(0,12)}
export function byName(name:string){return skins.find(s=>s.name===name)||skins[0]}
export function rarityColor(rarity:string){return ({Consumer:"#bfc7d5",Industrial:"#5fa8ff","Mil-Spec":"#3f6cff",Restricted:"#8b5cf6",Classified:"#ec4899",Covert:"#ff4d6d",Exotic:"#ffd45a"} as Record<string,string>)[rarity]||"#ffd45a"}
