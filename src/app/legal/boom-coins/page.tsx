import { config } from "@/lib/config";

export default function BoomCoinsRulesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article className="card p-8 leading-7 text-white/70">
        <h1 className="text-4xl font-black text-white">Правила {config.boomCoinName}</h1>
        <p className="mt-4">
          {config.boomCoinName} — внутренняя виртуальная единица учёта CaseBoom.
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-6">
          <li>Используется только внутри сервиса.</li>
          <li>Не является денежным средством.</li>
          <li>Не подлежит выводу на банковскую карту или электронный кошелёк.</li>
          <li>Может использоваться для кейсов, апгрейдов, батлов и бонусных механик.</li>
          <li>Может начисляться как бонус, компенсация разницы при замене предмета или промокод.</li>
        </ul>
      </article>
    </main>
  );
}
