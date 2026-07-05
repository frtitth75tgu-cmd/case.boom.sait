import Link from "next/link";

const tiles = [
  ["📦", "Кейсы", "Создание, категории, цены и обложки", "/admin/cases"],
  ["🎯", "Шансы", "Редактирование выпадений по каждому кейсу", "/admin/cases"],
  ["🔫", "Предметы", "Скины, редкости, цены и изображения", "/admin/skins"],
  ["💎", "Пополнения скинами", "Проверка трейдов и начисление BC", "/admin/skin-deposits"],
  ["⚙️", "Экономика", "Boom Coins, замены и лимиты", "/admin/economy"],
  ["🎟️", "Промокоды", "Бонусы, акции и депозитные кейсы", "/admin/promocodes"],
  ["🎁", "Бонусы", "Daily, weekly и уровни", "/admin/bonus-rules"],
  ["👤", "Пользователи", "Баланс, роли и ограничения", "/admin/users"],
  ["📊", "Статистика", "Открытия, баттлы, доходность", "/admin/stats"],
  ["❓", "Помощь", "Как пользоваться админкой", "/admin/help"],
];

export default function AdminPage() {
  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Admin Panel</p>
        <h1 style={{ fontSize: 46, margin: "6px 0 0", fontWeight: 1000 }}>Админка CaseBoom</h1>
        <p style={{ color: "rgba(255,255,255,.58)", maxWidth: 760 }}>
          Управление кейсами, шансами, Boom Coins, заявками на пополнение скинами и экономикой проекта.
        </p>
      </section>

      <section className="admin-grid" style={{ marginTop: 18 }}>
        {tiles.map(([icon, title, text, href]) => (
          <Link href={href} className="admin-tile" key={title}>
            <div style={{ fontSize: 34 }}>{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
