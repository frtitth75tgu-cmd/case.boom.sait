# Деплой на Vercel

1. Загрузи проект в GitHub.
2. Подключи репозиторий к Vercel.
3. В Environment Variables добавь:

```env
NEXT_PUBLIC_SITE_URL="https://твой-домен.vercel.app"
DATABASE_URL="file:./prod.db"
MARKET_API_URL=""
SKIN_DEPOSIT_BOT_TRADE_URL=""
```

4. Нажми Deploy.

Steam callback:
```text
https://твой-домен.vercel.app/api/auth/steam/callback
```
