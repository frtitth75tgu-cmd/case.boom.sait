# Бесплатный запуск сайта в интернете: Vercel + Neon

Это самый простой вариант, чтобы сайт был доступен в интернете бесплатно.

## Что получится

Сайт будет доступен по бесплатному адресу:

```text
https://caseboom-что-то.vercel.app
```

Это бесплатный поддомен Vercel. Отдельный красивый домен `.ru` или `.com` обычно покупается отдельно.

## Что нужно

1. Аккаунт GitHub.
2. Аккаунт Vercel.
3. Аккаунт Neon.
4. Архив проекта CaseBoom Pro v5.

## Шаг 1. Создать базу Neon

1. Зайди на Neon.
2. Создай новый проект.
3. Выбери PostgreSQL.
4. Скопируй строку подключения `DATABASE_URL`.

Она будет похожа на:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
```

## Шаг 2. Залить проект на GitHub

1. Создай новый репозиторий на GitHub.
2. Распакуй архив проекта.
3. Загрузи все файлы проекта в репозиторий.

Через терминал:

```bash
git init
git add .
git commit -m "CaseBoom Pro v5"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## Шаг 3. Подключить Vercel

1. Зайди в Vercel.
2. Нажми `Add New Project`.
3. Выбери GitHub-репозиторий.
4. Framework должен определиться как Next.js.
5. Добавь Environment Variables.

## Шаг 4. Переменные окружения Vercel

Добавь в Vercel → Project → Settings → Environment Variables:

```env
DATABASE_URL="строка из Neon"
NEXT_PUBLIC_SITE_NAME="CaseBoom"
NEXT_PUBLIC_SITE_URL="https://твой-проект.vercel.app"
SESSION_SECRET="любой длинный секрет"
STEAM_API_KEY="твой Steam API key"
SUPPORT_URL="https://t.me/your_support"
DOCS_VERSION="2026-07-05-rf-v4"
PAYMENT_PROVIDER="demo"
PAYMENT_WEBHOOK_SECRET="любой длинный секрет"
ADMIN_STEAM_ID="твой SteamID64"
RATE_LIMIT_ENABLED="false"
STEAM_TRADE_BOT_ENABLED="false"
MARKET_AUTO_BUY_ENABLED="false"
MARKET_PROVIDER="manual-demo"
MARKET_MAX_ITEM_PRICE_RUB="5000"
MARKET_DAILY_BUDGET_RUB="25000"
LEGAL_ENTITY_NAME="ООО или ИП не указано"
LEGAL_ENTITY_INN="не указано"
LEGAL_ENTITY_OGRN="не указано"
LEGAL_ENTITY_EMAIL="support@example.com"
```

## Шаг 5. Применить базу данных

Локально на компьютере в папке проекта:

```bash
npm install
```

Создай файл `.env` и вставь туда `DATABASE_URL` от Neon.

Потом:

```bash
npx prisma migrate deploy
npm run prisma:seed
```

Если это первый запуск и миграций ещё нет, используй:

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

## Шаг 6. Deploy

В Vercel нажми `Deploy`.

После сборки Vercel выдаст ссылку:

```text
https://project-name.vercel.app
```

## Шаг 7. Steam callback URL

В `.env` и Vercel `NEXT_PUBLIC_SITE_URL` должен быть ровно адрес сайта:

```env
NEXT_PUBLIC_SITE_URL="https://project-name.vercel.app"
```

Steam OpenID callback будет:

```text
https://project-name.vercel.app/api/auth/steam/callback
```

## Важное

- Бесплатный домен Vercel — это поддомен `vercel.app`.
- Красивый домен типа `caseboom.ru` нужно покупать отдельно.
- Реальные платежи и вывод предметов нельзя включать без юридической проверки и договоров с провайдерами.
