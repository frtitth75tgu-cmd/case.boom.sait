import { config } from "@/lib/config";

export default function ReplacementRulesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article className="card p-8">
        <p className="text-accent">Skin Delivery</p>
        <h1 className="mt-2 text-4xl font-black">Правило замены предмета</h1>
        <p className="mt-4 text-white/65">
          Если выигранный предмет временно отсутствует на подключённом маркете, пользователь может выбрать доступный аналог меньшей стоимости. Разница возвращается на внутренний баланс в {config.boomCoinName}.
        </p>

        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl bg-white/[.04] p-5">
            <strong>1. Проверка наличия</strong>
            <p className="mt-2 text-white/55">Система проверяет маркет и актуальную цену предмета.</p>
          </div>
          <div className="rounded-2xl bg-white/[.04] p-5">
            <strong>2. Выбор замены</strong>
            <p className="mt-2 text-white/55">Если предмет недоступен, показываются аналоги в пределах заданного админом диапазона.</p>
          </div>
          <div className="rounded-2xl bg-white/[.04] p-5">
            <strong>3. Возврат разницы</strong>
            <p className="mt-2 text-white/55">Разница до {config.replacementMaxDelta} {config.boomCoinShort} или до {config.replacementMaxPercent}% возвращается на внутренний баланс.</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-white/45">
          Внутренний баланс нельзя вывести деньгами. Он используется только для функций платформы.
        </p>
      </article>
    </main>
  );
}
