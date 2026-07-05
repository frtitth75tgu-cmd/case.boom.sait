import { requireAdmin } from "@/lib/authGuards";
import { config } from "@/lib/config";

export default async function AdminEconomyPage() {
  await requireAdmin();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Экономика CaseBoom</h1>
      <p className="mt-3 text-white/60">Настройки замены предметов, Boom Coins и автозакупки.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          ["Валюта", `${config.boomCoinName} (${config.boomCoinShort})`],
          ["Максимальная разница", `${config.replacementMaxDelta} ${config.boomCoinShort}`],
          ["Максимальный процент", `${config.replacementMaxPercent}%`],
          ["Автозакупка", config.marketAutoBuyEnabled ? "Включена" : "Отключена"],
          ["Провайдер маркета", config.marketProvider],
          ["Дневной бюджет", `${config.marketDailyBudgetRub} ${config.boomCoinShort}`]
        ].map(([k,v]) => (
          <div key={k} className="card p-5">
            <div className="text-white/45">{k}</div>
            <div className="mt-2 text-2xl font-black text-accent">{v}</div>
          </div>
        ))}
      </div>

      <section className="card mt-8 p-6">
        <h2 className="text-2xl font-black">Правило замены</h2>
        <p className="mt-3 text-white/60">
          Если предмет отсутствует на маркете, пользователь выбирает аналог дешевле, а разница возвращается на внутренний баланс.
        </p>
      </section>
    </main>
  );
}
