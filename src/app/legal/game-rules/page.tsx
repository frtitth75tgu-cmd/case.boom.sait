import { config } from "@/lib/config";

export default function GameRulesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article className="card p-8 leading-7 text-white/70">
        <h1 className="text-4xl font-black text-white">Правила сервиса CaseBoom</h1>
        <p className="mt-4">
          CaseBoom позиционируется как развлекательная игровая платформа с внутренней валютой {config.boomCoinName} и цифровым инвентарём.
        </p>
        <h2 className="mt-6 text-2xl font-black text-white">Не является казино</h2>
        <p>
          Сервис не заявляет себя казино, букмекерской конторой или сервисом азартных игр. Пользовательское соглашение, фактическая модель работы и условия выдачи предметов должны соответствовать выбранной юрисдикции и быть проверены профильным юристом перед коммерческим запуском.
        </p>
        <h2 className="mt-6 text-2xl font-black text-white">Внутренняя валюта</h2>
        <p>
          {config.boomCoinName} используется только внутри платформы и не является денежным средством, электронной валютой или средством платежа вне CaseBoom.
        </p>
        <h2 className="mt-6 text-2xl font-black text-white">Шансы</h2>
        <p>
          Шансы выпадения должны быть доступны пользователю до открытия кейса. Администрация не изменяет результат уже начатого открытия.
        </p>
      </article>
    </main>
  );
}
