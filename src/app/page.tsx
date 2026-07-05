import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { CaseCard } from "@/components/CaseCard";

export default async function HomePage() {
  const cases = await prisma.case.findMany({ where: { isActive: true }, take: 8, orderBy: { price: "asc" } }).catch(() => []);
  const openings = await prisma.caseOpening.findMany({ orderBy: { createdAt: "desc" }, take: 6 }).catch(() => []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="card overflow-hidden p-8 shadow-boom md:p-14">
        <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-bold text-accent">
              Boom Coins · Кейсы · Батлы · Апгрейд · Выдача скинами
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[.95] md:text-7xl">
              Открывай. Сражайся. Улучшай. Получай скины.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/62">
              CaseBoom — развлекательная игровая платформа с внутренней валютой {config.boomCoinName}, прозрачными шансами и выдачей предметов через заявки.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/cases" className="btn">Открыть кейсы</Link>
              <Link href="/bonus" className="btn btn-outline">Получить бонус</Link>
            </div>
            <p className="mt-5 text-xs text-white/45">
              Платформа не заявляет себя казино или букмекерским сервисом. Итоговая правовая модель должна быть проверена профильным юристом перед коммерческим запуском.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              ["100+", "кейсов в концепции"],
              ["BC", "внутренняя валюта"],
              ["Fast", "режим апгрейда"],
              ["Skin", "выдача предметами"]
            ].map(([a,b]) => (
              <div key={a} className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
                <div className="text-4xl font-black text-accent">{a}</div>
                <div className="mt-1 text-white/55">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          ["🎁", "Бонусы", "Daily, weekly, депозитные и промокоды"],
          ["🔍", "Поиск", "Кейсы и предметы по названию и категории"],
          ["⚡", "Fast Mode", "Быстрый апгрейд без долгой анимации"],
          ["🔄", "Замена", "Если предмета нет — выбор аналога и возврат разницы в BC"]
        ].map(([icon,title,text]) => (
          <div key={title} className="card p-5">
            <div className="text-3xl">{icon}</div>
            <h3 className="mt-3 text-xl font-black">{title}</h3>
            <p className="mt-2 text-sm text-white/55">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black">Популярные кейсы</h2>
            <p className="mt-2 text-white/55">Витрина с новым стилем CaseBoom.</p>
          </div>
          <Link href="/cases" className="text-accent">Все кейсы →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {cases.map((c) => <CaseCard key={c.id} item={c} />)}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-2xl font-black">Последние открытия</h2>
          <div className="mt-4 space-y-3">
            {openings.length ? openings.map((o) => (
              <div key={o.id} className="rounded-2xl bg-white/[.04] p-4">
                <strong>{o.itemName}</strong>
                <span className="ml-2 text-accent">{o.itemPrice} {config.boomCoinShort}</span>
              </div>
            )) : <p className="text-white/55">Открытий пока нет.</p>}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-black">Принцип честности</h2>
          <p className="mt-3 text-white/60">
            Шансы должны отображаться пользователю до открытия. Результат считается сервером и сохраняется в истории. Изменять результат после открытия нельзя.
          </p>
          <Link href="/fairness" className="btn btn-outline mt-5">Проверяемая честность</Link>
        </div>
      </section>
    </main>
  );
}
