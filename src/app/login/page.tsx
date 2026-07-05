import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <section className="card p-8">
        <h1 className="text-4xl font-black">Вход через Steam</h1>
        <p className="mt-4 text-white/60">
          Пароль от Steam не вводится на сайте. Вход проходит через Steam OpenID.
        </p>

        <form action="/api/auth/steam/start" method="post" className="mt-7 space-y-4">
          {[
            ["adult", "Мне исполнилось 18 лет."],
            ["terms", "Я принимаю Пользовательское соглашение и Правила сайта."],
            ["privacy", "Я ознакомился с Политикой конфиденциальности."],
            ["personalData", "Я даю согласие на обработку персональных данных."],
            ["payments", "Я понимаю условия платежей, возвратов и фискализации."]
          ].map(([name, label]) => (
            <label key={name} className="flex gap-3 rounded-2xl border border-white/10 bg-bg p-4 text-sm leading-6 text-white/75">
              <input name={name} type="checkbox" required className="mt-1" />
              <span>{label}</span>
            </label>
          ))}

          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-white/75">
            Сервис не является банком, казино или платежной организацией. Реальные платежи и вывод ценности
            подключаются только после юридической проверки, договора с провайдером и соблюдения применимых требований РФ.
          </div>

          <button className="btn w-full" type="submit">Подтвердить и войти через Steam</button>
        </form>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-ice">
          <Link href="/terms">Соглашение</Link>
          <Link href="/privacy">Конфиденциальность</Link>
          <Link href="/personal-data">ПДн</Link>
          <Link href="/payments-policy">Платежи</Link>
        </div>
      </section>
    </main>
  );
}
