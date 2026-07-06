import "./globals.css";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { BoomCoreLogo } from "@/components/BoomCore";

export const metadata={title:"CaseBoom Ultimate",description:"CaseBoom Ultimate"};

export default function RootLayout({children}:{children:React.ReactNode}){
 const session=getSession();
 return <html lang="ru"><body>
  <header className="topbar"><div className="topbar-inner">
   <BoomCoreLogo small />
   <nav className="nav">
    <Link href="/cases">Кейсы</Link><Link href="/upgrade">Апгрейд</Link><Link href="/battles">Баттлы</Link><Link href="/bonus">Бонусы</Link><Link href="/deposit-skins">Скинами</Link><Link href="/admin">Админка</Link><Link href="/steam-check">Steam</Link>
   </nav>
   {session?<Link href="/profile" className="btn secondary">Профиль</Link>:<a href="/api/auth/steam/start" className="btn">Войти через Steam</a>}
  </div></header>{children}<footer className="footer">CaseBoom Ultimate · Boom Coins · Steam/Valve не являются партнёрами проекта</footer>
 </body></html>
}
