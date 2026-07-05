import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "CaseBoom",
  description: "CaseBoom — игровая платформа с Boom Coins, кейсами, баттлами и апгрейдом.",
};

const nav = [
  ["🏠", "Главная", "/"],
  ["🎁", "Кейсы", "/cases"],
  ["🔫", "Скины", "/skins"],
  ["⚔️", "Баттлы", "/battles"],
  ["📈", "Апгрейд", "/upgrade"],
  ["🎟️", "Бонусы", "/bonus"],
  ["💎", "Пополнить скинами", "/deposit-skins"],
  ["📦", "Инвентарь", "/profile"],
  ["🏆", "Топ игроков", "/leaderboard"],
  ["⚖️", "Правила", "/legal/game-rules"],
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="app-shell">
          <aside className="sidebar">
            <Link href="/" className="logo">CASEBOOM</Link>
            <div style={{ height: 22 }} />
            <nav style={{ display: "grid", gap: 6 }}>
              {nav.map(([icon, label, href]) => (
                <Link key={href} href={href} className="nav-item">
                  <span>{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            <div className="panel" style={{ marginTop: 28, padding: 16 }}>
              <div style={{ color: "#62ff9b", fontWeight: 1000 }}>ОНЛАЙН</div>
              <div style={{ fontSize: 28, fontWeight: 1000, marginTop: 5 }}>1 234</div>
              <div style={{ height: 1, background: "rgba(255,255,255,.08)", margin: "14px 0" }} />
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>ОТКРЫТО КЕЙСОВ</div>
              <div style={{ fontSize: 22, fontWeight: 1000, marginTop: 4 }}>24 368 902</div>
            </div>
          </aside>

          <div>
            <header className="topbar">
              <nav className="topnav">
                <Link href="/cases">Кейсы</Link>
                <Link href="/battles">Баттлы</Link>
                <Link href="/upgrade">Апгрейд</Link>
                <Link href="/bonus">Бонусы</Link>
                <Link href="/deposit-skins">Скинами</Link>
                <Link href="/replacement-rules">Замена</Link>
              </nav>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="balance-pill">₿ 15 450.75 <span className="plus-btn">+</span></div>
                <Link href="/login" className="btn" style={{ minHeight: 40 }}>Войти через Steam</Link>
              </div>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
