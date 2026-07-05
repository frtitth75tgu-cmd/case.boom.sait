export default function FairnessPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article className="card p-8">
        <h1 className="text-4xl font-black">Проверяемая честность</h1>
        <p className="mt-4 text-white/65">
          В проекте заложена схема server seed / client seed / nonce. При открытии кейса сохраняются hash серверного seed,
          client seed, nonce и roll. Это база для будущей публичной проверки результата.
        </p>
        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl bg-bg p-4"><strong>Server seed</strong><p className="text-white/55">Секретная строка сервера.</p></div>
          <div className="rounded-2xl bg-bg p-4"><strong>Server seed hash</strong><p className="text-white/55">Хэш, который можно показать до результата.</p></div>
          <div className="rounded-2xl bg-bg p-4"><strong>Client seed + nonce</strong><p className="text-white/55">Данные пользователя и номер открытия.</p></div>
        </div>
      </article>
    </main>
  );
}
