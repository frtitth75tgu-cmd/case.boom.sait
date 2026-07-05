import { requireAdmin } from "@/lib/authGuards";
import { config } from "@/lib/config";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const rows = [
    ["Название", config.siteName],
    ["URL", config.siteUrl],
    ["Поддержка", config.supportUrl],
    ["Версия документов", config.docsVersion],
    ["Провайдер платежей", config.paymentProvider],
    ["Rate limit", String(config.rateLimitEnabled)],
    ["Trade bot", String(config.steamTradeBotEnabled)],
    ["Юр. лицо", config.legalEntityName],
    ["ИНН", config.legalEntityInn],
    ["ОГРН/ОГРНИП", config.legalEntityOgrn],
    ["Email", config.legalEntityEmail],
    ["Маркет: авто-закупка", String(config.marketAutoBuyEnabled)],
    ["Маркет: провайдер", config.marketProvider],
    ["Маркет: макс. цена", String(config.marketMaxItemPriceRub)],
    ["Маркет: дневной бюджет", String(config.marketDailyBudgetRub)]
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-black">Настройки</h1>
      <p className="mt-3 text-white/60">Основные параметры берутся из .env.</p>
      <div className="mt-6 space-y-3">
        {rows.map(([k, v]) => <div key={k} className="card grid gap-3 p-4 md:grid-cols-2"><strong>{k}</strong><span className="text-white/60">{v}</span></div>)}
      </div>
    </main>
  );
}
