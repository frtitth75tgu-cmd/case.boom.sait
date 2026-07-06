# CaseBoom Ultimate v21 — Steam Fix

Цель версии: только Steam.

Что исправлено:
- `/api/auth/steam/start` строит правильный OpenID URL;
- Steam callback возвращает на новую главную `/`;
- добавлена cookie-сессия `cb_session`;
- добавлена страница проверки `/steam-check`;
- добавлены подсказки для `.env`.

Как ставить:
1. Удали старую папку `src`.
2. Вставь новую папку `src` из архива.
3. Удали `.next`.
4. В `.env` для локального запуска:
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
5. Для Vercel:
   NEXT_PUBLIC_SITE_URL="https://твой-домен.vercel.app"
6. Запусти:
   npm run dev

Проверка:
- открой `/steam-check`;
- нажми «Проверить»;
- должен открыться официальный Steam.
