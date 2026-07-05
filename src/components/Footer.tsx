import Link from "next/link";
import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 bg-bg/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="text-2xl font-black text-accent">CASEBOOM</div>
          <p className="mt-3 text-sm text-white/55">Развлекательная игровая платформа с внутренней валютой {config.boomCoinName}, бонусами, кейсами, апгрейдом и батлами.</p>
        </div>
        <div>
          <h3 className="font-black">Сервис</h3>
          <div className="mt-3 grid gap-2 text-sm text-white/60">
            <Link href="/cases">Кейсы</Link><Link href="/skins">Скины</Link><Link href="/bonus">Бонусы</Link><Link href="/upgrade">Апгрейд</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">Документы</h3>
          <div className="mt-3 grid gap-2 text-sm text-white/60">
            <Link href="/terms">Пользовательское соглашение</Link><Link href="/privacy">Конфиденциальность</Link><Link href="/rules">Правила сервиса</Link><Link href="/legal/game-rules">Правовой статус</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">Поддержка</h3>
          <div className="mt-3 grid gap-2 text-sm text-white/60">
            <Link href="/replacement-rules">Замена предметов</Link><Link href="/payments-policy">Платежи</Link><Link href="/personal-data">Персональные данные</Link><a href={config.supportUrl}>Telegram</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
        CaseBoom не является официальным продуктом Valve. Все товарные знаки принадлежат их правообладателям. {config.docsVersion}
      </div>
    </footer>
  );
}
