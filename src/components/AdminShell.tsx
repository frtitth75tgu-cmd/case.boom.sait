import Link from "next/link";

const links = [
  ["Главная", "/admin"],
  ["Кейсы", "/admin/cases"],
  ["Шансы", "/admin/odds"],
  ["Пользователи", "/admin/users"],
  ["Пополнения", "/admin/deposits"],
  ["Промокоды", "/admin/promocodes"],
  ["Бонусы", "/admin/bonuses"],
  ["Market", "/admin/market"],
  ["Логи", "/admin/logs"],
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="page">
      <section className="page-hero">
        <span className="badge">Admin Panel</span>
        <h1>{title}</h1>
        <p className="candy-muted">Управление CaseBoom без изменения кода.</p>
      </section>

      <section className="section admin-layout">
        <aside className="admin-menu">
          {links.map(([name, href]) => <Link href={href} key={href}>{name}</Link>)}
        </aside>
        <div>{children}</div>
      </section>
    </main>
  );
}
