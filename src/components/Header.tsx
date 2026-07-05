import Link from "next/link";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";

export async function Header() {
  const session = getSession();
  const user = session ? await prisma.user.findUnique({ where: { id: session.userId } }) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-accent to-ice bg-clip-text text-transparent">CASEBOOM</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-white/78">
          <Link href="/cases">Кейсы</Link>
          <Link href="/skins">Скины</Link>
          <Link href="/battles">Батлы</Link>
          <Link href="/upgrade">Апгрейд</Link>
          <Link href="/bonus">Бонусы</Link>
          <Link href="/replacement-rules">Замена</Link>
          <Link href="/legal/game-rules">Правила</Link>
          {user ? (
            <>
              <Link href="/profile" className="btn py-2 text-sm">{user.username}</Link>
              {user.role === "ADMIN" && <Link href="/admin" className="text-accent">Админ</Link>}
            </>
          ) : (
            <Link href="/login" className="btn py-2 text-sm">Войти через Steam</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
