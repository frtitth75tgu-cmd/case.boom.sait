import Link from "next/link";
import { AdminShell } from "@/components/AdminShell";
import { CandyStats } from "@/components/CandyStats";

export default function Admin() {
  const tiles = [
    ["📦", "Кейсы", "/admin/cases"],
    ["🎯", "Шансы", "/admin/odds"],
    ["👤", "Пользователи", "/admin/users"],
    ["💎", "Пополнения", "/admin/deposits"],
    ["🎟️", "Промокоды", "/admin/promocodes"],
    ["🎁", "Бонусы", "/admin/bonuses"],
    ["🛒", "Market", "/admin/market"],
    ["📜", "Логи", "/admin/logs"],
  ];

  return (
    <AdminShell title="Админка">
      <div className="form-stack">
        <CandyStats />
        <div className="grid">
          {tiles.map(([icon, title, href]) => (
            <Link href={href} className="mode-card" style={{ ["--glow" as any]: "rgba(168,85,247,.22)" }} key={title}>
              <div className="icon">{icon}</div>
              <h3>{title}</h3>
              <p>Открыть раздел</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
