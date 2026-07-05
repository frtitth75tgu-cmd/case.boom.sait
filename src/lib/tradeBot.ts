import { config } from "./config";

export async function createTradeOffer(payload: {
  steamId: string;
  tradeUrl: string;
  items: Array<{ name: string; price: number }>;
}) {
  if (!config.steamTradeBotEnabled || !config.steamTradeBotApiUrl) {
    return {
      ok: false,
      externalId: null,
      message: "Steam trade bot отключен. Настройте STEAM_TRADE_BOT_* в .env."
    };
  }

  const response = await fetch(`${config.steamTradeBotApiUrl}/offers`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${config.steamTradeBotApiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return { ok: false, externalId: null, message: "Ошибка trade bot API." };
  }

  const data = await response.json();
  return { ok: true, externalId: data.id || null, message: "Trade offer created." };
}
