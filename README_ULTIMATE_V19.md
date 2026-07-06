# CaseBoom Ultimate v19 — цельный src

Это НЕ патч. Это полный компактный src.

Как ставить:
1. Удали старую папку `src`.
2. Вставь новую папку `src` из архива.
3. Удали `.next`.
4. Проверь `.env`:
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
MARKET_API_URL=""
SKIN_DEPOSIT_BOT_TRADE_URL=""
5. Запусти:
npm install
npx prisma db push
npm run dev

Для Vercel:
NEXT_PUBLIC_SITE_URL должен быть твоим доменом Vercel.
Steam callback будет:
https://твой-домен.vercel.app/api/auth/steam/callback
