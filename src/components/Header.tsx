import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { LogIn, Shield } from "lucide-react";

export async function Header() {
  const session = getSession();
  const user = session
    ? await prisma.user.findUnique({ where: { id: session.userId } })
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-black">
          <span className="bg-gradient-to-r from-accent to-hot bg-clip-text text-transparent">
            {config.siteName}
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-white/80">
          <Link href="/cases">Кейсы</Link>
          <Link href="/skins">Скины</Link>
          <Link href="/battles">Батлы</Link>
          <Link href="/upgrade">Апгрейд</Link>
          <Link href="/contracts">Контракты</Link>
          <Link href="/fairness">Честность</Link>
          <Link href="/promos">Промокоды</Link>
          <Link href="/daily">Бонус</Link>
          <Link href="/referrals">Рефералка</Link>
          <Link href="/links">Ссылки</Link>
          {user ? (
            <>
              <Link href="/balance">Баланс</Link>
              <Link href="/trades">Трейды</Link>
              <Link href="/notifications">Уведомления</Link>
              <Link href="/profile" className="btn py-2 text-sm">
                {user.username}
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="inline-flex items-center gap-1 text-ice">
                  <Shield size={16} /> Админ
                </Link>
              )}
            </>
          ) : (
            <Link href="/login" className="btn py-2 text-sm">
              <LogIn size={16} className="mr-2" />
              Войти через Steam
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
