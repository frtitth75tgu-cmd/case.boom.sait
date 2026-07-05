export function LegalDoc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <article className="card p-6 leading-7 text-white/75 md:p-10">
        <h1 className="mb-3 text-4xl font-black text-white md:text-5xl">{title}</h1>
        <p className="mb-8 text-sm text-white/45">Документ CaseBoom. Перед коммерческим запуском рекомендуется юридическая проверка под выбранную юрисдикцию.</p>
        <div className="legal-content space-y-5">{children}</div>
      </article>
    </main>
  );
}
