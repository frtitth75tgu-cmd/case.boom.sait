# Как запустить CaseBoom Pro v1

## Локально

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Открыть:

```text
http://localhost:3000
```

## На сервере Ubuntu

```bash
sudo apt update
sudo apt install -y nodejs npm postgresql nginx
npm install -g pm2
```

Создать базу PostgreSQL:

```bash
sudo -u postgres psql
CREATE DATABASE caseboom;
CREATE USER caseboom_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE caseboom TO caseboom_user;
\q
```

В `.env` указать:

```env
DATABASE_URL="postgresql://caseboom_user:strong_password@localhost:5432/caseboom"
NEXT_PUBLIC_SITE_URL="https://your-domain.ru"
```

Запуск:

```bash
npm install
npx prisma migrate deploy
npm run prisma:seed
npm run build
pm2 start npm --name caseboom -- start
pm2 save
```

Nginx-прокси:

```nginx
server {
  server_name your-domain.ru www.your-domain.ru;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

SSL:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.ru -d www.your-domain.ru
```
