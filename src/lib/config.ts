export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "CaseBoom",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  sessionSecret: process.env.SESSION_SECRET || "dev_secret",
  steamApiKey: process.env.STEAM_API_KEY || "",
  supportUrl: process.env.SUPPORT_URL || "https://t.me/your_support",
  docsVersion: process.env.DOCS_VERSION || "2026-07-05-rf-v5",
  paymentProvider: process.env.PAYMENT_PROVIDER || "demo",
  paymentWebhookSecret: process.env.PAYMENT_WEBHOOK_SECRET || "dev_webhook_secret",
  adminSteamId: process.env.ADMIN_STEAM_ID || "",

  rateLimitEnabled: process.env.RATE_LIMIT_ENABLED === "true",
  steamTradeBotEnabled: process.env.STEAM_TRADE_BOT_ENABLED === "true",
  steamTradeBotApiUrl: process.env.STEAM_TRADE_BOT_API_URL || "",
  steamTradeBotApiKey: process.env.STEAM_TRADE_BOT_API_KEY || "",

  legalEntityName: process.env.LEGAL_ENTITY_NAME || "ООО или ИП не указано",
  legalEntityInn: process.env.LEGAL_ENTITY_INN || "не указано",
  legalEntityOgrn: process.env.LEGAL_ENTITY_OGRN || "не указано",
  legalEntityEmail: process.env.LEGAL_ENTITY_EMAIL || "support@example.com",

  marketAutoBuyEnabled: process.env.MARKET_AUTO_BUY_ENABLED === "true",
  marketProvider: process.env.MARKET_PROVIDER || "manual-demo",
  marketApiUrl: process.env.MARKET_API_URL || "",
  marketApiKey: process.env.MARKET_API_KEY || "",
  marketMaxItemPriceRub: Number(process.env.MARKET_MAX_ITEM_PRICE_RUB || 5000),
  marketDailyBudgetRub: Number(process.env.MARKET_DAILY_BUDGET_RUB || 25000),
};
