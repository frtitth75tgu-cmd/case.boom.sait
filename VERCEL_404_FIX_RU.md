# Срочно: исправление 404 на Vercel

Если на главной странице Vercel показывает 404, почти всегда причина в настройке `Output Directory = public`.

## Как исправить

Vercel → твой проект → Settings → Build & Deployment:

```text
Framework Preset: Next.js
Root Directory: пусто, если package.json лежит в корне репозитория
Root Directory: caseboom_pro_v5_FIXED_vercel_no404, если package.json лежит внутри этой папки
Build Command: npm run build
Output Directory: оставить пустым
Install Command: npm install
```

ВАЖНО: не указывать `public` в Output Directory. `public` — это только папка для картинок, а не готовый сайт.

После изменения:

1. Перейди во вкладку Deployments.
2. Нажми три точки у последнего деплоя.
3. Нажми Redeploy.
4. Выбери Use existing Build Cache: OFF, если будет такой переключатель.
5. Нажми Redeploy.

## Если Vercel не видит проект

Проверь, где лежит `package.json`:

- если прямо в корне GitHub — Root Directory оставь пустым;
- если внутри папки проекта — Root Directory укажи имя этой папки.

## Обязательные Environment Variables

Без базы сайт может не собраться или падать:

```env
DATABASE_URL="строка Neon PostgreSQL"
NEXT_PUBLIC_SITE_NAME="CaseBoom"
NEXT_PUBLIC_SITE_URL="https://твой-проект.vercel.app"
SESSION_SECRET="любой-длинный-секрет"
STEAM_API_KEY="можно-пока-пусто"
SUPPORT_URL="https://t.me/your_support"
DOCS_VERSION="2026-07-05-rf-v5"
PAYMENT_PROVIDER="demo"
PAYMENT_WEBHOOK_SECRET="любой-длинный-секрет"
ADMIN_STEAM_ID="твой SteamID64 или пусто"
RATE_LIMIT_ENABLED="false"
STEAM_TRADE_BOT_ENABLED="false"
MARKET_AUTO_BUY_ENABLED="false"
MARKET_PROVIDER="manual-demo"
MARKET_MAX_ITEM_PRICE_RUB="5000"
MARKET_DAILY_BUDGET_RUB="25000"
```
