import Link from "next/link";

const links = [
  ["/", "Главная", "Основная страница сайта"],
  ["/cases", "Кейсы", "Список активных кейсов"],
  ["/contracts", "Контракты", "Обмен нескольких предметов"],
  ["/skins", "Каталог скинов", "Реальные названия и картинки"],
  ["/daily", "Ежедневный бонус", "Бонус раз в сутки"],
  ["/referrals", "Реферальная система", "Ссылка для приглашений"],
  ["/notifications", "Уведомления", "События аккаунта"],
  ["/login", "Вход через Steam", "Авторизация и согласия"],
  ["/promos", "Промокоды", "Бонусный баланс"],
  ["/rules", "Правила", "Правила сайта"],
  ["/terms", "Пользовательское соглашение", "Условия использования"],
  ["/privacy", "Политика конфиденциальности", "Данные и приватность"],
  ["/personal-data", "Согласие на ПДн", "Персональные данные"],
  ["/payments-policy", "Платежи", "Условия платежей и возвратов"],
  ["/trades", "Трейды", "Заявки на вывод через Steam"],
  ["/fairness", "Честность", "Проверяемая схема выпадений"],
  ["/responsible-use", "Ответственное использование", "18+ и самоограничения"],
  ["/contacts", "Контакты", "Поддержка и реквизиты"]
];

export default function LinksPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-black">Ссылки</h1>
      <div className="mt-7 grid gap-4">
        {links.map(([href, title, text]) => (
          <Link key={href} href={href} className="card flex items-center justify-between gap-4 p-5">
            <div>
              <h2 className="font-black">{title}</h2>
              <p className="mt-1 text-sm text-white/55">{text}</p>
            </div>
            <span className="text-accent">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
