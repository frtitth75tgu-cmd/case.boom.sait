# Steam Setup

Локально:

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Vercel:

```env
NEXT_PUBLIC_SITE_URL="https://твой-домен.vercel.app"
```

Проверка:
```text
/steam-check
```

Route входа:
```text
/api/auth/steam/start
```

Callback:
```text
/api/auth/steam/callback
```
