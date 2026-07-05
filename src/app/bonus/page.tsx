import Link from "next/link";
import { config } from "@/lib/config";

export default function BonusPage() {
  const bonuses = [
    ["Daily Bonus", "Каждые 24 часа", `50–500 ${config.boomCoinShort}`],
    ["Weekly Bonus", "За активность недели", `до 2500 ${config.boomCoinShort}`],
    ["Deposit Bonus", "За пополнение", "бонусный кейс или BC"],
    ["Promo Bonus", "По промокодам", "баланс, кейсы, BC"],
    ["Level Bonus", "За повышение уровня", "эксклюзивные кейсы"],
    ["Task Bonus", "За задания", "открытия, батлы, апгрейды"]
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="card p-8">
        <p className="text-accent">Bonus System</p>
        <h1 className="mt-2 text-5xl font-black">Бонусы CaseBoom</h1>
        <p className="mt-4 max-w-2xl text-white/60">
          Все бонусы начисляются во внутренней валюте {config.boomCoinName}. Она используется только внутри платформы: кейсы, апгрейды, батлы и специальные события.
        </p>
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {bonuses.map(([title, subtitle, reward]) => (
          <div key={title} className="card p-6">
            <h2 className="text-2xl font-black">{title}</h2>
            <p className="mt-2 text-white/55">{subtitle}</p>
            <div className="mt-5 rounded-2xl bg-accent/10 p-4 text-accent">{reward}</div>
          </div>
        ))}
      </div>

      <section className="card mt-8 p-6">
        <h2 className="text-2xl font-black">Важно</h2>
        <p className="mt-3 text-white/60">
          {config.boomCoinName} не является денежным средством, электронной валютой или способом вывода средств. Баланс используется только внутри CaseBoom.
        </p>
        <Link href="/legal/boom-coins" className="btn btn-outline mt-5">Правила Boom Coins</Link>
      </section>
    </main>
  );
}
