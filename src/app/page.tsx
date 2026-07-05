export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CaseCard } from "@/components/CaseCard";
import { config } from "@/lib/config";
import { Flame, Gift, ShieldCheck, Trophy } from "lucide-react";

export default async function HomePage() {
  const cases = await prisma.case.findMany({ where: { isActive: true }, take: 6 });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="card glow overflow-hidden p-8 md:p-14">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-bold text-accent">
            Steam · Кейсы · Апгрейд · Батлы
          </p>
          <h1 className="text-5xl font-black leading-none md:text-7xl">
            {config.siteName} — платформа кейсов нового уровня
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/65">
            Полноценная база проекта: Steam-вход, профиль, инвентарь, кейсы, платежный каркас,
            юридические страницы РФ и админ-панель.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login" className="btn">Войти через Steam</Link>
            <Link href="/cases" className="btn btn-outline">Смотреть кейсы</Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          [Flame, "Быстрые открытия", "Готовая логика выпадения"],
          [Gift, "Инвентарь", "История и предметы"],
          [Trophy, "Батлы", "Каркас комнат и режимов"],
          [ShieldCheck, "Юр. база", "18+, ПДн, правила, платежи"],
        ].map(([Icon, title, text]: any) => (
          <div className="card p-5" key={title}>
            <Icon className="mb-3 text-accent" />
            <h3 className="font-black">{title}</h3>
            <p className="mt-2 text-sm text-white/55">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black">Популярные кейсы</h2>
            <p className="mt-2 text-white/55">Seed-данные уже добавлены в базу.</p>
          </div>
          <Link href="/cases" className="text-accent">Все кейсы →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {cases.map((c) => <CaseCard key={c.id} item={c} />)}
        </div>
      </section>
    </main>
  );
}
