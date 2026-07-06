# CaseBoom Ultimate v24 — Full Project

Это полный архив проекта, не патч и не только `src`.

## Что внутри

- `src/` — сайт и API routes;
- `public/` — папки под логотипы, кейсы, фоны, звуки;
- `prisma/` — схема базы и seed;
- `scripts/` — служебные скрипты;
- `package.json`;
- `next.config.js`;
- `tsconfig.json`;
- `.env.example`;
- `vercel.json`;
- документы по Steam, Market API и деплою.

## Что изменено

- Убран отдельный каталог скинов `/skins`.
- Убрана кнопка «Скины» из меню.
- Скины остаются только внутри:
  - кейсов;
  - открытия кейса;
  - апгрейда;
  - инвентаря;
  - баттлов.

## Установка

```bash
npm install
cp .env.example .env
npx prisma db push
npm run dev
```

## Steam

Локально:

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Проверка:

```text
http://localhost:3000/steam-check
```

## Market API

Пока заготовка:

```env
MARKET_API_URL=""
```

## Важно

Старую папку проекта лучше не смешивать с этой версией. Распакуй архив как отдельный проект.
