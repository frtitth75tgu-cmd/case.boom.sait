# CaseBoom Pro v7

Версия с расширенной юридической частью, Boom Coins, новым дизайном, поиском по кейсам и seed-базой на 100 кейсов.

## Что добавлено

- Полные страницы документов: соглашение, конфиденциальность, правила сервиса, платежи, персональные данные, ответственное использование.
- Аккуратные формулировки: CaseBoom позиционируется как развлекательная платформа с внутренней валютой, не как казино.
- Boom Coins в интерфейсе вместо рублей.
- Поиск и фильтры кейсов.
- Seed на 100 кейсов: бесплатные, дешёвые, премиум, Vault 50k+.
- Fast Mode в апгрейде.
- Админ-раздел экономики.
- Правило замены предмета: аналог дешевле + разница возвращается в Boom Coins.

## Важно

Юридические тексты являются рабочим шаблоном. Они не делают сервис автоматически законным. Перед коммерческим запуском нужно проверить фактическую модель работы у профильного юриста.

## Запуск

```bash
npm install
npx prisma db push
npm run prisma:seed
npm run dev
```

## Vercel переменные

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SITE_NAME="CaseBoom"
NEXT_PUBLIC_SITE_URL="https://your-project.vercel.app"
SESSION_SECRET="change_this_long_random_secret"
PAYMENT_WEBHOOK_SECRET="change_this_payment_secret"
NEXT_PUBLIC_BOOM_COIN_NAME="Boom Coins"
NEXT_PUBLIC_BOOM_COIN_SHORT="BC"
REPLACEMENT_MAX_DELTA="2000"
REPLACEMENT_MAX_PERCENT="5"
```


## CaseBoom Pro v9 — Skin Deposits

Добавлено:
- страница `/deposit-skins`;
- заявки на пополнение скинами;
- админка `/admin/skin-deposits`;
- ручное подтверждение и начисление Boom Coins;
- статусы заявок;
- санкции аккаунта за некорректную трейд-ссылку, отмену трейда или злоупотребления;
- правила пополнения скинами `/legal/skin-deposit-rules`.

После обновления:

```bash
npm install
npx prisma db push
npm run prisma:seed
```

Новые переменные:

```env
SKIN_DEPOSIT_ENABLED="true"
SKIN_DEPOSIT_MIN_VALUE="100"
SKIN_DEPOSIT_COMMISSION_PERCENT="10"
SKIN_DEPOSIT_BOT_TRADE_URL=""
```
