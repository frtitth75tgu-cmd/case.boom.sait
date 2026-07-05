import { config } from "./config";

export async function createMarketAutoBuyRequest(input: {
  itemName: string;
  maxPrice: number;
}) {
  if (!config.marketAutoBuyEnabled) {
    return {
      ok: false,
      status: "DISABLED",
      externalId: null,
      message: "Авто-закупка отключена в настройках."
    };
  }

  if (!config.marketApiUrl || !config.marketApiKey) {
    return {
      ok: false,
      status: "NOT_CONFIGURED",
      externalId: null,
      message: "API маркета не настроен."
    };
  }

  const response = await fetch(`${config.marketApiUrl}/buy-orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${config.marketApiKey}`
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    return {
      ok: false,
      status: "PROVIDER_ERROR",
      externalId: null,
      message: "Маркет вернул ошибку."
    };
  }

  const data = await response.json();

  return {
    ok: true,
    status: "SENT",
    externalId: data.id || data.orderId || null,
    message: "Заявка на авто-закупку отправлена."
  };
}
